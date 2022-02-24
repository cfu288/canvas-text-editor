export function initFontAndGrid(context: CanvasRenderingContext2D) {
  // Initialize font size
  const fontSize = 16;
  const linePadding = 4;
  const font = "Courier New";
  context.font = `${fontSize}px ${font}`;

  // Width and height of a single character, used to determine grid
  const charXY: [width: number, height: number] = [
    context.measureText(["a"].join("")).width,
    fontSize + linePadding,
  ];
  return {
    font,
    fontSize,
    linePadding,
    charXY,
  };
}
