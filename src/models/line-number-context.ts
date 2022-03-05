import { FontContext } from "./font-context";
import { TextContent } from "./text-content";

export class LineNumberContext {
  private _textContext: TextContent;
  private _fontContext: FontContext;

  constructor(textContent: TextContent, fontContext: FontContext) {
    this._textContext = textContent;
    this._fontContext = fontContext;
  }

  get lineNumberWidth() {
    // +3 is needed for the extra | char we add in and 2 spaces
    return this._textContext.lineNumberWidth + 3;
  }

  get offset() {
    return this.lineNumberWidth * this._fontContext.width;
  }

  generateLineNumberText(lineNumber: number) {
    return (
      " " +
      (new Array(this.lineNumberWidth - lineNumber.toString().length - 2).join(
        " "
      ) +
        lineNumber.toString() +
        "|" +
        " ")
    );
  }
}
