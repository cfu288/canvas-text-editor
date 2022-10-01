/**
 * A context object that can be used to set the font for a canvas and
 * calculate the height or width of a character given a specific font
 * and font size. This is the basis for creating a grid of characters.
 */
export class FontContext {
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

  // Base hight of a row of characters/single character. Includes any padding
  get height() {
    return this._fontSize + this._linePadding;
  }

  // Padding to add to the top and bottom of each row in pixels
  get linePadding() {
    return this._linePadding;
  }

  // Width of one character
  get width() {
    return this._width;
  }

  // Current font string to set canvas to
  get fontStyle() {
    return `${this._fontSize}px ${this._font}`;
  }

  // Selects a font to use from a list of available fonts. If the font is not available on a users system, it is downloaded async and then set
  selectFont = async (font: string) => {
    const f = FontOptions.filter((f) => f.name === font)?.[0];
    if (f) {
      // If font not available
      if (!document.fonts.check(`${this._fontSize}px ${f.name}`)) {
        const fontFile = new FontFace(f.name, `url(${f.url})`);
        return fontFile
          .load()
          .then((loadFont) => {
            document.fonts.add(loadFont);
            this._font = f.name;
            this.setFontStyle();
            return Promise.resolve(this.fontStyle);
          })
          .catch((e) => {
            return Promise.reject(e);
          });
      }
      // If font available
      this.setFontStyle();
      return Promise.resolve(this.fontStyle);
    } else {
      return Promise.reject(new Error("Font not available for this editor"));
    }
  };

  // Sets the canvas to use the currently selected font
  setFontStyle() {
    this.context.font = `${this._fontSize}px ${this._font}`;
  }
}

const FontOptions: { name: string; url: string | undefined }[] = [
  { name: "Courier New", url: undefined },
  {
    name: "Fira Code",
    url: "/canvas-text-editor/fira-code-v17-latin-regular.woff2",
  },
];
