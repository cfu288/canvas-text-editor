import { textContent, cursor, canvas, scroller, requestRender } from "../app";
import { FontContext } from "../models/font-context";
import { LineNumberContext } from "../models/line-number-context";

export function getCharPositionFromCanvasPosition(
  fontContext: FontContext,
  lineNumberContext: LineNumberContext,
  clientX,
  clientY
): [x: number, y: number] {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(
    (scroller.X + clientX - rect.left - lineNumberContext.offset) /
      fontContext.width
  );
  const y =
    Math.round(
      (Math.abs(scroller.Y) + clientY - rect.top) / fontContext.height
    ) - 1;
  return [x, y];
}

export function handleClick(
  event: MouseEvent,
  fontContext: FontContext,
  lineNumberContext: LineNumberContext
) {
  const [x, y]: [number, number] = getCharPositionFromCanvasPosition(
    fontContext,
    lineNumberContext,
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
