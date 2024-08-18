import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBlogPost,
  deleteBlogPost,
  editBlogPost,
  getBlogPost,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.middlewares.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, upload.single("featureImage"), createBlogPost);

router
  .route("/:blogId")
  .get(getBlogPost)
  .post(verifyJWT, upload.single("featureImage"), editBlogPost)
  .delete(verifyJWT, deleteBlogPost);

export default router;
