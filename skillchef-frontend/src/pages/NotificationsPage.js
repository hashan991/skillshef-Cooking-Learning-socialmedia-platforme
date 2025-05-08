import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";

function NotificationPage() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get userId from route state or fallback to logged-in user
  const userId = location.state?.userId || user?._id || user?.id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications");

        // Filter: show only notifications for this user
        const filtered = res.data.filter((n) => n.recipientUserId === userId);
        setNotifications(filtered);
      } catch (err) {
        console.error("Error fetching notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  if (loading) {
    return (
      <Box p={3}>
        <Typography variant="h6">Loading notifications...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        🔔 Your Notifications
      </Typography>
      
      <List>
        {notifications.length === 0 ? (
          <Typography>No notifications found.</Typography>
        ) : (
          notifications.map((n) => (
            <React.Fragment key={n._id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={n.message}
                  secondary={`By ${n.senderUsername} at ${new Date(
                    n.timestamp
                  ).toLocaleString()}`}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  );
}

export default NotificationPage;
