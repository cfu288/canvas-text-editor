import { createCanvas } from "./initializers/create-canvas";
import { Cursor } from "./models/cursor";
import { Scroll } from "./models/scroll";
import { handleKey, handleClick } from "./handlers";
import { initFontAndGrid } from "./initializers/init-font-and-grid";
import { renderScreen } from "./renderers/render-screen";
import { TextContent } from "./models/text-content";
import { FileRegistry } from "./services/file-registry";
import { handleScroll } from "./handlers/handle-scroll";

export const { canvas, context } = createCanvas();
export const { font, fontSize, linePadding, charXY } = initFontAndGrid(context);
export const textContent = new TextContent(charXY);
export const cursor = new Cursor(canvas, context, textContent);
export const scroller = new Scroll(canvas, context, textContent);

export function requestRender() {
  window.requestAnimationFrame(() => renderScreen(canvas, context));
}

document.addEventListener("keydown", handleKey);
canvas.addEventListener("mousedown", handleClick);
window.addEventListener("wheel", handleScroll);
window.addEventListener("resize", () => {
  createCanvas();
  initFontAndGrid(context);
  requestRender();
});
document.getElementById("openFileButton").addEventListener("click", () => {
  FileRegistry.promptFileSelect().then((file) =>
    FileRegistry.getFileContents(file).then((data) => {
      textContent.readFromFile(file.name, data);
      requestRender();
    })
  );
});
document.getElementById("saveFileButton").addEventListener("click", () => {
  FileRegistry.saveFileContents(textContent.name, textContent).then(() => {
    alert(`${textContent.name} saved`);
  });
});

requestRender();
