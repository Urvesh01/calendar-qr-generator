export interface CalendarEvent {
  eventName: string;
  startDateTime: Date;
  endDateTime: Date;
  location?: string;
  description?: string;
}

export interface QRCodeOptions {
  size?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
}

/**
 * Generates ICS (iCalendar) content from event data
 */
export class ICSGenerator {
  static generate(event: CalendarEvent): string {
    const formatDateForICS = (date: Date): string => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    };

    const escapeICS = (text: string): string => {
      return text
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
    };

    const now = new Date();
    const dtstamp = formatDateForICS(now);
    const dtstart = formatDateForICS(event.startDateTime);
    const dtend = formatDateForICS(event.endDateTime);
    const uid = `${Date.now()}@calendar-qr-generator`;

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Calendar QR Generator//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${escapeICS(event.eventName)}`,
    ];

    if (event.location) {
      icsLines.push(`LOCATION:${escapeICS(event.location)}`);
    }

    if (event.description) {
      icsLines.push(`DESCRIPTION:${escapeICS(event.description)}`);
    }

    icsLines.push('STATUS:CONFIRMED');
    icsLines.push('SEQUENCE:0');
    icsLines.push('END:VEVENT');
    icsLines.push('END:VCALENDAR');

    return icsLines.join('\r\n');
  }

  static downloadICS(event: CalendarEvent, filename?: string): void {
    const icsContent = this.generate(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `${event.eventName.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

/**
 * QR Code Generator - Pure TypeScript Implementation
 * Based on QR Code specification ISO/IEC 18004
 */
export class QRCodeGenerator {
  private static readonly PATTERNS = {
    L: 0x01, // Low error correction
    M: 0x00, // Medium error correction
    Q: 0x03, // Quality error correction
    H: 0x02  // High error correction
  };

  /**
   * Generate QR code as Data URL
   */
  static async generateDataURL(
    text: string, 
    options: QRCodeOptions = {}
  ): Promise<string> {
    const size = options.size || 400;
    const margin = options.margin || 2;
    const darkColor = options.darkColor || '#000000';
    const lightColor = options.lightColor || '#FFFFFF';

    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    // Generate QR matrix (simplified for demonstration)
    const qrMatrix = this.generateMatrix(text);
    const moduleCount = qrMatrix.length;
    
    const cellSize = Math.floor((size - margin * 2) / moduleCount);
    const actualSize = cellSize * moduleCount + margin * 2;
    
    canvas.width = actualSize;
    canvas.height = actualSize;

    // Draw background
    ctx.fillStyle = lightColor;
    ctx.fillRect(0, 0, actualSize, actualSize);

    // Draw QR modules
    ctx.fillStyle = darkColor;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qrMatrix[row][col]) {
          ctx.fillRect(
            margin + col * cellSize,
            margin + row * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    }

    return canvas.toDataURL('image/png');
  }

  /**
   * Generate QR code matrix (simplified version)
   * For production, use full QR algorithm with Reed-Solomon error correction
   */
  private static generateMatrix(text: string): boolean[][] {
    // Simplified QR generation - creates a basic pattern
    // In production, implement full QR Code algorithm
    const size = this.calculateSize(text.length);
    const matrix: boolean[][] = [];

    // Initialize matrix
    for (let i = 0; i < size; i++) {
      matrix[i] = new Array(size).fill(false);
    }

    // Add finder patterns (corner squares)
    this.addFinderPattern(matrix, 0, 0);
    this.addFinderPattern(matrix, size - 7, 0);
    this.addFinderPattern(matrix, 0, size - 7);

    // Add timing patterns
    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Encode data (simplified - just creates a pattern based on text)
    const encoded = this.encodeText(text);
    let bitIndex = 0;
    
    for (let row = size - 1; row >= 0; row -= 2) {
      if (row === 6) row--; // Skip timing column
      
      for (let col = 0; col < size; col++) {
        for (let c = 0; c < 2; c++) {
          const currentCol = row - c;
          if (currentCol < 0) continue;
          
          if (!this.isReserved(matrix, col, currentCol, size)) {
            if (bitIndex < encoded.length) {
              matrix[col][currentCol] = encoded[bitIndex] === '1';
              bitIndex++;
            }
          }
        }
      }
    }

    return matrix;
  }

  private static calculateSize(length: number): number {
    // QR Code size calculation
    if (length < 25) return 21;
    if (length < 47) return 25;
    if (length < 77) return 29;
    if (length < 114) return 33;
    return 37;
  }

  private static addFinderPattern(matrix: boolean[][], x: number, y: number): void {
    // 7x7 finder pattern
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const isBorder = i === 0 || i === 6 || j === 0 || j === 6;
        const isCenter = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        matrix[y + i][x + j] = isBorder || isCenter;
      }
    }
  }

  private static encodeText(text: string): string {
    // Simple binary encoding
    let binary = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      binary += charCode.toString(2).padStart(8, '0');
    }
    return binary;
  }

  private static isReserved(
    matrix: boolean[][], 
    row: number, 
    col: number, 
    size: number
  ): boolean {
    // Check if position is reserved for finder patterns, timing, etc.
    const isFinderArea = 
      (row < 9 && col < 9) ||
      (row < 9 && col >= size - 8) ||
      (row >= size - 8 && col < 9);
    
    const isTimingLine = row === 6 || col === 6;
    
    return isFinderArea || isTimingLine;
  }
}

/**
 * Main CalendarQR class - combines ICS and QR generation
 */
export class CalendarQR {
  /**
   * Generate QR code for calendar event
   */
  static async generate(
    event: CalendarEvent,
    options?: QRCodeOptions
  ): Promise<string> {
    const icsContent = ICSGenerator.generate(event);
    return QRCodeGenerator.generateDataURL(icsContent, options);
  }

  /**
   * Download QR code as PNG image
   */
  static async downloadQRCode(
    event: CalendarEvent,
    filename?: string,
    options?: QRCodeOptions
  ): Promise<void> {
    const dataUrl = await this.generate(event, options);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename || `calendar-qr-${event.eventName.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Get ICS content
   */
  static getICS(event: CalendarEvent): string {
    return ICSGenerator.generate(event);
  }

  /**
   * Download ICS file
   */
  static downloadICS(event: CalendarEvent, filename?: string): void {
    ICSGenerator.downloadICS(event, filename);
  }
}

// Export all classes
export default CalendarQR;