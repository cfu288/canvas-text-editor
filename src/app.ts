import { createCanvas } from "./initializers/create-canvas";
import { Cursor } from "./models/cursor";
import { Scroll } from "./models/scroll";
import { handleKey, handleClick } from "./handlers";
import { initFontAndGrid } from "./initializers/init-font-and-grid";
import { renderScreen } from "./renderers/render-screen";
import { TextContent } from "./models/text-content";
import { FileRegistry } from "./services/file-registry";

export const { canvas, context } = createCanvas();
export const { font, fontSize, linePadding, charXY } = initFontAndGrid(context);
export const cursor = new Cursor();
export const textContent = new TextContent();
export const scroller = new Scroll(context);
console.log("scroller init");

document.addEventListener("keydown", handleKey);
canvas.addEventListener("mousedown", handleClick);
window.addEventListener("resize", () => {
  createCanvas();
  initFontAndGrid(context);
  window.requestAnimationFrame(() => renderScreen(canvas, context));
});

window.requestAnimationFrame(() => renderScreen(canvas, context));

document.getElementById("openFileButton").addEventListener("click", () => {
  FileRegistry.promptFileSelect().then((file) =>
    FileRegistry.getFileContents(file).then((data) => {
      textContent.readFromFile(file.name, data);
      window.requestAnimationFrame(() => renderScreen(canvas, context));
    })
  );
});

document.getElementById("saveFileButton").addEventListener("click", () => {
  FileRegistry.saveFileContents(textContent.name, textContent).then(() => {
    alert(`${textContent.name} saved`);
  });
});
