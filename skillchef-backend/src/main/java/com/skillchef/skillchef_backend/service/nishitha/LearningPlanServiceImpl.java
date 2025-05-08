package com.skillchef.skillchef_backend.service.nishitha;

import com.skillchef.skillchef_backend.model.nishitha.LearningPlan;
import com.skillchef.skillchef_backend.repository.nishitha.LearningPlanRepository;
import com.skillchef.skillchef_backend.service.hashan.NotificationService;
import com.skillchef.skillchef_backend.service.hashan.UserService;
import com.skillchef.skillchef_backend.model.hashan.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningPlanServiceImpl implements LearningPlanService {

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @Override
    public LearningPlan createPlan(LearningPlan plan) {
        // Save the plan first
        LearningPlan savedPlan = learningPlanRepository.save(plan);

        // Get the user info
        User user = userService.getUserById(plan.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String username = user.getUsername();

        // Get the user's followers
        List<String> followers = userService.getFollowersOfUser(plan.getUserId());

        // Send notifications to followers
        for (String followerId : followers) {
            notificationService.createNotification(
                followerId,
                plan.getUserId(),
                username,
                "LEARNING_PLAN",
                username + " created a new learning plan.",
                null
            );
        }

        return savedPlan;
    }

    @Override
    public List<LearningPlan> getAllPlans() {
        return learningPlanRepository.findAll();
    }

    @Override
    public Optional<LearningPlan> getPlanById(String id) {
        return learningPlanRepository.findById(id);
    }

    @Override
    public LearningPlan updatePlan(String id, LearningPlan updatedPlan) {
        return learningPlanRepository.findById(id).map(existingPlan -> {
            existingPlan.setTitle(updatedPlan.getTitle());
            existingPlan.setDescription(updatedPlan.getDescription());
            existingPlan.setCategory(updatedPlan.getCategory());
            existingPlan.setDurationInDays(updatedPlan.getDurationInDays());
            existingPlan.setGoal(updatedPlan.getGoal());
            existingPlan.setStartDateTime(updatedPlan.getStartDateTime());
            existingPlan.setSteps(updatedPlan.getSteps());
            return learningPlanRepository.save(existingPlan);
        }).orElse(null);
    }

    @Override
    public void deletePlan(String id) {
        learningPlanRepository.deleteById(id);
    }
}
