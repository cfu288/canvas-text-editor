import { EditorHighlight } from "./editor-highlight";
import { TextRow } from "./text-row";
import { updateRowSyntaxHighlighting } from "../renderers/update-row-syntax-highlighing";

export class TextContent {
  private _text: TextRow<string>[] = [new TextRow()];
  private _text_hl: EditorHighlight[][] = [[]];
  private _buffer: TextRow<string>[] = [];
  private _fileName: string = "untitled.txt";
  private _charXY: [number, number];
  constructor(charXY: [number, number]) {
    this._charXY = charXY;
  }

  get contentHeight() {
    return this._text.length * this._charXY[1];
  }

  readFromFile(name: string, s: string) {
    this._fileName = name || "untitled.txt";
    const rows = s.split("\n");
    const rowOfRows = [];
    const rowOfRowsHL = [];
    for (const rowIn of rows) {
      const r = new TextRow(rowIn.split(""));
      rowOfRows.push(r);
      rowOfRowsHL.push(updateRowSyntaxHighlighting(r));
    }
    this._text = rowOfRows;
    this._text_hl = rowOfRowsHL;
  }

  get name() {
    return this._fileName;
  }

  toArrayBuffer() {
    const flattenedArr: string = this._text
      .reduce((prev, curr) => prev.concat([...curr.text, "\n"]), [])
      .join("");
    var buf = new ArrayBuffer(flattenedArr.length); // 2 bytes for each char
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
      return row.get(x);
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