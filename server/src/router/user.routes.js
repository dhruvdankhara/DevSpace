import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  followUser,
  getUserPost,
  unfollowUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/blogs/:username").get(getUserPost);

router.route("/follow/:userId").post(verifyJWT, followUser);
router.route("/unfollow/:userId").post(verifyJWT, unfollowUser);

export default router;
