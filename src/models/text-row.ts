import { GapBuffer } from "./gap-buffer";

export class TextRow<T> {
  private _text: GapBuffer<T>;

  constructor(array?: T[]) {
    this._text = new GapBuffer<T>(array || []);
  }

  clone() {
    return new TextRow([...this._text]);
  }

  get(ix: number) {
    return this._text.get(ix);
  }

  get length(): number {
    return this._text.length;
  }

  charAtIndex(i: number) {
    return this._text.get(i);
  }

  slice(ix: number, ix2: number) {
    return this._text.slice(ix, ix2);
  }

  entries(): Generator<[number, T], void, unknown> {
    return this._text.entries();
  }

  concat(row: TextRow<T>): TextRow<T> {
    //TODO: make more efficient with .pushArray or something
    for (const item of row) {
      this._text.push(item);
    }
    return this;
  }

  insertValueAt(index: number, value: T): void {
    this._text.insert(index, value);
  }

  push(value: T): void {
    this._text.push(value);
  }

  pop(): void {
    this._text.pop();
  }

  deleteValueAt(index: number): void {
    this._text.delete(index);
  }

  *[Symbol.iterator]() {
    for (const item of this._text) {
      yield item;
    }
  }
}
