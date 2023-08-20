import { highlight } from "cli-highlight";
import { Box } from "ink";
import { useContext } from "react";

import { WindowContext } from "./WindowHandler";
import CodeLine from "./CodeLine";
import getTheme from "./themes";
import { lineLength } from "./movement.utils";

const bodySize = (rows: number) => rows - 2;

export default function CodeView() {
  const [{ columns, rows, code, location, viewPort }] =
    useContext(
      WindowContext,
    );
  const [row, col] = viewPort;

  const theme = getTheme(location);
  const potentiallyHighlightedCode = Object.keys(theme).length > 0
    ? highlight(code, theme)
    : code;
  const rawCodeArray = potentiallyHighlightedCode.split("\n");
  const codeArray = rawCodeArray.map((
    codeLine,
    index,
  ) => <CodeLine line={codeLine} key={index} />);
  // ) => <CodeLine line={`${lineLength(code, index)}`} key={index} />);

  return (
    <Box
      height={bodySize(rows)}
      width={columns + col /* remove truncate-end */}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      marginLeft={col * -1 /* imitate scroll to right */}
    >
      {codeArray.slice(row).slice(0, bodySize(rows))}
    </Box>
  );
}
