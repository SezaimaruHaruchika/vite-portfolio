import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // エディタ外（別プロセス）からのファイル書き換えも確実に検知して
      // ホットリロードさせるため、イベント監視ではなくポーリングにする
      usePolling: true,
      interval: 300,
    },
  },
})
