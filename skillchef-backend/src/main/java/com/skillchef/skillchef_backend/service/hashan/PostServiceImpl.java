package com.skillchef.skillchef_backend.service.hashan;

import com.skillchef.skillchef_backend.dto.hashan.PostRequestDTO;
import com.skillchef.skillchef_backend.dto.hashan.PostResponseDTO;
import com.skillchef.skillchef_backend.model.hashan.Post;
import com.skillchef.skillchef_backend.model.hashan.User;
import com.skillchef.skillchef_backend.repository.hashan.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @Override
    public PostResponseDTO createPost(PostRequestDTO dto) {
        // Step 1: Save the post
        Post post = new Post(
                null,
                dto.getTitle(),
                dto.getDescription(),
                dto.getMediaUrls(),
                dto.getHashtags(),
                dto.getCategory(),
                dto.getDifficulty(),
                dto.getUserId(),
                LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
        );

        Post savedPost = postRepository.save(post);
        System.out.println("✅ Post saved: " + savedPost.getId());

        // Step 2: Get sender info
        User user = userService.getUserById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String username = user.getUsername();
          System.out.println("👤 Post created by: " + username);

        // Step 3: Notify followers
        List<String> followers = userService.getFollowersOfUser(dto.getUserId());
         System.out.println("👥 Notifying " + followers.size() + " followers");
        for (String followerId : followers) {
            notificationService.createNotification(
                    followerId,
                    dto.getUserId(),
                    username,
                    "NEW_POST",
                    username + " posted a new cooking post.",
                    savedPost.getId()
            );
        }

        return mapToDTO(savedPost);
    }

    @Override
    public List<PostResponseDTO> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PostResponseDTO getPostById(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToDTO(post);
    }

    @Override
    public PostResponseDTO updatePost(String id, PostRequestDTO dto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setMediaUrls(dto.getMediaUrls());
        post.setHashtags(dto.getHashtags());
        post.setCategory(dto.getCategory());
        post.setDifficulty(dto.getDifficulty());

        return mapToDTO(postRepository.save(post));
    }

    @Override
    public void deletePost(String id) {
        postRepository.deleteById(id);
    }

    @Override
    public void savePost(Post post) {
        postRepository.save(post);
    }

    @Override
    public Optional<Post> findPostByIdRaw(String id) {
        return postRepository.findById(id);
    }

    @Override
    public List<PostResponseDTO> getPostsByUserId(String userId) {
        return postRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ HATEOAS Helper
    private PostResponseDTO mapToDTO(Post post) {
        PostResponseDTO dto = new PostResponseDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setDescription(post.getDescription());
        dto.setMediaUrls(post.getMediaUrls());
        dto.setHashtags(post.getHashtags());
        dto.setCategory(post.getCategory());
        dto.setDifficulty(post.getDifficulty());
        dto.setUserId(post.getUserId());
        dto.setCreatedAt(post.getCreatedAt());

        Map<String, String> links = new HashMap<>();
        links.put("self", "/api/posts/" + post.getId());
        links.put("update", "/api/posts/" + post.getId());
        links.put("delete", "/api/posts/" + post.getId());
        links.put("user", "/api/users/" + post.getUserId());

        dto.set_links(links);

        return dto;
    }
}
