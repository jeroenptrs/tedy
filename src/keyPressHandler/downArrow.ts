import { cursor } from "../cursor.types";
import { KeyPressProps, KeyPressResult, lines } from "./keyPress.utils";

export default function downArrow(
  { virtualCursor, viewPort, codePosition, code, rows }: KeyPressProps,
): KeyPressResult {
  const [virtualRow, virtualCol] = virtualCursor;
  const [viewPortRow, viewPortCol] = viewPort;
  const [codePositionRow, codePositionCol] = codePosition;

  if (virtualRow < rows - 2 && codePositionRow < lines(code) - 1) {
    // We're not at the bottom of the viewport and the code.
    return [
      cursor(virtualRow + 1, virtualCol),
      viewPort,
      cursor(codePositionRow + 1, codePositionCol),
      code,
    ];
  } else if (codePositionRow < lines(code) - 1) {
    // We're at the bottom of the viewport but not at the bottom of the code.
    return [
      virtualCursor,
      cursor(viewPortRow + 1, viewPortCol),
      cursor(codePositionRow + 1, codePositionCol),
      code,
    ];
  }

  return [virtualCursor, viewPort, codePosition, code];
}
