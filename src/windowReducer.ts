import { col, row } from "./cursor.types";
import movement, { type MovementKey } from "./movement";
import { type WindowReducerAction } from "./windowActions";
import { type WindowState } from "./windowState";

function insert(codeLine: string, input: string, col: number): string {
  return [codeLine.slice(0, col), input, codeLine.slice(col)].join("");
}

function extract(codeLine: string, col: number): string {
  return col > 0 ? [codeLine.slice(0, col - 1), codeLine.slice(col)].join("") : codeLine;
}

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
      const [input, key] = value;
      const { rows, columns, virtualCursor, viewPort, codePosition, code } =
        newState;
      let movementKey: MovementKey | undefined = key.downArrow
        ? "down"
        : key.upArrow
        ? "up"
        : key.leftArrow
        ? "left"
        : key.rightArrow
        ? "right"
        : undefined;

      if (input && !key.ctrl) {
        // TODO: newlines are W E I R D?
        const codeArray = code.split("\n");
        const codeLine = codeArray[row(codePosition)] as string;

        codeArray[row(codePosition)] = insert(codeLine, input, col(codePosition));
        newState.code = codeArray.join("\n");
        movementKey = "right";
      }

      if (key.backspace) {
        const codeArray = code.split("\n");
        const codeLine = codeArray[row(codePosition)] as string;
        
        if (col(codePosition) === 0) {
          // TODO: handle backspace to carry text to the previous line
        } else { 
          codeArray[row(codePosition)] = extract(codeLine, col(codePosition));
          newState.code = codeArray.join("\n");
          movementKey = "left";
        }
      }

      // handle ctrl + left/right
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
