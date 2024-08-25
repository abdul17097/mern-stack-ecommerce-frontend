import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://shopus-backend.vercel.app/",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  plugins: [react()],
});
