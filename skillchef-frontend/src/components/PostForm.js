import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Import context
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const { user } = useContext(AuthContext); // ✅ Get user from context
   const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    hashtags: "",
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("difficulty", form.difficulty);
    formData.append("hashtags", form.hashtags);
    formData.append("userId", user?.id); // ✅ Dynamically set userId

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post("http://localhost:8080/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post created successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        category: "",
        difficulty: "",
        hashtags: "",
        userId: "user123",
      });
      setFiles([]);
       navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error creating post.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create a New Cooking Post 🍽️
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="#Hashtags (comma separated)"
          name="hashtags"
          value={form.hashtags}
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
          <TextField
            label="Difficulty"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          />
        </Stack>

        <Button variant="outlined" component="label">
          Upload Images (max 3)
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        {files.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            {files.length} file(s) selected
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary">
          Submit Post
        </Button>
      </Box>
    </Container>
  );
}

export default PostForm;
