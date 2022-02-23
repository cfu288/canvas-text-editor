// text data
// export const text: string[][] = [[]];
export class TextContent {
  private _text: string[][] = [[]];
  constructor() {}

  get text() {
    return this._text;
  }

  rowAt(y: number) {
    return this._text[y];
  }

  charAt(x: number, y: number) {
    return this._text?.[y]?.[x];
  }

  insertNewRowAt(y: number) {
    this._text.splice(y, 0, []);
  }

  removeRowAt(y: number) {
    this._text.splice(y, 1);
  }
}
