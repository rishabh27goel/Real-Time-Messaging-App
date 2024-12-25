import express from "express";
import { 
  handleUserLogIn, 
  handleUserLogOut, 
  handleUserSignUp, 
  handleUserProfileUpdate, 
  handleCheckUserAuthentication 
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", handleUserSignUp);
authRouter.post("/login", handleUserLogIn);
authRouter.post("/logout", handleUserLogOut);
authRouter.put("/update-profile", protectedRoute, handleUserProfileUpdate);
authRouter.get("/check", protectedRoute, handleCheckUserAuthentication);

export { authRouter };