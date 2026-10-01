import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom font families in tailwind.config.js,
// so `font-display` replaces the default `font-sans` instead of stacking with it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-family": [{ font: ["sans", "thai-medium", "thai-semibold", "display", "display-regular"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
