import { type WindowState } from "../windowState";
import highlightMixin from "./highlight.mixin";

type Mixin = (code: string, windowState: WindowState) => string;

export default function handleMixins(code: string, state: WindowState): string {
  // TODO: [v2] config file to register/edit mixins!
  const mixins: Mixin[] = [highlightMixin];

  let processedCode = code;

  for (const mixin of mixins) {
    processedCode = mixin(code, state);
  }

  return processedCode;
}
