import { KeyPressProps, KeyPressResult, moveToLineEnd } from "./keyPress.utils";

export default function ctrlE(
  props: KeyPressProps,
): KeyPressResult {
  return moveToLineEnd(props);
}
