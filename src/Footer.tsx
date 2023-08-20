import { Box, Text } from "ink";
import { useContext } from "react";

import { WindowContext } from "./WindowHandler";

export default function Footer() {
  const [{ columns, codePosition }] = useContext(WindowContext);
  const [row, col] = codePosition;
  const footerText = `Ln ${row}, Col ${col}`;

  return (
    <Box width={columns} height={1} display="flex" overflow="hidden">
      <Box width={3}>
        <Text backgroundColor="cyan">🧸{" "}</Text>
      </Box>
      <Box width={columns - 3}>
        <Text backgroundColor="grey">{footerText.padEnd(columns, " ")}</Text>
      </Box>
    </Box>
  );
}
