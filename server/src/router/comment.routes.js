import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  blogComments,
  createComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createComment);
router.route("/:blogId").get(blogComments);

export default router;
