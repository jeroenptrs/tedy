import { col, cursor, row } from "../cursor.types";
import downArrow from "./downArrow";
import {
  KeyPressProps,
  KeyPressResult,
  lineLength,
  lines,
} from "./keyPress.utils";

export default function rightArrow(
  props: KeyPressProps,
): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code, columns } = props;
  const newCodePosition = cursor(row(codePosition), col(codePosition) + 1);
  const codeLineLength = lineLength(code, row(codePosition));

  if (
    col(virtualCursor) === columns - 1 && col(codePosition) < codeLineLength
  ) {
    // We're at the end of the viewport but not of the codeLine.
    return [
      virtualCursor,
      cursor(row(viewPort), col(viewPort) + 1),
      newCodePosition,
      code,
    ];
  } else if (
    col(virtualCursor) < columns && col(codePosition) < codeLineLength
  ) {
    // There's space to move within the viewport *and* the codeLine.
    return [
      cursor(row(virtualCursor), col(virtualCursor) + 1),
      viewPort,
      newCodePosition,
      code,
    ];
  } else if (
    col(codePosition) === codeLineLength && row(codePosition) < lines(code) - 1
  ) {
    // We're at the end of the codeLine, so we try to go down.
    props.virtualCursor = cursor(row(virtualCursor), 0);
    props.viewPort = cursor(row(viewPort), 0);
    props.codePosition = cursor(row(codePosition), 0);
    return downArrow(props);
  }

  return [virtualCursor, viewPort, codePosition, code];
}
