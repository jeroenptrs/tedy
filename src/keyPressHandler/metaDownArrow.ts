import { row } from "../cursor.types";
import downArrow from "./downArrow";
import { KeyPressProps, KeyPressResult } from "./keyPress.utils";

export default function metaDownArrow(props: KeyPressProps): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code } = props;
  const codeArray = code.split("\n");

  if (row(codePosition) === codeArray.length - 1) {
    return [virtualCursor, viewPort, codePosition, code];
  }

  const codeLine = codeArray[row(codePosition)] as string;
  const belowCodeLine = codeArray[row(codePosition) + 1] as string;

  // swap
  codeArray[row(codePosition) + 1] = codeLine;
  codeArray[row(codePosition)] = belowCodeLine;
  props.code = codeArray.join("\n");

  return downArrow(props);
}
