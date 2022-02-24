import { createCanvas } from "./initializers/create-canvas";
import { Cursor } from "./models/cursor";
import { handleKey, handleClick } from "./handlers";
import { initFontAndGrid } from "./initializers/init-font-and-grid";
import { renderScreen } from "./renderers/render-screen";
import { TextContent } from "./models/text-content";

export const { canvas, context } = createCanvas();
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
