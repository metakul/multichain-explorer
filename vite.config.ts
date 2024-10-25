import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
// todo setup the server in config

  const env = loadEnv(mode, __dirname);

  return {
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      '/authApi': {
        target: "http://172.29.208.149",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/authApi/, '')
      },
      '/backendApi': {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backendApi/, 'v1')
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