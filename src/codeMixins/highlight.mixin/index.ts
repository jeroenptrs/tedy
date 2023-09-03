import { assertErrorsOnce } from "@jeroenpeeters/assert-errors";
import highlight from "cli-highlight";
import { WindowState } from "../../windowState";
import getTheme from "./themes";

export default function highlightMixin(
  code: string,
  { location }: WindowState,
): string {
  const theme = getTheme(location);
  const [highlightedCode, err] = assertErrorsOnce(
    Error,
    highlight,
    code,
    theme,
  );

  if (!highlightedCode || err) {
    return code;
  }

  return highlightedCode as string;
}
