import { parse } from "node:path";

import type { HighlightOptions } from "cli-highlight";

import markdown from "./markdown";

export default function getTheme(location: string): HighlightOptions {
  const language = parse(location).ext.substring(1);

  switch (language) {
    case "md":
    case "mdx":
      return {
        language,
        theme: markdown,
      };
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "json":
      return {
        language,
      };
  }

  return {};
}
