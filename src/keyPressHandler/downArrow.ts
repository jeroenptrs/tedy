import { col, cursor, row } from "../cursor.types";
import { bodySize } from "../view.utils";
import ctrlE from "./ctrlE";
import { KeyPressProps, KeyPressResult, moveToLineEnd } from "./keyPress.utils";

export default function downArrow(props: KeyPressProps): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code, rows } = props;
  const codeArray = code.split("\n");

  const notLastLine = row(codePosition) < codeArray.length - 1;
  if (!notLastLine) {
    return ctrlE(props);
  }

  props.codePosition = cursor(row(codePosition) + 1, col(codePosition));
  if (row(virtualCursor) < bodySize(rows)) {
    // We're not at the bottom of the viewport and the code.
    props.virtualCursor = cursor(row(virtualCursor) + 1, col(virtualCursor));
  } else {
    // We're at the bottom of the viewport but not at the bottom of the code.
    props.viewPort = cursor(row(viewPort) + 1, col(viewPort));
  }

  const nextLine = codeArray[row(codePosition) + 1] as string;
  if (col(codePosition) > nextLine.length) {
    return moveToLineEnd(props);
  }

  return [props.virtualCursor, props.viewPort, props.codePosition, code];
}
