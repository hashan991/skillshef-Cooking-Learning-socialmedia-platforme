import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // ✅ Import AuthContext
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const LearningPlanForm = ({
  onSubmit,
  editingPlan,
  onCancel,
  resetTrigger,
}) => {
  const { user } = useContext(AuthContext); // ✅ Get logged-in user

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([{ step: "", completed: false }]);

  useEffect(() => {
    if (editingPlan) {
      setTitle(editingPlan.title);
      setDescription(editingPlan.description);
      setSteps(editingPlan.steps);
    }
  }, [editingPlan]);

  useEffect(() => {
    if (!editingPlan) {
      setTitle("");
      setDescription("");
      setSteps([{ step: "", completed: false }]);
    }
  }, [resetTrigger]);

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index].step = value;
    setSteps(updatedSteps);
  };

  const addStepField = () => {
    setSteps([...steps, { step: "", completed: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = {
      title,
      description,
      steps,
      userId: user?.id, // ✅ Auto-attach logged-in user's ID
    };
    onSubmit(planData);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        mb: 4,
        maxWidth: 600,
        mx: "auto",
        backgroundColor: "#fdfdfd",
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" mb={3} fontWeight={600}>
        {editingPlan ? "✏️ Edit Learning Plan" : "➕ Create Learning Plan"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Plan Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Plan Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            required
          />

          <Typography variant="subtitle1" fontWeight={500}>
            Steps
          </Typography>

          {steps.map((s, index) => (
            <TextField
              key={index}
              label={`Step ${index + 1}`}
              value={s.step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              fullWidth
              required
            />
          ))}

          <Button
            type="button"
            onClick={addStepField}
            startIcon={<AddIcon />}
            variant="outlined"
            sx={{ alignSelf: "flex-start" }}
          >
            Add Step
          </Button>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {editingPlan && (
              <Button
                type="button"
                onClick={onCancel}
                startIcon={<CancelIcon />}
                variant="outlined"
                color="warning"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              startIcon={<SaveIcon />}
              variant="contained"
              color="primary"
            >
              {editingPlan ? "Update" : "Create"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default LearningPlanForm;
