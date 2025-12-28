import { generateICS } from "./calendar/ics";
import { encodeText } from "./qr/encoder";
import { reedSolomon } from "./qr/reed-solomon";
import { createMatrix } from "./qr/matrix";
import { placeData } from "./qr/placer";
import { applyMask } from "./qr/mask";
import { renderTerminal } from "./render/terminal";
import { CalendarEvent, QRCodeOptions } from "./types";

// Export main API
export { CalendarQR, CalendarQROptions } from "./api";

// Export all types including styling
export type {
  CalendarEvent,
  QRCodeOptions,
  ErrorCorrectionLevel,
  QRStylingOptions,
  DotsOptions,
  BackgroundOptions,
  CornersSquareOptions,
  CornersDotOptions,
  ImageOptions,
  GradientOptions,
  GradientColorStop,
  DotsType,
  CornersType,
  GradientType,
  QRShape,
} from "./types";

// Export utilities
export { generateICS } from "./calendar/ics";

// Export styling processors and utilities
export {
  processStylingOptions,
  DEFAULT_STYLING_OPTIONS,
} from "./styling/processor";
export * from "./styling/dots";
export * from "./styling/corners";
export * from "./styling/gradients";
export * from "./styling/background";
export * from "./styling/image";
export { renderStyledQR } from "./render/png";

/**
 * Convert text to QR code string (terminal output)
 * Flow: text → encodeText() → reedSolomon() → createMatrix() → placeData() → applyMask() → renderTerminal()
 */
export async function toString(
  text: string,
  options?: QRCodeOptions
): Promise<string> {
  // 1. Encode text to data bytes
  const data = encodeText(text);

  // 2. Generate Reed-Solomon error correction codes
  const ec = reedSolomon(data);

  // 3. Create empty QR matrix (Version 1 = 21x21)
  const matrix = createMatrix(21);

  // 4. Place data and error correction codes in matrix
  placeData(matrix, [...data, ...ec]);

  // 5. Apply mask pattern
  applyMask(matrix, 0);

  // 6. Render to terminal output
  return renderTerminal(matrix);
}

/**
 * Convert calendar event to QR code (terminal output)
 * Flow: CalendarEvent → ICS string → toString() → QR code
 */
export async function calendarToQR(
  event: CalendarEvent,
  options?: QRCodeOptions
): Promise<string> {
  // 1. Generate ICS calendar string from event
  const ics = generateICS(event);

  // 2. Convert ICS to QR code
  return toString(ics, options);
}
