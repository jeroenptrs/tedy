import { parse } from "node:path";

import { Box, Text } from "ink";
import { useContext } from "react";

import { WindowContext } from "./WindowHandler";

export default function Header() {
  const [{ columns, location: _location, code, input }] = useContext(
    WindowContext,
  );

  const { base } = parse(_location);
  const unsavedChanges = code !== input;
  const location = `${base}${unsavedChanges ? "*" : ""}`;

  return (
    <Box width={columns} height={1} overflow="hidden">
      <Text backgroundColor="grey" bold={unsavedChanges}>
        {location.padEnd(columns, " ")}
      </Text>
    </Box>
  );
}
