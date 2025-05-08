package com.skillchef.skillchef_backend.service.hashan;



import com.skillchef.skillchef_backend.model.hashan.Notification;

import java.util.List;

public interface NotificationService {
    void createNotification(String recipientUserId, String senderUserId, String senderUsername, String type, String message, String postId);
    List<Notification> getNotificationsForUser(String recipientUserId);
    void markAsRead(String notificationId);
    void deleteNotification(String notificationId);
    List<Notification> getAllNotifications();

}
