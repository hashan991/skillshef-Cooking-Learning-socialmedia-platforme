package com.skillchef.skillchef_backend.dto.hashan;

import java.time.format.DateTimeFormatter;
import java.util.Set;

import com.skillchef.skillchef_backend.model.hashan.User;

public class UserResponseDTO {
    private String id;
    private String username;
    private String email;
    private String bio;
    private String profilePic;
    private String location;
    private String joinedAt; // Still a String here, but from createdAt (formatted)

    private Set<String> followers;
    private Set<String> following;

    private int followerCount;
    private int followingCount;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.bio = user.getBio();
        this.profilePic = user.getProfilePic();
        this.location = user.getLocation();

        // ✅ Format createdAt (LocalDateTime) into a readable string
        this.joinedAt = user.getCreatedAt() != null
                ? user.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))
                : "N/A";

        this.followers = user.getFollowers();
        this.following = user.getFollowing();

        this.followerCount = (user.getFollowers() != null) ? user.getFollowers().size() : 0;
        this.followingCount = (user.getFollowing() != null) ? user.getFollowing().size() : 0;
    }

    // ✅ Getters
    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getBio() { return bio; }
    public String getProfilePic() { return profilePic; }
    public String getLocation() { return location; }
    public String getJoinedAt() { return joinedAt; }
    public Set<String> getFollowers() { return followers; }
    public Set<String> getFollowing() { return following; }

    public int getFollowerCount() { return followerCount; }
    public int getFollowingCount() { return followingCount; }

    // ✅ Setters (only if needed)
    public void setFollowers(Set<String> followers) { this.followers = followers; }
    public void setFollowing(Set<String> following) { this.following = following; }
}
