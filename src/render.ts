import { createCanvas } from "./create-canvas";
import { Cursor } from "./cursor";
import { handleKey } from "./handle-key";
import { handleClick } from "./handle-click";
import { renderScreen } from "./render-screen";
import { TextContent } from "./text-content";

export const { canvas, context } = createCanvas();

function initFontAndGrid(context: CanvasRenderingContext2D) {
  // Initialize font size
  const fontSize = 16;
  const linePadding = 4;
  const font = "Courier New";
  context.font = `${fontSize}px ${font}`;

  // Width and height of a single character, used to determine grid
  const charXY: [width: number, height: number] = [
    context.measureText(["a"].join("")).width, // Get width of one unicode char
    fontSize + linePadding,
  ];
  return {
    font,
    fontSize,
    linePadding,
    charXY,
  };
}
export const { font, fontSize, linePadding, charXY } = initFontAndGrid(context);
export const cursor = new Cursor();
export const textContent = new TextContent();

document.addEventListener("keydown", handleKey);
canvas.addEventListener("mousedown", handleClick);
window.addEventListener("resize", () => {
  createCanvas();
  initFontAndGrid(context);
  window.requestAnimationFrame(() => renderScreen(canvas, context));
});

window.requestAnimationFrame(() => renderScreen(canvas, context));
