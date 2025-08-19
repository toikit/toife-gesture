import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ToifeGesture',
      fileName: (format) => `index.${format}.js`,
    }
  }
});
