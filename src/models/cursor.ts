export class Cursor {
  private cursorX: number = 0;
  private cursorY: number = 0;
  private cursorVisible: boolean = true;
  constructor() {}

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
    this.cursorX += by;
  }

  moveLeft(by: number = 1) {
    if (this.cursorX - by >= 0) {
      this.cursorX -= by;
    }
  }

  moveUp(by: number = 1) {
    if (this.cursorY - by >= 0) {
      this.cursorY -= by;
    }
  }

  moveDown(by: number = 1) {
    this.cursorY += by;
  }
}
