import { EditorHighlight } from "../models/editor-highlight";

export const KEYWORDS1 = new Set([
  "export",
  "import",
  "new",
]);

export const KEYWORDS1SET = new Set(KEYWORDS1);

export const KEYWORDS = [
  "await",
  "break",
  "case",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "var",
].concat(KEYWORDS1);



function isComment(r: string[]) {
  return r?.[0] === "/" && r?.[1] === "/";
}

function isDigit(s: string) {
  return !isNaN(Number(s));
}

function isSeparator(s: string) {
  return isWhitespace(s) || s === "\0" || !!s.match("/^[,.()+-/*=~%<>;]/");
}

function isWhitespace(s: string) {
  return s.trim().length === 0;
}

// Row based syntax highlighting
export function updateRowSyntaxHighlighing(row: string[]) {
  const HLArr = Array(row.length).fill(EditorHighlight.HL_NORMAL);

  // store if prev char was a separator char
  let prev_sep = true;
  // store whether currently in a string, and which character was used to start the string
  let in_string: string | undefined = undefined;

  let i = 0;
  while (i < row.length) {
    const ch = row[i];

    // handle string highlighting
    if (in_string !== undefined) {
      HLArr.splice(i, 1, EditorHighlight.HL_STRING);
      if (ch === "\\" && i + 1 < row.length) {
        HLArr.splice(i, 1, EditorHighlight.HL_STRING);
        i++;
      }
      if (ch === in_string) {
        in_string = undefined;
      }
      prev_sep = true;
    } else if (ch === '"' || ch === "'") {
      in_string = ch;
      HLArr.splice(i, 1, EditorHighlight.HL_STRING);
    }

    // handle number highlighting
    if (
      (isDigit(ch) &&
        (prev_sep || HLArr[i - 1] === EditorHighlight.HL_NUMBER)) ||
      (ch == "." && HLArr[i - 1] == EditorHighlight.HL_NUMBER)
    ) {
      HLArr.splice(i, 1, EditorHighlight.HL_NUMBER);
    }

    // handle comments
    if (isComment(row)) {
      HLArr.length = row.length;
      HLArr.fill(EditorHighlight.HL_COMMENT);
      i = row.length;
    }

    const old_prev_sep = prev_sep
    prev_sep = isSeparator(ch);


    // keywords
    if (old_prev_sep) {
      // if the prev char was a seperator, check if next n chars in row is a keyword
      for (const kw of KEYWORDS) {
        // For now, just loop through keywords (inefficent)
        // using length klen of keyword
        const klen = kw.length;
        // get the next klen chars of the current row to see if it is a keyword
        const cw = row.slice(i, i + klen).join("");
        if (cw === kw && row[i + klen] && isSeparator(row[i + klen])) {
          const secondary = KEYWORDS1SET.has(cw)
          // It is a keyword, mark it in the HL array
          for (let j = 0; j < klen; j++) {
            if(secondary){
              HLArr.splice(i + j, 1, EditorHighlight.HL_KEYWORD2);
            }else{
              HLArr.splice(i + j, 1, EditorHighlight.HL_KEYWORD1 );

            }
          }
          // move index past the current key word to skip reprocessing
          i += klen;
          prev_sep = true
          break;
        }
      }
    }

    i++;
  }
  return HLArr;
}
