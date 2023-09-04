import { col, cursor, row } from "../cursor.types";
import ctrlA from "./ctrlA";
import { KeyPressProps, KeyPressResult, moveToLineEnd } from "./keyPress.utils";

export default function upArrow(props: KeyPressProps): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code } = props;

  if (row(codePosition) === 0) {
    return ctrlA(props);
  }

  props.codePosition = cursor(row(codePosition) - 1, col(codePosition));
  if (row(virtualCursor) > 1) {
    // We're not at the top of the viewport and code.
    props.virtualCursor = cursor(row(virtualCursor) - 1, col(virtualCursor));
  } else if (row(codePosition) > 0) {
    // We're at the top of the viewport but not at the top of the code.
    props.viewPort = cursor(row(viewPort) - 1, col(viewPort));
  }

  const codeArray = code.split("\n");
  const previousLine = codeArray[row(codePosition) - 1] as string;
  if (col(codePosition) > previousLine.length) {
    return moveToLineEnd(props);
  }

  return [props.virtualCursor, props.viewPort, props.codePosition, props.code];
}
