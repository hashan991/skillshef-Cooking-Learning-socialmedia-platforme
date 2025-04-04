import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
    profilePic: "",
  });

  const [file, setFile] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8080/api/users/${user.id}`).then((res) => {
        const data = res.data;
        setForm({
          username: data.username || "",
          email: data.email || "",
          bio: data.bio || "",
          location: data.location || "",
          profilePic: data.profilePic || "",
        });
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("bio", form.bio);
      formData.append("location", form.location);
      if (file) formData.append("file", file);

      const res = await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const updated = res.data;
      setForm({
        username: updated.username || "",
        email: updated.email || "",
        bio: updated.bio || "",
        location: updated.location || "",
        profilePic: updated.profilePic || "",
      });

      setToast({
        open: true,
        message: "Profile updated!",
        severity: "success",
      });
    } catch (err) {
      setToast({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${user.id}`);
        logout();
        navigate("/");
      } catch (err) {
        setToast({ open: true, message: "Delete failed", severity: "error" });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>

      <Stack spacing={2} alignItems="center">
        <Avatar
          src={`http://localhost:8080${form.profilePic}`}
          alt={form.username}
          sx={{ width: 100, height: 100 }}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </Stack>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <TextField label="Email" name="email" value={form.email} disabled />
        <TextField
          label="Bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
        />
        <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleUpdate}>
          Update Profile
        </Button>
        <Button color="error" onClick={handleDelete}>
          Delete Account
        </Button>
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default Profile;
