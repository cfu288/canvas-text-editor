export function initializeCanvas() {
  const ratio = window.devicePixelRatio;
  const cv = document.getElementById("myCanvas") as HTMLCanvasElement;
  const div = document.getElementById("canvasContainer") as HTMLDivElement;
  cv.width = div.clientWidth;
  cv.height = div.clientHeight;
  // get current size of the canvas
  const rect = div.getBoundingClientRect();
  // increase the actual size of our canvas
  cv.width = rect.width * ratio;
  cv.height = rect.height * ratio;

  const context = cv.getContext("2d");
  if (!context) {
    throw Error("Unable to get 2d context");
  }

  // ensure all drawing operations are scaled
  context.scale(ratio, ratio);
  // scale everything down using CSS
  cv.style.width = rect.width + "px";
  cv.style.height = rect.height + "px";

  return { canvas: cv, context };
}
