import { renderScreen } from "./render-screen";
import { textContent, cursor, canvas, context } from "./render";

export function handleKey(e: KeyboardEvent) {
  let currentRow = textContent.rowAt(cursor.Y);
  switch (e.code) {
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
      if (textContent.charAt(cursor.X, cursor.Y)) {
        cursor.moveRight();
      } else if (textContent.rowAt(cursor.Y)) {
        cursor.setPosition([textContent.rowAt(cursor.Y).length, cursor.Y]);
      }
      break;
    }
    case "ArrowUp": {
      const charAbove = textContent.charAt(cursor.X, cursor.Y - 1);
      const rowAbove = textContent.rowAt(cursor.Y - 1);
      if (charAbove) {
        cursor.moveUp();
      } else if (rowAbove) {
        cursor.setPosition([rowAbove.length, cursor.Y - 1]);
      }
      break;
    }
    case "ArrowDown": {
      const charBelow = textContent.charAt(cursor.X, cursor.Y + 1);
      const rowBelow = textContent.rowAt(cursor.Y + 1);
      if (charBelow) {
        cursor.moveDown();
      } else if (rowBelow) {
        cursor.setPosition([rowBelow.length, cursor.Y + 1]);
      }
      break;
    }
    case "Enter": {
      textContent.insertNewRowAt(cursor.Y + 1);
      cursor.setPosition([0, cursor.Y + 1]);
      break;
    }
    case "Backspace": {
      if (cursor.X > 0) {
        // delete item behind cursor
        currentRow.splice(cursor.X - 1, 1);
        cursor.moveLeft();
      } else {
        // delete entire row
        if (textContent.rowAt(cursor.Y - 1)) {
          // handle if there is still text on the line behind the cursor
          const orgLen = textContent.text[cursor.Y - 1].length;
          textContent.text[cursor.Y - 1] = textContent.text[
            cursor.Y - 1
          ].concat(textContent.text[cursor.Y]);
          textContent.removeRowAt(cursor.Y);
          cursor.setPosition([orgLen, cursor.Y - 1]);
        } else {
          // there is no text behind cursor
          textContent.removeRowAt(cursor.Y);
          cursor.moveLeft();
          cursor.setPosition([textContent[cursor.Y - 1].length, cursor.Y - 1]);
        }
      }
      break;
    }
    case "Tab": {
      currentRow.push(" ");
      currentRow.push(" ");
      currentRow.push(" ");
      currentRow.push(" ");
      cursor.moveRight(4);
      break;
    }
    default:
      currentRow.splice(cursor.X, 0, e.key);
      cursor.moveRight();
      break;
  }

  window.requestAnimationFrame(() => renderScreen(canvas, context));
}
