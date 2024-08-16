import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBlogPost } from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.middlewares.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, upload.single("featureImage"), createBlogPost);

export default router;
