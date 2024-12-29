import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();


export { messageRouter };
