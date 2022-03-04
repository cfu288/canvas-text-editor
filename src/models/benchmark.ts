import { GapBuffer, StringGapBuffer } from "./gap-buffer";

function random(max) {
  return Math.floor((Math.random() * max) / 2);
}

// const t0 = performance.now();
// const array = [];
// for (var i = 0; i < 1000; i++) {
//   var ix = random(array.length);
//   for (var j = 0; j < 1000; ++j) {
//     array.splice(ix + j, 0, "1");
//   }
// }
// for (const x in array) {
//   const y = x + x;
// }
// const t1 = performance.now();

const t2 = performance.now();
const buffer1 = new GapBuffer<string>([], 512);
for (var i = 0; i < 1000; i++) {
  var ix = random(buffer1.length);
  for (var j = 0; j < 1000; ++j) {
    buffer1.insert(ix + j, "1");
  }
}
for (const x in buffer1) {
  const y = x + x;
}
const t3 = performance.now();

const t4 = performance.now();
const buffer2 = new StringGapBuffer([], 1024);
for (var i = 0; i < 1000; i++) {
  var ix = random(buffer2.length);
  for (var j = 0; j < 1000; ++j) {
    buffer2.insert(ix + j, "1");
  }
}
for (const x in buffer2) {
  const y = x + x;
}
const t5 = performance.now();

//console.log(`Insert in normal array took ${t1 - t0} milliseconds.`);
console.log(`Insert in gap buffer took ${t3 - t2} milliseconds.`);
console.log(`Insert in gap buffer took ${t5 - t4} milliseconds.`);
