export function placeData(
  matrix: (number | null)[][],
  data: number[]
) {
  let bitIndex = 0;
  let dirUp = true;

  for (let col = matrix.length - 1; col > 0; col -= 2) {
    if (col === 6) col--; // timing column skip
    for (let row = 0; row < matrix.length; row++) {
      const r = dirUp ? matrix.length - 1 - row : row;
      for (let c = 0; c < 2; c++) {
        if (matrix[r][col - c] !== null) continue;
        const byte = data[Math.floor(bitIndex / 8)];
        const bit = (byte >>> (7 - (bitIndex % 8))) & 1;
        matrix[r][col - c] = bit;
        bitIndex++;
      }
    }
    dirUp = !dirUp;
  }
}
