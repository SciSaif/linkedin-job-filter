import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                // Entry points for your extension scripts
                background: "public/eventPage.js",
                content: "public/content.js",
                popup: "index.html",
            },
        },
    },
});
