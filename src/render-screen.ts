import { colors } from "./colors";
import { charXY, cursor, textContent } from "./render";

export function renderText(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = colors.background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (const [index, row] of textContent.text.entries()) {
    context.fillStyle = colors.text;
    context.fillText(row?.join(""), 0, charXY[1] * (index + 1));
  }
}

export function renderCursor(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  // cursor
  // if (cursorVisible) {
  context.beginPath();
  context.moveTo(cursor.X * charXY[0] + 2, cursor.Y * charXY[1] + 2);
  context.lineTo(
    cursor.X * charXY[0] + 2,
    cursor.Y * charXY[1] + charXY[1] + 2
  );
  context.lineWidth = 2;
  context.strokeStyle = colors.cursor;
  context.stroke();
  // }
}

export function renderScreen(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  renderText(canvas, context);
  renderCursor(canvas, context);
}
