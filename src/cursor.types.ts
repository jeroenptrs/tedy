type Row = number & { readonly tag:unique symbol };
export const Row = (row: number): Row => row as Row;

type Col = number & { readonly tag:unique symbol };
export const Col = (col: number): Col => col as Col;

export type Cursor = [Row, Col];
export const cursor = (row: number, col: number): Cursor => [Row(row), Col(col)];
