import { Box } from "ink";
import { useContext } from "react";

import { WindowContext } from "./WindowHandler";
import CodeLine from "./CodeLine";
import handleMixins from "./codeMixins";

const bodySize = (rows: number) => rows - 2;

export default function CodeView() {
  const [state] = useContext(WindowContext);
  const { columns, rows, code, viewPort } = state;
  const [row, col] = viewPort;

  const processedCode = handleMixins(code, state).split("\n");
  const codeArray = processedCode.map((
    codeLine,
    index,
  ) => <CodeLine line={codeLine} key={index} />);

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
