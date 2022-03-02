import { createCanvas } from "./initializers/create-canvas";
import { Cursor } from "./models/cursor";
import { Scroll } from "./models/scroll";
import { handleKey, handleClick } from "./handlers";
import { FontContext } from "./models/font-context";
import { LineNumberContext } from "./models/line-number-context";
import renderScreen from "./renderers/render-screen";
import { TextContent } from "./models/text-content";
import { FileRegistry } from "./services/file-registry";
import { handleScroll } from "./handlers/handle-scroll";

export const { canvas, context } = createCanvas();
export const fontContext = new FontContext(context, "Courier New", 16, 4);
export const textContent = new TextContent(fontContext);
export const lineNumberContext = new LineNumberContext(
  textContent,
  fontContext
);
export const cursor = new Cursor(textContent);
export const scroller = new Scroll(canvas, context, textContent);

export function requestRender() {
  window.requestAnimationFrame(() =>
    renderScreen(
      canvas,
      context,
      fontContext,
      cursor,
      textContent,
      scroller,
      lineNumberContext
    )
  );
}

document.addEventListener("keydown", handleKey);
canvas.addEventListener("mousedown", (e) =>
  handleClick(e, fontContext, lineNumberContext)
);
window.addEventListener("wheel", handleScroll);
window.addEventListener("resize", () => {
  createCanvas();
  fontContext.setFontStyle();
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
