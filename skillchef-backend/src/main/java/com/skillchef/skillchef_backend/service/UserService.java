package com.skillchef.skillchef_backend.service;

import com.skillchef.skillchef_backend.model.User;

import java.util.Optional;

public interface UserService {
    User register(User user);
    Optional<User> login(String email, String password);
    User updateUser(String id, User updatedUser);
    void deleteUser(String id);
    Optional<User> getUserById(String id);
    boolean existsByEmail(String email);

    // ✅ Add follow/unfollow methods
    User follow(String userId, String targetId);
    User unfollow(String userId, String targetId);
}
