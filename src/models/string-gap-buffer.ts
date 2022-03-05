export class StringGapBuffer {
  private _dataBuffer: ArrayBuffer;
  private data: Uint16Array;
  private gapSize = 64;
  private gapStart = 0;
  private gapEnd = 64;

  constructor(data: string[], gapSize = 64) {
    const gap: string[] =
      gapSize - data.length >= 0 ? Array(gapSize - data.length) : [];
    const buff = data.concat(gap);
    this._dataBuffer = new ArrayBuffer(buff.length * 2);
    this.data = new Uint16Array(this._dataBuffer);
    for (let i = 0, strLen = buff.length; i < strLen; i++) {
      this.data[i] = (buff[i] && buff[i].charCodeAt(0)) || NaN;
    }
    this.gapSize = gapSize;
    this.gapEnd = gapSize > data.length ? gapSize : data.length;
    this.gapStart = data.length || 0;
  }

  get length() {
    return this.data.length - (this.gapEnd - this.gapStart);
  }

  slice(ix: number, ix2: number) {
    if (ix >= this.gapStart && ix2 >= this.gapStart) {
      const a = [
        ...this.data.slice(
          ix + (this.gapEnd - this.gapStart),
          ix2 + (this.gapEnd - this.gapStart)
        ),
      ].map((x) => String.fromCharCode(x));
      return a;
    } else if (ix < this.gapStart && ix2 >= this.gapStart) {
      const ret = [
        ...this.data.slice(ix, this.gapStart),
        ...this.data.slice(this.gapEnd, ix2 + (this.gapEnd - this.gapStart)),
      ];
      return [...ret].map((x) => String.fromCharCode(x));
    } else {
      return [...this.data.slice(ix, ix2)].map((x) => String.fromCharCode(x));
    }
  }

  delete(ix: number) {
    this.moveGap(ix + 1);
    this.gapStart -= 1;
    if (this.gapStart < 0) {
      this.gapStart = 0;
    }
  }

  insert(ix: number, value: string) {
    if (this.gapStart === this.gapEnd) {
      const nb = new ArrayBuffer((this.data.length + this.gapSize) * 2);
      const nbv = new Uint16Array(nb);

      for (let i = 0; i < ix; i++) {
        nbv[i] = this.data[i];
      }
      for (let i = 0; i < this.gapSize; i++) {
        nbv[ix + i] = NaN;
      }
      for (let i = 0; i < this.data.length - ix; i++) {
        nbv[ix + this.gapSize + i] = this.data[ix + i];
      }
      this._dataBuffer = nb;
      this.data = nbv;

      this.gapStart = ix;
      this.gapEnd = ix + this.gapSize;
    } else {
      this.moveGap(ix);
    }
    this.data[this.gapStart++] = value.charCodeAt(0);
  }

  /**
   * @param ix index to move gap to
   */
  private moveGap(ix: number) {
    if (ix < this.gapStart) {
      const delta = this.gapStart - ix;

      for (let i = delta - 1; i >= 0; i--) {
        this.data[this.gapEnd - delta + i] = this.data[ix + i];
      }
      this.gapStart -= delta;
      this.gapEnd -= delta;
    } else {
      const delta = ix - this.gapStart;
      for (let i = 0; i < delta; ++i) {
        this.data[this.gapStart + i] = this.data[this.gapEnd + i];
      }
      this.gapStart += delta;
      this.gapEnd += delta;
    }
  }

  get(ix: number) {
    if (ix >= this.gapStart) {
      return String.fromCharCode(this.data[ix + (this.gapEnd - this.gapStart)]);
    }
    return String.fromCharCode(this.data[ix]);
  }

  /**
   * Allow for GapBuffer to be iterable like an array
   */
  *[Symbol.iterator]() {
    let ix = 0;
    while (ix < this.data.length) {
      if (ix < this.gapStart || ix >= this.gapEnd) {
        yield String.fromCharCode(this.data[ix]);
        ix += 1;
      } else {
        ix += 1;
      }
    }
  }
}
