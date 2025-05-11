import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Snackbar,
  Alert,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function PostForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    hashtags: "",
  });

  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 3) {
      setToast({
        open: true,
        message: "You can only upload a maximum of 3 images.",
        severity: "error",
      });
      return;
    }

    const validImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImages.length !== selectedFiles.length) {
      setToast({
        open: true,
        message: "Only image files are allowed.",
        severity: "error",
      });
      return;
    }

    const previews = validImages.map((file) => URL.createObjectURL(file));
    setPreviewURLs((prev) => [...prev, ...previews]);
    setFiles((prev) => [...prev, ...validImages]);
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previewURLs];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFiles(updatedFiles);
    setPreviewURLs(updatedPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (form.hashtags && !/^#[a-zA-Z0-9_, ]*$/.test(form.hashtags)) {
      newErrors.hashtags = "Hashtags must be comma-separated and start with #";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("difficulty", form.difficulty);
    formData.append("hashtags", form.hashtags);
    formData.append("userId", user?.id || user?._id);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post("http://localhost:8080/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setToast({
        open: true,
        message: "Post created successfully!",
        severity: "success",
      });

      setForm({
        title: "",
        description: "",
        category: "",
        difficulty: "",
        hashtags: "",
      });
      setFiles([]);
      setPreviewURLs([]);

      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: "Error creating post",
        severity: "error",
      });
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
          error={!!errors.title}
          helperText={errors.title}
          required
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          required
        />
        <TextField
          label="#Hashtags (comma separated)"
          name="hashtags"
          value={form.hashtags}
          onChange={handleChange}
          error={!!errors.hashtags}
          helperText={errors.hashtags || "Example: #spicy, #seafood"}
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

        {previewURLs.length > 0 && (
          <Grid container spacing={1}>
            {previewURLs.map((url, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  component="img"
                  src={url}
                  alt={`Preview ${index}`}
                  sx={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 1,
                    position: "relative",
                  }}
                />
                <IconButton
                  onClick={() => removeImage(index)}
                  size="small"
                  sx={{ position: "absolute", top: 4, right: 4 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )}

        <Button type="submit" variant="contained" color="primary">
          Submit Post
        </Button>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PostForm;
