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
       if (!userId) return;

       const savedIds = await getSavedPostIds(userId);
       const postResults = await Promise.allSettled(
         savedIds.map((id) =>
           axios.get(`http://localhost:8080/api/posts/${id}`)
         )
       );

       // Filter out successful responses only
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
