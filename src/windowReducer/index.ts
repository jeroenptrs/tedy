import { type WindowReducerAction } from "../windowActions";
import { type WindowState } from "../windowState";
import resizeHandler from "./resizeHandler";
import saveHandler from "./saveHandler";
import dataHandler from "./dataHandler";

export default function windowReducer(
  state: WindowState,
  { type, value }: WindowReducerAction,
): WindowState {
  switch (type) {
    case "SAVE": {
      return saveHandler(state);
    }
    case "RESIZE": {
      return resizeHandler(state, value);
    }
    case "DATA": {
      return dataHandler(state, value);
    }
    default: {
      return state;
    }
  }
}
