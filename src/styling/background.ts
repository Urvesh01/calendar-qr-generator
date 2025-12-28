/**
 * Background styling utilities
 */

/**
 * Converts background color to SVG fill attribute
 */
export function getBackgroundFill(color: string, gradientId?: string): string {
  if (gradientId) {
    return `url(#${gradientId})`;
  }
  return color;
}

/**
 * Creates SVG background rectangle
 */
export function createBackgroundRect(
  width: number,
  height: number,
  fill: string,
  roundedCorners?: number
): string {
  if (roundedCorners && roundedCorners > 0) {
    return `<rect width="${width}" height="${height}" fill="${fill}" rx="${roundedCorners}" ry="${roundedCorners}" />`;
  }
  return `<rect width="${width}" height="${height}" fill="${fill}" />`;
}
