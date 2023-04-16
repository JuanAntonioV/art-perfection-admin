import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@utils': '/src/utils',
            '@styles': '/src/styles',
            '@assets': '/src/assets',
            '@hooks': '/src/hooks',
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    build: {
        chunkSizeWarningLimit: 1600,
    },
});
