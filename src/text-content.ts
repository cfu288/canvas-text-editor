import { EditorHighlight } from "./render-screen";
export class TextContent {
  private _text: TextRow<string>[] = [new TextRow()];
  private _text_hl: EditorHighlight[][] = [[]];
  constructor() {}

  get text(): TextRow<string>[] {
    return this._text;
  }

  get textHL() {
    return this._text_hl;
  }

  rowAt(y: number): TextRow<string> {
    return this._text[y];
  }

  charAt(x: number, y: number) {
    return this._text?.[y].text?.[x];
  }

  insertNewRowAt(y: number, row = new TextRow<string>()): void {
    this._text.splice(y, 0, row);
  }

  replaceRowAt(y: number, withRow: TextRow<string>): void {
    this._text[y] = withRow;
  }

  removeRowAt(y: number): void {
    this._text.splice(y, 1);
  }
}

export class TextRow<T> {
  private _text: T[] = [];

  constructor(array?: T[]) {
    this._text = array || [];
  }

  get text(): T[] {
    return this._text;
  }

  get length(): number {
    return this._text.length;
  }

  entries(): IterableIterator<[number, T]> {
    return this._text.entries();
  }

  concat(row: TextRow<T>): TextRow<T> {
    this._text.concat(row.text);
    return this;
  }

  concatRaw(row: T[]): TextRow<T> {
    this._text.concat(row);
    return this;
  }

  insertValueAt(index: number, value: T): void {
    this._text.splice(index, 0, value);
  }

  push(value: T): void {
    this._text.push(value);
  }

  pop(): void {
    this._text.pop();
  }

  deleteValueAt(index: number): void {
    this._text.splice(index, 1);
  }
}
