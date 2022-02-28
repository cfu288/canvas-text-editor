import { GapBuffer } from "./gap-buffer";

function random(max) {
  return Math.floor(Math.random() * max);
}

const t0 = performance.now();
var array = [];
for (var i = 0; i < 500; i++) {
  var ix = random(array.length);
  for (var j = 0; j < 100; ++j) {
    array.splice(ix + j, 0, 1);
  }
}
for (const x in array) {
  const y = x + x;
}
const t1 = performance.now();

const t2 = performance.now();
var buffer1 = new GapBuffer<number>([]);
for (var i = 0; i < 500; i++) {
  var ix = random(buffer1.length);
  for (var j = 0; j < 100; ++j) {
    buffer1.insert(ix + j, 1);
  }
}
for (const x in buffer1) {
  const y = x + x;
}
const t3 = performance.now();

console.log(`Insert in normal array took ${t1 - t0} milliseconds.`);
console.log(`Insert in gap buffer took ${t3 - t2} milliseconds.`);
