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
    // +1 is needed for the extra | char we add in
    return this._textContext.lineNumberWidth + 1;
  }

  get offset() {
    return this.lineNumberWidth * this._fontContext.width;
  }

  generateLineNumberText(lineNumber: number) {
    return (
      new Array(this.lineNumberWidth - lineNumber.toString().length).join(" ") +
      lineNumber.toString() +
      "|"
    );
  }
}
