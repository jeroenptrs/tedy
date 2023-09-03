import { col, cursor, row } from "../cursor.types";
import { KeyPressProps, KeyPressResult, moveToLineEnd } from "./keyPress.utils";
import upArrow from "./upArrow";

export default function leftArrow(
  props: KeyPressProps,
): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code } = props;
  const newCodePosition = cursor(row(codePosition), col(codePosition) - 1); // TODO refactor

  if (col(virtualCursor) > 0) {
    // There's space to move within the viewport.
    return [
      cursor(row(virtualCursor), col(virtualCursor) - 1),
      viewPort,
      newCodePosition,
      code,
    ];
  } else if (
    col(virtualCursor) === 0 && col(viewPort) > 0 && col(codePosition) > 0
  ) {
    // We're at the beginning of the viewport but not of the codeLine.
    return [
      virtualCursor,
      cursor(row(viewPort), col(viewPort) - 1),
      newCodePosition,
      code,
    ];
  } else if (
    col(virtualCursor) === 0 && col(viewPort) === 0 &&
    col(codePosition) === 0 && row(codePosition) > 0
  ) {
    // We're at the beginning of the codeLine, so we try to go up.
    const moveToLineEndResult = moveToLineEnd(props, -1);
    props.virtualCursor = moveToLineEndResult[0];
    props.viewPort = moveToLineEndResult[1];
    props.codePosition = moveToLineEndResult[2];
    return upArrow(props);
  }

  return [virtualCursor, viewPort, codePosition, code];
}
