# 📦 universal-calendar-qr-generator

> Generate universal calendar QR codes with **ZERO external dependencies** - Pure TypeScript implementation!

[![npm version](https://img.shields.io/npm/v/universal-calendar-qr-generator.svg)](https://www.npmjs.com/package/universal-calendar-qr-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- ✅ **Zero Dependencies** - Pure TypeScript, no external packages
- ✅ **ICS/iCalendar Format** - Universal standard (RFC 5545)
- ✅ **Works Worldwide** - Compatible with all calendar apps
- ✅ **Cross-Platform** - iPhone, Android, Windows, macOS, Linux
- ✅ **Offline Capable** - Generates QR codes locally
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Lightweight** - Small bundle size (11.3 kB)
- ✅ **Privacy-First** - No data sent to external servers
- ✅ **Pure QR Implementation** - Custom QR encoder from scratch

## 🌍 Device Compatibility

| Platform           | Calendar App               | Status           |
| ------------------ | -------------------------- | ---------------- |
| 📱 **iPhone/iPad** | Apple Calendar             | ✅ Works Perfect |
| 🤖 **Android**     | Google Calendar            | ✅ Works Perfect |
| 💼 **Windows**     | Outlook                    | ✅ Works Perfect |
| 🍎 **macOS**       | Apple Calendar             | ✅ Works Perfect |
| 🐧 **Linux**       | Thunderbird, Evolution     | ✅ Works Perfect |
| 🇨🇳 **China**       | All local calendar apps    | ✅ Works Perfect |
| 🌐 **Web**         | Gmail, Outlook.com, iCloud | ✅ Works Perfect |

## 📥 Installation

```bash
npm i universal-calendar-qr-generator
```

**Note:** This package has **NO runtime dependencies**. Everything is built from scratch in pure TypeScript!

## 🚀 Quick Start

```typescript
import { CalendarQR, CalendarEvent } from "universal-calendar-qr-generator";

// Define your event
const event: CalendarEvent = {
  title: "Team Meeting",
  start: new Date("2025-01-15T10:00:00"),
  end: new Date("2025-01-15T11:00:00"),
  location: "Conference Room A",
  description: "Monthly team sync meeting",
};

// Generate QR code (returns SVG data URL)
const qrCodeDataUrl = await CalendarQR.generate(event);

// Use in HTML
document.getElementById("qr-image").src = qrCodeDataUrl;
```

## 📱 How It Works When Scanned

The QR code contains raw **ICS (iCalendar) data**:

- **iOS:** Shows ICS text → User taps "Add to Calendar"
- **Android:** Shows ICS text → User taps "Create Event"
- **Desktop:** User can copy and save as `.ics` file

✅ Works on **all devices** without external APIs or internet connection!

## 🔧 Framework Integration

### Angular

```typescript
import { Component } from "@angular/core";
import { CalendarQR, CalendarEvent } from "universal-calendar-qr-generator";

@Component({
  selector: "app-calendar",
  template: `
    <button (click)="generateQR()">Generate QR</button>
    <img *ngIf="qrCode" [src]="qrCode" />
  `,
})
export class CalendarComponent {
  qrCode: string = "";

  async generateQR() {
    const event: CalendarEvent = {
      title: "Team Meeting",
      start: new Date("2025-01-15T10:00:00"),
      end: new Date("2025-01-15T11:00:00"),
      location: "Conference Room",
      description: "Monthly sync",
    };

    this.qrCode = await CalendarQR.generate(event);
  }
}
```

### React

```typescript
import { useState } from "react";
import { CalendarQR, CalendarEvent } from "universal-calendar-qr-generator";

function CalendarQRComponent() {
  const [qrCode, setQrCode] = useState("");

  const generateQR = async () => {
    const event: CalendarEvent = {
      title: "Team Meeting",
      start: new Date("2025-01-15T10:00:00"),
      end: new Date("2025-01-15T11:00:00"),
      location: "Conference Room",
      description: "Monthly sync",
    };

    const qr = await CalendarQR.generate(event);
    setQrCode(qr);
  };

  return (
    <div>
      <button onClick={generateQR}>Generate QR</button>
      {qrCode && <img src={qrCode} alt="Calendar QR" />}
    </div>
  );
}
```

### Vue 3

```vue
<script setup lang="ts">
import { ref } from "vue";
import { CalendarQR, CalendarEvent } from "universal-calendar-qr-generator";

const qrCode = ref("");

const generateQR = async () => {
  const event: CalendarEvent = {
    title: "Team Meeting",
    start: new Date("2025-01-15T10:00:00"),
    end: new Date("2025-01-15T11:00:00"),
    location: "Conference Room",
    description: "Monthly sync",
  };

  qrCode.value = await CalendarQR.generate(event);
};
</script>

<template>
  <button @click="generateQR">Generate QR</button>
  <img v-if="qrCode" :src="qrCode" alt="Calendar QR" />
</template>
```

## 📖 API Reference

### `CalendarEvent` Interface

```typescript
interface CalendarEvent {
  title: string; // Required: Event title
  start: Date; // Required: Event start time
  end: Date; // Required: Event end time
  location?: string; // Optional: Event location
  description?: string; // Optional: Event description
}
```

### `CalendarQROptions` Interface

```typescript
interface CalendarQROptions {
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"; // QR error correction (default: 'M')
  size?: number; // QR module size (default: 10)
  margin?: number; // QR margin (default: 4)
}
```

### `CalendarQR.generate()`

Generate QR code as an SVG data URL.

```typescript
CalendarQR.generate(
  event: CalendarEvent,
  options?: CalendarQROptions
): Promise<string>
```

**Returns:** Data URL string (image/svg+xml)

**Example:**

```typescript
const qrDataUrl = await CalendarQR.generate(event, {
  size: 15,
  margin: 6,
  errorCorrectionLevel: "H",
});
```

### `generateICS()` Utility

Get raw ICS calendar content as a string.

```typescript
import { generateICS } from "universal-calendar-qr-generator";

const icsContent = generateICS(event);
console.log(icsContent);
// Output: BEGIN:VCALENDAR\nVERSION:2.0\n...
```

## 💡 Advanced Usage

### Custom QR Code Options

```typescript
const qrCode = await CalendarQR.generate(event, {
  size: 20, // Larger modules = bigger QR
  margin: 8, // More space around QR
  errorCorrectionLevel: "H", // High error correction
});
```

### Error Handling

```typescript
try {
  const qrCode = await CalendarQR.generate(event);
  console.log("✅ QR code generated successfully");
} catch (error) {
  console.error("❌ Failed to generate QR code:", error);
}
```

### Generate Multiple QR Codes

```typescript
const events: CalendarEvent[] = [
  { title: "Meeting 1", start: new Date(), end: new Date() },
  { title: "Meeting 2", start: new Date(), end: new Date() },
];

const qrCodes = await Promise.all(
  events.map((event) => CalendarQR.generate(event))
);
```

## 🔧 How It Works

This package implements the **complete QR code generation pipeline** from scratch:

### 1. ICS Calendar Format (RFC 5545)

Generates standard iCalendar format that all calendar apps understand.

```
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Team Meeting
DTSTART:20250115T100000Z
DTEND:20250115T110000Z
LOCATION:Conference Room
DESCRIPTION:Monthly team sync
END:VEVENT
END:VCALENDAR
```

### 2. Pure TypeScript QR Code Generator

- ✅ Custom implementation (ISO/IEC 18004)
- ✅ Data encoding (Byte mode)
- ✅ Reed-Solomon error correction
- ✅ QR matrix generation
- ✅ Mask pattern application
- ✅ SVG rendering
- ✅ Zero external dependencies

### 3. Technical Details

- **QR Version:** 1 (21×21)
- **Encoding:** Byte mode
- **Error Correction:** Configurable (L/M/Q/H)
- **Output Format:** SVG (base64 data URL)
- **Size:** ~11.3 kB (gzipped)

## 📱 Scanning Instructions

### iPhone / iPad

1. Open Camera app
2. Point at QR code
3. Tap notification
4. Tap "Add to Calendar"

### Android

1. Open Camera or Google Lens
2. Point at QR code
3. Tap to view
4. Tap "Create Event"

### Desktop

1. Scan shows ICS text
2. Copy the content
3. Save as `.ics` file
4. Double-click to open in calendar app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---
