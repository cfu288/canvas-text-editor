import {
  handleClick,
  handleKey,
  handleScroll,
  setupNavBarHandlers,
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

// Load default font
fontContext
  .selectFont("Fira Code")
  .then(() => {
    console.log("Font loaded");
  })
  .catch((e) => {
    console.error(`Unable to load new font: ${e}`);
  });

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

// Set up nav menu button handlers
setupNavBarHandlers();

// Set up blinking cursor
setInterval(() => {
  if (document.activeElement === canvas) {
    cursor.toggleVisible();
  }
  requestRender();
}, 500);

// Initialize view by calling first render
canvas.focus();
requestRender();
