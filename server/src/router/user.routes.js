import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUserPost } from "../controllers/user.controller.js";

const router = Router();

router.route("/blogs/:username").get(getUserPost);

export default router;
