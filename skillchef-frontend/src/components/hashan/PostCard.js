import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Avatar,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { savePost, unsavePost, getSavedPostIds } from "../../api/bookmarkApi";

function PostCard({ post, onDelete }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [postUser, setPostUser] = useState(null);
  const [shareToast, setShareToast] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (post.userId) {
      axios
        .get(`http://localhost:8080/api/users/${post.userId}`)
        .then((res) => setPostUser(res.data))
        .catch((err) => console.error("Failed to fetch user", err));
    }

    const fetchBookmarkStatus = async () => {
      try {
        if (user) {
          const savedIds = await getSavedPostIds(user?.id || user?._id);
          setIsBookmarked(savedIds.includes(post.id));
        }
      } catch (err) {
        console.error("Error fetching bookmark status:", err);
      }
    };

    fetchBookmarkStatus();
  }, [post.userId, post.id, user]);

  const handleEdit = () => {
    navigate(`/edit-post/${post.id}`, { state: { post } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${post.id}`);
      onDelete(post.id);
      setToastOpen(true);
      navigate("/home");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: "Check out this recipe on SkillChef!",
          url: postUrl,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(postUrl);
      setShareToast(true);
    }
  };

  const toggleBookmark = async () => {
    try {
      const userId = user?.id || user?._id;
      if (isBookmarked) {
        await unsavePost(userId, post.id);
        setIsBookmarked(false);
      } else {
        await savePost(userId, post.id);
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Bookmark toggle failed:", err);
    }
  };

  const imageUrls = post.mediaUrls?.map((url) => `http://localhost:8080${url}`);

  // 💡 Calculate width based on image count
  const getImageWidth = (count) => {
    if (count === 1) return "100%";
    if (count === 2) return "calc(50% - 6px)";
    if (count >= 3) return "calc(33.33% - 6px)";
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 600,
          margin: "20px auto",
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          pt={2}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/account/${post.userId}`)}
          >
            <Avatar
              src={`http://localhost:8080${postUser?.profilePic}`}
              alt={postUser?.username}
            />
            <Typography variant="subtitle2" fontWeight={600}>
              {postUser?.username}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {user?.id === post.userId && (
              <>
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setConfirmOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}

            <Tooltip title={isBookmarked ? "Unsave post" : "Save post"}>
              <IconButton onClick={toggleBookmark}>
                {isBookmarked ? (
                  <BookmarkIcon color="primary" />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Share this post">
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* 🖼 Image Grid */}
        {imageUrls?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 1,
              px: 1,
              justifyContent: imageUrls.length === 1 ? "center" : "flex-start",
            }}
          >
            {imageUrls.map((url, index) => (
              <Box
                key={index}
                component="img"
                src={url}
                alt={`Image ${index + 1}`}
                sx={{
                  width: getImageWidth(imageUrls.length),
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            ))}
          </Box>
        )}

        <CardContent>
          <Typography variant="h6">{post.title}</Typography>

          {post.difficulty && (
            <Chip
              label={post.difficulty}
              color="secondary"
              size="small"
              sx={{ mt: 1 }}
            />
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {post.description}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {post.hashtags?.map((tag, index) => (
              <Chip
                key={index}
                label={`#${tag}`}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </CardContent>

        <Button
          variant="text"
          size="small"
          onClick={() => navigate(`/post/${post.id}`)}
          sx={{ mt: 2 }}
        >
          💬 View Comments
        </Button>
      </Card>

      {/* ❌ Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Post Deleted Snackbar */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
        >
          Post deleted successfully!
        </Alert>
      </Snackbar>

      {/* 🔗 Link Copied Snackbar */}
      <Snackbar
        open={shareToast}
        autoHideDuration={3000}
        onClose={() => setShareToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShareToast(false)}
          severity="info"
          variant="filled"
        >
          Post link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PostCard;
