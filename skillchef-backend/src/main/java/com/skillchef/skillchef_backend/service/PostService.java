package com.skillchef.skillchef_backend.service;

import com.skillchef.skillchef_backend.dto.PostRequestDTO;
import com.skillchef.skillchef_backend.dto.PostResponseDTO;
import com.skillchef.skillchef_backend.model.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {
    PostResponseDTO createPost(PostRequestDTO postRequestDTO);
    List<PostResponseDTO> getAllPosts();
    PostResponseDTO getPostById(String id);
    PostResponseDTO updatePost(String id, PostRequestDTO postRequestDTO);
    void deletePost(String id);

    // ✅ For saving new or updated Post with files
    void savePost(Post post);

    // ✅ Needed to fetch raw Post entity (not DTO)
    Optional<Post> findPostByIdRaw(String id);
}
