import { EditorHighlight } from "./editor-highlight";
import { TextRow } from "./text-row";
import { updateRowSyntaxHighlighting } from "../renderers/update-row-syntax-highlighing";
import { FontContext } from "./font-context";

export class TextContent {
  private _text: TextRow<string>[] = [new TextRow()];
  private _text_hl: EditorHighlight[][] = [[]];
  private _buffer: TextRow<string>[] = [];
  private _fileName = "untitled.txt";
  private _fontContext: FontContext;

  constructor(fontContext: FontContext, text?: TextRow<string>[]) {
    this._fontContext = fontContext;
    this._text = text || [new TextRow()];
  }

  get name() {
    return this._fileName;
  }

  /**
   * Return display height (rows * height of rows)
   */
  get contentHeight() {
    return this._text.length * this._fontContext.height;
  }

  get length() {
    return this._text.length;
  }

  get buffer() {
    return this._buffer;
  }

  get textHL() {
    return this._text_hl;
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

  /**
   * Convert to an array buffer for saving to file
   */
  toArrayBuffer() {
    const flattenedArr: string[] = [];
    for (const row of this._text) {
      flattenedArr.push([...row, "\n"].join(""));
    }
    const flattenedString = flattenedArr.join("");
    const buf = new ArrayBuffer(flattenedArr.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = flattenedArr.length; i < strLen; i++) {
      bufView[i] = flattenedString.charCodeAt(i);
    }
    return buf;
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

  *stream(): Generator<string, void, unknown> {
    for (const row of this._text) {
      for (const char of row) {
        yield char;
      }
      yield "\n";
    }
  }

  peekableStream(): PeekableGenerator<string> {
    const stream = this.stream();
    let state = stream.next();

    const peekGen: PeekableGenerator<string> = (function* () {
      while (!state.done) {
        const current = state.value;
        state = stream.next();
        yield current;
      }
      return state.value;
    })();
    peekGen.peek = () => state;

    return peekGen;
  }
}

type PeekableGenerator<T> = Generator<T | void, void, unknown> & {
  peek?: () => IteratorResult<T, void>;
};
