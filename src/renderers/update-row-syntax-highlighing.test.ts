import { EditorHighlight } from "../models/editor-highlight";
import { TextRow } from "../models/text-row";
import { updateRowSyntaxHighlighting } from "./update-row-syntax-highlighing";

test.each([
  [
    "in ".split(""),
    [
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_NORMAL,
    ],
  ],
  [
    "const ".split(""),
    [
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_NORMAL,
    ],
  ],
])("primary keywords are syntax highlighted correctly", async (arr1, arr2) => {
  const value = updateRowSyntaxHighlighting(new TextRow(arr1));
  expect(value).toEqual(arr2);
});

test.each([
  [
    '"in"'.split(""),
    [
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
    ],
  ],
  [
    "'const'".split(""),
    [
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
    ],
  ],
])(
  "primary keywords inside of strings are syntax highlighted as strings",
  async (arr1, arr2) => {
    const value = updateRowSyntaxHighlighting(new TextRow(arr1));
    expect(value).toEqual(arr2);
  }
);

test.each([
  [
    "export ".split(""),
    [
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_NORMAL,
    ],
  ],
  [
    "import ".split(""),
    [
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_NORMAL,
    ],
  ],
])(
  "secondary keywords are syntax highlighted correctly",
  async (arr1, arr2) => {
    const value = updateRowSyntaxHighlighting(new TextRow(arr1));
    expect(value).toEqual(arr2);
  }
);

test.each([
  [
    "1234567890".split(""),
    [
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
    ],
  ],
])("numbers are syntax highlighted correctly", async (arr1, arr2) => {
  const value = updateRowSyntaxHighlighting(new TextRow(arr1));
  expect(value).toEqual(arr2);
});

test.each([
  [
    "arr1".split(""),
    [
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
    ],
  ],
])(
  "numbers within words are not syntax highlighted as numbers",
  async (arr1, arr2) => {
    const value = updateRowSyntaxHighlighting(new TextRow(arr1));
    expect(value).toEqual(arr2);
  }
);

test.each([
  [
    "'hello'".split(""),
    [
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
    ],
  ],
  [
    '"hello"'.split(""),
    [
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
    ],
  ],
])("quoted strings are highlighted as strings", async (arr1, arr2) => {
  const value = updateRowSyntaxHighlighting(new TextRow(arr1));
  expect(value).toEqual(arr2);
});

test.each([
  [
    "export const x = 'hello'".split(""),
    [
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
      EditorHighlight.HL_STRING,
    ],
  ],
  [
    "export const x = 123".split(""),
    [
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_KEYWORD2,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_KEYWORD1,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NORMAL,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
      EditorHighlight.HL_NUMBER,
    ],
  ],
])(
  "keywords, strings, numbers on the same line are all highlighted appropriately",
  async (arr1, arr2) => {
    const value = updateRowSyntaxHighlighting(new TextRow(arr1));
    expect(value).toEqual(arr2);
  }
);
