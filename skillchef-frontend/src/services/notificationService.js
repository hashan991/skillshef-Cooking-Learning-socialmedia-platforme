import axios from "axios";

// ✅ Backend base URL for notifications
const BASE_URL = "http://localhost:8080/api/notifications";

// ✅ Fetch all notifications for a user
export const getNotifications = (userId) =>
  axios.get(`${BASE_URL}/${userId}`, {
    withCredentials: true, // Send cookies (JSESSIONID) for auth
  });

// ✅ Mark a notification as read
export const markAsRead = (id) =>
  axios.put(`${BASE_URL}/${id}/read`, null, {
    withCredentials: true,
  });

// ✅ Delete a notification
export const deleteNotification = (id) =>
  axios.delete(`${BASE_URL}/${id}`, {
    withCredentials: true,
  });
