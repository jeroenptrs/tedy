import { createContext, useReducer } from "react";
import terminalSize from "term-size";

import type { Dispatch, PropsWithChildren } from "react";
import type { TerminalSize } from "term-size";

import type { UseInputParams } from "./ink.types";

import { cursor } from "./cursor.types";

import type { Cursor } from "./cursor.types";

type WindowState = {
  columns: number;
  rows: number;
  code: string;
  input: string;
  location: string;
  virtualCursor: Cursor;
  lastInput?: UseInputParams;
};
const initialState = { ...terminalSize(), input: "", code: "", location: "", virtualCursor: cursor(1, 0)};

type WindowContext = [WindowState, Dispatch<WindowReducerAction>];
export const WindowContext = createContext<WindowContext>([
  initialState,
  () => {},
]);

type WindowReducerActionType = {
  RESIZE: "RESIZE";
  DATA: "DATA";
};
type WindowReducerAction = {
  type: WindowReducerActionType["RESIZE"];
  value: TerminalSize;
} | {
  type: WindowReducerActionType["DATA"];
  value: UseInputParams;
};
function windowReducer(
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
      
      if (key.downArrow) newState.virtualCursor = cursor(row < rows - 2 ? row + 1 : row, col);
      if (key.upArrow) newState.virtualCursor = cursor(row > 1 ? row - 1 : row, col);
      if (key.rightArrow) newState.virtualCursor = cursor(row, col < columns - 1 ? col + 1 : col);
      if (key.leftArrow) newState.virtualCursor = cursor(row, col > 0 ? col - 1 : col);
      
      return newState;
    }
    default: {
      return state;
    }
  }
}

type ActionTypeCreator<T extends keyof WindowReducerActionType> = Extract<
  WindowReducerAction,
  { type: WindowReducerActionType[T] }
>;
export function resizeAction(): ActionTypeCreator<"RESIZE"> {
  return {
    type: "RESIZE",
    value: terminalSize(),
  };
}

export function dataAction(value: UseInputParams): ActionTypeCreator<"DATA"> {
  return {
    type: "DATA",
    value,
  };
}

export default function WindowHandler(
  { children, input, location }: PropsWithChildren<
    { input: string; location: string }
  >,
) {
  const state = useReducer(windowReducer, {
    ...initialState,
    code: input,
    input,
    location,
  });
  return (
    <WindowContext.Provider value={state}>
      {children}
    </WindowContext.Provider>
  );
}
