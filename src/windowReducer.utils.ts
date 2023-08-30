export function parseInput(input: string): string {
  // handle newline
  if (input === "\r") {
    return "\n";
  }

  return input;
}
