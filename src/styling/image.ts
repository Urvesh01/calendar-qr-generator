import { ImageOptions } from "../types";

/**
 * Loads image as base64 or SVG element
 */
export async function loadImage(
  src: string,
  options: ImageOptions
): Promise<string> {
  try {
    if (options.saveAsBlob) {
      // Load and convert to base64
      const response = await fetch(src, {
        headers: options.crossOrigin === "use-credentials" ? {} : {},
      });
      const blob = await response.blob();
      return blobToBase64(blob);
    } else {
      // Use URL directly
      return src;
    }
  } catch (error) {
    console.warn(`Failed to load image from ${src}:`, error);
    return "";
  }
}

/**
 * Converts blob to base64 data URL
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert blob to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Creates SVG image element with styling
 */
export function createImageElement(
  imageData: string,
  x: number,
  y: number,
  width: number,
  height: number,
  margin: number = 0
): string {
  const adjustedX = x + margin;
  const adjustedY = y + margin;
  const adjustedWidth = width - margin * 2;
  const adjustedHeight = height - margin * 2;

  // Determine if it's a data URL or regular URL
  const href = imageData.startsWith("data:")
    ? imageData
    : `url('${imageData}')`;

  return `<image x="${adjustedX}" y="${adjustedY}" width="${adjustedWidth}" height="${adjustedHeight}" href="${href}" preserveAspectRatio="xMidYMid slice" />`;
}

/**
 * Calculates image placement in QR code
 */
export function calculateImagePlacement(
  qrWidth: number,
  qrHeight: number,
  imageSize: number = 0.4
): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const size = Math.min(qrWidth, qrHeight) * imageSize;
  const x = (qrWidth - size) / 2;
  const y = (qrHeight - size) / 2;

  return {
    x,
    y,
    width: size,
    height: size,
  };
}
