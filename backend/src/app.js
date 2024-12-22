import express from "express";
import { authRouter } from "./routes/index.js";

const app = express();
app.use("/api/auth", authRouter);

export { app };