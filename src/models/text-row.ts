import { GapBuffer } from "./gap-buffer";

export class TextRow<T> {
  private _text: GapBuffer<T>;

  constructor(array?: T[]) {
    this._text = new GapBuffer<T>(array || []);
  }

  get length(): number {
    return this._text.length;
  }

  /**
   * Get item in row at a specific index
   * @param ix index to fetch item from
   * @returns item at index
   */
  get(ix: number) {
    return this._text.get(ix);
  }

  slice(ix: number, ix2: number): T[] {
    return this._text.slice(ix, ix2);
  }

  insertValueAt(index: number, value: T): void {
    this._text.insert(index, value);
  }

  deleteAt(index: number): void {
    this._text.delete(index);
  }

  push(value: T): void {
    this._text.push(value);
  }

  pop(): T {
    return this._text.pop();
  }

  concat(row: TextRow<T>): TextRow<T> {
    //TODO: make more efficient with .pushArray or something
    for (const item of row) {
      this._text.push(item);
    }
    return this;
  }

  clone() {
    return new TextRow([...this]);
  }

  *[Symbol.iterator]() {
    for (const item of this._text) {
      yield item;
    }
  }

  entries(): Generator<[number, T], void, unknown> {
    return this._text.entries();
  }
}
