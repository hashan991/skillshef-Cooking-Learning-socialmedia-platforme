package com.skillchef.skillchef_backend.service;

import com.skillchef.skillchef_backend.model.User;
import com.skillchef.skillchef_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setJoinedAt(LocalDateTime.now().toString());
        user.setFollowers(new HashSet<>());
        user.setFollowing(new HashSet<>());
        return userRepo.save(user);
    }

    @Override
    public Optional<User> login(String email, String rawPassword) {
        Optional<User> user = userRepo.findByEmail(email);
        return user.filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()));
    }

    @Override
    public User updateUser(String id, User updatedUser) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setBio(updatedUser.getBio());
        user.setLocation(updatedUser.getLocation());
        user.setProfilePic(updatedUser.getProfilePic());

        return userRepo.save(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.findByEmail(email).isPresent();
    }

    // ✅ Follow a user
    public User follow(String userId, String targetId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User target = userRepo.findById(targetId)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        user.getFollowing().add(targetId);
        target.getFollowers().add(userId);

        userRepo.save(target);
        return userRepo.save(user);
    }

    // ✅ Unfollow a user
    public User unfollow(String userId, String targetId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User target = userRepo.findById(targetId)
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        user.getFollowing().remove(targetId);
        target.getFollowers().remove(userId);

        userRepo.save(target);
        return userRepo.save(user);
    }
}
