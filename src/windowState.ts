import terminalSize from "term-size";

import { type Cursor, cursor } from "./cursor.types";
import { type UseInputParams } from "./ink.types";

export type WindowState = {
  columns: number;
  rows: number;
  code: string;
  input: string;
  location: string;
  virtualCursor: Cursor;
  lastInput?: UseInputParams;
};

export const initialState = {
  ...terminalSize(),
  input: "",
  code: "",
  location: "",
  virtualCursor: cursor(1, 0),
};
