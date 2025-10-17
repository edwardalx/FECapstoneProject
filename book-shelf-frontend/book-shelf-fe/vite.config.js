import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5093',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // keeps the /api prefix
      },
    },
  },
});
