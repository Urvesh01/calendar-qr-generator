import { GradientOptions } from "../types";

/**
 * Converts gradient options to SVG gradient definition
 */
export function generateGradientId(index: number): string {
  return `gradient-${index}`;
}

/**
 * Creates SVG gradient element
 */
export function createSVGGradient(
  gradient: GradientOptions,
  id: string,
  width: number,
  height: number
): string {
  if (gradient.type === "radial") {
    return createRadialGradient(gradient, id, width, height);
  } else {
    return createLinearGradient(gradient, id, width, height);
  }
}

function createLinearGradient(
  gradient: GradientOptions,
  id: string,
  width: number,
  height: number
): string {
  const rotation = gradient.rotation || 0;
  const rad = rotation;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // Calculate gradient vector based on rotation
  const x1 = 50 + 50 * cos;
  const y1 = 50 + 50 * sin;
  const x2 = 50 - 50 * cos;
  const y2 = 50 - 50 * sin;

  const stops = gradient.colorStops
    .map(
      (stop) =>
        `<stop offset="${stop.offset * 100}%" stop-color="${stop.color}" />`
    )
    .join("");

  return `<linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stops}</linearGradient>`;
}

function createRadialGradient(
  gradient: GradientOptions,
  id: string,
  width: number,
  height: number
): string {
  const stops = gradient.colorStops
    .map(
      (stop) =>
        `<stop offset="${stop.offset * 100}%" stop-color="${stop.color}" />`
    )
    .join("");

  return `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">${stops}</radialGradient>`;
}

/**
 * Returns gradient reference for use in SVG elements
 */
export function getGradientReference(id: string): string {
  return `url(#${id})`;
}
