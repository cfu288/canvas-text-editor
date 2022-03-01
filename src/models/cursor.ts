import { TextContent } from "./text-content";

export class Cursor {
  private cursorX: number = 0;
  private cursorY: number = 0;
  private cursorVisible: boolean = true;
  private textContent: TextContent;

  constructor(textArea: TextContent) {
    this.textContent = textArea;
  }

  get X(): number {
    return this.cursorX;
  }

  get Y(): number {
    return this.cursorY;
  }

  setPosition([x, y]) {
    this.cursorX = x;
    this.cursorY = y;
  }

  get position() {
    return [this.cursorX, this.cursorY];
  }

  moveRight(by: number = 1) {
    if (this.textContent.charAt(this.cursorX, this.cursorY)) {
      this.cursorX += by;
    } else if (this.textContent.rowAt(this.cursorY)) {
      this.setPosition([
        this.textContent.rowAt(this.cursorY).length,
        this.cursorY,
      ]);
    }
  }

  moveLeft(by: number = 1) {
    if (this.cursorX - by >= 0) {
      this.cursorX -= by;
    }
  }

  moveUp(by: number = 1) {
    if (this.cursorY - by >= 0) {
      const charAbove = this.textContent.charAt(this.cursorX, this.cursorY - 1);
      const rowAbove = this.textContent.rowAt(this.cursorY - 1);
      if (charAbove) {
        this.cursorY -= by;
      } else if (rowAbove) {
        this.setPosition([rowAbove.length, this.cursorY - 1]);
      }
    }
  }

  moveDown(by: number = 1) {
    const charBelow = this.textContent.charAt(this.cursorX, this.cursorY + 1);
    const rowBelow = this.textContent.rowAt(this.cursorY + 1);
    if (charBelow) {
      this.cursorY += by;
    } else if (rowBelow) {
      this.setPosition([rowBelow.length, this.cursorY + 1]);
    }
  }
}
