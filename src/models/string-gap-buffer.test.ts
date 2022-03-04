import { StringGapBuffer } from "./gap-buffer";

// test("initializes", () => {
//   const tgb = new StringGapBuffer([]);
//   expect(tgb).toBeTruthy();
// });

// test("is iterable", () => {
//   const tgb = new StringGapBuffer(["e", "w", "q"]);
//   const arr = [];
//   for (const x of tgb) {
//     arr.push(x);
//   }
//   expect(arr).toEqual(["e", "w", "q"]);
// });

// test("length is correct", () => {
//   const gb = new StringGapBuffer(["1", "2", "3"], 3);
//   expect(gb.length).toBe(3);
// });

// test.each([...Array(100).keys()])(
//   "length is correct with varying buffer sizes",
//   (buffSize) => {
//     const arr = [...Array(100).keys()].map((x) => `${x}`);
//     const gb = new StringGapBuffer(arr, buffSize);
//     expect(gb.length).toBe(100);
//   }
// );

test("insert at front", () => {
  const gb = new StringGapBuffer(["1", "2", "3"], 3);
  gb.insert(0, "a");
  expect([...gb]).toEqual(["a", "1", "2", "3"]);
});

test("insert 3 items at front", () => {
  const gb = new StringGapBuffer(["1", "2", "3"], 3);
  gb.insert(0, "a");
  gb.insert(0, "b");
  gb.insert(0, "c");
  expect([...gb]).toEqual(["c", "b", "a", "1", "2", "3"]);
});

test("insert 2 items at front", () => {
  const gb = new StringGapBuffer(["1", "2", "3"], 3);
  gb.insert(0, "a");
  gb.insert(0, "b");
  expect([...gb]).toEqual(["b", "a", "1", "2", "3"]);
});

test("insert 10 items at front", () => {
  const gb = new StringGapBuffer(["1", "2", "3"], 3);
  for (const item of ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
    gb.insert(0, item);
  }
  expect([...gb]).toEqual([
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "1",
    "2",
    "3",
  ]);
});

