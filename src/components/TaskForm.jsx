import { useState } from "react";
import api from "../services/api";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");

  const createTask = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title, completed: false });
    setTitle("");
    onTaskCreated();
  };

  return (
    <form onSubmit={createTask}>
      <input
        style={{ width: "83%" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="  New Task"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
