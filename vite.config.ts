import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
// todo setup the server in config

  const env = loadEnv(mode, __dirname);
 // Set production API URLs from environment variables or default to the original ones.
 const authApiUrl = env.VITE_AUTH_API_URL || "http://localhost:5000";
 const backendApiUrl = env.VITE_BACKEND_API_URL || "http://localhost:5003";


  return {
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      '/authApi': {
          target: authApiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/authApi/, ''),
        },
        '/backendApi': {
          target: backendApiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backendApi/, 'v1'),
        },
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:5174',
      //   ws: true,
      // },
    }
  }
}
})