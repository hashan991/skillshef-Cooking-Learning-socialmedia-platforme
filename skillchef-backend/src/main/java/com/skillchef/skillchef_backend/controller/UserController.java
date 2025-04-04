package com.skillchef.skillchef_backend.controller;

import com.skillchef.skillchef_backend.dto.UserLoginDTO;
import com.skillchef.skillchef_backend.dto.UserRegisterDTO;
import com.skillchef.skillchef_backend.dto.UserResponseDTO;
import com.skillchef.skillchef_backend.model.User;
import com.skillchef.skillchef_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Register new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDTO userDto) {
        if (userService.existsByEmail(userDto.getEmail())) {
            return ResponseEntity.status(400).body("Email already registered");
        }

        User user = new User(
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getBio(),
                userDto.getProfilePic(),
                userDto.getLocation(),
                null // joinedAt set in service
        );

        User registered = userService.register(user);
        return ResponseEntity.ok(new UserResponseDTO(registered));
    }

    // ✅ Login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO loginDto) {
        return userService
                .login(loginDto.getEmail(), loginDto.getPassword())
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(new UserResponseDTO(user)))
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }

    // ✅ Update user with profile image (multipart/form-data)
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> updateWithImage(
            @PathVariable String id,
            @RequestPart("user") User user,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            if (file != null && !file.isEmpty()) {
                String uploadDir = System.getProperty("user.dir") + "/skillchef-backend/uploads/";
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename().replaceAll(" ", "_");
                Path filePath = Paths.get(uploadDir + fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());
                user.setProfilePic("/uploads/" + fileName);
            }

            return ResponseEntity.ok(new UserResponseDTO(userService.updateUser(id, user)));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Profile image upload failed");
        }
    }

    // ✅ Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(new UserResponseDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }
}
