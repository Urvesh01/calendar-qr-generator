/**
 * Complete Examples for Styled QR Code Generation
 * Demonstrates all styling capabilities for calendar QR codes
 */

import { CalendarQR } from "../index";
import { CalendarEvent, QRStylingOptions } from "../types";

/**
 * Example 1: Simple Styled QR Code
 * Blue rounded dots with light gray background
 */
export async function example1_simpleStyled() {
  const event = {
    title: "Team Standup",
    start: new Date("2024-02-15T09:30:00"),
    end: new Date("2024-02-15T10:00:00"),
    location: "Zoom",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      dotsOptions: {
        color: "#4267b2",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#f0f0f0",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 2: Professional Brand QR Code
 * Company branded colors with logo
 */
export async function example2_brandedQR() {
  const event = {
    title: "Client Presentation",
    start: new Date("2024-02-20T14:00:00"),
    end: new Date("2024-02-20T15:30:00"),
    location: "Conference Room A",
    description: "Q1 Marketing Review",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 400,
      height: 400,
      dotsOptions: {
        color: "#003366", // Company primary color
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        color: "#003366",
        type: "rounded",
      },
      cornersDotOptions: {
        color: "#003366",
      },
      imageOptions: {
        src: "https://example.com/company-logo.png",
        imageSize: 0.3,
        margin: 15,
        hideBackgroundDots: true,
        crossOrigin: "anonymous",
        saveAsBlob: true,
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 3: Gradient Styled QR Code
 * Linear gradient for modern look
 */
export async function example3_gradientStyled() {
  const event = {
    title: "Design Workshop",
    start: new Date("2024-03-01T10:00:00"),
    end: new Date("2024-03-01T12:00:00"),
    location: "Design Studio",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 300,
      height: 300,
      dotsOptions: {
        type: "dots",
        gradient: {
          type: "linear",
          rotation: Math.PI / 4, // 45 degrees
          colorStops: [
            { offset: 0, color: "#ff6b6b" },
            { offset: 0.5, color: "#ffd93d" },
            { offset: 1, color: "#6bcf7f" },
          ],
        },
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 4: Radial Gradient Background
 * Modern design with radial gradient
 */
export async function example4_radialGradient() {
  const event = {
    title: "Innovation Summit",
    start: new Date("2024-03-15T09:00:00"),
    end: new Date("2024-03-15T17:00:00"),
    location: "Tech Hub Center",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 350,
      height: 350,
      dotsOptions: {
        color: "#ffffff",
        type: "rounded",
      },
      backgroundOptions: {
        gradient: {
          type: "radial",
          colorStops: [
            { offset: 0, color: "#667eea" },
            { offset: 1, color: "#764ba2" },
          ],
        },
      },
      cornersSquareOptions: {
        color: "#ffffff",
        type: "rounded",
      },
      cornersDotOptions: {
        color: "#ffffff",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 5: Classy Styled QR Code
 * Diagonal cut corners for elegant look
 */
export async function example5_classyStyle() {
  const event = {
    title: "Executive Meeting",
    start: new Date("2024-03-20T11:00:00"),
    end: new Date("2024-03-20T12:00:00"),
    location: "Board Room",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 300,
      height: 300,
      dotsOptions: {
        color: "#1a1a1a",
        type: "classy-rounded",
      },
      backgroundOptions: {
        color: "#fafafa",
      },
      cornersSquareOptions: {
        color: "#d4af37", // Gold
        type: "classy-rounded",
      },
      cornersDotOptions: {
        color: "#d4af37",
        type: "dots",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 6: High Contrast Accessibility
 * High contrast for accessibility requirements
 */
export async function example6_highContrast() {
  const event = {
    title: "Accessibility Training",
    start: new Date("2024-03-25T14:00:00"),
    end: new Date("2024-03-25T15:00:00"),
    location: "Training Room",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 350,
      height: 350,
      dotsOptions: {
        color: "#000000", // Pure black
        type: "square",
      },
      backgroundOptions: {
        color: "#ffffff", // Pure white
      },
      cornersSquareOptions: {
        color: "#000000",
        type: "square",
      },
      cornersDotOptions: {
        color: "#000000",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 7: Creative Circle Shape
 * Modern circular dot pattern
 */
export async function example7_circleDots() {
  const event = {
    title: "Creative Workshop",
    start: new Date("2024-04-01T10:00:00"),
    end: new Date("2024-04-01T13:00:00"),
    location: "Art Studio",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 320,
      height: 320,
      dotsOptions: {
        color: "#ff1493", // Deep pink
        type: "dots",
      },
      backgroundOptions: {
        color: "#fff0f5", // Light pink
      },
      cornersSquareOptions: {
        color: "#ff1493",
        type: "dot",
      },
      cornersDotOptions: {
        color: "#ff1493",
        type: "dot",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 8: Multiple Color Stops Gradient
 * Rainbow gradient for vibrant designs
 */
export async function example8_rainbowGradient() {
  const event = {
    title: "Team Celebration",
    start: new Date("2024-04-10T16:00:00"),
    end: new Date("2024-04-10T18:00:00"),
    location: "Off-site Venue",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 350,
      height: 350,
      dotsOptions: {
        type: "rounded",
        gradient: {
          type: "linear",
          rotation: 0,
          colorStops: [
            { offset: 0, color: "#ff0000" },
            { offset: 0.2, color: "#ff7f00" },
            { offset: 0.4, color: "#ffff00" },
            { offset: 0.6, color: "#00ff00" },
            { offset: 0.8, color: "#0000ff" },
            { offset: 1, color: "#9400d3" },
          ],
        },
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 9: Extra Rounded Modern Style
 * Ultra smooth modern design
 */
export async function example9_modernRounded() {
  const event = {
    title: "Tech Meetup",
    start: new Date("2024-04-15T19:00:00"),
    end: new Date("2024-04-15T21:00:00"),
    location: "Tech Hub",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 320,
      height: 320,
      dotsOptions: {
        color: "#2c3e50",
        type: "extra-rounded",
      },
      backgroundOptions: {
        color: "#ecf0f1",
      },
      cornersSquareOptions: {
        color: "#3498db",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#3498db",
        type: "extra-rounded",
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 10: Full Customization
 * Demonstrates all styling options together
 */
export async function example10_fullCustomization() {
  const event = {
    title: "VIP Gala Dinner",
    start: new Date("2024-04-20T19:30:00"),
    end: new Date("2024-04-20T23:00:00"),
    location: "Grand Ballroom",
    description: "Annual gala event",
  };

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: {
      width: 400,
      height: 400,
      margin: 10,
      dotsOptions: {
        type: "classy",
        gradient: {
          type: "linear",
          rotation: Math.PI / 3,
          colorStops: [
            { offset: 0, color: "#d4af37" },
            { offset: 1, color: "#b8860b" },
          ],
        },
      },
      backgroundOptions: {
        gradient: {
          type: "radial",
          colorStops: [
            { offset: 0, color: "#2a2a2a" },
            { offset: 1, color: "#000000" },
          ],
        },
      },
      cornersSquareOptions: {
        type: "rounded",
        gradient: {
          type: "linear",
          rotation: Math.PI / 4,
          colorStops: [
            { offset: 0, color: "#d4af37" },
            { offset: 1, color: "#b8860b" },
          ],
        },
      },
      cornersDotOptions: {
        color: "#d4af37",
        type: "dots",
      },
      imageOptions: {
        src: "https://example.com/gala-logo.png",
        imageSize: 0.25,
        margin: 20,
        hideBackgroundDots: true,
      },
    },
  });

  return qrDataUrl;
}

/**
 * Example 11: Using Default Styling
 * Start with defaults and customize
 */
export async function example11_fromDefaults() {
  const event = {
    title: "Planning Session",
    start: new Date("2024-04-25T10:00:00"),
    end: new Date("2024-04-25T11:30:00"),
    location: "Conference Room B",
  };

  // Get default styling
  const defaultStyling = CalendarQR.getDefaultStyling();

  // Customize specific properties
  defaultStyling.width = 350;
  defaultStyling.height = 350;
  defaultStyling.dotsOptions!.color = "#0066cc";
  defaultStyling.dotsOptions!.type = "rounded";
  defaultStyling.cornersSquareOptions!.color = "#0066cc";

  const qrDataUrl = await CalendarQR.generate(event, {
    styling: defaultStyling,
  });

  return qrDataUrl;
}

/**
 * Example 12: Rotating Gradient
 * Animated-like gradient effect
 */
export async function example12_rotatingGradient() {
  const event = {
    title: "Design Sprint",
    start: new Date("2024-05-01T09:00:00"),
    end: new Date("2024-05-01T17:00:00"),
    location: "Design Lab",
  };

  // Different rotation angles for variety
  const rotations = [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2];

  const qrDataUrls = await Promise.all(
    rotations.map((rotation) =>
      CalendarQR.generate(event, {
        styling: {
          width: 300,
          height: 300,
          dotsOptions: {
            type: "rounded",
            gradient: {
              type: "linear",
              rotation,
              colorStops: [
                { offset: 0, color: "#667eea" },
                { offset: 1, color: "#764ba2" },
              ],
            },
          },
          backgroundOptions: {
            color: "#ffffff",
          },
        },
      })
    )
  );

  return qrDataUrls;
}

/**
 * Example 13: Size Variations
 * Generate same QR in different sizes
 */
export async function example13_sizeVariations() {
  const event = {
    title: "Weekly Sync",
    start: new Date("2024-05-05T14:00:00"),
    end: new Date("2024-05-05T14:30:00"),
    location: "Meeting Room",
  };

  const sizes = [200, 300, 400, 500];

  const qrDataUrls = await Promise.all(
    sizes.map((size) =>
      CalendarQR.generate(event, {
        styling: {
          width: size,
          height: size,
          dotsOptions: {
            color: "#4267b2",
            type: "rounded",
          },
          backgroundOptions: {
            color: "#f0f0f0",
          },
        },
      })
    )
  );

  return qrDataUrls;
}

// Export all examples
export const examples = {
  example1_simpleStyled,
  example2_brandedQR,
  example3_gradientStyled,
  example4_radialGradient,
  example5_classyStyle,
  example6_highContrast,
  example7_circleDots,
  example8_rainbowGradient,
  example9_modernRounded,
  example10_fullCustomization,
  example11_fromDefaults,
  example12_rotatingGradient,
  example13_sizeVariations,
};
