import { assertErrorsOnce } from "@jeroenpeeters/assert-errors";
import { col, row } from "./cursor.types";
import { saveFile } from "./fsHandler";
import movement from "./movement";
import { type MovementKey, parseMovement } from "./movement.utils";
import { type WindowReducerAction } from "./windowActions";
import { parseInput } from "./windowReducer.utils";
import { type WindowState } from "./windowState";

function insert(codeLine: string, input: string, col: number): string {
  return [codeLine.slice(0, col), input, codeLine.slice(col)].join("");
}

function extract(codeLine: string, col: number): string {
  return col > 0
    ? [codeLine.slice(0, col - 1), codeLine.slice(col)].join("")
    : codeLine;
}

export default function windowReducer(
  state: WindowState,
  { type, value }: WindowReducerAction,
): WindowState {
  switch (type) {
    case "SAVE": {
      const { location, code } = state;
      saveFile(location, code);
      return { ...state, input: code, lastInput: undefined };
    }
    case "RESIZE": {
      return { ...state, ...value };
    }
    case "DATA": {
      const newState = { ...state, lastInput: value };
      const [input, key] = value;
      const { rows, columns, virtualCursor, viewPort, codePosition, code } =
        newState;
      let movementKey: MovementKey | undefined;
      const [_movementKey, err] = assertErrorsOnce(
        Error,
        parseMovement,
        input,
        key,
      );

      if (!err) {
        movementKey = _movementKey;
      }

      if (input && !key.ctrl) {
        const parsedInput = parseInput(input);
        const codeArray = code.split("\n");
        const codeLine = codeArray[row(codePosition)] as string;

        codeArray[row(codePosition)] = insert(
          codeLine,
          parsedInput,
          col(codePosition),
        );
        newState.code = codeArray.join("\n");
        movementKey = "rightArrow";
      }

      if (key.backspace) {
        const codeArray = code.split("\n");
        const codeLine = codeArray[row(codePosition)] as string;

        if (col(codePosition) === 0) {
          // TODO: handle backspace to carry text to the previous line
        } else {
          codeArray[row(codePosition)] = extract(codeLine, col(codePosition));
          newState.code = codeArray.join("\n");
          movementKey = "leftArrow";
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
            code: newState.code,
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
