import { useInput, useStdin, useStdout } from "ink";
import { useCallback, useContext, useEffect } from "react";

import type { PropsWithChildren } from "react";

import { clear } from "./clear";
import { dataAction, resizeAction, WindowContext } from "./WindowHandler";
import type { UseInputParams } from "./ink.types";

export default function ListenerProvider({ children }: PropsWithChildren) {
  const [, dispatch] = useContext(WindowContext);
  const { stdout } = useStdout();
  const { setRawMode } = useStdin();

  const resizeHandler = useCallback(() => {
    dispatch(resizeAction());
  }, []);

  useEffect(() => {
    setRawMode(true);

    stdout.on("resize", resizeHandler);

    // Handle Unmount
    return () => {
      setRawMode(false);
      stdout.off("resize", resizeHandler);
      clear();
    };
  }, []);

  const inputHandler = useCallback((...args: UseInputParams) => {
    dispatch(dataAction(args));
  }, []);
  useInput(inputHandler);

  return children;
}
