import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000"  
      },
      "/bills": {
        target: "http://localhost:3000"  
      },
      "/updateDB": {
        target: "http://localhost:3000"  
      },
      "/profile": {
        target: "http://localhost:3000"  
      }
    }
  }
})
