export function createCanvas() {
  let ratio = window.devicePixelRatio;
  let cv = document.getElementById("myCanvas") as HTMLCanvasElement;
  let div = document.getElementById("canvasContainer");
  cv.width = div.clientWidth;
  cv.height = div.clientHeight;
  // get current size of the canvas
  let rect = div.getBoundingClientRect();
  // increase the actual size of our canvas
  cv.width = rect.width * ratio;
  cv.height = rect.height * ratio;
  // ensure all drawing operations are scaled
  cv.getContext("2d").scale(ratio, ratio);
  // scale everything down using CSS
  cv.style.width = rect.width + "px";
  cv.style.height = rect.height + "px";

  return { canvas: cv, context: cv.getContext("2d") };
}
