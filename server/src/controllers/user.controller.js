import Blog from "../models/blog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";

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

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const loggedInUser = req.user;

  if (userId === loggedInUser._id.toString()) {
    const response = new ApiResponse(400, {}, "You can't follow yourself");
    return res.status(response.statusCode).json(response);
  }

  const followedUser = await User.findById(userId);

  if (!followedUser) {
    const response = new ApiResponse(404, {}, "User not found");
    return res.status(response.statusCode).json(response);
  }

  const isAlreadyFollowing = await Follow.findOne({
    follower: loggedInUser._id,
    following: followedUser._id,
  });

  if (isAlreadyFollowing) {
    const response = new ApiResponse(400, {}, "You already follow this user");
    return res.status(response.statusCode).json(response);
  }

  const follow = await Follow.create({
    follower: loggedInUser._id,
    following: followedUser._id,
  });

  const response = new ApiResponse(201, null, "User followed successfully");
  return res.status(response.statusCode).json(response);
});

export const unfollowUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const loggedInUser = req.user;

  if (userId === loggedInUser._id.toString()) {
    const response = new ApiResponse(400, {}, "You can't unfollow yourself");
    return res.status(response.statusCode).json(response);
  }

  const followedUser = await User.findById(userId);

  if (!followedUser) {
    const response = new ApiResponse(404, {}, "User not found");
    return res.status(response.statusCode).json(response);
  }

  const isFollowing = await Follow.findOne({
    follower: loggedInUser._id,
    following: followedUser._id,
  });

  if (!isFollowing) {
    const response = new ApiResponse(400, {}, "You don't follow this user");
    return res.status(response.statusCode).json(response);
  }

  await Follow.findByIdAndDelete(isFollowing._id);

  const response = new ApiResponse(200, {}, "User unfollowed successfully");
  return res.status(response.statusCode).json(response);
});

export const getFollowersFollowing = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const followers = await Follow.find({
    follower: userId,
  });

  const following = await Follow.find({
    following: userId,
  });

  const response = new ApiResponse(
    400,
    {
      followers: followers.length,
      following: following.length,
    },
    "You don't follow this user"
  );
  return res.status(response.statusCode).json(response);
});
