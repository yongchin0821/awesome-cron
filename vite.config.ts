import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //umd build
  optimizeDeps: { include: ["cronstrue"] },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/cronstrue/, /node_modules/],
    },
  },
});
