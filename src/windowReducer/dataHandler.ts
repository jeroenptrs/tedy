import { assertErrorsOnce } from "@jeroenpeeters/assert-errors";

import { col, row } from "../cursor.types";
import { UseInputParams } from "../ink.types";
import keyPressHandler, { parseKeyPress } from "../keyPressHandler";
import { WindowState } from "../windowState";
import { insert, parseInput } from "./windowReducer.utils";

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
