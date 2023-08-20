type Row = number & { readonly tag: unique symbol };
const Row = (row: number): Row => row as Row;
export const row = (c: Cursor): Row => c[0];

type Col = number & { readonly tag: unique symbol };
const Col = (col: number): Col => col as Col;
export const col = (c: Cursor): Col => c[1];

export type Cursor = [Row, Col];
export const cursor = (
  row: number,
  col: number,
): Cursor => [Row(row), Col(col)];
