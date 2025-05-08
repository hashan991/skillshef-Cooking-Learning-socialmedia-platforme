package com.skillchef.skillchef_backend.service.tashini;

import com.skillchef.skillchef_backend.model.tashini.ProgressUpdate;
import com.skillchef.skillchef_backend.repository.tashini.ProgressUpdateRepository;
import com.skillchef.skillchef_backend.service.hashan.NotificationService;
import com.skillchef.skillchef_backend.service.hashan.UserService;
import com.skillchef.skillchef_backend.model.hashan.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressUpdateServiceImpl implements ProgressUpdateService {

    @Autowired
    private ProgressUpdateRepository repository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @Override
    public ProgressUpdate createUpdate(ProgressUpdate update) {
        // Step 1: Save the update
        ProgressUpdate saved = repository.save(update);

        // Step 2: Get user info
        User user = userService.getUserById(update.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String username = user.getUsername();

        // Step 3: Notify all followers
        List<String> followers = userService.getFollowersOfUser(update.getUserId());

        for (String followerId : followers) {
            notificationService.createNotification(
                followerId,
                update.getUserId(),
                username,
                "PROGRESS_UPDATE",
                username + " shared a new progress update.",
                null
            );
        }

        return saved;
    }

    @Override
    public List<ProgressUpdate> getAllUpdates() {
        return repository.findAll();
    }

    @Override
    public ProgressUpdate updateProgress(String id, ProgressUpdate updated) {
        return repository.findById(id).map(existing -> {
            existing.setUpdateText(updated.getUpdateText());
            existing.setTemplateType(updated.getTemplateType());
            existing.setRating(updated.getRating());
            existing.setDate(updated.getDate());
            existing.setDifficultyLevel(updated.getDifficultyLevel());
            existing.setNextStep(updated.getNextStep());
            existing.setCompleted(updated.isCompleted());
            return repository.save(existing);
        }).orElse(null);
    }

    @Override
    public void deleteProgress(String id) {
        repository.deleteById(id);
    }

    @Override
    public ProgressUpdate getProgressById(String id) {
        return repository.findById(id).orElse(null);
    }
}
