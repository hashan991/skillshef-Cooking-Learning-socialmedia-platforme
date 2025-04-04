import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { Container, Typography } from "@mui/material";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const handlePostDelete = (deletedId) => {
    setPosts((prev) => prev.filter((post) => post.id !== deletedId));
  };

  return (
    <>
       {/* ✅ Render navbar here if not in App.js */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          SkillChef Feed 🍳
        </Typography>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handlePostDelete} />
        ))}
      </Container>
    </>
  );
}

export default Home;
