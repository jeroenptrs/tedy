import readline from "node:readline";

import cliCursor from "cli-cursor";
import { Box, useStdout } from "ink";
import { useContext, useEffect } from "react";

import CodeView from "./CodeView";
import Footer from "./Footer";
import Header from "./Header";
import { WindowContext } from "./WindowHandler";

export default function Container() {
  const [{ rows, virtualCursor }] = useContext(WindowContext);
  const { stdout } = useStdout();

  useEffect(() => {
    const [row, col] = virtualCursor;
    readline.cursorTo(stdout, col, row);
    cliCursor.show();
  });

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        height={rows}
      >
        <Header />
        <CodeView />
        <Footer />
      </Box>
    </>
  );
}
