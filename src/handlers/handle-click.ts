import { requestRender } from "../app";
import {
  Cursor,
  TextContent,
  FontContext,
  LineNumberContext,
  Scroll,
} from "../models";

export function getCharPositionFromCanvasPosition(
  canvas: HTMLCanvasElement,
  fontContext: FontContext,
  lineNumberContext: LineNumberContext,
  scroll: Scroll,
  clientWidth: number,
  clientHeight: number
): [x: number, y: number] {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(
    (scroll.X + clientWidth - rect.left - lineNumberContext.offset) /
      fontContext.width
  );
  const y =
    Math.round(
      (Math.abs(scroll.Y) + clientHeight - rect.top) / fontContext.height
    ) - 1;
  return [x, y];
}

export function handleClick(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  textContent: TextContent,
  fontContext: FontContext,
  lineNumberContext: LineNumberContext,
  cursor: Cursor,
  scroll: Scroll
) {
  const [x, y]: [number, number] = getCharPositionFromCanvasPosition(
    canvas,
    fontContext,
    lineNumberContext,
    scroll,
    event.clientX,
    event.clientY
  );
  if (textContent.charAt(x, y)) {
    cursor.setPosition([x, y]);
  } else if (textContent.rowAt(y)) {
    cursor.setPosition([textContent.rowAt(y).length, y]);
  }
  requestRender();
}
