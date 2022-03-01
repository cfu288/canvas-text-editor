import {
  textContent,
  cursor,
  canvas,
  context,
  scroller,
  requestRender,
} from "../app";
import { FontContext } from "../models/font-context";

export function getCharPositionFromCanvasPosition(
  fontContext: FontContext,
  clientX,
  clientY
): [x: number, y: number] {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((scroller.X + clientX - rect.left) / fontContext.width);
  const y =
    Math.round(
      (Math.abs(scroller.Y) + clientY - rect.top) / fontContext.height
    ) - 1;
  return [x, y];
}

export function handleClick(event: MouseEvent, fontContext: FontContext) {
  const [x, y]: [number, number] = getCharPositionFromCanvasPosition(
    fontContext,
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
