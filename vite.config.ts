import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * 
 * Simple setup for plain React project.
 * Uses plugin-react to handle JSX and Fast Refresh.
 */
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true
    }
});
