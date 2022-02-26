import { EditorHighlight } from "./editor-highlight";
export class TextContent {
  private _text: TextRow<string>[] = [new TextRow()];
  private _text_hl: EditorHighlight[][] = [[]];
  private _buffer: TextRow<string>[] = [];
  private _fileName: string = "untitled.txt";
  constructor() {}

  readFromFile(name: string, s: string) {
    this._fileName = name || "untitled.txt";
    const rows = s.split("\n");
    const rowOfRows = [];
    for (const rowIn of rows) {
      rowOfRows.push(new TextRow(rowIn.split("")));
    }
    this._text = rowOfRows;
  }

  get name() {
    return this._fileName;
  }

  toArrayBuffer() {
    const flattenedArr: string = this._text
      .reduce((prev, curr) => prev.concat([...curr.text, "\n"]), [])
      .join("");
    var buf = new ArrayBuffer(flattenedArr.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (let i = 0, strLen = flattenedArr.length; i < strLen; i++) {
      bufView[i] = flattenedArr.charCodeAt(i);
    }
    return buf;
  }

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
