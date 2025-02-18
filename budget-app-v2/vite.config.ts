import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@scss':path.resolve(__dirname,'src/scss'),
      '$interfaces':path.resolve(__dirname, 'src/interfaces'),
      '$components':path.resolve(__dirname, 'src/components'),
      '$pages':path.resolve(__dirname, 'src/pages'),
      '$constants':path.resolve(__dirname,'src/constants')
    }
  }
})
