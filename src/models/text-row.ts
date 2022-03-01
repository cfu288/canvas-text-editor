import { GapBuffer } from "./gap-buffer";

export class TextRow<T> {
  private _text: GapBuffer<T>;

  constructor(array?: T[]) {
    this._text = new GapBuffer<T>(array || []);
  }

  clone() {
    return new TextRow([...this._text]);
  }

  /**
   * @deprecated
   * Makes a copy of the internal array. Avoid in hot loops
   */
  get text(): T[] {
    return [...this._text];
  }

  get(ix: number) {
    return this._text.get(ix);
  }

  /**
   * An internal method only used by concat, need to improve api to hide this
   */
  get gb() {
    return this._text;
  }

  get length(): number {
    return this._text.length;
  }

  charAtIndex(i: number) {
    return this._text.get(i);
  }

  entries() {
    return this._text.entries();
  }

  concat(row: TextRow<T>): TextRow<T> {
    this._text.concat(row.gb);
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
}
