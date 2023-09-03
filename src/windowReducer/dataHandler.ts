import { assertErrorsOnce } from "@jeroenpeeters/assert-errors";
import { WindowState } from "../windowState";
import { UseInputParams } from "../ink.types";
import keyPressHandler, { parseKeyPress } from "../keyPressHandler";
import { extract, insert, parseInput } from "./windowReducer.utils";
import { col, row } from "../cursor.types";

export default function dataHandler(
  state: WindowState,
  value: UseInputParams,
): WindowState {
  const newState = { ...state, lastInput: value };
  const [input, key] = value;
  const { codePosition, code } = newState;

  let newVirtualCursor = newState.virtualCursor;
  let newViewPort = newState.viewPort;
  let newCodePosition = newState.codePosition;
  let newCode = newState.code;

  const [keyPress, hasNoMappedKeyPress] = assertErrorsOnce(
    Error,
    parseKeyPress,
    input,
    key,
  );

  // Regular input!
  if (input && hasNoMappedKeyPress && !key.ctrl) {
    const parsedInput = parseInput(input);
    const codeArray = code.split("\n");
    const codeLine = codeArray[row(codePosition)] as string;

    codeArray[row(codePosition)] = insert(
      codeLine,
      parsedInput,
      col(codePosition),
    );
    newState.code = codeArray.join("\n");
    [newVirtualCursor, newViewPort, newCodePosition, newCode] = keyPressHandler(
      "rightArrow",
      newState,
    );
    // TODO: move to keyPressHandler/backspace.ts
  } else if (keyPress === "backspace") {
    if (row(codePosition) === 0 && col(codePosition) === 0) {
      return newState; // do nothing;
    }

    const codeArray = code.split("\n");
    const codeLine = codeArray[row(codePosition)] as string;

    if (col(codePosition) === 0) {
      // set left, it will moveToEndLine and call up
      [newVirtualCursor, newViewPort, newCodePosition] = keyPressHandler(
        "leftArrow",
        newState,
      );

      // take current row, concatenate to previous row, remove from code
      codeArray[row(codePosition) - 1] += codeLine;
      codeArray.splice(row(codePosition), 1);
      newCode = codeArray.join("\n");
    } else {
      // remove from code
      codeArray[row(codePosition)] = extract(codeLine, col(codePosition));

      // rebuild + pass to keyPressHandler who will move cursor to the left
      newState.code = codeArray.join("\n");
      [newVirtualCursor, newViewPort, newCodePosition, newCode] =
        keyPressHandler("leftArrow", newState);
    }
  } else if (keyPress) {
    [newVirtualCursor, newViewPort, newCodePosition, newCode] = keyPressHandler(
      keyPress,
      newState,
    );
  }

  newState.virtualCursor = newVirtualCursor;
  newState.viewPort = newViewPort;
  newState.codePosition = newCodePosition;
  newState.code = newCode;

  return newState;
}
