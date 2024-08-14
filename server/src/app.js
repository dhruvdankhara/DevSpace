import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import errorHandler from "./middlewares/error.middleware.js";
import authRoute from "./router/auth.router.js";

app.use("/api/v1/auth", authRoute);

app.use(errorHandler);

export default app;
