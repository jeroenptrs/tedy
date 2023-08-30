import { type Key } from "ink";

export function lines(code: string): number {
  return code.split("\n").length;
}

export function lineLength(code: string, line: number): number {
  const codeLines = code.split("\n");

  if (line >= codeLines.length) throw new Error();

  const codeLine = code.split("\n")[line] as string;
  return codeLine.length;
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
