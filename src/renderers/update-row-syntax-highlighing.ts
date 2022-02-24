import { EditorHighlight } from "../models/editor-highlight";

export const KEYWORDS = [
  "function",
  "for",
  "finally",
  "in",
  "null",
  "throw",
  "try",
  "else",
  "if",
  "return",
  "const",
  "let",
  "var",
];

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

    // keywords
    if (prev_sep) {
      for (const kw of KEYWORDS) {
        const klen = kw.length;
        const cw = row.slice(i, i + klen).join("");
        if (cw === kw && row[i + klen] && isSeparator(row[i + klen])) {
          for (let j = 0; j < klen; j++) {
            HLArr.splice(i + j, 1, EditorHighlight.HL_KEYWORD1);
          }
          i += klen;
          break;
        }
      }
    }

    prev_sep = isSeparator(ch);
    i++;
  }
  return HLArr;
}
