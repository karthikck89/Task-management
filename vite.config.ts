import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 3000
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("mc-")
        }
      }
    }),
    copy({
      targets: [
        {
          src: "node_modules/@maersk-global/icons/js/**/*",
          dest: "dist/assets/"
        }
      ],
      verbose: false,
      flatten: false,
      hook: "writeBundle" // After bundle has been written
    }),
    visualizer()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@tests": fileURLToPath(new URL("./tests", import.meta.url)),
      "@public": fileURLToPath(new URL("./public", import.meta.url)),
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
    mockReset: true,
    setupFiles: ["tests/unit/setup.ts"],
    coverage: {
      reporter: ["lcov", "text", "text-summary"],
      provider: "v8",
      enabled: true,
      all: true,
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      },
      extension: [".vue", ".ts", ".js"],
      exclude: [
        ...configDefaults.exclude,
        ".commitlintrc.ts",
        ".eslintrc.js",
        "vite.config.ts",
        "prettier.config.js",
        "mock-server",
        "coverage",
        "tests",
        "src/main.js",
        "src/store/index.ts",
        "src/types"
      ]
    },
    exclude: [...configDefaults.exclude, "tests/e2e"]
  }
});
