export class BitBuffer {
  private buffer: number[] = [];
  length = 0;

  put(value: number, size: number) {
    for (let i = size - 1; i >= 0; i--) {
      this.putBit(((value >>> i) & 1) === 1);
    }
  }

  putBit(bit: boolean) {
    const index = Math.floor(this.length / 8);
    if (this.buffer.length <= index) this.buffer.push(0);
    if (bit) this.buffer[index] |= 0x80 >>> (this.length % 8);
    this.length++;
  }

  getBytes() {
    return this.buffer;
  }
}
