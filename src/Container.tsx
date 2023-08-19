import readline from "readline";

import { Box, useStdout } from "ink";
import { useContext, useEffect } from "react";

import { WindowContext } from "./WindowHandler";
import Footer from "./Footer";
import Header from "./Header";
import CodeView from "./CodeView";
import cliCursor from "cli-cursor";

export default function Container() {
  const [{ rows }] = useContext(WindowContext);
  const { stdout } = useStdout();

  useEffect(() => {
    readline.cursorTo(stdout, 0, 1);
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
