import React, { useEffect, useState, useContext } from "react";
import { getSavedPostIds } from "../api/bookmarkApi";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SavedPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const userId = user?.id || user?._id;
        console.log("Fetching saved posts for user:", userId);

        if (!userId) return;

        const savedIds = await getSavedPostIds(userId);
        const postResponses = await Promise.all(
          savedIds.map((id) =>
            axios.get(`http://localhost:8080/api/posts/${id}`)
          )
        );
        setPosts(postResponses.map((res) => res.data));
      } catch (err) {
        console.error("❌ Error fetching saved posts:", err.message);
      }
    };

    if (user) fetchSavedPosts();
  }, [user]);

  return (
    <div>
      <h2>Saved Posts</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <h4>{post.title}</h4>
            <img
              src={`http://localhost:8080${post.mediaUrls[0]}`}
              alt={post.title}
              width="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPosts;
