import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, '..');
  const env = { ...loadEnv(mode, rootDir, ''), ...loadEnv(mode, process.cwd(), '') };
  const targetPort = env.PORT || env.SERVER_PORT || '5000';
  const targetUrl =
    env.VITE_API_URL ||
    env.BACKEND_URL ||
    (env.VITE_API_BASE_URL ? env.VITE_API_BASE_URL.replace(/\/api\/?$/, '') : '') ||
    'https://visual-mind-3d.onrender.com';

  return {
    envDir: rootDir,
    plugins: [react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || env.SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''),
    },
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

