export class FontContext {
  height: number;
  width: number;
  fontSize: number;
  linePadding: number;
  font: string = "Courier New";
  context: CanvasRenderingContext2D;

  constructor(
    context: CanvasRenderingContext2D,
    font: string,
    fontSize: number,
    linePadding: number
  ) {
    this.font = font || "Courier New";
    this.fontSize = fontSize;
    context.font = `${this.fontSize}px ${this.font}`;
    this.width = context.measureText(["a"].join("")).width;
    this.linePadding = linePadding;
    this.height = fontSize + linePadding;
    this.context = context;
  }

  get fontStyle() {
    return `${this.fontSize}px ${this.font}`;
  }

  setFontStyle() {
    this.context.font = `${this.fontSize}px ${this.font}`;
  }
}
