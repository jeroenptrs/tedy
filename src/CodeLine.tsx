import { Box, Text } from "ink";

export default function CodeLine({ line }: { line: string }) {
  return (
    <Box height={1}>
      <Text wrap="truncate-end">{line}</Text>
    </Box>
  );
}
