import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + err.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form
        onSubmit={register}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
