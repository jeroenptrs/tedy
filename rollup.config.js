import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";
import { cleandir } from "rollup-plugin-cleandir";

// From ink
const externals = [
  "chalk",
  "react-reconciler",
  "react-devtools-core",
  "yoga-wasm-web/auto",
];

export default defineConfig({
  external: [
    ...externals,
    "react",
  ],
  input: "src/index.tsx",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    cleandir(),
    typescript(),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    terser(),
  ],
});
