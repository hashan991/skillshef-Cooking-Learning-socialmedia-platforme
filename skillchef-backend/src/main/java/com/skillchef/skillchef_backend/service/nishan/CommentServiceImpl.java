package com.skillchef.skillchef_backend.service.nishan;

import com.skillchef.skillchef_backend.model.nishan.Comment;
import com.skillchef.skillchef_backend.model.hashan.Post;
import com.skillchef.skillchef_backend.repository.nishan.CommentRepository;
import com.skillchef.skillchef_backend.repository.hashan.PostRepository;
import com.skillchef.skillchef_backend.service.hashan.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Comment createComment(Comment comment) {
        Comment savedComment = commentRepository.save(comment);

        Post post = postRepository.findById(comment.getPostId()).orElse(null);
        if (post != null && !post.getUserId().equals(comment.getUserId())) {
            notificationService.createNotification(
                post.getUserId(),
                comment.getUserId(),
                comment.getUsername(),
                "COMMENT",
                comment.getUsername() + " commented on your post.",
                post.getId()
            );
        }

        return savedComment;
    }

    @Override
    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    @Override
    public Comment updateComment(String id, String newText) {
        return commentRepository.findById(id)
                .map(existing -> {
                    existing.setText(newText);
                    existing.setUpdatedAt(LocalDateTime.now());
                    return commentRepository.save(existing);
                }).orElse(null);
    }

    @Override
    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
