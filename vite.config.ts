import { defineConfig } from "vite";
import mix from "vite-plugin-mix";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import obfuscator from "rollup-plugin-obfuscator";

export default defineConfig({
  preview: {
    host: "0.0.0.0",
  },
  server: {
    host: "0.0.0.0",
    hmr: false,
  },
  plugins: [
    mix({
      handler: "./api/main.ts",
    }),
    Pages(),
    react(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        obfuscator({
          fileOptions: {},
          globalOptions: {},
        }),
      ],
    },
  },
});
