import terminalSize, { type TerminalSize } from "term-size";

import { UseInputParams } from "./ink.types";

export type WindowReducerActionType = {
  RESIZE: "RESIZE";
  DATA: "DATA";
  SAVE: "SAVE";
};

export type WindowReducerAction = {
  type: WindowReducerActionType["RESIZE"];
  value: TerminalSize;
} | {
  type: WindowReducerActionType["DATA"];
  value: UseInputParams;
} | {
  type: WindowReducerActionType["SAVE"];
  value: string | never;
};

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

export function saveAction(): ActionTypeCreator<"SAVE"> {
  return {
    type: "SAVE",
    value: ""
  };
}
