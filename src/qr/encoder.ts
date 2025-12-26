import { BitBuffer } from "./bit-buffer";

export function encodeText(text: string): number[] {
  const buffer = new BitBuffer();
  const bytes = Buffer.from(text, "utf8");

  buffer.put(0b0100, 4);     // Byte mode
  buffer.put(bytes.length, 8);

  for (const b of bytes) buffer.put(b, 8);

  buffer.put(0, 4); // terminator
  while (buffer.length % 8 !== 0) buffer.putBit(false);

  return buffer.getBytes();
}
