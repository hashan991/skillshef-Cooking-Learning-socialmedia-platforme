package com.skillchef.skillchef_backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostResponseDTO {
    private String id;
    private String title;
    private String description;
    private List<String> mediaUrls;
    private List<String> hashtags;
    private String category;
    private String difficulty;
    private String userId;
    private String createdAt;
}
