import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#ff7043" }}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            SkillChef 🍳
          </Typography>
          <Box>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/create">
                  Create Post
                </Button>
                <Button color="inherit" component={Link} to="/*">
                   Progress
                </Button>
                <Button color="inherit" component={Link} to="/*">
                   Plan 
                </Button>
                <Button color="inherit" component={Link} to="/account">
                  My Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
