import backspace from "./backspace";
import ctrlA from "./ctrlA";
import ctrlE from "./ctrlE";
import downArrow from "./downArrow";
import {
  type KeyPress,
  type KeyPressProps,
  type KeyPressResult,
} from "./keyPress.utils";
import leftArrow from "./leftArrow";
import metaDownArrow from "./metaDownArrow";
import metaUpArrow from "./metaUpArrow";
import pageDown from "./pageDown";
import pageUp from "./pageUp";
import rightArrow from "./rightArrow";
import upArrow from "./upArrow";

export {
  type KeyPress,
  type KeyPressProps,
  parseKeyPress,
} from "./keyPress.utils";

export default function keyPressHandler(
  key: KeyPress,
  props: KeyPressProps,
): KeyPressResult {
  switch (key) {
    case "backspace":
      return backspace(props);
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
    case "pageUp":
      return pageUp(props);
    case "pageDown":
      return pageDown(props);
    case "meta+upArrow":
      return metaUpArrow(props);
    case "meta+downArrow":
      return metaDownArrow(props);
    default:
      return [
        props.virtualCursor,
        props.viewPort,
        props.codePosition,
        props.code,
      ];
  }
}
