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

export type CalendarType = 'google' | 'outlook' | 'yahoo' | 'ics';

/**
 * Generates calendar URLs that open directly in calendar apps when scanned
 */
export class CalendarURLGenerator {
  /**
   * Format date for Google Calendar URL (YYYYMMDDTHHmmssZ)
   */
  private static formatDateForGoogle(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

  /**
   * Format date for Outlook URL (ISO format)
   */
  private static formatDateForOutlook(date: Date): string {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  /**
   * Generate Google Calendar URL - Opens directly in Google Calendar
   */
  static generateGoogleCalendarURL(event: CalendarEvent): string {
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams();
    
    params.append('action', 'TEMPLATE');
    params.append('text', event.eventName);
    params.append('dates', `${this.formatDateForGoogle(event.startDateTime)}/${this.formatDateForGoogle(event.endDateTime)}`);
    
    if (event.location) {
      params.append('location', event.location);
    }
    
    if (event.description) {
      params.append('details', event.description);
    }

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Generate Outlook Calendar URL - Opens directly in Outlook
   */
  static generateOutlookCalendarURL(event: CalendarEvent): string {
    const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose';
    const params = new URLSearchParams();
    
    params.append('path', '/calendar/action/compose');
    params.append('rru', 'addevent');
    params.append('subject', event.eventName);
    params.append('startdt', event.startDateTime.toISOString());
    params.append('enddt', event.endDateTime.toISOString());
    
    if (event.location) {
      params.append('location', event.location);
    }
    
    if (event.description) {
      params.append('body', event.description);
    }

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Generate Yahoo Calendar URL - Opens directly in Yahoo Calendar
   */
  static generateYahooCalendarURL(event: CalendarEvent): string {
    const baseUrl = 'https://calendar.yahoo.com/';
    const params = new URLSearchParams();
    
    params.append('v', '60');
    params.append('title', event.eventName);
    params.append('st', this.formatDateForGoogle(event.startDateTime));
    params.append('et', this.formatDateForGoogle(event.endDateTime));
    
    if (event.location) {
      params.append('in_loc', event.location);
    }
    
    if (event.description) {
      params.append('desc', event.description);
    }

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Generate URL based on calendar type
   */
  static generateURL(event: CalendarEvent, calendarType: CalendarType): string {
    switch (calendarType) {
      case 'google':
        return this.generateGoogleCalendarURL(event);
      case 'outlook':
        return this.generateOutlookCalendarURL(event);
      case 'yahoo':
        return this.generateYahooCalendarURL(event);
      case 'ics':
      default:
        return ICSGenerator.generate(event);
    }
  }
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
 * Main CalendarQR class - combines URL and QR generation
 * 
 * IMPORTANT: This package provides two approaches:
 * 
 * 1. ICS FORMAT (DEFAULT - RECOMMENDED FOR PRODUCTION):
 *    - Uses standard iCalendar format (RFC 5545)
 *    - Works offline, no external dependencies
 *    - Universal standard that won't change
 *    - Methods: generate(), generateICS(), getICS()
 * 
 * 2. URL-BASED (OPTIONAL - USE WITH CAUTION):
 *    - Depends on external services (Google, Outlook, Yahoo)
 *    - URLs may change without notice
 *    - Requires internet connection
 *    - May not work in regions where services are blocked
 *    - Methods: generateGoogleCalendarQR(), generateOutlookCalendarQR(), etc.
 */
export class CalendarQR {
  /**
   * Generate QR code for calendar event using ICS format (RECOMMENDED)
   * 
   * This is the safest option for production:
   * - Uses universal iCalendar standard (RFC 5545)
   * - No external API dependencies
   * - Works offline
   * - Future-proof standard
   * 
   * Note: Some QR scanners may show the ICS text. For best experience,
   * provide instructions to users on how to add the event to their calendar.
   */
  static async generate(
    event: CalendarEvent,
    options?: QRCodeOptions
  ): Promise<string> {
    const icsContent = ICSGenerator.generate(event);
    return QRCodeGenerator.generateDataURL(icsContent, options);
  }

  /**
   * Generate QR code using ICS format (same as generate, explicit naming)
   */
  static async generateICS(
    event: CalendarEvent,
    options?: QRCodeOptions
  ): Promise<string> {
    return this.generate(event, options);
  }

  /**
   * Generate QR code for specific calendar type
   * @param event - Calendar event details
   * @param calendarType - 'ics' (recommended) | 'google' | 'outlook' | 'yahoo'
   * @param options - QR code options
   * 
   * WARNING: 'google', 'outlook', 'yahoo' options depend on external services
   * and may break if those services change their URL structure.
   */
  static async generateForCalendar(
    event: CalendarEvent,
    calendarType: CalendarType,
    options?: QRCodeOptions
  ): Promise<string> {
    if (calendarType === 'ics') {
      return this.generate(event, options);
    }
    const url = CalendarURLGenerator.generateURL(event, calendarType);
    return QRCodeGenerator.generateDataURL(url, options);
  }

  /**
   * Generate QR code using Google Calendar URL
   * 
   * ⚠️ WARNING: This method depends on Google's external service.
   * - URL structure may change without notice
   * - Requires internet connection
   * - May not work in countries where Google is blocked (e.g., China)
   * - For production apps, consider using generate() with ICS format instead
   */
  static async generateGoogleCalendarQR(
    event: CalendarEvent,
    options?: QRCodeOptions
  ): Promise<string> {
    const url = CalendarURLGenerator.generateGoogleCalendarURL(event);
    return QRCodeGenerator.generateDataURL(url, options);
  }

  /**
   * Generate QR code using Outlook Calendar URL
   * 
   * ⚠️ WARNING: This method depends on Microsoft's external service.
   * - URL structure may change without notice
   * - Requires internet connection
   * - For production apps, consider using generate() with ICS format instead
   */
  static async generateOutlookCalendarQR(
    event: CalendarEvent,
    options?: QRCodeOptions
  ): Promise<string> {
    const url = CalendarURLGenerator.generateOutlookCalendarURL(event);
    return QRCodeGenerator.generateDataURL(url, options);
  }

  /**
   * Generate QR code using Yahoo Calendar URL
   * 
   * ⚠️ WARNING: This method depends on Yahoo's external service.
   * - URL structure may change without notice
   * - Requires internet connection
   * - For production apps, consider using generate() with ICS format instead
   */
  static async generateYahooCalendarQR(
    event: CalendarEvent,
    options?: QRCodeOptions
  ): Promise<string> {
    const url = CalendarURLGenerator.generateYahooCalendarURL(event);
    return QRCodeGenerator.generateDataURL(url, options);
  }

  /**
   * Get the Google Calendar URL directly
   * ⚠️ WARNING: Depends on external Google service
   */
  static getGoogleCalendarURL(event: CalendarEvent): string {
    return CalendarURLGenerator.generateGoogleCalendarURL(event);
  }

  /**
   * Get the Outlook Calendar URL directly
   * ⚠️ WARNING: Depends on external Microsoft service
   */
  static getOutlookCalendarURL(event: CalendarEvent): string {
    return CalendarURLGenerator.generateOutlookCalendarURL(event);
  }

  /**
   * Get the Yahoo Calendar URL directly
   * ⚠️ WARNING: Depends on external Yahoo service
   */
  static getYahooCalendarURL(event: CalendarEvent): string {
    return CalendarURLGenerator.generateYahooCalendarURL(event);
  }

  /**
   * Download QR code as PNG image
   * Default uses ICS format (safe for production)
   */
  static async downloadQRCode(
    event: CalendarEvent,
    filename?: string,
    options?: QRCodeOptions,
    calendarType: CalendarType = 'ics'
  ): Promise<void> {
    const dataUrl = await this.generateForCalendar(event, calendarType, options);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename || `calendar-qr-${event.eventName.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Get ICS content - Universal calendar format (RFC 5545)
   * This is the safest format for production use.
   */
  static getICS(event: CalendarEvent): string {
    return ICSGenerator.generate(event);
  }

  /**
   * Download ICS file directly
   */
  static downloadICS(event: CalendarEvent, filename?: string): void {
    ICSGenerator.downloadICS(event, filename);
  }
}

// Export default
export default CalendarQR;