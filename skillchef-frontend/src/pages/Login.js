import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        form
      );

      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      login && login(user);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(to bottom right, #fffbd5, #b20a2c0f)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: 400,
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Manage Your Home <br /> Effortlessly
          </Typography>
          <Typography variant="body2" align="center" mb={2}>
            Log in to your account
          </Typography>

          {/* Email/Password Login */}
          <form onSubmit={handleSubmit}>
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
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2, mb: 1 }}
            >
              LOG IN
            </Button>

            <Box display="flex" alignItems="center" mb={1}>
              <input
                type="checkbox"
                id="keepLoggedIn"
                style={{ marginRight: 8 }}
              />
              <label htmlFor="keepLoggedIn">Keep me logged in</label>
            </Box>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>or</Divider>

          {/* Google Login Button */}
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleGoogleLogin}
            sx={{ mb: 2 }}
          >
            Continue with Google
          </Button>

          <Typography variant="body2" align="center">
            Don’t have an account?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            BACK TO HOME
          </Button>

          {/* Error Toast */}
          <Snackbar
            open={!!error}
            autoHideDuration={3000}
            onClose={() => setError(null)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        </Box>
      </Box>

      {/* Right Side - Background Image */}
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

export default Login;
