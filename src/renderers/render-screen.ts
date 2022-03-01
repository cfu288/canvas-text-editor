import { colors } from "../configuration/colors";
import { EditorHighlight } from "../models/editor-highlight";
import { Cursor } from "../models/cursor";
import { TextContent } from "../models/text-content";
import { Scroll } from "../models/scroll";
import { FontContext } from "../models/font-context";

function renderText(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  charXY: FontContext,
  textContent: TextContent,
  scroller: Scroll
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

  for (const [indexY, row] of textContent.entries()) {
    context.fillStyle = colors.text;
    for (const [indexX, char] of row.entries()) {
      context.save();
      switch (textContent.textHL[indexY][indexX]) {
        case EditorHighlight.HL_NUMBER:
          context.fillStyle = colors.number;
          break;
        case EditorHighlight.HL_STRING:
          context.fillStyle = colors.string;
          break;
        case EditorHighlight.HL_COMMENT:
          context.fillStyle = colors.comment;
          break;
        case EditorHighlight.HL_KEYWORD1:
          context.fillStyle = colors.keyword;
          break;
        case EditorHighlight.HL_KEYWORD2:
          context.fillStyle = colors.link;
          break;
        default:
          context.fillStyle = colors.text;
          break;
      }
      context.fillText(
        char,
        charXY.width * indexX,
        charXY.height * (indexY + 1)
      );
      context.restore();
    }
  }
}

function renderCursor(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  charXY: FontContext,
  cursor: Cursor
) {
  context.save();
  context.beginPath();
  context.moveTo(cursor.X * charXY.width + 2, cursor.Y * charXY.height + 1);
  context.lineTo(
    cursor.X * charXY.width + 2,
    cursor.Y * charXY.height + charXY.height + 4
  );
  context.lineWidth = 2;
  context.strokeStyle = colors.cursor;
  context.stroke();
  context.restore();
}

export default function renderScreen(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  charXY: FontContext,
  cursor: Cursor,
  textContent: TextContent,
  scroller: Scroll
) {
  renderText(canvas, context, charXY, textContent, scroller);
  renderCursor(canvas, context, charXY, cursor);
}
