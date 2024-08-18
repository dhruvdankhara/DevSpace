import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import { createBlogPostSchema } from "../schemas/blog.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const createBlogPost = asyncHandler(async (req, res) => {
  // TODO: add topics feature using id and file this id with database queries.
  const user = req.user;
  const file = req.file;
  const { title, content, slug } = req.body;

  await createBlogPostSchema.validate({ title, content, slug });

  const existingBlog = await Blog.findOne({ slug });

  if (existingBlog) {
    throw new ApiError(400, "Blog post with this title already exists");
  }

  let imageUrl = "";
  if (file) {
    imageUrl = await uploadImage(file.path);
  }

  const blog = await Blog.create({
    userId: user._id,
    title,
    content,
    slug,
    featureImage: imageUrl?.secure_url || "",
  });

  if (!blog) {
    throw new ApiError(500, "Failed to create blog post");
  }

  const response = new ApiResponse(201, blog, "Blog post created successfully");
  return res.status(response.statusCode).json(response);
});

export const deleteBlogPost = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ApiError(404, "Blog post not found");
  }

  if (blog.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this blog post");
  }

  await deleteImage(
    blog.featureImage
      .substring(blog.featureImage.lastIndexOf("/") + 1)
      .split(".")[0]
  );

  await Blog.findByIdAndDelete(blogId);

  const response = new ApiResponse(200, null, "Blog post deleted successfully");
  return res.status(response.statusCode).json(response);
});

export const editBlogPost = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { title, content, slug } = req.body;
  const file = req.file;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ApiError(404, "Blog post not found");
  }

  if (blog.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to edit this blog post");
  }

  if (slug) {
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog && existingBlog._id.toString() !== blogId) {
      throw new ApiError(400, "Blog post with this title already exists");
    }
  }

  if (file) {
    const cloudinaryResponse = await uploadImage(file.path);
    blog.featureImage = cloudinaryResponse.secure_url;
  }

  if (title) blog.title = title;
  if (content) blog.content = content;
  if (slug) blog.slug = slug;

  await blog.save();

  const response = new ApiResponse(200, blog, "Blog post updated successfully");
  return res.status(response.statusCode).json(response);
});

export const getBlogPost = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(blogId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "author",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              email: 1,
              _id: 1,
              name: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        author: {
          $first: "$author",
        },
      },
    },
    {
      $project: {
        userId: 0,
        __v: 0,
      },
    },
  ]);

  if (blog.length == 0) {
    throw new ApiError(404, "Blog post not found");
  }

  const response = new ApiResponse(
    200,
    blog[0],
    "Blog post retrieved successfully"
  );
  return res.status(response.statusCode).json(response);
});
