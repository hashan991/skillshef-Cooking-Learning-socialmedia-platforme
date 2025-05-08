package com.skillchef.skillchef_backend.repository.hashan;



import com.skillchef.skillchef_backend.model.hashan.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByRecipientUserIdOrderByTimestampDesc(String recipientUserId);
}
