import { col, row } from "../cursor.types";
import { extract } from "../windowReducer/windowReducer.utils";
import { type KeyPressProps, type KeyPressResult } from "./keyPress.utils";
import leftArrow from "./leftArrow";

export default function backspace(props: KeyPressProps): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code } = props;

  if (row(codePosition) === 0 && col(codePosition) === 0) {
    return [virtualCursor, viewPort, codePosition, code]; // do nothing;
  }

  const codeArray = code.split("\n");
  const codeLine = codeArray[row(codePosition)] as string;

  if (col(codePosition) === 0) {
    // set left, it will moveToEndLine and call up
    const result = leftArrow(props);

    // take current row, concatenate to previous row, remove from code
    codeArray[row(codePosition) - 1] += codeLine;
    codeArray.splice(row(codePosition), 1);
    result[3] = codeArray.join("\n");

    return result;
  } else {
    // remove from code + pass to keyPressHandler who will move cursor to the left
    codeArray[row(codePosition)] = extract(codeLine, col(codePosition));
    props.code = codeArray.join("\n");
    return leftArrow(props);
  }
}
