import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
  } catch (error) {
    throw new ApiError(401, "unauthorized.", error);
  }
};
