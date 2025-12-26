/**
 * QR Code mask patterns (ISO/IEC 18004)
 * Each mask is a boolean function (row, col) => masked?
 */

export type MaskPattern = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function applyMask(
  matrix: (number | null)[][],
  mask: MaskPattern
): void {
  const size = matrix.length;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // skip reserved / functional modules
      const cell = matrix[r][c];
      if (cell === null) continue;

      if (maskCondition(mask, r, c)) {
        matrix[r][c] = cell ^ 1;
      }
    }
  }
}

/**
 * Mask formulas defined by the QR standard
 */
export function maskCondition(
  mask: MaskPattern,
  row: number,
  col: number
): boolean {
  switch (mask) {
    case 0: return (row + col) % 2 === 0;
    case 1: return row % 2 === 0;
    case 2: return col % 3 === 0;
    case 3: return (row + col) % 3 === 0;
    case 4: return ((Math.floor(row / 2) + Math.floor(col / 3)) % 2) === 0;
    case 5: return ((row * col) % 2 + (row * col) % 3) === 0;
    case 6: return ((((row * col) % 2) + ((row * col) % 3)) % 2) === 0;
    case 7: return ((((row + col) % 2) + ((row * col) % 3)) % 2) === 0;
    default:
      return false;
  }
}
