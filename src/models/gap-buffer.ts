// inspired by https://github.com/jaz303/gapbuffer
export class GapBuffer<T> {
  private data: (T | undefined)[] = [];
  private gapSize = 32;
  private gapStart = 0;
  private gapEnd = 32;

  constructor(data: (T | undefined)[], gapSize = 32) {
    const buff: (T | undefined)[] =
      gapSize - data.length >= 0 ? Array(gapSize - data.length) : [];
    this.data = data.concat(buff);
    this.gapSize = gapSize;
    this.gapEnd = gapSize > data.length ? gapSize : data.length; // points to first valid char of second buffer, if exists. otherwise, points off of array
    this.gapStart = data.length || 0; // points at first invalid char after first buffer
  }

  get length() {
    return this.data.length - (this.gapEnd - this.gapStart);
  }

  concat(g: GapBuffer<T>) {
    for (const item of g) {
      this.push(item);
    }
  }

  delete(ix: number) {
    this.moveGap(ix + 1);
    this.gapStart -= 1;
    if (this.gapStart < 0) {
      this.gapStart = 0;
    }
  }

  insert(ix: number, value: T) {
    if (this.gapStart === this.gapEnd) {
      this.data.splice(ix, 0, ...new Array(this.gapSize));
      this.gapStart = ix;
      this.gapEnd = ix + this.gapSize;
    } else {
      this.moveGap(ix);
    }
    this.data[this.gapStart++] = value;
  }

  get(ix: number) {
    if (ix >= this.gapStart) {
      return this.data[ix + (this.gapEnd - this.gapStart)];
    }
    return this.data[ix];
  }

  slice(ix: number, ix2: number) {
    if (ix >= this.gapStart && ix2 >= this.gapStart) {
      return this.data.slice(
        ix + (this.gapEnd - this.gapStart),
        ix2 + (this.gapEnd - this.gapStart)
      );
    } else if (ix < this.gapStart && ix2 >= this.gapStart) {
      return this.data
        .slice(ix, this.gapStart)
        .concat(
          this.data.slice(this.gapEnd, ix2 + (this.gapEnd - this.gapStart))
        );
    } else {
      return this.data.slice(ix, ix2);
    }
  }

  push(value: T) {
    this.insert(this.length, value);
  }

  pop() {
    this.moveGap(this.length);
    const val = this.get(this.length);
    this.gapStart -= 1;
    if (this.gapStart < 0) {
      this.gapStart = 0;
    }
    return val;
  }

  /**
   * @param ix index to move gap to
   */
  private moveGap(ix: number) {
    if (ix < this.gapStart) {
      // ix is less than current gap start
      // need to shift elemnts to the right of the ix further right

      // ex insert x into ix 1
      // how far to shift - ix 1, need to shift 2,32 over
      // [1,2,3,_,_,4,5]
      // [  ^   *   *  ]
      // delta = 32 - 1 = 2
      const delta = this.gapStart - ix;

      for (let i = delta - 1; i >= 0; i--) {
        // gapEnd = 5
        // i = 2 - 1 = 1
        // this.data[4] = this.data[2]
        // [1,2,32,_,32,4,5]
        // i = 1 - 1 = 0
        // this.data[32] = this.data[1]
        // [1,2,32,2,32,4,5]
        this.data[this.gapEnd - delta + i] = this.data[ix + i];
      }
      // [1,2,32,2,32,4,5]
      // [  ^   *   *  ]
      this.gapStart -= delta;
      this.gapEnd -= delta;
      // [1,2,32,2,32,4,5]
      // [  *   *      ]
    } else {
      // Same logic as above but opposite
      const delta = ix - this.gapStart;
      for (let i = 0; i < delta; ++i) {
        this.data[this.gapStart + i] = this.data[this.gapEnd + i];
      }
      this.gapStart += delta;
      this.gapEnd += delta;
    }
  }

  get _arr() {
    return this.data
      .slice(0, this.gapStart)
      .concat(this.data.slice(this.gapEnd));
  }

  /**
   * Allow for GapBuffer to be iterable like an array
   */
  *[Symbol.iterator]() {
    let ix = 0;
    while (ix < this.data.length) {
      if (ix < this.gapStart || ix >= this.gapEnd) {
        yield this.data[ix];
        ix += 1;
      } else {
        ix += 1;
      }
    }
  }

  *entries(): Generator<[number, T], void, unknown> {
    let publicIndex = 0;
    let ix = 0;
    while (ix < this.data.length) {
      if (ix < this.gapStart || ix >= this.gapEnd) {
        yield [publicIndex, this.data[ix]];
        ix += 1;
        publicIndex += 1;
      } else {
        ix += 1;
      }
    }
  }
}
