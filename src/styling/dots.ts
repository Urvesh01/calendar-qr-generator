import { DotsType } from "../types";

/**
 * Generates SVG path for a dot based on its type
 * Each dot is rendered relative to a 1x1 grid cell
 */
export function getDotPath(
  type: DotsType,
  x: number,
  y: number,
  size: number
): string {
  const centerX = x + 0.5;
  const centerY = y + 0.5;
  const half = size / 2;

  switch (type) {
    case "square":
      return getSquarePath(centerX - half, centerY - half, size);
    case "rounded":
      return getRoundedPath(centerX - half, centerY - half, size);
    case "dots":
      return getCirclePath(centerX, centerY, half);
    case "classy":
      return getClassyPath(centerX - half, centerY - half, size);
    case "classy-rounded":
      return getClassyRoundedPath(centerX - half, centerY - half, size);
    case "extra-rounded":
      return getExtraRoundedPath(centerX, centerY, half);
    default:
      return getSquarePath(centerX - half, centerY - half, size);
  }
}

function getSquarePath(x: number, y: number, size: number): string {
  return `M ${x} ${y} L ${x + size} ${y} L ${x + size} ${y + size} L ${x} ${
    y + size
  } Z`;
}

function getRoundedPath(x: number, y: number, size: number): string {
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

function getCirclePath(cx: number, cy: number, radius: number): string {
  return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${
    cx + radius
  } ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} Z`;
}

function getClassyPath(x: number, y: number, size: number): string {
  const quarter = size / 4;
  return `M ${x + quarter} ${y} L ${x + size - quarter} ${y} L ${x + size} ${
    y + quarter
  } L ${x + size} ${y + size - quarter} L ${x + size - quarter} ${y + size} L ${
    x + quarter
  } ${y + size} L ${x} ${y + size - quarter} L ${x} ${y + quarter} Z`;
}

function getClassyRoundedPath(x: number, y: number, size: number): string {
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

function getExtraRoundedPath(cx: number, cy: number, radius: number): string {
  return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${
    cx + radius
  } ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} Z`;
}

/**
 * Gets the optimal dot size for rendering
 */
export function calculateDotSize(type: DotsType, defaultSize: number): number {
  // Some dot types need adjustment for consistent appearance
  switch (type) {
    case "extra-rounded":
      return defaultSize * 0.9;
    case "classy":
    case "classy-rounded":
      return defaultSize * 0.95;
    default:
      return defaultSize;
  }
}
