package com.skillchef.skillchef_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
    @Id
    private String id;

    private String username;
    private String email;
    private String password;

    private String bio;
    private String profilePic;
    private String location;
    private String joinedAt;

    public User() {}

    public User(String username, String email, String password, String bio, String profilePic, String location, String joinedAt) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.profilePic = profilePic;
        this.location = location;
        this.joinedAt = joinedAt;
    }

    public String getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getProfilePic() { return profilePic; }
    public void setProfilePic(String profilePic) { this.profilePic = profilePic; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getJoinedAt() { return joinedAt; }
    public void setJoinedAt(String joinedAt) { this.joinedAt = joinedAt; }
}
