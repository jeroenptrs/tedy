import { highlight } from "cli-highlight";
import { Box } from "ink";
import { useContext } from "react";

import { WindowContext } from "./WindowHandler";
import CodeLine from "./CodeLine";
import getTheme from "./themes";

export default function CodeView() {
  const [{ columns, rows, code, location }] = useContext(WindowContext);

  const theme = getTheme(location);
  const potentiallyHighlightedCode = Object.keys(theme).length > 0
    ? highlight(code, theme)
    : code;
  const codeArray = potentiallyHighlightedCode.split("\n").map((
    codeLine,
    index,
  ) => <CodeLine line={codeLine} key={index} />);

  return (
    <Box
      height={rows - 2}
      width={columns}
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {codeArray.slice(0, rows - 2)}
    </Box>
  );
}
