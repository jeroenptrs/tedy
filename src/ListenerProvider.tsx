import { useInput, useStdin, useStdout } from "ink";
import {
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { clear } from "./clear";
import { type UseInputParams } from "./ink.types";
import { WindowContext } from "./WindowHandler";
import { dataAction, resizeAction } from "./windowActions";

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
