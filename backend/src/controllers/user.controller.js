import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "ok, Sundaram Sharma, everythings well perfect"
    })
})

export {registerUser}