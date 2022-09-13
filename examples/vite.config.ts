import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //umd build
  optimizeDeps: { include: ["awesome-cron", "cronstrue"] },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/, /awesome-cron/, /cronstrue/],
    },
  },
});
