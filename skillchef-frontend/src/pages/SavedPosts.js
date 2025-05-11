import React, { useEffect, useState, useContext } from "react";
import { getSavedPostIds } from "../api/bookmarkApi";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Container,
} from "@mui/material";

function SavedPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const userId = user?.id || user?._id;
        if (!userId) return;

        const savedIds = await getSavedPostIds(userId);
        const postResults = await Promise.allSettled(
          savedIds.map((id) =>
            axios.get(`http://localhost:8080/api/posts/${id}`)
          )
        );

        const validPosts = postResults
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.data);

        setPosts(validPosts);
      } catch (err) {
        console.error("❌ Error fetching saved posts:", err.message);
      }
    };

    if (user) fetchSavedPosts();
  }, [user]);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        🔖 Saved Posts
      </Typography>

      {posts.length === 0 ? (
        <Typography>No saved posts found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardActionArea onClick={() => navigate(`/post/${post.id}`)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:8080${post.mediaUrls[0]}`}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {post.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default SavedPosts;
