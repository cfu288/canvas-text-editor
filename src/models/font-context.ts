/**
 * A context object that can be used to set the font for a canvas and
 * calculate the height or width of a character given a specific font
 * and font size. This is the basis for creating a grid of characters.
 */
export class FontContext {
  private _height: number;
  private _width: number;
  private _fontSize: number;
  private _linePadding: number;
  private _font = "Courier New";
  private context: CanvasRenderingContext2D;

  constructor(
    context: CanvasRenderingContext2D,
    font: string,
    fontSize: number,
    linePadding: number
  ) {
    this._font = font || "Courier New";
    this._fontSize = fontSize;
    context.font = `${this._fontSize}px ${this._font}`;
    this._width = context.measureText(["a"].join("")).width;
    this._linePadding = linePadding;
    this.context = context;
  }

  get height() {
    return this._fontSize + this._linePadding;
  }

  get linePadding() {
    return this._linePadding;
  }

  get width() {
    return this._width;
  }

  get fontStyle() {
    return `${this._fontSize}px ${this._font}`;
  }

  setFontStyle() {
    this.context.font = `${this._fontSize}px ${this._font}`;
  }
}
