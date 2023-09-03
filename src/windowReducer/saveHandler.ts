import { saveFile } from "../fsHandler";
import { WindowState } from "../windowState";

export default function saveHandler(
  state: WindowState,
): WindowState {
  const { location, code } = state;
  saveFile(location, code);
  return { ...state, input: code, lastInput: undefined };
}
