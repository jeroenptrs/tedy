import { col, cursor, row } from "./cursor.types";
import { lineLength, lines, type MovementKey, type MovementResult, type MovementProps, moveToLineEnd } from "./movement.utils";

export default function movement(
  key: MovementKey,
  props: MovementProps,
): MovementResult {
  switch (key) {
    case "upArrow":
      return up(props);
    case "downArrow":
      return down(props);
    case "leftArrow":
      return left(props);
    case "rightArrow":
      return right(props);
    case "ctrl+a":
      return ctrlA(props);
    case "ctrl+e":
      return ctrlE(props);
    default:
      return [props.virtualCursor, props.viewPort, props.codePosition];
  }
}

function up(
  { virtualCursor, viewPort, codePosition }: MovementProps,
): MovementResult {
  const [virtualRow, virtualCol] = virtualCursor;
  const [viewPortRow, viewPortCol] = viewPort;
  const [codePositionRow, codePositionCol] = codePosition;

  // We're not at the top of the viewport and code.
  if (virtualRow > 1) {
    return [
      cursor(virtualRow - 1, virtualCol),
      viewPort,
      cursor(codePositionRow - 1, codePositionCol),
    ];
    // We're at the top of the viewport but not at the top of the code.
  } else if (codePositionRow > 0) {
    return [
      virtualCursor,
      cursor(viewPortRow - 1, viewPortCol),
      cursor(codePositionRow - 1, codePositionCol),
    ];
  }

  return [virtualCursor, viewPort, codePosition];
}

function down(
  { virtualCursor, viewPort, codePosition, code, rows }: MovementProps,
): MovementResult {
  const [virtualRow, virtualCol] = virtualCursor;
  const [viewPortRow, viewPortCol] = viewPort;
  const [codePositionRow, codePositionCol] = codePosition;

  if (virtualRow < rows - 2 && codePositionRow < lines(code) - 1) {
    // We're not at the bottom of the viewport and the code.
    return [
      cursor(virtualRow + 1, virtualCol),
      viewPort,
      cursor(codePositionRow + 1, codePositionCol),
    ];
  } else if (codePositionRow < lines(code) - 1) {
    // We're at the bottom of the viewport but not at the bottom of the code.
    return [
      virtualCursor,
      cursor(viewPortRow + 1, viewPortCol),
      cursor(codePositionRow + 1, codePositionCol),
    ];
  }

  return [virtualCursor, viewPort, codePosition];
}

function left(
  props: MovementProps,
): MovementResult {
  const { virtualCursor, viewPort, codePosition } = props;
  const newCodePosition = cursor(row(codePosition), col(codePosition) - 1); // TODO refactor

  if (col(virtualCursor) > 0) {
    // There's space to move within the viewport.
    return [
      cursor(row(virtualCursor), col(virtualCursor) - 1),
      viewPort,
      newCodePosition,
    ];
  } else if (
    col(virtualCursor) === 0 && col(viewPort) > 0 && col(codePosition) > 0
  ) {
    // We're at the beginning of the viewport but not of the codeLine.
    return [
      virtualCursor,
      cursor(row(viewPort), col(viewPort) - 1),
      newCodePosition,
    ];
  } else if (
    col(virtualCursor) === 0 && col(viewPort) === 0 &&
    col(codePosition) === 0 && row(codePosition) > 0
  ) {
    // We're at the beginning of the codeLine, so we try to go up.
    const moveToLineEndResult = moveToLineEnd(props, -1);
    props.virtualCursor = moveToLineEndResult[0];
    props.viewPort = moveToLineEndResult[1];
    props.codePosition = moveToLineEndResult[2];
    return up(props);
  }

  return [virtualCursor, viewPort, codePosition];
}

function ctrlA(
  props: MovementProps
): MovementResult {
  const { virtualCursor, viewPort, codePosition } = props;
  return [cursor(row(virtualCursor), 0), cursor(row(viewPort), 0), cursor(row(codePosition), 0)];
}

function ctrlE(
  props: MovementProps
): MovementResult {
  return moveToLineEnd(props);
}

function right(
  props: MovementProps,
): MovementResult {
  const { virtualCursor, viewPort, codePosition, code, columns } = props;
  const newCodePosition = cursor(row(codePosition), col(codePosition) + 1); // TODO refactor
  const codeLineLength = lineLength(code, row(codePosition));

  if (
    col(virtualCursor) === columns - 1 && col(codePosition) < codeLineLength
  ) {
    // We're at the end of the viewport but not of the codeLine.
    return [
      virtualCursor,
      cursor(row(viewPort), col(viewPort) + 1),
      newCodePosition,
    ];
  } else if (
    col(virtualCursor) < columns && col(codePosition) < codeLineLength
  ) {
    // There's space to move within the viewport *and* the codeLine.
    return [
      cursor(row(virtualCursor), col(virtualCursor) + 1),
      viewPort,
      newCodePosition,
    ];
  } else if (
    col(codePosition) === codeLineLength && row(codePosition) < lines(code) - 1
  ) {
    // We're at the end of the codeLine, so we try to go down.
    props.virtualCursor = cursor(row(virtualCursor), 0);
    props.viewPort = cursor(row(viewPort), 0);
    props.codePosition = cursor(row(codePosition), 0);
    return down(props);
  }

  return [virtualCursor, viewPort, codePosition];
}
