import { row } from "../cursor.types";
import { KeyPressProps, KeyPressResult } from "./keyPress.utils";
import upArrow from "./upArrow";

export default function metaUpArrow(props: KeyPressProps): KeyPressResult {
  const { virtualCursor, viewPort, codePosition, code } = props;
  if (row(codePosition) === 0) {
    return [virtualCursor, viewPort, codePosition, code];
  }

  const codeArray = code.split("\n");
  const codeLine = codeArray[row(codePosition)] as string;
  const aboveCodeLine = codeArray[row(codePosition) - 1] as string;

  // swap
  codeArray[row(codePosition) - 1] = codeLine;
  codeArray[row(codePosition)] = aboveCodeLine;
  props.code = codeArray.join("\n");

  return upArrow(props);
}
