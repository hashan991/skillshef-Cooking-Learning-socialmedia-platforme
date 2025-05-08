package com.skillchef.skillchef_backend.controller.hashan;

import com.skillchef.skillchef_backend.service.hashan.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private UserService userService;

    // ✅ Save/bookmark a post
    @PostMapping("/{userId}/save/{postId}")
    public ResponseEntity<String> savePost(@PathVariable String userId, @PathVariable String postId) {
        userService.savePost(userId, postId);
        return ResponseEntity.ok("Post bookmarked successfully");
    }

    // ✅ Unsave/remove bookmark
    @DeleteMapping("/{userId}/unsave/{postId}")
    public ResponseEntity<String> unsavePost(@PathVariable String userId, @PathVariable String postId) {
        userService.unsavePost(userId, postId);
        return ResponseEntity.ok("Post unbookmarked successfully");
    }

    // ✅ Get list of bookmarked post IDs
    @GetMapping("/{userId}")
    public ResponseEntity<List<String>> getBookmarkedPosts(@PathVariable String userId) {
        List<String> savedPostIds = userService.getSavedPostIds(userId);
        return ResponseEntity.ok(savedPostIds);
    }
}
