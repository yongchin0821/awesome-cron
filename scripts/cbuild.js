import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// 使用vite打包
import { build, defineConfig } from "vite";

// 用到的插件
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
// import DefineOptions from "unplugin-vue-define-options/vite";

// 根目录
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../");

// 打包后的目录
const outDir = resolve("./dist");

const baseConfig = defineConfig({
  plugins: [
    vue(),
    // DefineOptions(),
    dts({
      include: ["cronstrue"],
      outputDir: path.resolve(outDir, "types"),
    }),
  ],
  build: {
    lib: {
      entry: resolve("./src/components/index.ts"),
      name: "cronparser",
      fileName: (format) => `index.${format}.js`,
    },
    outDir,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

main();

async function main() {
  // build
  await build(baseConfig);

  await copyFiles();
}

async function copyFiles() {
  // fs.copyFileSync(
  //   resolve('packages/vangle/package.json'),
  //   resolve('packages/vangle/dist/package.json')
  // )
  fs.copyFileSync(resolve("README.md"), resolve("./dist/README.md"));
}

function resolve(...urlOrUrls) {
  return path.resolve(rootDir, ...urlOrUrls);
}
