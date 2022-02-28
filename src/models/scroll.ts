export class Scroll {
  private cursorX: number = 0;
  private cursorY: number = 0;
  private _context = undefined;
  constructor(context) {
    this._context = context;
  }

  get X(): number {
    return this.cursorX;
  }

  get Y(): number {
    return this.cursorY;
  }

  scrollUp(by: number = 200) {
    if (this.cursorY >= 0) {
      this.cursorY == 0;
    } else if (this.cursorY + by > 0) {
      this._context.translate(0, Math.abs(this.cursorY));
      this.cursorY += Math.abs(this.cursorY);
    } else {
      this.cursorY += by;
      this._context.translate(0, by);
    }
  }

  scrollDown(by: number = 200) {
    this.cursorY -= by;
    this._context.translate(0, 0 - by);
  }
}
