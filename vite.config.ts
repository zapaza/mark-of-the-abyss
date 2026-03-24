import {defineConfig} from 'vite';
import eslint from 'vite-plugin-eslint2';


export default defineConfig(({mode}) => {
  const isDev = mode !== 'production';

  return {
    plugins: [
      eslint(),
    ],
    resolve: {
      // 3. Добавьте эту опцию
      tsconfigPaths: true,
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      sourcemap: isDev,
      assetsInlineLimit: 4096,
    },
    server: {
      port: 3000,
      open: true,
      host: true,
    },
    define: {
      __IS_DEBUG__: isDev,
    },
  };
});