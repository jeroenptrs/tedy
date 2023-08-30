import { Box, Text, useApp } from "ink";
import { useContext, useEffect } from "react";

import { WindowContext } from "./WindowHandler";
import { col, row } from "./cursor.types";
import { saveAction } from "./windowActions";

function CodePositionInfo() {
  const [{ codePosition, columns }] = useContext(WindowContext);
  return (
    <Text backgroundColor="grey">
      {`Ln ${row(codePosition) + 1}, Col ${col(codePosition) + 1}`.padEnd(
        columns - 3,
        " ",
      )}
    </Text>
  );
}

export default function Footer() {
  const [{ columns, lastInput, code, input }, dispatch] = useContext(
    WindowContext,
  );
  const { exit } = useApp();

  const unsavedChanges = code !== input;
  const [char, key] = lastInput ?? [];
  const { ctrl } = key ?? {};

  useEffect(() => {
    if (char === "c" && ctrl) {
      if (!unsavedChanges) {
        exit();
      } else {
        dispatch(saveAction());
      }
    }
  }, [char, ctrl, unsavedChanges]);

  return (
    <Box width={columns} height={1} display="flex" overflow="hidden">
      <Box width={3}>
        <Text backgroundColor="cyan">🧸{" "}</Text>
      </Box>
      <Box width={columns - 3} display="flex">
        <CodePositionInfo />
      </Box>
    </Box>
  );
}
