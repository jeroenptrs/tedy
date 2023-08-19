import { cursor } from "./cursor.types";
import { type WindowReducerAction } from "./windowActions";
import { type WindowState } from "./windowState";

export default function windowReducer(
  state: WindowState,
  { type, value }: WindowReducerAction,
): WindowState {
  switch (type) {
    case "RESIZE": {
      return { ...state, ...value };
    }
    case "DATA": {
      const newState = { ...state, lastInput: value };
      const [, key] = value;
      const { rows, columns, virtualCursor } = newState;
      const [row, col] = virtualCursor;

      if (key.downArrow) {
        newState.virtualCursor = cursor(row < rows - 2 ? row + 1 : row, col);
      }
      if (key.upArrow) {
        newState.virtualCursor = cursor(row > 1 ? row - 1 : row, col);
      }
      if (key.rightArrow) {
        newState.virtualCursor = cursor(row, col < columns - 1 ? col + 1 : col);
      }
      if (key.leftArrow) {
        newState.virtualCursor = cursor(row, col > 0 ? col - 1 : col);
      }

      return newState;
    }
    default: {
      return state;
    }
  }
}
