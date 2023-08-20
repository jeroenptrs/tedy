import movement from "./movement";
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
      const { rows, columns, virtualCursor, viewPort, codePosition, code } =
        newState;
      const movementKey = key.downArrow
        ? "down"
        : key.upArrow
        ? "up"
        : key.leftArrow
        ? "left"
        : key.rightArrow
        ? "right"
        : undefined;

      if (movementKey) {
        const [newVirtualCursor, newViewPort, newCodePosition] = movement(
          movementKey,
          {
            virtualCursor,
            viewPort,
            codePosition,
            columns,
            rows,
            code,
          },
        );

        newState.virtualCursor = newVirtualCursor;
        newState.viewPort = newViewPort;
        newState.codePosition = newCodePosition;
      }

      return newState;
    }
    default: {
      return state;
    }
  }
}
