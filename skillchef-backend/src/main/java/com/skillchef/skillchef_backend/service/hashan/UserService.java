package com.skillchef.skillchef_backend.service.hashan;

import java.util.List;
import java.util.Optional;

import com.skillchef.skillchef_backend.model.hashan.User;

public interface UserService {

    // 🔐 Auth
    User register(User user);
    Optional<User> login(String email, String password);
    boolean existsByEmail(String email);

    // 👤 User Profile
    User updateUser(String id, User updatedUser);
    void deleteUser(String id);
    Optional<User> getUserById(String id);
    Optional<User> getUserByEmail(String email); // ✅ NEW for OAuth2 login

    // 🧑‍🤝‍🧑 Follow System
    User follow(String userId, String targetId);
    User unfollow(String userId, String targetId);
    List<User> suggestUsersToFollow(String userId);

    // 🆕 Followers Fetch
    List<String> getFollowersOfUser(String userId);

    // ✅ NEW: Bookmark (Save/Unsave Post)
    void savePost(String userId, String postId);
    void unsavePost(String userId, String postId);
    List<String> getSavedPostIds(String userId);
}
