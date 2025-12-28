import {
  QRStylingOptions,
  DotsOptions,
  BackgroundOptions,
  CornersSquareOptions,
  CornersDotOptions,
  ImageOptions,
  GradientOptions,
  DotsType,
  CornersType,
} from "../types";

/**
 * Default styling options for QR codes
 */
export const DEFAULT_STYLING_OPTIONS: Required<QRStylingOptions> = {
  width: 300,
  height: 300,
  type: "svg",
  shape: "square",
  margin: 0,
  dotsOptions: {
    color: "#000000",
    type: "square",
    roundSize: true,
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
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    saveAsBlob: true,
  },
};

/**
 * Validates and merges user options with defaults
 */
export function processStylingOptions(
  userOptions?: QRStylingOptions
): Required<QRStylingOptions> {
  const options = { ...DEFAULT_STYLING_OPTIONS };

  if (!userOptions) {
    return options;
  }

  // Merge top-level properties
  if (userOptions.width !== undefined) options.width = userOptions.width;
  if (userOptions.height !== undefined) options.height = userOptions.height;
  if (userOptions.type !== undefined) options.type = userOptions.type;
  if (userOptions.shape !== undefined) options.shape = userOptions.shape;
  if (userOptions.margin !== undefined) options.margin = userOptions.margin;

  // Merge dotsOptions
  if (userOptions.dotsOptions) {
    options.dotsOptions = mergeDotsOptions(
      options.dotsOptions,
      userOptions.dotsOptions
    );
  }

  // Merge backgroundOptions
  if (userOptions.backgroundOptions) {
    options.backgroundOptions = mergeBackgroundOptions(
      options.backgroundOptions,
      userOptions.backgroundOptions
    );
  }

  // Merge cornersSquareOptions
  if (userOptions.cornersSquareOptions) {
    options.cornersSquareOptions = mergeCornersSquareOptions(
      options.cornersSquareOptions,
      userOptions.cornersSquareOptions
    );
  }

  // Merge cornersDotOptions
  if (userOptions.cornersDotOptions) {
    options.cornersDotOptions = mergeCornersDotOptions(
      options.cornersDotOptions,
      userOptions.cornersDotOptions
    );
  }

  // Merge imageOptions
  if (userOptions.imageOptions) {
    options.imageOptions = mergeImageOptions(
      options.imageOptions,
      userOptions.imageOptions
    );
  }

  return options;
}

function mergeDotsOptions(
  defaults: DotsOptions,
  user: DotsOptions
): DotsOptions {
  const merged = { ...defaults };
  if (user.color !== undefined) merged.color = user.color;
  if (user.type !== undefined) {
    validateDotsType(user.type);
    merged.type = user.type;
  }
  if (user.roundSize !== undefined) merged.roundSize = user.roundSize;
  if (user.gradient !== undefined)
    merged.gradient = validateGradient(user.gradient);
  return merged;
}

function mergeBackgroundOptions(
  defaults: BackgroundOptions,
  user: BackgroundOptions
): BackgroundOptions {
  const merged = { ...defaults };
  if (user.color !== undefined) merged.color = user.color;
  if (user.gradient !== undefined)
    merged.gradient = validateGradient(user.gradient);
  return merged;
}

function mergeCornersSquareOptions(
  defaults: CornersSquareOptions,
  user: CornersSquareOptions
): CornersSquareOptions {
  const merged = { ...defaults };
  if (user.color !== undefined) merged.color = user.color;
  if (user.type !== undefined) {
    validateCornersType(user.type);
    merged.type = user.type;
  }
  if (user.gradient !== undefined)
    merged.gradient = validateGradient(user.gradient);
  return merged;
}

function mergeCornersDotOptions(
  defaults: CornersDotOptions,
  user: CornersDotOptions
): CornersDotOptions {
  const merged = { ...defaults };
  if (user.color !== undefined) merged.color = user.color;
  if (user.type !== undefined) {
    validateCornersType(user.type);
    merged.type = user.type;
  }
  if (user.gradient !== undefined)
    merged.gradient = validateGradient(user.gradient);
  return merged;
}

function mergeImageOptions(
  defaults: ImageOptions,
  user: ImageOptions
): ImageOptions {
  const merged = { ...defaults };
  if (user.src !== undefined) merged.src = user.src;
  if (user.hideBackgroundDots !== undefined)
    merged.hideBackgroundDots = user.hideBackgroundDots;
  if (user.imageSize !== undefined) merged.imageSize = user.imageSize;
  if (user.margin !== undefined) merged.margin = user.margin;
  if (user.crossOrigin !== undefined) merged.crossOrigin = user.crossOrigin;
  if (user.saveAsBlob !== undefined) merged.saveAsBlob = user.saveAsBlob;
  return merged;
}

function validateGradient(gradient: GradientOptions): GradientOptions {
  if (!gradient.colorStops || gradient.colorStops.length < 2) {
    throw new Error("Gradient must have at least 2 color stops");
  }
  return gradient;
}

function validateDotsType(type: DotsType): void {
  const validTypes: DotsType[] = [
    "square",
    "rounded",
    "dots",
    "classy",
    "classy-rounded",
    "extra-rounded",
  ];
  if (!validTypes.includes(type)) {
    throw new Error(
      `Invalid dots type: ${type}. Valid types: ${validTypes.join(", ")}`
    );
  }
}

function validateCornersType(type: CornersType): void {
  const validTypes: CornersType[] = [
    "square",
    "rounded",
    "extra-rounded",
    "dot",
    "dots",
    "classy",
    "classy-rounded",
  ];
  if (!validTypes.includes(type)) {
    throw new Error(
      `Invalid corners type: ${type}. Valid types: ${validTypes.join(", ")}`
    );
  }
}
