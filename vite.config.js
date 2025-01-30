import {
  resolve
} from 'path';
import {
  defineConfig
} from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/core/moni.ts'),
      name: 'moniJs',
      fileName: (format) => `moni.${format}.js`,
      formats: ['umd', 'es'], 
    },
    rollupOptions: {
      output: {
        globals: {},  
      },
    },
    terserOptions: {
      compress: true,  
    },
    minify: 'terser', 
  },
});