import {
  isDigit,
  EditorHighlight,
  isComment,
  KEYWORDS,
  isSeparator,
} from "./render-screen";

export function updateRowSyntaxHighlighing(row: string[]) {
  const HLArr = [];

  let prev_sep = true;
  let in_string: string | undefined = undefined;

  let i = 0;
  while (i < row.length) {
    const ch = row[i];
    const prev_hl = HLArr[HLArr.length - 1];

    // handle number highlighting
    if (
      (isDigit(ch) && (prev_sep || prev_hl === EditorHighlight.HL_NUMBER)) ||
      (ch == "." && prev_hl == EditorHighlight.HL_NUMBER)
    ) {
      HLArr.push(EditorHighlight.HL_NUMBER);
    }

    // handle comments
    else if (isComment(row)) {
      HLArr.length = row.length;
      HLArr.fill(EditorHighlight.HL_COMMENT);
      i = row.length;
    }

    // handle string highlighting
    else if (in_string) {
      HLArr.push(EditorHighlight.HL_STRING);
      if (ch === "\\" && i + 1 < row.length) {
        HLArr.push(EditorHighlight.HL_STRING);
        i++;
      }
      if (ch === in_string) {
        in_string = undefined;
      }
      prev_sep = true;
    } else if (ch === '"' || ch === "'") {
      in_string = ch;
      HLArr.push(EditorHighlight.HL_STRING);
    }

    // keywords
    else if (prev_sep) {
      for (const kw of KEYWORDS) {
        const klen = kw.length;
        const cw = row.slice(i, i + klen).join("");
        if (cw === kw && row[i + klen] && isSeparator(row[i + klen])) {
          for (let j = 0; j < klen; j++) {
            HLArr.push(EditorHighlight.HL_KEYWORD1);
          }
          i += klen;
          break;
        }
      }
    }

    // default highlighting
    else {
      HLArr.push(EditorHighlight.HL_NORMAL);
    }

    prev_sep = isSeparator(ch);
    i++;
  }
  return HLArr;
}
