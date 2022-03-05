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

  selectFont = async (font: string) => {
    const f = FontOptions.filter((f) => f.name === font)?.[0];
    if (f) {
      if (!document.fonts.check(`${this._fontSize}px ${f.name}`)) {
        const fontFile = new FontFace(f.name, `url(${f.url})`);
        fontFile
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
    } else {
      return Promise.reject(new Error("Font not availible for this editor"));
    }
  };

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
