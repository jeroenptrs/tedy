import ctrlA from "./ctrlA";
import ctrlE from "./ctrlE";
import downArrow from "./downArrow";
import {
  type KeyPress,
  type KeyPressProps,
  type KeyPressResult,
} from "./keyPress.utils";
import leftArrow from "./leftArrow";
import rightArrow from "./rightArrow";
import upArrow from "./upArrow";

export {
  type KeyPress,
  type KeyPressProps,
  parseKeyPress,
} from "./keyPress.utils";

export default function keyPressHandler(
  key: Exclude<KeyPress, "backspace">,
  props: KeyPressProps,
): KeyPressResult {
  switch (key) {
    case "upArrow":
      return upArrow(props);
    case "downArrow":
      return downArrow(props);
    case "leftArrow":
      return leftArrow(props);
    case "rightArrow":
      return rightArrow(props);
    case "ctrl+a":
      return ctrlA(props);
    case "ctrl+e":
      return ctrlE(props);
    default:
      return [
        props.virtualCursor,
        props.viewPort,
        props.codePosition,
        props.code,
      ];
  }
}
