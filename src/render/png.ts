import { QRStylingOptions, DotsOptions, BackgroundOptions } from "../types";
import { getDotPath, calculateDotSize } from "../styling/dots";
import {
  getCornerSquarePath,
  getCornerDotPath,
  getCornerSquareSize,
  getCornerDotSize,
} from "../styling/corners";
import { createBackgroundRect, getBackgroundFill } from "../styling/background";
import {
  createSVGGradient,
  generateGradientId,
  getGradientReference,
} from "../styling/gradients";

export interface PNGOptions {
  scale?: number;
  margin?: number;
  foreground?: string;
  background?: string;
}

/**
 * Enhanced SVG renderer with full styling support
 */
export function renderStyledQR(
  matrix: (number | null)[][],
  options: QRStylingOptions
): string {
  const scale = options.width ? options.width / matrix.length : 10;
  const margin = options.margin || 0;
  const totalWidth = options.width || (matrix.length + margin * 2) * scale;
  const totalHeight = options.height || (matrix.length + margin * 2) * scale;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">`;

  // Add defs section for gradients
  svg += "<defs>";

  // Add background gradient if exists
  if (options.backgroundOptions?.gradient) {
    const gradId = generateGradientId(0);
    svg += createSVGGradient(
      options.backgroundOptions.gradient,
      gradId,
      totalWidth,
      totalHeight
    );
  }

  // Add dots gradient if exists
  let dotsGradId: string | undefined;
  if (options.dotsOptions?.gradient) {
    dotsGradId = generateGradientId(1);
    svg += createSVGGradient(
      options.dotsOptions.gradient,
      dotsGradId,
      totalWidth,
      totalHeight
    );
  }

  // Add corners gradient if exists
  let cornersGradId: string | undefined;
  if (options.cornersSquareOptions?.gradient) {
    cornersGradId = generateGradientId(2);
    svg += createSVGGradient(
      options.cornersSquareOptions.gradient,
      cornersGradId,
      totalWidth,
      totalHeight
    );
  }

  svg += "</defs>";

  // Add background
  const bgFill = options.backgroundOptions?.gradient
    ? getGradientReference(generateGradientId(0))
    : options.backgroundOptions?.color || "#FFFFFF";

  svg += createBackgroundRect(totalWidth, totalHeight, bgFill);

  // Determine dot properties
  const dotColor = options.dotsOptions?.color || "#000000";
  const dotFill = options.dotsOptions?.gradient
    ? getGradientReference(dotsGradId!)
    : dotColor;
  const dotType = options.dotsOptions?.type || "square";
  const moduleSize = totalWidth / (matrix.length + margin * 2);

  // Determine corner properties
  const cornerColor = options.cornersSquareOptions?.color || "#000000";
  const cornerFill = options.cornersSquareOptions?.gradient
    ? getGradientReference(cornersGradId!)
    : cornerColor;
  const cornerType = options.cornersSquareOptions?.type || "square";

  const cornerDotColor = options.cornersDotOptions?.color || "#000000";
  const cornerDotFill = options.cornersDotOptions?.gradient
    ? getGradientReference(generateGradientId(3) || cornerDotColor)
    : cornerDotColor;
  const cornerDotType = options.cornersDotOptions?.type || "square";

  const matrixSize = matrix.length;
  const cornerSquareSize = getCornerSquareSize(moduleSize, matrixSize);
  const cornerDotSize = getCornerDotSize(moduleSize, matrixSize);

  // Render the QR code matrix
  svg += `<g>`;

  // Render center dots (data area excluding corners)
  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      if (matrix[row][col] === 1) {
        // Skip corner regions
        if (isInCornerSquare(row, col, cornerSquareSize, matrixSize)) {
          continue;
        }

        const x = (col + margin) * moduleSize + margin;
        const y = (row + margin) * moduleSize + margin;
        const dotSize = calculateDotSize(dotType, moduleSize);
        const path = getDotPath(
          dotType,
          x / moduleSize,
          y / moduleSize,
          dotSize / moduleSize
        );

        svg += `<path d="${path}" fill="${dotFill}" />`;
      }
    }
  }

  // Render corner squares (top-left, top-right, bottom-left)
  const corners = [
    { row: 0, col: 0 }, // top-left
    { row: 0, col: matrixSize - cornerSquareSize }, // top-right
    { row: matrixSize - cornerSquareSize, col: 0 }, // bottom-left
  ];

  for (const corner of corners) {
    for (let row = 0; row < cornerSquareSize; row++) {
      for (let col = 0; col < cornerSquareSize; col++) {
        const r = corner.row + row;
        const c = corner.col + col;

        if (matrix[r] && matrix[r][c] === 1) {
          const x = (c + margin) * moduleSize + margin;
          const y = (r + margin) * moduleSize + margin;
          const path = getCornerSquarePath(cornerType, x, y, moduleSize);
          svg += `<path d="${path}" fill="${cornerFill}" />`;
        }
      }
    }

    // Render corner dots (5x5 within corner square)
    const innerStartRow = cornerSquareSize - cornerDotSize - 1;
    const innerStartCol = cornerSquareSize - cornerDotSize - 1;

    for (let row = 0; row < cornerDotSize; row++) {
      for (let col = 0; col < cornerDotSize; col++) {
        const r = corner.row + innerStartRow + row;
        const c = corner.col + innerStartCol + col;

        if (matrix[r] && matrix[r][c] === 1) {
          const x = (c + margin) * moduleSize + margin;
          const y = (r + margin) * moduleSize + margin;
          const path = getCornerDotPath(cornerDotType, x, y, moduleSize * 0.6);
          svg += `<path d="${path}" fill="${cornerDotFill}" />`;
        }
      }
    }
  }

  svg += `</g>`;
  svg += "</svg>";

  return svg;
}

/**
 * Checks if a position is within any corner square region
 */
function isInCornerSquare(
  row: number,
  col: number,
  cornerSize: number,
  matrixSize: number
): boolean {
  // Top-left
  if (row < cornerSize && col < cornerSize) return true;
  // Top-right
  if (row < cornerSize && col >= matrixSize - cornerSize) return true;
  // Bottom-left
  if (row >= matrixSize - cornerSize && col < cornerSize) return true;
  return false;
}

/**
 * Legacy render function for backward compatibility
 */
export function renderPNG(
  matrix: (number | null)[][],
  options: PNGOptions = {}
): string {
  const scale = options.scale || 10;
  const margin = options.margin || 4;
  const foreground = options.foreground || "#000000";
  const background = options.background || "#FFFFFF";

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

  svg += "</svg>";
  return svg;
}
