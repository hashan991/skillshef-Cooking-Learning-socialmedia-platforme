import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Stack,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyAccount() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8080/api/users/${user.id}`).then((res) => {
        setProfile(res.data);
      });
    }
  }, [user]);

  if (!profile) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack alignItems="center" spacing={2}>
        <Avatar
          src={`http://localhost:8080${profile.profilePic}`}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h5">{profile.username}</Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.email}
        </Typography>
        <Typography>{profile.bio}</Typography>
        <Typography color="text.secondary">{profile.location}</Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/profile")}
          >
            Manage My Account
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default MyAccount;
