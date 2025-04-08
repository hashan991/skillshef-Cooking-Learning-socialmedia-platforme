import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Stack,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FollowersModal from "../components/FollowersModal";

function MyAccount() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [selectedView, setSelectedView] = useState("POSTS");

  const navigate = useNavigate();
  const isOwnProfile = !id || id === user?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${id || user.id}`
        );
        setProfile(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch profile:", err.message);
        alert("Failed to load profile.");
      }
    };

    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/posts/user/${id || user.id}`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch user posts:", err.message);
      }
    };

    if (user) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [id, user]);

  const isFollowing = profile?.followers?.includes(user?.id);

  const handleFollowToggle = async () => {
    if (!user || !profile) return;
    try {
      setLoading(true);
      const url = `http://localhost:8080/api/users/${user.id}/${
        isFollowing ? "unfollow" : "follow"
      }/${profile.id}`;
      await axios.put(url);
      const updated = await axios.get(
        `http://localhost:8080/api/users/${profile.id}`
      );
      setProfile(updated.data);
    } catch (err) {
      console.error("Follow/unfollow error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack alignItems="center" spacing={2}>
        <Avatar
          src={`http://localhost:8080${profile.profilePic}`}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h5">{profile.username}</Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.email}
        </Typography>
        <Typography>{profile.bio}</Typography>
        <Typography color="text.secondary">{profile.location}</Typography>

        <Stack direction="row" spacing={4} justifyContent="center">
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => setShowFollowers(true)}
          >
            <strong>{profile.followers?.length || 0}</strong> followers
          </Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => setShowFollowing(true)}
          >
            <strong>{profile.following?.length || 0}</strong> following
          </Typography>
        </Stack>

        {!isOwnProfile && (
          <Box mt={2}>
            <Button
              variant="contained"
              color={isFollowing ? "error" : "primary"}
              onClick={handleFollowToggle}
              disabled={loading}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        )}

        {isOwnProfile && (
          <Box mt={2}>
            <Button variant="outlined" onClick={() => navigate("/profile")}>
              Manage My Account
            </Button>
          </Box>
        )}
      </Stack>

      {/* Followers/Following Modal */}
      <FollowersModal
        open={showFollowers}
        onClose={() => setShowFollowers(false)}
        userIds={profile.followers}
        title="Followers"
      />
      <FollowersModal
        open={showFollowing}
        onClose={() => setShowFollowing(false)}
        userIds={profile.following}
        title="Following"
      />

      {/* Toggle buttons for views */}
      <Box mt={5}>
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <Button
            variant={selectedView === "POSTS" ? "contained" : "outlined"}
            onClick={() => setSelectedView("POSTS")}
          >
            Posts
          </Button>
          <Button
            variant={selectedView === "PROGRESS" ? "contained" : "outlined"}
            onClick={() => setSelectedView("PROGRESS")}
          >
            Learning Progress Updates
          </Button>
          <Button
            variant={selectedView === "PLAN" ? "contained" : "outlined"}
            onClick={() => setSelectedView("PLAN")}
          >
            Learning Plan Sharing
          </Button>
        </Stack>

        <Typography variant="h6" gutterBottom>
          {selectedView === "POSTS"
            ? "Posts"
            : selectedView === "PROGRESS"
            ? "Learning Progress"
            : "Learning Plan Sharing"}
        </Typography>

        {/* ✅ Show post thumbnails only if POSTS is selected */}
        {selectedView === "POSTS" && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 2,
            }}
          >
            {posts.length > 0 ? (
              posts
                .filter((post) => {
                  return true; // Can add filtering by post.category if needed
                })
                .map((post) =>
                  post.mediaUrls?.[0] ? (
                    <img
                      key={post.id}
                      src={`http://localhost:8080${post.mediaUrls[0]}`}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/post/${post.id}`)}
                    />
                  ) : null
                )
            ) : (
              <Typography color="text.secondary">No posts to show.</Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default MyAccount;
