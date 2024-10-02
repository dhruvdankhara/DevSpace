import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { readFileSync } from "fs";
import path from "path";

const app = express();

const corsOptions = {
  origin: "https://dev-space-jade.vercel.app",
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

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
import userRoute from "./router/user.routes.js";
import commentRoute from "./router/comment.routes.js";

// Swagger setup
const swaggerDocument = JSON.parse(readFileSync(path.resolve("swagger.json")));

const swaggerOptions = {
  swaggerDefinition: swaggerDocument,
  apis: ["./src/router/*.js"], // Path to the API docs
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/comment", commentRoute);

app.use(errorHandler);

export default app;
