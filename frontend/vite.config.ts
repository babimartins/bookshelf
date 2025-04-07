/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { 
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
  test: { 
    globals: true, // Permite usar APIs do Vitest (describe, it, expect) globalmente sem importar
    environment: 'jsdom', // Define o ambiente de teste para simular o DOM
    setupFiles: ['./src/setupTests.ts'], // Caminho para o arquivo de setup (criaremos a seguir)
    css: true, // Habilita o processamento de CSS (útil se componentes importam CSS)
    // Opcional: Configuração de cobertura (pode ser ativada via CLI também)
    // coverage: {
    //   provider: 'v8', // ou 'istanbul'
    //   reporter: ['text', 'json', 'html'], // Formatos de relatório
    //   reportsDirectory: './coverage',
    //   include: ['src/**/*.{ts,tsx}'],
    //   exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/setupTests.ts', 'src/types/**', 'src/**/index.ts'], // Ajuste conforme necessário
    // },
  },
});