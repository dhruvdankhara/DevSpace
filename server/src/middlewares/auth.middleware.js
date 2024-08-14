import asyncHandler from "../utils/asyncHandler";
import { verifyToken } from "../config/jwt";
import { ApiError } from "../utils/ApiError";

const authMiddleware = asyncHandler((req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const data = verifyToken(token);
    req.user = data;
  } catch (error) {
    throw new ApiError(401, "Unauthorized");
  }
});

export default asyncHandler;
