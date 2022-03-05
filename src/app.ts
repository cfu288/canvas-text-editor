import {
  handleClick,
  handleKey,
  handleScroll,
  handleToggleFileMenu,
} from "./handlers";
import { initializeCanvas } from "./initializers/initialize-canvas";
import {
  Cursor,
  FontContext,
  LineNumberContext,
  Scroll,
  TextContent,
  ThemeProvider,
} from "./models";
import renderScreen from "./renderers/render-screen";
import { FileRegistry } from "./services";

// Set up and inject dependencies
export const { canvas, context } = initializeCanvas();
export const themeProvider = new ThemeProvider();
export const fontContext = new FontContext(context, "Courier New", 14, 4);
export const textContent = new TextContent(fontContext);
export const lineNumberContext = new LineNumberContext(
  textContent,
  fontContext
);
export const cursor = new Cursor(textContent);
export const scroll = new Scroll(canvas, context, textContent);

// Connect render to dependencies
export function requestRender() {
  window.requestAnimationFrame(() =>
    renderScreen(
      canvas,
      context,
      fontContext,
      cursor,
      textContent,
      scroll,
      lineNumberContext,
      themeProvider
    )
  );
}

// Set up event handlers
canvas.addEventListener("keydown", handleKey);
canvas.addEventListener("mousedown", (e) =>
  handleClick(
    e,
    canvas,
    textContent,
    fontContext,
    lineNumberContext,
    cursor,
    scroll
  )
);
canvas.addEventListener("wheel", handleScroll);
window.addEventListener("resize", () => {
  initializeCanvas();
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
  handleToggleFileMenu();
});
document.getElementById("saveFileButton").addEventListener("click", () => {
  FileRegistry.saveFileContents(textContent.name, textContent).then(() => {
    alert(`${textContent.name} saved`);
  });
  handleToggleFileMenu();
});
document
  .getElementById("fileMenuButton")
  .addEventListener("click", handleToggleFileMenu);

setInterval(() => {
  if (document.activeElement === canvas) {
    cursor.toggleVisible();
  } else {
    cursor.setVisible(false);
  }
  requestRender();
}, 500);

// Initialize view by calling first render
canvas.focus();
fontContext.selectFont("Fira Code").catch((e) => {
  console.error(`Unable to load new font: ${e}`);
});
requestRender();
