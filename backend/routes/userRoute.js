import express from 'express'
import { adminLogin, loginUser, profileInformation, profileUpdate, registerUser } from '../controllers/userController.js'
import authUser from "./../middleware/auth.js";


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/admin",adminLogin)
userRouter.post("/profile",authUser, profileInformation);
userRouter.post("/update",authUser, profileUpdate);


export default userRouter;