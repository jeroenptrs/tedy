import { parse } from "node:path";

import { type HighlightOptions } from "cli-highlight";

import markdown from "./markdown";

// TODO: v1? major refactor! allow multiple themes, instead of a theme specifically for MDX and the rest being default
export default function getTheme(location: string): HighlightOptions {
  const language = parse(location).ext.substring(1);

  switch (language) {
    case "md":
    case "mdx":
      return {
        language: "md",
        theme: markdown,
      };
    default:
      return {
        language,
      };
  }
}
