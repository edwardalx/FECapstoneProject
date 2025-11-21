import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: false,
    proxy: {
      "/api": {
        target: "https://localhost:5002",
        changeOrigin: true,
        secure: false, // ⬅️ allow self-signed HTTPS
      },
    },
  },
});