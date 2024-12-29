import express from "express";
import cookieParse from "cookie-parser";
import { authRouter, messageRouter } from "./routes/index.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParse());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

export { app };