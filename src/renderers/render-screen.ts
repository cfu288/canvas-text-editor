import { colors } from "../configuration/colors";
import { EditorHighlight } from "../models/editor-highlight";
import { Cursor } from "../models/cursor";
import { TextContent } from "../models/text-content";
import { Scroll } from "../models/scroll";
import { FontContext } from "../models/font-context";
import { LineNumberContext } from "../models/line-number-context";

function renderText(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  charXY: FontContext,
  textContent: TextContent,
  scroller: Scroll,
  lineNumberContext: LineNumberContext
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

    context.save();
    // line numbers
    context.fillStyle = colors.number;
    context.fillText(
      lineNumberContext.generateLineNumberText(indexY),
      0,
      charXY.height * (indexY + 1)
    );
    context.restore();

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
        lineNumberContext.offset + charXY.width * indexX,
        charXY.height * (indexY + 1)
      );
      context.restore();
    }
  }
}

function renderCursor(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  fontContext: FontContext,
  cursor: Cursor,
  lineNumberContext: LineNumberContext
) {
  context.save();
  context.beginPath();
  context.moveTo(
    lineNumberContext.offset + cursor.X * fontContext.width + 2,
    cursor.Y * fontContext.height + 1
  );
  context.lineTo(
    lineNumberContext.offset + cursor.X * fontContext.width + 2,
    cursor.Y * fontContext.height + fontContext.height + 4
  );
  context.lineWidth = 2;
  context.strokeStyle = colors.cursor;
  context.stroke();
  context.restore();
}

export default function renderScreen(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  fontContext: FontContext,
  cursor: Cursor,
  textContent: TextContent,
  scroller: Scroll,
  lineNumberContext: LineNumberContext
) {
  renderText(
    canvas,
    context,
    fontContext,
    textContent,
    scroller,
    lineNumberContext
  );
  renderCursor(canvas, context, fontContext, cursor, lineNumberContext);
}
