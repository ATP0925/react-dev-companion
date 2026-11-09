import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Aponta a biblioteca diretamente para o código fonte TypeScript na raiz
      '@kickd0wn/react-dev-companion': path.resolve(__dirname, '../src/index.ts'),
      // Garante que ambos usem exatamente a mesma instância do React
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
});