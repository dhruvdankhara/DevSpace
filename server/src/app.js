import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

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
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);

import errorHandler from "./middlewares/error.middleware.js";
import authRoute from "./router/auth.routes.js";
import blogRoute from "./router/blog.routes.js";

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);

app.use(errorHandler);

export default app;
