import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'obfuscate',
      apply: 'build',
      //@ts-ignore
      async generateBundle(options, bundle) {
        for (const filename in bundle) {
          if (filename.endsWith('.js')) {
            const filePath = path.resolve(__dirname, 'dist', filename);
            if (fs.existsSync(filePath)) {
              // Check if file exists
              const code = fs.readFileSync(filePath, 'utf-8');
              const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                controlFlowFlattening: true,
                deadCodeInjection: true,
                // ... other obfuscation options
              }).getObfuscatedCode();
              fs.writeFileSync(filePath, obfuscatedCode);
            } else {
              console.warn(`[obfuscate] File not found: ${filePath}`); // Optional warning
            }
          }
        }
      },
    },
  ],
  base: '/kharcha/',
  build: {
    minify: 'terser', // Enable terser minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements
      },
      mangle: true, // Enable variable name mangling
    },
  },

  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, 'src/scss'),
      $interfaces: path.resolve(__dirname, 'src/interfaces'),
      $components: path.resolve(__dirname, 'src/components'),
      $pages: path.resolve(__dirname, 'src/pages'),
      $constants: path.resolve(__dirname, 'src/constants'),
      $hooks: path.resolve(__dirname, 'src/hooks'),
      $context: path.resolve(__dirname, 'src/context'),
      $routes: path.resolve(__dirname, 'src/routes'),
    },
  },
});
// @ts-ignore
function obfuscatorPlugin(arg0: {
  global: boolean; // Obfuscate all JS files
  compact: boolean; // Remove whitespace
  controlFlowFlattening: boolean; // Harder to reverse-engineer
  deadCodeInjection: boolean; // Adds fake code to confuse attackers
  stringArray: boolean; // Encodes strings into arrays
  debugProtection: boolean;
}): import('vite').PluginOption {
  throw new Error('Function not implemented.');
}
