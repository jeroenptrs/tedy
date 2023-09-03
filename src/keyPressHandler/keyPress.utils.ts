import { type Key } from "ink";
import { col, Cursor, cursor, row } from "../cursor.types";

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
  props: KeyPressProps,
  rowModifier = 0,
): KeyPressResult {
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
    code,
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

// TODO: expand KeyPressResult to have a 4th return arg - code: string;
export type KeyPressResult = [Cursor, Cursor, Cursor, string];

export type KeyPressProps = {
  virtualCursor: Cursor;
  viewPort: Cursor;
  codePosition: Cursor;
  code: string;
  rows: number;
  columns: number;
  withMeta?: boolean;
};

export type KeyPress =
  | "backspace"
  | "upArrow"
  | "downArrow"
  | "leftArrow"
  | "rightArrow"
  | "pageUp" /* fn+cmd+upArrow */
  | "pageDown" /* fn+cmd+downArrow */
  | "ctrl+e" /* cmd+right */
  | "ctrl+a" /* cmd+left */
  | "meta+upArrow" /* option+right */
  | "meta+downArrow" /* option+right */
  | "meta+f" /* option+right */
  | "meta+b" /* option+left */;
export function parseKeyPress(ch: string, key: Key): KeyPress {
  const pressedKeys = reduceKey(key);

  if (pressedKeys.length === 1) {
    switch (pressedKeys[0]) {
      case "backspace":
      case "upArrow":
      case "downArrow":
      case "leftArrow":
      case "rightArrow":
      case "pageUp":
      case "pageDown":
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
  } else if (pressedKeys.length === 2) {
    switch (pressedKeys[0]) {
      case "upArrow":
      case "downArrow": {
        if (pressedKeys[1] === "meta") {
          return `${pressedKeys[1]}+${pressedKeys[0]}`;
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
