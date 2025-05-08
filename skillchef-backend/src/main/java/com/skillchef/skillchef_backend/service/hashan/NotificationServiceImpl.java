package com.skillchef.skillchef_backend.service.hashan;



import com.skillchef.skillchef_backend.model.hashan.Notification;
import com.skillchef.skillchef_backend.repository.hashan.NotificationRepository;
//import com.skillchef.skillchef_backend.service.hashan.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void createNotification(String recipientUserId, String senderUserId, String senderUsername, String type, String message, String postId) {
        Notification notification = new Notification();
        notification.setRecipientUserId(recipientUserId);
        notification.setSenderUserId(senderUserId);
        notification.setSenderUsername(senderUsername);
        notification.setType(type);
        notification.setMessage(message);
        notification.setPostId(postId);
        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotificationsForUser(String recipientUserId) {
        return notificationRepository.findByRecipientUserIdOrderByTimestampDesc(recipientUserId);
    }

    @Override
    public void markAsRead(String notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    @Override
    public void deleteNotification(String notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    @Override
    public List<Notification> getAllNotifications() {
    return notificationRepository.findAll();  // assuming you use MongoRepository
}

}
