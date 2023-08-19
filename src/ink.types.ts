import { type useInput } from "ink";

export type UseInputHandler = Parameters<typeof useInput>[0];
export type UseInputParams = Parameters<UseInputHandler>;
