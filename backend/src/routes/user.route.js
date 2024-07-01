import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

// http://localhost:8080/api/v1/users/register
router.route("/register").post(registerUser)
// // http://localhost:8080/api/v1/users/login
// router.route("/login").post(loginUser)

export default router