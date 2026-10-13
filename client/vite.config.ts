import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, '..');
  const env = { ...loadEnv(mode, rootDir, ''), ...loadEnv(mode, process.cwd(), '') };
  const targetPort = env.PORT || env.SERVER_PORT || '5000';
  const targetUrl = env.VITE_API_URL || env.BACKEND_URL || `http://localhost:${targetPort}`;

  return {
    envDir: rootDir,
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api': {
          target: targetUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});

