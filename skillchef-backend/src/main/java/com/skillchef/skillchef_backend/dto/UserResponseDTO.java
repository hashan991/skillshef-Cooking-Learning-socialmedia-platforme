package com.skillchef.skillchef_backend.dto;

import com.skillchef.skillchef_backend.model.User;

public class UserResponseDTO {

    private String id;
    private String username;
    private String email;
    private String bio;
    private String profilePic;
    private String location;
    private String joinedAt;

    public UserResponseDTO() {}

    // Constructor to map from User model
    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.bio = user.getBio();
        this.profilePic = user.getProfilePic();
        this.location = user.getLocation();
        this.joinedAt = user.getJoinedAt();
    }

    // ✅ Getters (required for serialization)
    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getBio() { return bio; }
    public String getProfilePic() { return profilePic; }
    public String getLocation() { return location; }
    public String getJoinedAt() { return joinedAt; }
}
