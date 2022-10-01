import {
  handleClick,
  handleKey,
  handleScroll,
  handleToggleNavMenu,
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
document.getElementById("openFileButton")?.addEventListener("click", () => {
  FileRegistry.promptFileSelect().then((file) =>
    FileRegistry.getFileContents(file).then((data) => {
      textContent.readFromFile(file.name, data);
      requestRender();
    })
  );
  handleToggleNavMenu("fileMenu");
});
document.getElementById("saveFileButton")?.addEventListener("click", () => {
  FileRegistry.saveFileContents(textContent.name, textContent).then(() => {
    alert(`${textContent.name} saved`);
  });
  handleToggleNavMenu("fileMenu");
});
document
  .getElementById("fileMenuButton")
  ?.addEventListener("click", () => handleToggleNavMenu("fileMenu"));
document
  .getElementById("preferencesMenuButton")
  ?.addEventListener("click", () => handleToggleNavMenu("preferencesMenu"));

document
  .getElementById("font-item-courier-new")
  ?.addEventListener("click", () => {
    fontContext
      .selectFont("Courier New")
      .then(() => {
        console.log("font set");
      })
      .catch((e) => {
        console.error(`Unable to load new font: ${e}`);
      });
  });

document
  .getElementById("font-item-fira-code")
  ?.addEventListener("click", () => {
    fontContext
      .selectFont("Fira Code")
      .then(() => {
        console.log("font set");
      })
      .catch((e) => {
        console.error(`Unable to load new font: ${e}`);
      });
  });

setInterval(() => {
  if (document.activeElement === canvas) {
    cursor.toggleVisible();
  }
  requestRender();
}, 500);

// Initialize view by calling first render
canvas.focus();
fontContext.selectFont("Fira Code").catch((e) => {
  console.error(`Unable to load new font: ${e}`);
});
requestRender();
