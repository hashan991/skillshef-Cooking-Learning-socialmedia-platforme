import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import axios from "axios";

const UserLearningPlans = ({ userId }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/plans");
        const allPlans = res.data._embedded?.learningPlanList || [];

        const filtered = allPlans.filter((plan) => plan.userId === userId);
        setPlans(filtered);
      } catch (err) {
        console.error("❌ Error loading plans:", err);
      }
    };

    fetchPlans();
  }, [userId]);

  if (plans.length === 0) {
    return <Typography>No learning plans yet.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {plans.map((plan) => (
        <Paper key={plan.id} sx={{ p: 2 }}>
          <Typography variant="h6">{plan.title}</Typography>
          <Typography>{plan.description}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2">Steps:</Typography>
          <List dense>
            {plan.steps.map((step, i) => (
              <ListItem key={i}>
                {step.step} {step.completed ? "✅" : "❌"}
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Stack>
  );
};

export default UserLearningPlans;
