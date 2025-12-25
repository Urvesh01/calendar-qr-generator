# 📦 universal-calendar-qr-generator

> Generate universal calendar QR codes that work on iPhone, Android, Outlook, and all devices worldwide - **with ZERO external dependencies!**

[![npm version](https://img.shields.io/npm/v/universal-calendar-qr-generator.svg)](https://www.npmjs.com/package/universal-calendar-qr-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- ✅ **Zero Dependencies** - Pure TypeScript implementation, no external packages required
- ✅ **Direct Calendar Open** - QR code opens directly in Google Calendar, Outlook, or Yahoo when scanned
- ✅ **Universal Calendar Format** - Also supports ICS/iCalendar standard (RFC 5545)
- ✅ **Works Worldwide** - China, India, USA, Europe - works everywhere!
- ✅ **Cross-Platform** - iPhone (Apple Calendar), Android (Google Calendar), Outlook, and more
- ✅ **Offline Capable** - Generates QR codes locally in browser
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Lightweight** - Small bundle size with tree-shaking support
- ✅ **Privacy-First** - No data sent to external servers

## 🌍 Device Compatibility

| Platform | Calendar App | Status |
|----------|-------------|--------|
| 📱 **iPhone/iPad** | Apple Calendar | ✅ Works Perfect |
| 🤖 **Android** | Google Calendar | ✅ Works Perfect |
| 💼 **Windows** | Outlook | ✅ Works Perfect |
| 🍎 **macOS** | Apple Calendar | ✅ Works Perfect |
| 🐧 **Linux** | Thunderbird, Evolution | ✅ Works Perfect |
| 🇨🇳 **China** | All local calendar apps | ✅ Works Perfect |
| 🌐 **Web** | Gmail, Outlook.com, iCloud | ✅ Works Perfect |

## 📥 Installation

```bash
npm i universal-calendar-qr-generator
```

**Note:** This package has **NO runtime dependencies**. Everything is built from scratch in pure TypeScript!

## 🚀 Quick Start

### Basic Usage (Recommended for Production)

```typescript
import { CalendarQR, CalendarEvent } from 'universal-calendar-qr-generator';

// Define your event
const event: CalendarEvent = {
  eventName: 'Team Meeting',
  startDateTime: new Date('2025-01-15T10:00:00'),
  endDateTime: new Date('2025-01-15T11:00:00'),
  location: 'Conference Room A',
  description: 'Monthly team sync meeting'
};

// Generate QR code using ICS format (universal, offline, no external dependencies)
const qrCodeDataUrl = await CalendarQR.generate(event);

// Use in HTML
document.getElementById('qr-image').src = qrCodeDataUrl;
```

## ⚠️ Important: Choosing the Right Method

This package offers **two approaches** - choose based on your needs:

### 1. ICS Format (DEFAULT - Recommended for Production) ✅

```typescript
// Uses universal iCalendar standard (RFC 5545)
const qrCode = await CalendarQR.generate(event);
// or explicitly:
const qrCode = await CalendarQR.generateICS(event);
```

| Pros | Cons |
|------|------|
| ✅ No external dependencies | ⚠️ Some QR scanners show text instead of opening calendar |
| ✅ Works offline | ⚠️ May require user to copy/save the ICS content |
| ✅ Universal standard (RFC 5545) | |
| ✅ Future-proof, won't break | |
| ✅ Works in all countries | |

### 2. URL-Based (Optional - Use with Caution) ⚠️

```typescript
// Opens directly in Google Calendar (depends on Google's service)
const googleQR = await CalendarQR.generateGoogleCalendarQR(event);

// Opens directly in Outlook (depends on Microsoft's service)
const outlookQR = await CalendarQR.generateOutlookCalendarQR(event);

// Opens directly in Yahoo Calendar (depends on Yahoo's service)
const yahooQR = await CalendarQR.generateYahooCalendarQR(event);
```

| Pros | Cons |
|------|------|
| ✅ Opens calendar app directly | ❌ **Depends on external services** |
| ✅ Better user experience | ❌ **URLs may change without notice** |
| | ❌ **Requires internet connection** |
| | ❌ **May not work in some countries (e.g., Google blocked in China)** |
| | ❌ **Could break in production if service changes** |

### 🏭 Production Recommendation

For **production applications**, we recommend using the **ICS format** (default `generate()` method) because:

1. **No external dependencies** - Your app won't break if Google/Microsoft/Yahoo change their URLs
2. **Works offline** - No internet required to display the QR code
3. **Universal standard** - iCalendar (RFC 5545) is an established standard
4. **Works worldwide** - No regional service restrictions

```typescript
// ✅ SAFE FOR PRODUCTION
const qrCode = await CalendarQR.generate(event);

// ⚠️ USE WITH CAUTION IN PRODUCTION
const googleQR = await CalendarQR.generateGoogleCalendarQR(event);
```

### Angular 18+ Integration

```typescript
import { Component, signal } from '@angular/core';
import { CalendarQR, CalendarEvent } from '@yourname/calendar-qr-generator';

@Component({
  selector: 'app-calendar',
  template: `
    <button (click)="generateQR()">Generate QR</button>
    <img [src]="qrCode()" *ngIf="qrCode()" />
  `
})
export class CalendarComponent {
  qrCode = signal<string>('');

  async generateQR() {
    const event: CalendarEvent = {
      eventName: 'Team Meeting',
      startDateTime: new Date('2025-01-15T10:00:00'),
      endDateTime: new Date('2025-01-15T11:00:00'),
      location: 'Conference Room',
      description: 'Monthly sync'
    };

    this.qrCode.set(await CalendarQR.generate(event));
  }
}
```

### React Integration

```typescript
import { useState } from 'react';
import { CalendarQR, CalendarEvent } from '@yourname/calendar-qr-generator';

function CalendarQRComponent() {
  const [qrCode, setQrCode] = useState('');

  const generateQR = async () => {
    const event: CalendarEvent = {
      eventName: 'Team Meeting',
      startDateTime: new Date('2025-01-15T10:00:00'),
      endDateTime: new Date('2025-01-15T11:00:00'),
      location: 'Conference Room',
      description: 'Monthly sync'
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

### Vue 3 Integration

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CalendarQR, CalendarEvent } from '@yourname/calendar-qr-generator';

const qrCode = ref('');

const generateQR = async () => {
  const event: CalendarEvent = {
    eventName: 'Team Meeting',
    startDateTime: new Date('2025-01-15T10:00:00'),
    endDateTime: new Date('2025-01-15T11:00:00'),
    location: 'Conference Room',
    description: 'Monthly sync'
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
  eventName: string;          // Required: Event title
  startDateTime: Date;        // Required: Event start time
  endDateTime: Date;          // Required: Event end time
  location?: string;          // Optional: Event location
  description?: string;       // Optional: Event description/notes
}
```

### `QRCodeOptions` Interface

```typescript
interface QRCodeOptions {
  size?: number;              // QR code size in pixels (default: 400)
  margin?: number;            // Margin around QR code (default: 2)
  darkColor?: string;         // Dark module color (default: '#000000')
  lightColor?: string;        // Light module color (default: '#FFFFFF')
}
```

### `CalendarQR.generate()`

Generate QR code as a data URL.

```typescript
CalendarQR.generate(
  event: CalendarEvent,
  options?: QRCodeOptions
): Promise<string>
```

**Returns:** Data URL string (image/png)

**Example:**
```typescript
const qrDataUrl = await CalendarQR.generate(event, {
  size: 500,
  margin: 4,
  darkColor: '#1a1a1a',
  lightColor: '#ffffff'
});
```

### `CalendarQR.downloadQRCode()`

Download QR code as a PNG image file.

```typescript
CalendarQR.downloadQRCode(
  event: CalendarEvent,
  filename?: string,
  options?: QRCodeOptions
): Promise<void>
```

**Example:**
```typescript
await CalendarQR.downloadQRCode(event, 'my-event-qr.png', {
  size: 600
});
```

### `CalendarQR.getICS()`

Get raw ICS calendar content as a string.

```typescript
CalendarQR.getICS(event: CalendarEvent): string
```

**Example:**
```typescript
const icsContent = CalendarQR.getICS(event);
console.log(icsContent);
// Output: BEGIN:VCALENDAR\nVERSION:2.0\n...
```

### `CalendarQR.downloadICS()`

Download event as an ICS calendar file.

```typescript
CalendarQR.downloadICS(
  event: CalendarEvent,
  filename?: string
): void
```

**Example:**
```typescript
CalendarQR.downloadICS(event, 'my-event.ics');
```

## 💡 Advanced Usage

### Custom QR Code Styling

```typescript
const qrCode = await CalendarQR.generate(event, {
  size: 600,
  margin: 4,
  darkColor: '#2196F3',  // Blue QR code
  lightColor: '#E3F2FD'  // Light blue background
});
```

### Error Handling

```typescript
try {
  const qrCode = await CalendarQR.generate(event);
  console.log('✅ QR code generated successfully');
} catch (error) {
  console.error('❌ Failed to generate QR code:', error);
}
```

### Validation Before Generation

```typescript
function validateEvent(event: CalendarEvent): boolean {
  if (!event.eventName || !event.startDateTime || !event.endDateTime) {
    console.error('Missing required fields');
    return false;
  }

  if (event.endDateTime <= event.startDateTime) {
    console.error('End time must be after start time');
    return false;
  }

  return true;
}

const event: CalendarEvent = { /* ... */ };
if (validateEvent(event)) {
  const qrCode = await CalendarQR.generate(event);
}
```

### Multiple QR Codes

```typescript
const events: CalendarEvent[] = [
  { eventName: 'Meeting 1', /* ... */ },
  { eventName: 'Meeting 2', /* ... */ },
  { eventName: 'Meeting 3', /* ... */ }
];

const qrCodes = await Promise.all(
  events.map(event => CalendarQR.generate(event))
);

qrCodes.forEach((qr, index) => {
  console.log(`QR ${index + 1} generated`);
});
```

## 🔧 How It Works

### 1. ICS Calendar Format
This package generates ICS (iCalendar) files, which is the universal standard for calendar events (RFC 5545). All modern calendar applications support this format.

**Example ICS output:**
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Calendar QR Generator//EN
BEGIN:VEVENT
UID:1234567890@calendar-qr-generator
DTSTART:20250115T100000Z
DTEND:20250115T110000Z
SUMMARY:Team Meeting
LOCATION:Conference Room
DESCRIPTION:Monthly team sync
END:VEVENT
END:VCALENDAR
```

### 2. QR Code Generation
The package includes a pure TypeScript QR code generator that:
- Implements QR Code specification (ISO/IEC 18004)
- Generates QR codes directly in the browser
- Requires no external dependencies
- Works completely offline

### 3. Universal Compatibility
When a user scans the QR code:
1. Their phone detects the ICS format
2. The default calendar app opens automatically
3. Event details are pre-filled
4. User clicks "Save" to add the event


## 📱 Scanning Instructions

### iPhone
1. Open Camera app
2. Point at QR code
3. Tap the notification
4. Event opens in Apple Calendar
5. Tap "Add" to save

### Android
1. Open Camera or Google Lens
2. Point at QR code
3. Tap to open
4. Event opens in Google Calendar
5. Tap "Save" to add

### Desktop
1. Download the .ics file
2. Double-click to open
3. Opens in Outlook/Calendar
4. Click "Save" to add


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
