import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cookieOption } from "../constants.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  await registerSchema.validate({ name, email, username, password });

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "Email or username already exist");
  }

  // TODO: add profile feature

  // TODO: default profile image.
  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    -password - refreshToken
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }

  const token = await createdUser.generateAccessToken();

  const response = new ApiResponse(
    201,
    createdUser,
    "User register successfully"
  );

  return res
    .status(response.statusCode)
    .cookie("token", token, cookieOption)
    .json(response);
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  await loginSchema.validate({ username, email, password });

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found with this username or email");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Password is incorrect");
  }

  const token = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select(
    -password - refreshToken
  );

  const response = new ApiResponse(
    200,
    { user: loggedInUser, token },
    "User login successfully."
  );

  return res
    .status(response.statusCode)
    .cookie("token", token, cookieOption)
    .json(response);
});

export const logoutUser = asyncHandler((req, res) => {
  const response = new ApiResponse(200, {}, "User logged out successfully");
  return res
    .status(response.statusCode)
    .clearCookie("token", cookieOption)
    .json(response);
});
