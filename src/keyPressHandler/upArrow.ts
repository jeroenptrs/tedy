import { cursor } from "../cursor.types";
import { KeyPressProps, KeyPressResult } from "./keyPress.utils";

export default function upArrow(
  { virtualCursor, viewPort, codePosition, code }: KeyPressProps,
): KeyPressResult {
  const [virtualRow, virtualCol] = virtualCursor;
  const [viewPortRow, viewPortCol] = viewPort;
  const [codePositionRow, codePositionCol] = codePosition;

  // We're not at the top of the viewport and code.
  if (virtualRow > 1) {
    return [
      cursor(virtualRow - 1, virtualCol),
      viewPort,
      cursor(codePositionRow - 1, codePositionCol),
      code,
    ];
    // We're at the top of the viewport but not at the top of the code.
  } else if (codePositionRow > 0) {
    return [
      virtualCursor,
      cursor(viewPortRow - 1, viewPortCol),
      cursor(codePositionRow - 1, codePositionCol),
      code,
    ];
  }

  return [virtualCursor, viewPort, codePosition, code];
}
