import { initialState } from "../windowState";
import { KeyPressProps, KeyPressResult } from "./keyPress.utils";

export default function pageUp({ code }: KeyPressProps): KeyPressResult {
  return [
    initialState.virtualCursor,
    initialState.viewPort,
    initialState.codePosition,
    code,
  ];
}
