import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        console.log(user)
        const accessToken = await user.generateAccessToken()
        console.log(accessToken)
        const refreshToken = await user.generateRefreshToken()
        console.log(refreshToken)

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong, while generating refresh & access token")
    }
}


const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "ok, Sundaram Sharma, everythings well perfect"
    // })

    
    /* 1. Which field you want to save at the registration process */
    const {fullName, email, username, password} = req.body
    console.log("email: ", email);

    /* 2. Check no one field should be empty */
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required", )
    }

    /* 3. Check if user already exists in database */
    const existedUser = await User.findOne({ $or: [{username}, {email}] })
    console.log(existedUser)
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }
    console.log(req.files);

    /* 4. check for images, avatar */
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath)

    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    console.log(coverImageLocalPath)

    /* 5. upload them to cloudinary, (check required for avatar) */
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log(avatar);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    console.log(coverImage);

    if (!avatar) {
        throw new ApiError(400, "Avatar image is required, On uploading error");
    }

    /* 6. create user object - create entry in db */
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    /* 7. remove password & refresh token field from response */
    const createdUser = await User.findById(user._id).select( "-password -refreshToken" )  // which field you not want to store

    /* 8. check for user creation */
    if (!createdUser) {
        throw new ApiError(500, "Error occurs, while registering User")
    }

    /* 9. result response */
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created Successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    /* 1. req body -> data */
    const {email, username, password} = req.body

    /* 2. username or email */
    if (!username && !email) {
        throw new ApiError(400, "username or password is required")
    }

    /* 3. find the user */
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    /* 4. check the password */
    const isPasswordValid = await user.isPasswordCorrect(password)
    console.log(isPasswordValid);

    if (!isPasswordValid) {
        throw new ApiError(401, "Your password is incorrect")
    }

    /* 5. access & refresh token */
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    /* 6. send cookie */
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedUser, accessToken,
                refreshToken
            },
            "User logged In successfully"
        )
    )
})


const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export {registerUser, loginUser, logoutUser}