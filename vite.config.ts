import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-polyfill-node";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default () => {
  return defineConfig({
    build: {
      outDir: "./build",
    },
    plugins: [
      react({
        include: "**/*.tsx",
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
      { ...polyfillNode(), enforce: "post" },
    ],
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    resolve: {
      alias: {
        path: "rollup-plugin-node-polyfills/polyfills/path",
        fs: "rollup-plugin-node-polyfills/polyfills/fs",
        os: "rollup-plugin-node-polyfills/polyfills/os",
        Buffer: "rollup-plugin-node-polyfills/polyfills/buffer",
        src: path.resolve("src/"),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://test.woowow.io/',
          // target: 'http://localhost:3000/',
          changeOrigin: true, 
        }
      }
    },
  });
};
