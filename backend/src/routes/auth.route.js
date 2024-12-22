import express from "express";
import { handleUserLogIn, handleUserLogOut, handleUserSignUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", handleUserSignUp);
authRouter.post("/login", handleUserLogIn);
authRouter.post("/logout", handleUserLogOut);

export { authRouter };