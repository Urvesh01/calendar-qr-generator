import { CornersType } from "../types";

/**
 * Gets the corner square path for different styles
 */
export function getCornerSquarePath(
  type: CornersType,
  x: number,
  y: number,
  size: number
): string {
  switch (type) {
    case "square":
      return getSquareCorner(x, y, size);
    case "rounded":
      return getRoundedCorner(x, y, size);
    case "extra-rounded":
      return getExtraRoundedCorner(x, y, size);
    case "dot":
    case "dots":
      return getDotCorner(x + size / 2, y + size / 2, size / 2);
    case "classy":
      return getClassyCorner(x, y, size);
    case "classy-rounded":
      return getClassyRoundedCorner(x, y, size);
    default:
      return getSquareCorner(x, y, size);
  }
}

function getSquareCorner(x: number, y: number, size: number): string {
  return `M ${x} ${y} L ${x + size} ${y} L ${x + size} ${y + size} L ${x} ${
    y + size
  } Z`;
}

function getRoundedCorner(x: number, y: number, size: number): string {
  const radius = size * 0.2;
  return `M ${x + radius} ${y} L ${x + size - radius} ${y} Q ${x + size} ${y} ${
    x + size
  } ${y + radius} L ${x + size} ${y + size - radius} Q ${x + size} ${
    y + size
  } ${x + size - radius} ${y + size} L ${x + radius} ${y + size} Q ${x} ${
    y + size
  } ${x} ${y + size - radius} L ${x} ${y + radius} Q ${x} ${y} ${
    x + radius
  } ${y} Z`;
}

function getExtraRoundedCorner(x: number, y: number, size: number): string {
  const radius = size / 2;
  const cx = x + size / 2;
  const cy = y + size / 2;
  return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${
    cx + radius
  } ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} Z`;
}

function getDotCorner(cx: number, cy: number, radius: number): string {
  return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${
    cx + radius
  } ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} Z`;
}

function getClassyCorner(x: number, y: number, size: number): string {
  const quarter = size / 4;
  return `M ${x + quarter} ${y} L ${x + size - quarter} ${y} L ${x + size} ${
    y + quarter
  } L ${x + size} ${y + size - quarter} L ${x + size - quarter} ${y + size} L ${
    x + quarter
  } ${y + size} L ${x} ${y + size - quarter} L ${x} ${y + quarter} Z`;
}

function getClassyRoundedCorner(x: number, y: number, size: number): string {
  const quarter = size / 4;
  const radius = size * 0.15;
  return `M ${x + quarter + radius} ${y} L ${
    x + size - quarter - radius
  } ${y} Q ${x + size - quarter} ${y} ${x + size - quarter} ${y + radius} L ${
    x + size
  } ${y + quarter} L ${x + size} ${y + size - quarter} L ${
    x + size - quarter
  } ${y + size - radius} Q ${x + size - quarter} ${y + size} ${
    x + size - quarter - radius
  } ${y + size} L ${x + quarter + radius} ${y + size} Q ${x + quarter} ${
    y + size
  } ${x + quarter} ${y + size - radius} L ${x} ${y + size - quarter} L ${x} ${
    y + quarter
  } L ${x + quarter} ${y + radius} Q ${x + quarter} ${y} ${
    x + quarter + radius
  } ${y} Z`;
}

/**
 * Gets the corner dot path for different styles
 */
export function getCornerDotPath(
  type: CornersType,
  x: number,
  y: number,
  size: number
): string {
  // Corner dots use similar styles as corner squares, scaled down
  return getCornerSquarePath(type, x, y, size);
}

/**
 * Calculates corner square size (usually 7x7 modules)
 */
export function getCornerSquareSize(
  moduleSize: number,
  matrixSize: number
): number {
  return Math.min(7, Math.ceil(matrixSize / 8));
}

/**
 * Calculates corner dot size (usually 5x5 modules)
 */
export function getCornerDotSize(
  moduleSize: number,
  matrixSize: number
): number {
  const cornerSquareSize = getCornerSquareSize(moduleSize, matrixSize);
  return Math.max(1, cornerSquareSize - 2);
}
