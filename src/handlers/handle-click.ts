import {
  textContent,
  cursor,
  canvas,
  context,
  charXY,
  scroller,
  requestRender,
} from "../app";

export function getCharPositionFromCanvasPosition(
  clientX,
  clientY
): [x: number, y: number] {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((scroller.X + clientX - rect.left) / charXY[0]);
  const y =
    Math.round((Math.abs(scroller.Y) + clientY - rect.top) / charXY[1]) - 1;
  return [x, y];
}

export function handleClick(event: MouseEvent) {
  const [x, y]: [number, number] = getCharPositionFromCanvasPosition(
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
