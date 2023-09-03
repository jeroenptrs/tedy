import { WindowState } from "../windowState";
import { saveFile } from "../fsHandler";

export default function saveHandler(
  state: WindowState,
): WindowState {
  const { location, code } = state;
  saveFile(location, code);
  return { ...state, input: code, lastInput: undefined };
}
