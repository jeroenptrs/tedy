import { type Key } from "ink";
import { col, Cursor, cursor, row } from "./cursor.types";

export function lines(code: string): number {
  return code.split("\n").length;
}

export function lineLength(code: string, line: number): number {
  const codeLines = code.split("\n");

  if (line >= codeLines.length) throw new Error();

  const codeLine = code.split("\n")[line] as string;
  return codeLine.length;
}

export function moveToLineEnd(
  props: MovementProps,
  rowModifier = 0,
): MovementResult {
  const { virtualCursor, viewPort, codePosition, code, columns } = props;

  const codeLineLength = lineLength(code, row(codePosition) + rowModifier);
  const fitsInViewPort = codeLineLength < columns;

  const virtualCol = fitsInViewPort ? codeLineLength : columns - 1;
  const viewPortCol = fitsInViewPort
    ? col(viewPort)
    : codeLineLength - (columns - 1);

  return [
    cursor(row(virtualCursor), virtualCol),
    cursor(row(viewPort), viewPortCol),
    cursor(row(codePosition), codeLineLength),
  ];
}

function reduceKey(keys: Key) {
  const pressedKeys: Array<keyof Key> = [];

  for (const [key, pressed] of Object.entries(keys)) {
    if (pressed) {
      pressedKeys.push(key as keyof Key);
    }
  }

  return pressedKeys;
}

export type MovementResult = [Cursor, Cursor, Cursor];

export type MovementProps = {
  virtualCursor: Cursor;
  viewPort: Cursor;
  codePosition: Cursor;
  code: string;
  rows: number;
  columns: number;
  withMeta?: boolean;
};

export type MovementKey =
  | "upArrow"
  | "downArrow"
  | "leftArrow"
  | "rightArrow"
  | "ctrl+e" /* cmd+right */
  | "ctrl+a" /* cmd+left */
  | "meta+f" /* option+right */
  | "meta+b" /* option+left */;
export function parseMovement(ch: string, key: Key): MovementKey {
  const pressedKeys = reduceKey(key);

  if (pressedKeys.length === 1) {
    switch (pressedKeys[0]) {
      case "upArrow":
      case "downArrow":
      case "leftArrow":
      case "rightArrow":
        return pressedKeys[0];
      case "ctrl": {
        if (ch === "a" || ch === "e") {
          return `${pressedKeys[0]}+${ch}`;
        }

        break;
      }
      case "meta": {
        if (ch === "b" || ch === "f") {
          return `${pressedKeys[0]}+${ch}`;
        }

        break;
      }
      default:
        break;
    }
  }

  // If not matched, throw, but should get caught by assertErrors
  throw new Error("no valid key combination found"); // TODO: make custom error MovementError;
}
