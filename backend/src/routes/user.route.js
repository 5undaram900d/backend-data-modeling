import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// http://localhost:8080/api/v1/users/register
router.route("/register").post(
    /* handle middleware */
    upload.fields([
        {
            name: "avatar",             /* avatar name defined in frontend */
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),

    registerUser
)
// // http://localhost:8080/api/v1/users/login
// router.route("/login").post(loginUser)


router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)

export default router