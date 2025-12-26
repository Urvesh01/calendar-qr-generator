export function renderTerminal(matrix: (number | null)[][]): string {
  return matrix
    .map(row =>
      row.map(v => (v ? "██" : "  ")).join("")
    )
    .join("\n");
}
