import { CalendarEvent, QRStylingOptions } from "./types";
import { generateICS } from "./calendar/ics";
import { encodeText } from "./qr/encoder";
import { reedSolomon } from "./qr/reed-solomon";
import { createMatrix } from "./qr/matrix";
import { placeData } from "./qr/placer";
import { applyMask } from "./qr/mask";
import { renderPNG, renderStyledQR } from "./render/png";
import { processStylingOptions } from "./styling/processor";

export interface CalendarQROptions {
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  size?: number;
  margin?: number;
  styling?: QRStylingOptions;
}

/**
 * Main CalendarQR API - Pure implementation with ZERO external dependencies
 * Uses ICS (iCalendar) format - universal, offline, works everywhere
 *
 * Now with full styling support:
 * - Custom dot styles (square, rounded, classy, etc.)
 * - Custom corner styles
 * - Gradients (linear and radial)
 * - Background customization
 * - Logo/image overlay
 */
export class CalendarQR {
  /**
   * Generate QR code for calendar event using raw ICS format
   * Returns data URL that can be used directly in img src
   *
   * How it works when scanned:
   * - QR contains: Raw ICS calendar data (RFC 5545 format)
   * - iOS: Shows ICS text with "Add to Calendar" button
   * - Android: Shows ICS text with "Create Event" option
   * - Desktop: User can copy/save as .ics file
   *
   * Benefits:
   * ✅ Zero dependencies - works completely offline
   * ✅ Smallest QR code size - fits more data
   * ✅ No backend required - no infrastructure costs
   * ✅ Privacy-first - no data sent to external servers
   * ✅ Universal - works on all devices
   * ✅ Full styling support - customizable appearance
   *
   * @param event - Calendar event details
   * @param options - QR code generation and styling options
   * @returns Data URL for QR code image (SVG format)
   */
  static async generate(
    event: CalendarEvent,
    options: CalendarQROptions = {}
  ): Promise<string> {
    // Generate ICS format (RFC 5545 standard)
    const ics = generateICS(event);

    // Generate QR code containing raw ICS text
    return this.generateQRDataURL(ics, options);
  }

  /**
   * Generate QR code data URL from text (internal implementation)
   * Pure TypeScript - no external API calls
   */
  private static async generateQRDataURL(
    text: string,
    options: CalendarQROptions = {}
  ): Promise<string> {
    // 1. Encode text to data bytes
    const data = encodeText(text);

    // 2. Generate Reed-Solomon error correction (zero dependencies)
    const ec = reedSolomon(data);

    // 3. Create QR matrix (Version 1 = 21x21)
    const matrix = createMatrix(21);

    // 4. Place data in matrix
    placeData(matrix, [...data, ...ec]);

    // 5. Apply mask pattern
    applyMask(matrix, 0);

    // 6. Render with optional styling
    let svg: string;

    if (options.styling) {
      // Process and apply styling options
      const stylingOptions = processStylingOptions(options.styling);
      svg = renderStyledQR(matrix, stylingOptions);
    } else {
      // Legacy rendering without styling
      svg = renderPNG(matrix, {
        scale: options.size || 10,
        margin: options.margin || 4,
      });
    }

    // Convert SVG to data URL
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
      "base64"
    )}`;
    return dataUrl;
  }

  /**
   * Get default styling options
   * Useful for customization starting points
   */
  static getDefaultStyling(): QRStylingOptions {
    return {
      width: 300,
      height: 300,
      type: "svg",
      shape: "square",
      margin: 0,
      dotsOptions: {
        color: "#000000",
        type: "square",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        color: "#000000",
        type: "square",
      },
      cornersDotOptions: {
        color: "#000000",
        type: "square",
      },
    };
  }
}
