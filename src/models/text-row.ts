import { GapBuffer } from "./gap-buffer";
export class TextRow<T> {
  private __text: GapBuffer<T>;

  constructor(array?: T[]) {
    this.__text = new GapBuffer<T>(array || []);
  }

  clone() {
    return new TextRow([...this.__text]);
  }

  /**
   * @deprecated
   * Makes a copy of the internal array. Avoid in hot loops
   */
  get text(): T[] {
    return [...this.__text];
  }

  get(ix: number) {
    return this.__text.get(ix);
  }

  /**
   * An internal method only used by concat, need to improve api to hide this
   */
  get gb() {
    return this.__text;
  }

  get length(): number {
    return this.__text.length;
  }

  charAtIndex(i: number) {
    return this.__text.get(i);
  }

  entries() {
    return this.__text.entries();
  }

  concat(row: TextRow<T>): TextRow<T> {
    this.__text.concat(row.gb);
    return this;
  }

  insertValueAt(index: number, value: T): void {
    this.__text.insert(index, value);
  }

  push(value: T): void {
    this.__text.push(value);
  }

  pop(): void {
    this.__text.pop();
  }

  deleteValueAt(index: number): void {
    this.__text.delete(index);
  }
}
