import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


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

export {registerUser}