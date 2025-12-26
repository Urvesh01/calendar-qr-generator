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

// Export types
export type { CalendarEvent, QRCodeOptions, ErrorCorrectionLevel } from "./types";

// Export utilities
export { generateICS } from "./calendar/ics";

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
