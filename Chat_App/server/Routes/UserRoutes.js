import express from "express"
import { checkAuth, Login, signup, updateProfile } from "../controllers/UserController.js";
import { protectedRoute } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/Signup",signup);
userRouter.post("/Login",Login)
userRouter.put("/update-profile", protectedRoute,updateProfile)
userRouter.get("/check", protectedRoute,checkAuth)   //this put has been changed to get


export default userRouter;