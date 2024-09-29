import Blog from "../models/blog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUserPost = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const blogs = await Blog.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        user: {
          $first: "$user",
        },
      },
    },
    {
      $addFields: {
        username: "$user.username",
      },
    },
    {
      $match: {
        username,
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
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const response = new ApiResponse(200, blogs, "user fetched succefully");
  return res.status(response.statusCode).json(response);
});
