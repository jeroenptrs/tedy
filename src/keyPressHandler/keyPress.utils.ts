import { type Key } from "ink";
import { col, Cursor, cursor, row } from "../cursor.types";
import { bodyWidth } from "../view.utils";

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
  const newCodePosition = cursor(row(codePosition), codeLineLength);
  const fitsInViewPort = codeLineLength < columns;
  
  // TODO: If buggy, remove and just force viewport to go to 0.
  const isInViewPort = fitsInViewPort && col(viewPort) <= codeLineLength - 1;

  const virtualCol = isInViewPort
    ? codeLineLength - col(viewPort)
    : fitsInViewPort
    ? codeLineLength
    : bodyWidth(columns);
  const viewPortCol = isInViewPort
    ? col(viewPort)
    : fitsInViewPort
    ? 0
    : codeLineLength - bodyWidth(columns);

  return [
    cursor(row(virtualCursor), virtualCol),
    cursor(row(viewPort), viewPortCol),
    newCodePosition,
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
  throw new Error("no valid key combination found"); // TODO: make custom error KeyPressError;
}
