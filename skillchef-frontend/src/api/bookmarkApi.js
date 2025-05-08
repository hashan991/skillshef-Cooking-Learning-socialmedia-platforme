import axios from "axios";

const API_BASE = "http://localhost:8080/api/bookmarks";

export const savePost = async (userId, postId) => {
  await axios.post(`${API_BASE}/${userId}/save/${postId}`);
};

export const unsavePost = async (userId, postId) => {
  await axios.delete(`${API_BASE}/${userId}/unsave/${postId}`);
};

export const getSavedPostIds = async (userId) => {
  const res = await axios.get(`${API_BASE}/${userId}`);
  return res.data;
};
