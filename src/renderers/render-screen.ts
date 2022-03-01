import { colors } from "../configuration/colors";
import { charXY, cursor, textContent, scroller } from "../app";
import { EditorHighlight } from "../models/editor-highlight";

export function renderText(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  // Store the current transformation matrix
  context.save();

  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  context.restore();

  context.fillStyle = colors.background;
  context.fillRect(0, Math.abs(scroller.Y), canvas.width, canvas.height);

  for (const [indexY, row] of textContent.text.entries()) {
    // move this to update text row

    context.fillStyle = colors.text;
    for (const [indexX, char] of row.entries()) {
      context.save();
      if (textContent.textHL[indexY][indexX] === EditorHighlight.HL_NUMBER) {
        context.fillStyle = colors.number;
      } else if (
        textContent.textHL[indexY][indexX] === EditorHighlight.HL_STRING
      ) {
        context.fillStyle = colors.string;
      } else if (
        textContent.textHL[indexY][indexX] === EditorHighlight.HL_COMMENT
      ) {
        context.fillStyle = colors.comment;
      } else if (
        textContent.textHL[indexY][indexX] === EditorHighlight.HL_KEYWORD1
      ) {
        context.fillStyle = colors.keyword;
      } else if (
        textContent.textHL[indexY][indexX] === EditorHighlight.HL_KEYWORD2
      ) {
        context.fillStyle = colors.link;
      }
      context.fillText(char, charXY[0] * indexX, charXY[1] * (indexY + 1));
      context.restore();
    }
  }
}

export function renderCursor(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  context.save();
  context.beginPath();
  context.moveTo(cursor.X * charXY[0] + 2, cursor.Y * charXY[1] + 1);
  context.lineTo(
    cursor.X * charXY[0] + 2,
    cursor.Y * charXY[1] + charXY[1] + 4
  );
  context.lineWidth = 2;
  context.strokeStyle = colors.cursor;
  context.stroke();
  context.restore();
}

export function renderScreen(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  renderText(canvas, context);
  renderCursor(canvas, context);
}
