import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  //umd build
  optimizeDeps: { include: ["awesome-cron"] },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/awesome-cron/],
    },
  },
});
