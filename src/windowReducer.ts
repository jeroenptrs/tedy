import { assertErrorsOnce } from "@jeroenpeeters/assert-errors";
import { col, row } from "./cursor.types";
import { saveFile } from "./fsHandler";
import movement from "./movement";
import { type MovementKey, parseMovement } from "./movement.utils";
import { type WindowReducerAction } from "./windowActions";
import { extract, insert, parseInput } from "./windowReducer.utils";
import { type WindowState } from "./windowState";

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
      const [_movementKey, hasNoMappedMovement] = assertErrorsOnce(
        Error,
        parseMovement,
        input,
        key,
      );

      if (!hasNoMappedMovement) {
        movementKey = _movementKey;
      }

      if (input && hasNoMappedMovement && !key.ctrl) {
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

        if (row(codePosition) !== 0 && col(codePosition) === 0) {
          // set left, it will moveToEndLine and call up
          const [newVirtualCursor, newViewPort, newCodePosition] = movement(
            "leftArrow",
            { virtualCursor, viewPort, codePosition, columns, rows, code },
          );

          // take current row, concatenate to previous row, remove from code
          codeArray[row(codePosition) - 1] += codeLine;
          codeArray.splice(row(codePosition), 1);

          // update newstate with left result and new code
          newState.virtualCursor = newVirtualCursor;
          newState.viewPort = newViewPort;
          newState.codePosition = newCodePosition;
          newState.code = codeArray.join("\n");
          return newState;
        } else if (col(codePosition) !== 0) {
          // remove from code
          codeArray[row(codePosition)] = extract(codeLine, col(codePosition));

          // rebuild + pass to movement
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
