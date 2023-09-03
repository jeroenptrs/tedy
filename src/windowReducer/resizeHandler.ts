import { TerminalSize } from "term-size";
import { WindowState } from "../windowState";

export default function resizeHandler(
  state: WindowState,
  value: TerminalSize,
): WindowState {
  return { ...state, ...value };
}
