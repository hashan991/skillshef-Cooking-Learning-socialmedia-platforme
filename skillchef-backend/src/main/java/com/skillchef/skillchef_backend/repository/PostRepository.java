package com.skillchef.skillchef_backend.repository;

import com.skillchef.skillchef_backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    // Custom queries for filtering
    List<Post> findByCategory(String category);
    List<Post> findByDifficulty(String difficulty);
    List<Post> findByHashtagsIn(List<String> hashtags);
}
