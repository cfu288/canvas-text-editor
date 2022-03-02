import { FontContext } from "./font-context";
import { TextContent } from "./text-content";
import { TextRow } from "./text-row";

jest.mock("./font-context", () => {
  return {
    FontContext: jest.fn().mockImplementation(() => {
      return {
        height: () => {},
        width: () => {},
        fontStyle: () => {},
        setFontStyle: () => {},
      };
    }),
  };
});

test("initializes", () => {
  const tc = new TextContent(new FontContext(jest.fn() as any, "1", 1, 1));
  expect(tc).toBeTruthy();
});

test("is streamable", () => {
  const tc = new TextContent(new FontContext(jest.fn() as any, "1", 1, 1), [
    new TextRow("hello".split("")),
  ]);
  expect([...tc.stream()]).toEqual(["h", "e", "l", "l", "o", "\n"]);
});

test("is streamable for multiple lines", () => {
  const tc = new TextContent(new FontContext(jest.fn() as any, "1", 1, 1), [
    new TextRow("hello".split("")),
    new TextRow("world".split("")),
  ]);
  expect([...tc.stream()]).toEqual([
    "h",
    "e",
    "l",
    "l",
    "o",
    "\n",
    "w",
    "o",
    "r",
    "l",
    "d",
    "\n",
  ]);
});

test("peekable is streamable", () => {
  const tc = new TextContent(new FontContext(jest.fn() as any, "1", 1, 1), [
    new TextRow("hello".split("")),
  ]);

  const peekable = tc.peekableStream();
  // peekStream
  expect([...peekable]).toEqual(["h", "e", "l", "l", "o", "\n"]);
});

test("peekable can fetch next item in stream without losing current index", () => {
  const tc = new TextContent(new FontContext(jest.fn() as any, "1", 1, 1), [
    new TextRow("hello".split("")),
    new TextRow("hi".split("")),
  ]);

  const peekable = tc.peekableStream();

  expect(peekable.next().value).toBe("h");
  expect(peekable.peek().value).toBe("e");

  expect(peekable.next().value).toBe("e");
  expect(peekable.peek().value).toBe("l");

  expect(peekable.next().value).toBe("l");
  expect(peekable.peek().value).toBe("l");

  expect(peekable.next().value).toBe("l");
  expect(peekable.peek().value).toBe("o");

  expect(peekable.next().value).toBe("o");
  expect(peekable.peek().value).toBe("\n");

  expect(peekable.next().value).toBe("\n");
  expect(peekable.peek().value).toBe("h");

  expect(peekable.next().value).toBe("h");
  expect(peekable.peek().value).toBe("i");

  expect(peekable.next().value).toBe("i");
  expect(peekable.peek().value).toBe("\n");

  expect(peekable.next().value).toBe("\n");
  expect(peekable.peek().done).toBe(true);

  expect(peekable.next().done).toBe(true);
});
