import { GapBuffer } from "./gap-buffer";
import { StringGapBuffer } from "./string-gap-buffer";

function random(max) {
  return Math.floor((Math.random() * max) / 2);
}

function bench(
  name: string,
  test: { text: string; run: (start: () => void, stop: () => void) => void }[]
) {
  console.log(`\x1b[4mStarting ${name} benchmark\x1b[0m:`);
  const timings: { time: number; text: string }[] = [];
  for (let te of test) {
    let t = performance.now();
    let t2: number;
    te.run(
      () => {
        t = performance.now();
      },
      () => {
        t2 = performance.now();
      }
    );
    if (t2 === undefined) {
      t2 = performance.now();
    }
    timings.push({ time: t2 - t, text: te.text });
  }
  timings.sort((a, b) => a.time - b.time);
  for (let i = 0; i < timings.length - 1; i++) {
    console.log(
      `\x1b[1m${timings[0].text}\x1b[0m is ${(
        timings[i + 1].time / timings[0].time
      ).toPrecision(2)}x faster than \x1b[1m${timings[i + 1].text}\x1b[0m`
    );
  }
  console.log(`\n`);
}

bench("Random Sequential Inserts of 500 chars", [
  {
    text: "Array",
    run: () => {
      const array = [];
      for (var i = 0; i < 500; i++) {
        var ix = random(array.length);
        for (var j = 0; j < 500; ++j) {
          array.splice(ix + j, 0, "1");
        }
      }
    },
  },
  {
    text: "Normal Gap Buffer",
    run: () => {
      const buffer1 = new GapBuffer<string>([]);
      for (var i = 0; i < 500; i++) {
        var ix = random(buffer1.length);
        for (var j = 0; j < 500; ++j) {
          buffer1.insert(ix + j, "1");
        }
      }
    },
  },
  {
    text: "Type Array Based Gap Buffer",
    run: () => {
      const buffer2 = new StringGapBuffer([]);
      for (var i = 0; i < 500; i++) {
        var ix = random(buffer2.length);
        for (var j = 0; j < 500; ++j) {
          buffer2.insert(ix + j, "1");
        }
      }
    },
  },
]);

bench("Sequential Iteration", [
  {
    text: "Array",
    run: () => {
      const array = [...Array(500).keys()].map((x) => `${x}`);
      for (var i = 0; i < 10000; i++) {
        const y = array[i];
      }
    },
  },
  {
    text: "Normal Gap Buffer",
    run: () => {
      const buffer1 = new GapBuffer<string>(
        [...Array(500).keys()].map((x) => `${x}`)
      );
      for (var i = 0; i < 10000; i++) {
        const y = buffer1.get(i);
      }
    },
  },
  {
    text: "Type Array Based Gap Buffer",
    run: () => {
      const buffer2 = new StringGapBuffer(
        [...Array(500).keys()].map((x) => `${x}`)
      );
      for (var i = 0; i < 10000; i++) {
        const y = buffer2.get(i);
      }
    },
  },
]);

bench("Random Deletions", [
  {
    text: "Array",
    run: (start, stop) => {
      const array = [...Array(50000).keys()].map((x) => `${x}`);
      start();
      while (array.length > 0) {
        var ix = random(array.length);
        array.splice(ix, 1);
      }
      stop();
    },
  },
  {
    text: "Normal Gap Buffer",
    run: (start, stop) => {
      const buffer1 = new GapBuffer<string>(
        [...Array(50000).keys()].map((x) => `${x}`)
      );
      start();
      while (buffer1.length > 0) {
        var ix = random(buffer1.length);
        buffer1.delete(ix);
      }
      stop();
    },
  },
  {
    text: "Type Array Based Gap Buffer",
    run: (start, stop) => {
      const buffer1 = new StringGapBuffer(
        [...Array(50000).keys()].map((x) => `${x}`)
      );
      start();
      while (buffer1.length > 0) {
        var ix = random(buffer1.length);
        buffer1.delete(ix);
      }
      stop();
    },
  },
]);

bench("Initialization of 100 objects", [
  {
    text: "Array",
    run: () => {
      for (var i = 0; i < 100; i++) {
        const buffer1 = [];
      }
    },
  },
  {
    text: "Normal Gap Buffer",
    run: () => {
      for (var i = 0; i < 100; i++) {
        const buffer1 = new GapBuffer<string>([]);
      }
    },
  },
  {
    text: "Type Array Based Gap Buffer",
    run: () => {
      for (var i = 0; i < 100; i++) {
        const buffer2 = new StringGapBuffer([]);
      }
    },
  },
]);
