export type ErrorCorrectionLevel = "low" | "medium" | "quartile" | "high";

export interface QRCodeOptions {
  errorCorrectionLevel?: ErrorCorrectionLevel;
  margin?: number;
  scale?: number;
  type?: "terminal";
}

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
}

// ============== QR Styling Types ==============

export type GradientType = "linear" | "radial";
export type DotsType =
  | "square"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";
export type CornersType =
  | "square"
  | "rounded"
  | "extra-rounded"
  | "dot"
  | "dots"
  | "classy"
  | "classy-rounded";

/**
 * Gradient color stop definition
 */
export interface GradientColorStop {
  offset: number; // 0 to 1
  color: string; // hex, rgb, or named color
}

/**
 * Gradient options for dots, background, and corners
 */
export interface GradientOptions {
  type?: GradientType; // 'linear' or 'radial'
  rotation?: number; // in radians (Math.PI === 180 degrees)
  colorStops: GradientColorStop[];
}

/**
 * Options for styling QR code dots
 */
export interface DotsOptions {
  color?: string; // default: '#000'
  type?: DotsType; // default: 'square'
  gradient?: GradientOptions;
  roundSize?: boolean; // default: true
}

/**
 * Options for styling QR code background
 */
export interface BackgroundOptions {
  color?: string; // default: '#fff'
  gradient?: GradientOptions;
}

/**
 * Options for styling corner squares
 */
export interface CornersSquareOptions {
  color?: string;
  type?: CornersType;
  gradient?: GradientOptions;
}

/**
 * Options for styling corner dots
 */
export interface CornersDotOptions {
  color?: string;
  type?: CornersType;
  gradient?: GradientOptions;
}

/**
 * Options for image overlay on QR code
 */
export interface ImageOptions {
  src?: string; // URL to image
  hideBackgroundDots?: boolean; // default: true
  imageSize?: number; // default: 0.4 (coefficient)
  margin?: number; // default: 0
  crossOrigin?: "anonymous" | "use-credentials";
  saveAsBlob?: boolean; // default: true
}

/**
 * Shape type for QR code
 */
export type QRShape = "square" | "circle";

/**
 * Extended QR code styling options
 */
export interface QRStylingOptions {
  width?: number; // default: 300
  height?: number; // default: 300
  type?: "canvas" | "svg"; // default: 'canvas'
  shape?: QRShape; // default: 'square'
  margin?: number; // default: 0
  dotsOptions?: DotsOptions;
  backgroundOptions?: BackgroundOptions;
  cornersSquareOptions?: CornersSquareOptions;
  cornersDotOptions?: CornersDotOptions;
  imageOptions?: ImageOptions;
}
