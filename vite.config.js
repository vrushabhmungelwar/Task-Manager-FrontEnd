import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "task-manager-frontend-4f0m.onrender.com",
      "mycustomdomain.com",
    ],
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
