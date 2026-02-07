import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Multi-page build (index + legal pages)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        avisoLegal: resolve(__dirname, "aviso-legal.html"),
        privacidad: resolve(__dirname, "privacidad.html"),
        cookies: resolve(__dirname, "cookies.html"),
      },
    },
  },
});
