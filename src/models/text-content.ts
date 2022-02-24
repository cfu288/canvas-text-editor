import { EditorHighlight } from "./editor-highlight";
export class TextContent {
  private _text: TextRow<string>[] = [new TextRow()];
  private _text_hl: EditorHighlight[][] = [[]];
  private _buffer: TextRow<string>[] = [];
  constructor() {}

  get length() {
    return this.text.length;
  }

  get buffer() {
    return this._buffer;
  }

  addRowToBuffer(row: TextRow<string>) {
    this._buffer.push(row.clone());
  }

  setBuffer(rows: TextRow<string>[]) {
    this._buffer = rows.map((r) => r.clone());
  }

  clearBuffer() {
    this._buffer = [];
  }

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
    const row = this._text[y];
    if (row) {
      return row.text[x];
    }
    return undefined;
  }

  insertNewRowAt(y: number, row = new TextRow<string>()): void {
    this._text.splice(y, 0, row);
  }

  insertNewRowsAt(y: number, rows: TextRow<string>[] = []): void {
    this._text.splice(y, 0, ...rows);
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

  clone() {
    return new TextRow([...this._text]);
  }

  get text(): T[] {
    return this._text;
  }

  get length(): number {
    return this._text.length;
  }

  charAtIndex(i: number) {
    return this._text[i];
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
