import { textContent, cursor, scroll, requestRender } from "../app";
import { TextRow } from "../models/text-row";
import { FileRegistry } from "../services/file-registry";
import { updateRowSyntaxHighlighting } from "../renderers/update-row-syntax-highlighing";

const OPEN_BRACKETS = new Set(["[", "{", "(", '"', "'"]);
const BRACKETS_PAIR = {
  "{": "}",
  "[": "]",
  "(": ")",
  '"': '"',
  "'": "'",
};

export function handleKey(e: KeyboardEvent) {
  e.preventDefault();
  // Two meta keys
  if (e.metaKey && e.shiftKey && ["ArrowUp", "ArrowDown"].includes(e.code)) {
    switch (e.code) {
      case "ArrowDown": {
        scroll.scrollDown();
        requestRender();
        break;
      }
      case "ArrowUp": {
        scroll.scrollUp();
        requestRender();
        break;
      }
      default:
        break;
    }
  }
  // Single meta key
  if (e.metaKey || e.ctrlKey) {
    switch (e.code) {
      case "KeyO": {
        FileRegistry.promptFileSelect().then((file) =>
          FileRegistry.getFileContents(file).then((data) => {
            textContent.readFromFile(file.name, data);
            requestRender();
          })
        );
        break;
      }
      case "KeyS": {
        FileRegistry.saveFileContents(textContent.name, textContent).then(
          () => {
            alert(`${textContent.name} saved`);
          }
        );
        break;
      }
      case "KeyX": {
        textContent.clearBuffer();
        textContent.addRowToBuffer(textContent.rowAt(cursor.Y));
        if (textContent.length > 1) {
          textContent.removeRowAt(cursor.Y);
        } else {
          textContent.removeRowAt(cursor.Y);
          textContent.insertNewRowAt(cursor.Y, new TextRow());
        }
        // Arrow up logic
        const charAbove = textContent.charAt(cursor.X, cursor.Y - 1);
        const rowAbove = textContent.rowAt(cursor.Y - 1);
        if (charAbove) {
          cursor.moveUp();
        } else if (rowAbove) {
          cursor.setPosition([rowAbove.length, cursor.Y - 1]);
        }
        break;
      }
      case "KeyC": {
        textContent.clearBuffer();
        textContent.addRowToBuffer(textContent.rowAt(cursor.Y));
        break;
      }
      case "KeyV": {
        textContent.insertNewRowsAt(cursor.Y, textContent.buffer);
        textContent.textHL[cursor.Y] = updateRowSyntaxHighlighting(
          textContent.rowAt(cursor.Y)
        );
        textContent.textHL.splice(
          cursor.Y,
          0,
          updateRowSyntaxHighlighting(textContent.rowAt(cursor.Y))
        );
        // end of line
        cursor.setPosition([textContent.rowAt(cursor.Y).length, cursor.Y]);
        break;
      }
      default:
        break;
    }
  } else {
    // Default key press input
    const currentRow = textContent.rowAt(cursor.Y);
    switch (e.code) {
      case "Escape": {
        break;
      }
      case "MetaRight": {
        break;
      }
      case "MetaLeft": {
        break;
      }
      case "ShiftLeft": {
        break;
      }
      case "ShiftRight": {
        break;
      }
      case "ArrowLeft": {
        cursor.moveLeft();
        break;
      }
      case "ArrowRight": {
        cursor.moveRight();
        break;
      }
      case "ArrowUp": {
        cursor.moveUp();
        break;
      }
      case "ArrowDown": {
        cursor.moveDown();
        break;
      }
      case "Enter": {
        // end of line, just move to new line
        if (cursor.X === textContent.rowAt(cursor.Y).length) {
          textContent.insertNewRowAt(cursor.Y + 1);
          cursor.setPosition([0, cursor.Y + 1]);
        }
        // middle of line, split line into two
        else {
          const rowToSpit = textContent.rowAt(cursor.Y),
            firstLine = rowToSpit.slice(0, cursor.X),
            secondLine = rowToSpit.slice(cursor.X, rowToSpit.length);
          textContent.replaceRowAt(cursor.Y, new TextRow<string>(firstLine));
          textContent.insertNewRowAt(cursor.Y + 1);
          textContent.replaceRowAt(
            cursor.Y + 1,
            new TextRow<string>(secondLine)
          );
          cursor.setPosition([0, cursor.Y + 1]);
        }
        break;
      }
      case "Backspace": {
        if (cursor.X > 0) {
          // delete item behind cursor
          currentRow.deleteAt(cursor.X - 1);
          cursor.moveLeft();
        } else {
          // if prev line exist,
          if (textContent.rowAt(cursor.Y - 1)) {
            // handle merge of prev line and current line
            const orgLen = textContent.rowAt(cursor.Y - 1).length;
            const newRow = textContent
              .rowAt(cursor.Y - 1)
              .concat(textContent.rowAt(cursor.Y));
            textContent.replaceRowAt(cursor.Y - 1, newRow);
            textContent.removeRowAt(cursor.Y);
            cursor.setPosition([orgLen, cursor.Y - 1]);
          }
          // there is no prev line, we are already at the first row
          // leave cursor where it is
        }
        break;
      }
      case "Tab": {
        // Lol all tabs as spaces for now
        currentRow.push(" ");
        currentRow.push(" ");
        currentRow.push(" ");
        currentRow.push(" ");
        cursor.moveRight(4);
        break;
      }
      default:
        if (OPEN_BRACKETS.has(e.key)) {
          currentRow.insertValueAt(cursor.X, e.key);
          cursor.moveRight();
          currentRow.insertValueAt(cursor.X, BRACKETS_PAIR[e.key]);
        } else {
          currentRow.insertValueAt(cursor.X, e.key);
          cursor.moveRight();
        }
        break;
    }
  }

  textContent.textHL[cursor.Y] = updateRowSyntaxHighlighting(
    textContent.rowAt(cursor.Y)
  );
  requestRender();
}
