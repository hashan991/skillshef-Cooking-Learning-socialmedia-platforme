package com.skillchef.skillchef_backend.controller.hashan;

import com.skillchef.skillchef_backend.model.hashan.Notification;
import com.skillchef.skillchef_backend.service.hashan.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public void createNotification(@RequestBody Notification notification) {
        notificationService.createNotification(
            notification.getRecipientUserId(),
            notification.getSenderUserId(),
            notification.getSenderUsername(),
            notification.getType(),
            notification.getMessage(),
            notification.getPostId()
        );
    }

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(@PathVariable String userId) {
        return notificationService.getNotificationsForUser(userId);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
    }
    @GetMapping
    public List<Notification> getAllNotifications() {
    return notificationService.getAllNotifications();
}

}
