import axios from "axios";

const BASE_URL = "http://localhost:8080/api/notifications";

export const getNotifications = (userId) => axios.get(`${BASE_URL}/${userId}`);

export const markAsRead = (id) => axios.put(`${BASE_URL}/${id}/read`);

export const deleteNotification = (id) => axios.delete(`${BASE_URL}/${id}`);
