import { TextContent } from "./text-content";

export class Scroll {
  private cursorX = 0;
  private cursorY = 0;
  private _context = undefined;
  private _canvas = undefined;
  private _textContent: TextContent;
  constructor(canvas, context, textContent: TextContent) {
    this._context = context;
    this._canvas = canvas;
    this._textContent = textContent;
  }

  get X(): number {
    return this.cursorX;
  }

  get Y(): number {
    return this.cursorY;
  }

  scrollUp(by = 200) {
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

  // Todo: scroll speed leads to different results
  scrollDown(by = 200) {
    if (
      Math.abs(this.cursorY) +
        this._canvas.getBoundingClientRect().height +
        by <
      this._textContent.contentHeight
    ) {
      this.cursorY -= by;
      this._context.translate(0, 0 - by);
    } else if (
      Math.abs(this.cursorY) + this._canvas.getBoundingClientRect().height <
      this._textContent.contentHeight
    ) {
      const remainingHeight =
        this._textContent.contentHeight -
        Math.abs(
          Math.abs(this.cursorY) + this._canvas.getBoundingClientRect().height
        );
      console.log(remainingHeight);
      this.cursorY -= remainingHeight;
      this._context.translate(0, 0 - remainingHeight);
    }
  }
}
