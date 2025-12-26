export function createMatrix(size: number): (number | null)[][] {
  return Array.from({ length: size }, () =>
    Array(size).fill(null)
  );
}
