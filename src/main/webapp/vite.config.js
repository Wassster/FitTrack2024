/* eslint-disable import/no-extraneous-dependencies */
// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Fittrack/",
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
