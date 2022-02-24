import { colors } from "./colors";
import { charXY, cursor, textContent } from "./render";
import { updateRowSyntaxHighlighing } from "./update-row-syntax-highlighing";

export enum EditorHighlight {
  HL_NORMAL,
  HL_NUMBER,
  HL_STRING,
  HL_COMMENT,
  HL_KEYWORD1,
  HL_KEYWORD2,
}

export const KEYWORDS = [
  "function",
  "for",
  "finally",
  "in",
  "null",
  "throw",
  "try",
  "else",
  "if",
  "return",
  "const",
  "let",
  "var",
];

export function isComment(r: string[]) {
  return r?.[0] === "/" && r?.[1] === "/";
}

export function isDigit(s: string) {
  return !isNaN(Number(s));
}

export function isSeparator(s: string) {
  return isWhitespace(s) || s === "\0" || !!s.match("/^[,.()+-/*=~%<>;]/");
}

function isWhitespace(s: string) {
  return s.trim().length === 0;
}

export function renderText(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = colors.background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (const [indexY, row] of textContent.text.entries()) {
    // move this to update text row
    textContent.textHL[indexY] = updateRowSyntaxHighlighing(row.text);

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
