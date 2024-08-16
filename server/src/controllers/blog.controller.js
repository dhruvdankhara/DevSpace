import Blog from "../models/blog.model.js";
import { createBlogPostSchema } from "../schemas/blog.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createBlogPost = asyncHandler(async (req, res) => {
  // TODO: add topics feature using id and file this id with database queries.
  const user = req.user;
  const file = req.file;
  const { title, content } = req.body;

  await createBlogPostSchema.validate({ title, content });

  let imageUrl = "";
  if (file) {
    imageUrl = await uploadImage(file.path);
  }

  const blog = await Blog.create({
    userId: user._id,
    title,
    content,
    featureImage: imageUrl?.secure_url || "",
  });

  if (!blog) {
    throw new ApiError(500, "Failed to create blog post");
  }

  const response = new ApiResponse(201, blog, "Blog post created successfully");
  return res.status(response.statusCode).json(response);
});
