import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          icons: ["iconsax-reactjs"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "@radix-ui/react-visually-hidden",
          ],
        },
      },
    },
  },
});