import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    profilePic: "/uploads/default.jpg",
    location: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left - Register Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #fffbd5, #b20a2c0f)",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "80%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              margin="normal"
            />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
          <Snackbar open={success} autoHideDuration={3000}>
            <Alert severity="success">Registration Successful!</Alert>
          </Snackbar>
        </Paper>
      </Box>

      {/* Right - Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url("https://cdn.pixabay.com/photo/2016/03/27/21/34/restaurant-1284351_1280.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
  
}

export default Register;
