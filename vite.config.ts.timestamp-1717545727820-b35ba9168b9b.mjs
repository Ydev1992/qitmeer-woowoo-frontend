// vite.config.ts
import { NodeGlobalsPolyfillPlugin } from "file:///D:/AAAA/Clockman7_Qitmeer/qitmeer-woowoo-frontend/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
import { NodeModulesPolyfillPlugin } from "file:///D:/AAAA/Clockman7_Qitmeer/qitmeer-woowoo-frontend/node_modules/@esbuild-plugins/node-modules-polyfill/dist/index.js";
import react from "file:///D:/AAAA/Clockman7_Qitmeer/qitmeer-woowoo-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import polyfillNode from "file:///D:/AAAA/Clockman7_Qitmeer/qitmeer-woowoo-frontend/node_modules/rollup-plugin-polyfill-node/dist/index.js";
import { defineConfig } from "file:///D:/AAAA/Clockman7_Qitmeer/qitmeer-woowoo-frontend/node_modules/vite/dist/node/index.js";
import svgrPlugin from "file:///D:/AAAA/Clockman7_Qitmeer/qitmeer-woowoo-frontend/node_modules/vite-plugin-svgr/dist/index.js";
import viteTsconfigPaths from "file:///D:/AAAA/Clockman7_Qitmeer/qitmeer-woowoo-frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
import path from "path";
var vite_config_default = () => {
  return defineConfig({
    build: {
      outDir: "./build"
    },
    plugins: [
      react({
        include: "**/*.tsx"
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
      { ...polyfillNode(), enforce: "post" }
    ],
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis"
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
          }),
          NodeModulesPolyfillPlugin()
        ]
      }
    },
    resolve: {
      alias: {
        path: "rollup-plugin-node-polyfills/polyfills/path",
        fs: "rollup-plugin-node-polyfills/polyfills/fs",
        os: "rollup-plugin-node-polyfills/polyfills/os",
        Buffer: "rollup-plugin-node-polyfills/polyfills/buffer",
        src: path.resolve("src/")
      }
    },
    server: {
      proxy: {
        "/api": {
          // target: 'https://test.woowow.io/',
          target: "http://localhost:3000/",
          changeOrigin: true
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBQUFBXFxcXENsb2NrbWFuN19RaXRtZWVyXFxcXHFpdG1lZXItd29vd29vLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxBQUFBXFxcXENsb2NrbWFuN19RaXRtZWVyXFxcXHFpdG1lZXItd29vd29vLWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9BQUFBL0Nsb2NrbWFuN19RaXRtZWVyL3FpdG1lZXItd29vd29vLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgTm9kZUdsb2JhbHNQb2x5ZmlsbFBsdWdpbiB9IGZyb20gXCJAZXNidWlsZC1wbHVnaW5zL25vZGUtZ2xvYmFscy1wb2x5ZmlsbFwiO1xyXG5pbXBvcnQgeyBOb2RlTW9kdWxlc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSBcIkBlc2J1aWxkLXBsdWdpbnMvbm9kZS1tb2R1bGVzLXBvbHlmaWxsXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHBvbHlmaWxsTm9kZSBmcm9tIFwicm9sbHVwLXBsdWdpbi1wb2x5ZmlsbC1ub2RlXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBzdmdyUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XHJcbmltcG9ydCB2aXRlVHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiBcIi4vYnVpbGRcIixcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KHtcclxuICAgICAgICBpbmNsdWRlOiBcIioqLyoudHN4XCIsXHJcbiAgICAgIH0pLFxyXG4gICAgICB2aXRlVHNjb25maWdQYXRocygpLFxyXG4gICAgICBzdmdyUGx1Z2luKCksXHJcbiAgICAgIHsgLi4ucG9seWZpbGxOb2RlKCksIGVuZm9yY2U6IFwicG9zdFwiIH0sXHJcbiAgICBdLFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGVzYnVpbGRPcHRpb25zOiB7XHJcbiAgICAgICAgLy8gTm9kZS5qcyBnbG9iYWwgdG8gYnJvd3NlciBnbG9iYWxUaGlzXHJcbiAgICAgICAgZGVmaW5lOiB7XHJcbiAgICAgICAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gRW5hYmxlIGVzYnVpbGQgcG9seWZpbGwgcGx1Z2luc1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIE5vZGVHbG9iYWxzUG9seWZpbGxQbHVnaW4oe1xyXG4gICAgICAgICAgICBwcm9jZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBidWZmZXI6IHRydWUsXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIE5vZGVNb2R1bGVzUG9seWZpbGxQbHVnaW4oKSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBwYXRoOiBcInJvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3BhdGhcIixcclxuICAgICAgICBmczogXCJyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9mc1wiLFxyXG4gICAgICAgIG9zOiBcInJvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL29zXCIsXHJcbiAgICAgICAgQnVmZmVyOiBcInJvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL2J1ZmZlclwiLFxyXG4gICAgICAgIHNyYzogcGF0aC5yZXNvbHZlKFwic3JjL1wiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2FwaSc6IHtcclxuICAgICAgICAgIC8vIHRhcmdldDogJ2h0dHBzOi8vdGVzdC53b293b3cuaW8vJyxcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8nLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlUsU0FBUyxpQ0FBaUM7QUFDdlgsU0FBUyxpQ0FBaUM7QUFDMUMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sdUJBQXVCO0FBQzlCLE9BQU8sVUFBVTtBQUVqQixJQUFPLHNCQUFRLE1BQU07QUFDbkIsU0FBTyxhQUFhO0FBQUEsSUFDbEIsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxRQUNKLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFBQSxNQUNELGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLEVBQUUsR0FBRyxhQUFhLEdBQUcsU0FBUyxPQUFPO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLGdCQUFnQjtBQUFBO0FBQUEsUUFFZCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsUUFDVjtBQUFBO0FBQUEsUUFFQSxTQUFTO0FBQUEsVUFDUCwwQkFBMEI7QUFBQSxZQUN4QixTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDVixDQUFDO0FBQUEsVUFDRCwwQkFBMEI7QUFBQSxRQUM1QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixLQUFLLEtBQUssUUFBUSxNQUFNO0FBQUEsTUFDMUI7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUE7QUFBQSxVQUVOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
