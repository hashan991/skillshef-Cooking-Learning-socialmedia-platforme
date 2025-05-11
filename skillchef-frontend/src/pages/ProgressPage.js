import React, { useEffect, useState, useContext } from "react";
import {
  getAllProgress,
  createProgress,
  updateProgress,
  deleteProgress,
} from "../services/progressService";

import ProgressForm from "../components/tashini/ProgressForm";
import ProgressList from "../components/tashini/ProgressList";
import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  TextField,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const ProgressPage = () => {
  const { user } = useContext(AuthContext);
  const [updates, setUpdates] = useState([]);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const closeToast = () => {
    setToast({ ...toast, open: false });
  };

  const loadProgress = async () => {
    try {
      const res = await getAllProgress();
      const allProgress = res.data;

      const userProgress = allProgress.filter((p) => p.userId === user?.id);
      setUpdates(userProgress);
    } catch (err) {
      showToast("Failed to load progress updates", "error");
    }
  };

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const handleCreate = async (formData) => {
    try {
      await createProgress(formData);
      showToast("Progress created successfully!");
      loadProgress();
    } catch (err) {
      showToast("Error creating progress", "error");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateProgress(editingUpdate.id, formData);
      setEditingUpdate(null);
      showToast("Progress updated successfully!");
      loadProgress();
    } catch (err) {
      showToast("Error updating progress", "error");
    }
  };

  const handleSubmit = (formData) => {
    if (editingUpdate) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
  };

  const handleEdit = (update) => {
    setEditingUpdate(update);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this update?"
    );
    if (!confirm) return;
    try {
      await deleteProgress(id);
      showToast("Progress deleted successfully!");
      loadProgress();
    } catch (err) {
      showToast("Error deleting progress", "error");
    }
  };

  const handleCancelEdit = () => {
    setEditingUpdate(null);
  };

  // 🔍 Filter updates by searchQuery (description)
  // 🔍 Filter updates by searchQuery (updateText)
  const filteredUpdates = updates.filter((update) =>
    (update.updateText || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 , mt:5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        📚 Learning Progress
      </Typography>

      <ProgressForm
        onSubmit={handleSubmit}
        editingData={editingUpdate}
        onCancel={handleCancelEdit}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={5}
        mb={2}
      >
        <Typography variant="h5">Your Updates</Typography>
        <TextField
          size="small"
          label="Search by Description"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <ProgressList
        updates={filteredUpdates}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity} onClose={closeToast} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProgressPage;
