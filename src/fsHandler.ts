import { assertErrorsOnce } from "@jeroenpeeters/assert-errors";
import { lstatSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as process from "node:process";

export default function fsInputHandler(): [string, string] {
  const cwd = process.cwd();
  const [, , path] = process.argv;

  if (!path) {
    // TODO: if no file name, ask for one on saving instead, to create it.
    console.error("Please add a file name");
    process.exit(1);
  }

  const location = resolve(cwd, path);
  const [pathInfo, doesNotExist] = assertErrorsOnce(Error, lstatSync, location);

  if (doesNotExist) {
    return ["\n", location];
  }

  if (pathInfo?.isDirectory()) {
    // TODO: create multi file view, opening dirs too!
    console.log("Please point to a file, not a directory");
    process.exit(1);
  }

  return [readFileSync(location, { encoding: "utf-8" }), location];
}

export function saveFile(location: string, code: string): void {
  return writeFileSync(location, code, { encoding: "utf-8" });
}
