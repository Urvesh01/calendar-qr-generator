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
