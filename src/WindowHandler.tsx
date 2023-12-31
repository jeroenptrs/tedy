import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useReducer,
} from "react";

import { type WindowReducerAction } from "./windowActions";
import windowReducer from "./windowReducer";
import { initialState, type WindowState } from "./windowState";

type WindowContext = [WindowState, Dispatch<WindowReducerAction>];
export const WindowContext = createContext<WindowContext>([
  initialState,
  () => {},
]);

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
