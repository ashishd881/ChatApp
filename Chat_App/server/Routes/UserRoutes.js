import express from "express"
import { checkAuth, login, signup, updateProfile } from "../controllers/UserController.js";
import { protectedRoute } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login",login)
userRouter.put("/update-profile", protectedRoute,updateProfile)
userRouter.put("/check", protectedRoute,checkAuth)


export default userRouter;