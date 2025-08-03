import api from "../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function TaskItem({ task, onUpdated }) {
  const toggle = async () => {
    await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    onUpdated();
  };

  const remove = async () => {
    await api.delete(`/tasks/${task._id}`);
    onUpdated();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        marginTop: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <input type="checkbox" checked={task.completed} onChange={toggle} />

      <span
        style={{
          marginLeft: "10px",
          flexGrow: 1,
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>

      <IconButton onClick={remove}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default TaskItem;
