import { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function TaskPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2>Your Tasks</h2>

      <TaskForm onTaskCreated={fetchTasks} />
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdated={fetchTasks} />
      ))}
    </div>
  );
}

export default TaskPage;