test("insert 10 items at end", () => {
  const gb = new StringGapBuffer(["1", "2", "3"], 3);
  for (const [index, item] of [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ].entries()) {
    gb.insert(index + 3, item);
  }
  expect([...gb]).toEqual([
    "1",
    "2",
    "3",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);
});

test("insert item at index 2 ", () => {
  const gb = new StringGapBuffer(["1", "2", "3", "4"], 3);
  gb.insert(2, "h");
  expect([...gb]).toEqual(["1", "2", "h", "3", "4"]);
});

// test("insert 10 items in middle", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);
//   for (const [index, item] of [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ].entries()) {
//     gb.insert(index + 2, item);
//   }
//   expect([...gb]).toEqual([
//     1,
//     2,
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     3,
//     4,
//   ]);
// });

// test.each([...Array(100).keys()])(
//   "insert 100 items at front with variable buff sizes should always return same result",
//   (buffSize) => {
//     const arr = [...Array(100).keys()];
//     const gb = new StringGapBuffer(arr, buffSize);
//     const revArr = arr.reverse();
//     for (const item of arr) {
//       gb.insert(0, item);
//     }
//     expect(arr).toEqual(revArr);
//   }
// );

// test("getting a inserted value returns correct value", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);
//   gb.insert(2, "hi");
//   expect(gb.get(2)).toEqual("hi");
// });

// test("getting a value before inserted value returns correct value", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);
//   gb.insert(2, "hi");
//   expect(gb.get(0)).toEqual(1);
// });

// test("getting a value before inserted value returns correct value", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);
//   gb.insert(2, "hi");
//   expect(gb.get(1)).toEqual(2);
// });

// test("getting a value after inserted value returns correct value", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);
//   gb.insert(2, "hi");
//   expect(gb.get(3)).toBe(3);
// });

// test("getting a value after inserted value returns correct value", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);
//   gb.insert(2, "hi");
//   expect(gb.get(4)).toBe(4);
// });

// test.each([...Array(100).keys()])(
//   "getting any value returns correct value",
//   (ix) => {
//     const gb = new StringGapBuffer([...Array(100).keys()]);
//     expect(gb.get(ix)).toBe(ix);
//   }
// );

// test.each([...Array(100).keys()])(
//   "getting any value after insertion in front returns correct value",
//   (ix) => {
//     const gb = new StringGapBuffer([...Array(100).keys()]);
//     gb.insert(0, "hi");
//     expect(gb.get(ix + 1)).toBe(ix);
//   }
// );

// test("insert in front then back works correctly", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);

//   gb.insert(0, "hi");
//   gb.insert(5, "hi");
//   gb.insert(0, "bye");

//   expect(gb.get(1)).toBe("hi");
//   expect(gb.get(6)).toBe("hi");
//   expect(gb.get(0)).toBe("bye");

//   expect([...gb]).toEqual(["bye", "hi", "1", "2", "3", 4, "hi"]);
// });

// test.each([...Array(20)])(
//   "random inserts should result in identical values to an array with same inserts",
//   () => {
//     const gb = new StringGapBuffer([...Array(100).keys()]);
//     const arr = [...Array(100).keys()];

//     for (const x of [...Array(100).keys()]) {
//       const rand = Math.floor(Math.random() * 100);
//       gb.insert(rand, rand);
//       arr.splice(rand, 0, rand);
//     }
//     expect([...gb]).toEqual(arr);
//   }
// );

// test("insert in front then back works correctly", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);

//   gb.insert(0, "hi");
//   gb.insert(5, "hi");
//   gb.insert(0, "bye");

//   expect(gb.get(1)).toBe("hi");
//   expect(gb.get(6)).toBe("hi");
//   expect(gb.get(0)).toBe("bye");

//   expect([...gb]).toEqual(["bye", "hi", "1", "2", "3", 4, "hi"]);
// });

// test("delete at front removes item at index", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);

//   gb.delete(0);

//   expect([...gb]).toEqual([2, 3, 4]);
// });

// test("delete at end removes item at index", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4], 3);

//   gb.delete(3);

//   expect([...gb]).toEqual(["1", "2", "3"]);
// });

// test("delete in middle removes item at index", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);

//   gb.delete(2);

//   expect([...gb]).toEqual([1, 2, 4, 5]);
// });

// test("entries returns a iterable with index:value tuple", () => {
//   const arr = ["1", "2", "3", 4, 5];
//   const gb = new StringGapBuffer(arr, 3);

//   let ix = 0;
//   for (const [i, v] of gb.entries()) {
//     expect(i).toBe(ix);
//     expect(v).toBe(arr[ix]);
//     ix++;
//   }
// });

// test("entries returns a iterable with index:value tuple after insert", () => {
//   const arr = [0, "1", "2", "3", 4, 5];
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   gb.insert(0, 0);
//   let ix = 0;
//   for (const [i, v] of gb.entries()) {
//     expect(i).toBe(ix);
//     expect(v).toBe(arr[ix]);
//     ix++;
//   }
// });

// test("push inserts at end", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   gb.push(0);
//   expect([...gb]).toEqual(["1", "2", "3", 4, 5, 0]);
// });

// test("multiple pushes insert at end", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   gb.push(0);
//   gb.push(1);
//   expect([...gb]).toEqual(["1", "2", "3", 4, 5, 0, 1]);
// });

// test("pop removes from end", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   gb.pop();
//   expect([...gb]).toEqual(["1", "2", "3", 4]);
// });

// test("multiple pop removes from end", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   gb.pop();
//   gb.pop();
//   expect([...gb]).toEqual(["1", "2", "3"]);
// });

// test("slice returns correct slice", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   expect(gb.slice(0, 2)).toEqual([1, 2]);
// });

// test("slice returns correct slice after pushes to front", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   expect(gb.slice(0, 2)).toEqual([1, 2]);
// });

// test("slice returns correct slice after pushes to middle", () => {
//   const gb = new StringGapBuffer([1, 2, 4, 5], 3);
//   gb.insert(2, 0);
//   expect(gb.slice(0, 4)).toEqual([1, 2, 0, 4]);
// });

// test("slice returns correct slice after pushes to front", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   gb.insert(0, 0);
//   expect(gb.slice(0, 3)).toEqual([0, 1, 2]);
// });

// test("slice returns correct slice after pushes to end", () => {
//   const gb = new StringGapBuffer(["1", "2", "3", 4, 5], 3);
//   gb.push(6);
//   expect(gb.slice(0, 6)).toEqual(["1", "2", "3", 4, 5, 6]);
// });
