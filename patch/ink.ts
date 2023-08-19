import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const paths = [
  resolve(process.cwd(), "node_modules/ink/package.json"),
  resolve(process.cwd(), "node_modules/ink-text-input/package.json"),
];

const options = { encoding: "utf-8" as const };
const target = `"type": "module",`;
const destination = `"type": "module",
  "main": "./build/index.js",
  "types": "./build/index.d.ts",`;

for (const path of paths) {
  const source = readFileSync(path, options);
  if (source.indexOf(target) && source.indexOf(destination) === -1) {
    writeFileSync(path, source.replace(target, destination), options);
  }
}
