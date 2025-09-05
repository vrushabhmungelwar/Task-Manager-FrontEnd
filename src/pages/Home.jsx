import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
  Paper,
  Stack
} from "@mui/material";
import api from "../services/api";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await api.get("/tasks", { withCredentials: true });
    setTasks(res.data.tasks);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    await api.post("/tasks", { title: task }, { withCredentials: true });
    setTask("");
    getTasks();
  };

  const updateTask = async (id) => {
    await api.put(`/tasks/${id}`, {}, { withCredentials: true });
    getTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`, { withCredentials: true });
    getTasks();
  };

  const logoutHandler = async () => {
    await api.get("/users/logout", { withCredentials: true });
    window.location.reload();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={logoutHandler}>
          Logout
        </Button>
      </Box>

      <Typography variant="h4" align="center" gutterBottom>
        Your Tasks
      </Typography>

      <form onSubmit={addTask}>
        <Stack direction="row" spacing={2} mb={3}>
          <TextField
            label="New Task"
            fullWidth
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Stack>
      </form>

      {tasks.map((item) => (
        <Paper key={item._id} elevation={3} sx={{ mb: 2, p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox
                checked={item.isCompleted}
                onChange={() => updateTask(item._id)}
              />
              <Typography
                variant="body1"
                sx={{
                  textDecoration: item.isCompleted ? "line-through" : "none",
                }}
              >
                {item.title}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => deleteTask(item._id)}
            >
              Delete
            </Button>
          </Stack>
        </Paper>
      ))}
    </Container>
  );
};

export default Home;
