package com.skillchef.skillchef_backend.service;

import com.skillchef.skillchef_backend.model.User;
import com.skillchef.skillchef_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ✅ Register user
    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setJoinedAt(LocalDateTime.now().toString());
        return userRepo.save(user);
    }

    // ✅ Login (check hashed password)
    @Override
    public Optional<User> login(String email, String rawPassword) {
        Optional<User> user = userRepo.findByEmail(email);
        return user.filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()));
    }

    // ✅ Update user profile
    @Override
    public User updateUser(String id, User updatedUser) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setBio(updatedUser.getBio());
        user.setLocation(updatedUser.getLocation());
        user.setProfilePic(updatedUser.getProfilePic());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        return userRepo.save(user);
    }

    // ✅ Delete user
    @Override
    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    // ✅ Get user by ID
    @Override
    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    // ✅ Check if email is already registered
    @Override
    public boolean existsByEmail(String email) {
        return userRepo.findByEmail(email).isPresent();
    }
}
