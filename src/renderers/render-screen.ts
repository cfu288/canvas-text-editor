import {
  EditorHighlight,
  Cursor,
  TextContent,
  Scroll,
  FontContext,
  ThemeProvider,
  LineNumberContext,
} from "../models";

function renderText(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  fontContext: FontContext,
  textContent: TextContent,
  scroller: Scroll,
  lineNumberContext: LineNumberContext,
  themeProvider: ThemeProvider,
  cursor: Cursor
) {
  // Store the current transformation matrix
  context.save();
  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Restore the transform
  context.restore();

  context.fillStyle = themeProvider.theme.background;
  context.fillRect(0, Math.abs(scroller.Y), canvas.width, canvas.height);

  const botBorder = canvas.getBoundingClientRect().height - scroller.Y;
  for (const [indexY, row] of textContent.entries()) {
    const topBorder = fontContext.height * indexY + fontContext.height;
    const lineYPos = fontContext.height * (indexY + 1);
    // Only render if text will be seen on screen. Ignore off screen renders
    if (topBorder >= Math.abs(scroller.Y) && botBorder > lineYPos) {
      context.fillStyle = themeProvider.theme.text;

      // Line highlight
      if (cursor.Y === indexY) {
        context.save();
        context.fillStyle = themeProvider.theme.line;
        context.globalAlpha = 0.4;
        context.fillRect(
          0,
          fontContext.height * indexY,
          canvas.width,
          fontContext.height + fontContext.linePadding + fontContext.linePadding
        );
        context.restore();
      }

      // Line numbers
      context.save();
      context.fillStyle = themeProvider.theme.number;
      context.fillText(
        lineNumberContext.generateLineNumberText(indexY),
        0,
        lineYPos
      );
      context.restore();

      for (const [indexX, char] of row.entries()) {
        context.save();
        switch (textContent.textHL[indexY][indexX]) {
          case EditorHighlight.HL_NUMBER:
            context.fillStyle = themeProvider.theme.number;
            break;
          case EditorHighlight.HL_STRING:
            context.fillStyle = themeProvider.theme.string;
            break;
          case EditorHighlight.HL_COMMENT:
            context.fillStyle = themeProvider.theme.comment;
            break;
          case EditorHighlight.HL_KEYWORD1:
            context.fillStyle = themeProvider.theme.keyword;
            break;
          case EditorHighlight.HL_KEYWORD2:
            context.fillStyle = themeProvider.theme.link;
            break;
          default:
            context.fillStyle = themeProvider.theme.text;
            break;
        }

        context.fillText(
          char,
          lineNumberContext.offset + fontContext.width * indexX,
          lineYPos
        );
        context.restore();
      }
    }
  }
}

function renderCursor(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  fontContext: FontContext,
  cursor: Cursor,
  lineNumberContext: LineNumberContext,
  themeProvider: ThemeProvider
) {
  if (cursor.isVisible) {
    context.save();
    context.beginPath();
    context.moveTo(
      lineNumberContext.offset + cursor.X * fontContext.width,
      cursor.Y * fontContext.height + 1
    );
    context.lineTo(
      lineNumberContext.offset + cursor.X * fontContext.width,
      cursor.Y * fontContext.height +
        fontContext.height +
        2 * fontContext.linePadding
    );
    context.lineWidth = 2;
    context.strokeStyle = themeProvider.theme.cursor;
    context.stroke();
    context.restore();
  }
}

export default function renderScreen(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  fontContext: FontContext,
  cursor: Cursor,
  textContent: TextContent,
  scroller: Scroll,
  lineNumberContext: LineNumberContext,
  themeProvider: ThemeProvider
) {
  renderText(
    canvas,
    context,
    fontContext,
    textContent,
    scroller,
    lineNumberContext,
    themeProvider,
    cursor
  );
  renderCursor(
    canvas,
    context,
    fontContext,
    cursor,
    lineNumberContext,
    themeProvider
  );
}
