import { parse } from "node:path";

import { Box, Text } from "ink";
import { useContext } from "react";

import { WindowContext } from "./WindowHandler";

export default function Header() {
  const [{ columns, location }] = useContext(WindowContext);

  const parsedLocation = parse(location);

  return (
    <Box width={columns} height={1} overflow="hidden">
      <Text backgroundColor="grey">
        {parsedLocation.base.padEnd(columns, " ")}
      </Text>
    </Box>
  );
}
