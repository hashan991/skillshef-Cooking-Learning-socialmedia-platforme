package com.skillchef.skillchef_backend.service.hashan;

import com.skillchef.skillchef_backend.model.hashan.User;
import com.skillchef.skillchef_backend.repository.hashan.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
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
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.findByEmail(email).isPresent();
    }

    @Override
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

    @Override
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

    @Override
    public List<User> suggestUsersToFollow(String userId) {
        User currentUser = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<String> following = currentUser.getFollowing();

        return userRepo.findAll().stream()
                .filter(user -> !user.getId().equals(userId))
                .filter(user -> !following.contains(user.getId()))
                .limit(5)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getFollowersOfUser(String userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new ArrayList<>(user.getFollowers());
    }

    @Override
    public void savePost(String userId, String postId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.savePost(postId);
        userRepo.save(user);
    }

    @Override
    public void unsavePost(String userId, String postId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.unsavePost(postId);
        userRepo.save(user);
    }

    @Override
    public List<String> getSavedPostIds(String userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ArrayList<>(user.getSavedPostIds());
    }
}
