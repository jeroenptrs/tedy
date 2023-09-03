import { cursor, row } from "../cursor.types";
import { KeyPressProps, KeyPressResult } from "./keyPress.utils";

export default function ctrlA(
  props: KeyPressProps,
): KeyPressResult {
  return [
    cursor(row(props.virtualCursor), 0),
    cursor(row(props.viewPort), 0),
    cursor(row(props.codePosition), 0),
    props.code,
  ];
}
