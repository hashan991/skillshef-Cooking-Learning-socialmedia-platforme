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
import FollowersModal from "../components/FollowersModal"; // ✅ Import modal

function MyAccount() {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // userId in the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

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

    if (user) fetchProfile();
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

        {/* 👉 Follower/Following Count */}
        <Stack direction="row" spacing={4} justifyContent="center">
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => setShowFollowers(true)}
          >
            <strong>{profile.followerCount}</strong> followers
          </Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => setShowFollowing(true)}
          >
            <strong>{profile.followingCount}</strong> following
          </Typography>
        </Stack>

        {/* 👉 Follow / Unfollow */}
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

        {/* 👉 Manage My Account */}
        {isOwnProfile && (
          <Box mt={2}>
            <Button variant="outlined" onClick={() => navigate("/profile")}>
              Manage My Account
            </Button>
          </Box>
        )}
      </Stack>

      {/* 👇 Followers/Following Modal */}
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
    </Container>
  );
}

export default MyAccount;
