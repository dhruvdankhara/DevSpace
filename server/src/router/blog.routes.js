import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBlogPost,
  deleteBlogPost,
  editBlogPost,
  getBlogPost,
  getAllBlogPosts,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.middlewares.js";
import {
  getBlogComments,
  createComment,
} from "../controllers/comment.controller.js";

const router = Router();

router
  .route("/")
  .get(getAllBlogPosts)
  .post(verifyJWT, upload.single("featureImage"), createBlogPost);

router
  .route("/:blogId")
  .get(getBlogPost)
  .post(verifyJWT, upload.single("featureImage"), editBlogPost)
  .delete(verifyJWT, deleteBlogPost);

router
  .route("/:blogId/comment")
  .get(getBlogComments)
  .post(verifyJWT, createComment);

// router.route("/:blogId/like").post(verifyJWT, likeBlog);
// router.route("/:blogId/unlike").post(verifyJWT, unlikeBlog);

export default router;
