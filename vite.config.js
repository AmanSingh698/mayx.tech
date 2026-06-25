import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],

  server: {
    host: true,
    port: 5173,
    open: true
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/_variables.scss";`,
        silenceDeprecations: ['import', 'global-builtin']
      }
    }
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1500
  }
});