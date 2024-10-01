import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 60000,
  withCredentials: true,
});

// Auth api calles

export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const registerUser = async ({ name, username, email, password }) => {
  const response = await apiClient.post("/auth/register", {
    name,
    username,
    email,
    password,
  });
  return response.data;
};

// user profile calles

export const getLogedInUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const getUserProfile = async (username) => {
  const response = await apiClient.get(`/auth/user/${username}`);
  return response.data;
};

export const updateUser = async (data) => {
  const response = await apiClient.post("/auth/update-user", data);
  return response.data;
};

export const updateAvatar = async (image) => {
  const response = await apiClient.post("/auth/update-avatar", image);
  return response.data;
};

// Blog releted calles

export const getPosts = async () => {
  const response = await apiClient.get("/blog");
  return response.data;
};

export const getPost = async (slug) => {
  const response = await apiClient.get(`/blog/${slug}`);
  return response.data;
};

export const getUserPosts = async (username) => {
  const response = await apiClient.get(`/user/blogs/${username}`);
  return response.data;
};

export const createPost = async (data) => {
  const response = await apiClient.post("/blog", data);
  return response.data;
};

export const deletePost = async (slug) => {
  const response = await apiClient.delete(`/blog/${slug}`);
  return response.data;
};

export const editPost = async (slug, data) => {
  const response = await apiClient.post(`/blog/${slug}`, data);
  return response.data;
};

// comment

export const createComment = async ({ blogId, content }) => {
  const response = await apiClient.post("/comment", {
    blogId,
    content,
  });
  return response.data;
};

export const getPostComments = async (blogId) => {
  const response = await apiClient.get(`/comment/${blogId}`);
  return response.data;
};

export const followUser = async (userId) => {
  const response = await apiClient.post(`/user/follow/${userId}`);
  return response.data;
};

export const unfollowUser = async (userId) => {
  const response = await apiClient.post(`/user/unfollow/${userId}`);
  return response.data;
};

export default apiClient;
