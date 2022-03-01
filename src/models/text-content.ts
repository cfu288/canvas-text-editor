import { EditorHighlight } from "./editor-highlight";
import { TextRow } from "./text-row";
import { updateRowSyntaxHighlighting } from "../renderers/update-row-syntax-highlighing";
import { FontContext } from "./font-context";

export class TextContent {
  private _text: TextRow<string>[] = [new TextRow()];
  private _text_hl: EditorHighlight[][] = [[]];
  private _buffer: TextRow<string>[] = [];
  private _fileName: string = "untitled.txt";
  private _fontContext: FontContext;

  constructor(fontContext: FontContext) {
    this._fontContext = fontContext;
  }

  get contentHeight() {
    return this._text.length * this._fontContext.height;
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
    const flattenedArr: string[] = [];
    for (const row of this._text) {
      flattenedArr.push([...row, "\n"].join(""));
    }
    const flattenedString = flattenedArr.join("");
    let buf = new ArrayBuffer(flattenedArr.length); // 2 bytes for each char
    let bufView = new Uint8Array(buf);
    for (let i = 0, strLen = flattenedArr.length; i < strLen; i++) {
      bufView[i] = flattenedString.charCodeAt(i);
    }
    return buf;
  }

  get length() {
    return this._text.length;
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
    this._text_hl.splice(y, 0, updateRowSyntaxHighlighting(row));
    this._text.splice(y, 0, row);
  }

  insertNewRowsAt(y: number, rows: TextRow<string>[] = []): void {
    this._text.splice(y, 0, ...rows);
  }

  replaceRowAt(y: number, withRow: TextRow<string>): void {
    this._text_hl[y] = updateRowSyntaxHighlighting(withRow);
    this._text[y] = withRow;
  }

  removeRowAt(y: number): void {
    this._text.splice(y, 1);
  }

  *entries(): Generator<[number, TextRow<string>], void, unknown> {
    for (const [i, item] of this._text.entries()) {
      yield [i, item];
    }
  }
}
