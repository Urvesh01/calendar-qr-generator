export interface PNGOptions {
  scale?: number;
  margin?: number;
  foreground?: string;
  background?: string;
}

/**
 * Render QR code matrix as SVG string
 * (Can be converted to PNG using external libraries)
 */
export function renderPNG(
  matrix: (number | null)[][],
  options: PNGOptions = {}
): string {
  const scale = options.scale || 10;
  const margin = options.margin || 4;
  const foreground = options.foreground || '#000000';
  const background = options.background || '#FFFFFF';

  const size = matrix.length;
  const totalSize = (size + margin * 2) * scale;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}">`;
  svg += `<rect width="${totalSize}" height="${totalSize}" fill="${background}"/>`;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col] === 1) {
        const x = (col + margin) * scale;
        const y = (row + margin) * scale;
        svg += `<rect x="${x}" y="${y}" width="${scale}" height="${scale}" fill="${foreground}"/>`;
      }
    }
  }

  svg += '</svg>';
  return svg;
}
