export function parseInput(input: string): string {
  // handle newline
  if (input === "\r") {
    return "\n";
  }

  return input;
}

export function insert(codeLine: string, input: string, col: number): string {
  return [codeLine.slice(0, col), input, codeLine.slice(col)].join("");
}

export function extract(codeLine: string, col: number): string {
  return col > 0
    ? [codeLine.slice(0, col - 1), codeLine.slice(col)].join("")
    : codeLine;
}
