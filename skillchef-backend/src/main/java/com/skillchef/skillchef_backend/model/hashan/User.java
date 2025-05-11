package com.skillchef.skillchef_backend.model.hashan;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    @CreatedDate
    private LocalDateTime createdAt;

    // ✅ Social fields
    private Set<String> followers = new HashSet<>();
    private Set<String> following = new HashSet<>();

    // ✅ NEW: Saved posts (bookmarks)
    private Set<String> savedPostIds = new HashSet<>();

    public User() {}

    public User(String username, String email, String password, String bio, String profilePic, String location, LocalDateTime createdAt) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.profilePic = profilePic;
        this.location = location;
        this.createdAt = createdAt;
        this.followers = new HashSet<>();
        this.following = new HashSet<>();
        this.savedPostIds = new HashSet<>();
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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Set<String> getFollowers() { return followers; }
    public void setFollowers(Set<String> followers) { this.followers = followers; }

    public Set<String> getFollowing() { return following; }
    public void setFollowing(Set<String> following) { this.following = following; }

    public Set<String> getSavedPostIds() { return savedPostIds; }
    public void setSavedPostIds(Set<String> savedPostIds) { this.savedPostIds = savedPostIds; }

    public void savePost(String postId) {
        if (!this.savedPostIds.contains(postId)) {
            this.savedPostIds.add(postId);
        }
    }

    public void unsavePost(String postId) {
        this.savedPostIds.remove(postId);
    }
}
