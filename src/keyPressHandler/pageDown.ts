import { col, cursor, row } from "../cursor.types";
import { bodyHeight } from "../view.utils";
import ctrlE from "./ctrlE";
import { KeyPressProps, KeyPressResult } from "./keyPress.utils";

export default function pageDown(props: KeyPressProps): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code, rows } = props;
  const codeArray = code.split("\n");

  if (row(codePosition) === codeArray.length - 1) {
    return ctrlE(props);
  }

  props.codePosition = cursor(codeArray.length - 1, col(codePosition));

  const height = bodyHeight(rows);
  const fitsInBody = codeArray.length <= height;
  if (fitsInBody) {
    props.virtualCursor = cursor(codeArray.length, col(virtualCursor));
    return ctrlE(props);
  }

  props.virtualCursor = cursor(height, col(virtualCursor));
  props.viewPort = cursor(codeArray.length - height, col(viewPort));
  return ctrlE(props);
}
