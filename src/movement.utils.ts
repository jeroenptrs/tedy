export function lines(code: string): number {
  return code.split("\n").length;
}

export function lineLength(code: string, line: number): number {
  const codeLines = code.split("\n");

  if (line >= codeLines.length) throw new Error();

  const codeLine = code.split("\n")[line] as string;
  return codeLine.length;
}
