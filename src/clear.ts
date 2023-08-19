import readline from "node:readline";

const { stdout } = process;

export function clear() {
  readline.cursorTo(stdout, 0, 0);
  readline.clearScreenDown(stdout);
}

clear();
