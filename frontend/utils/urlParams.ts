// frontend/utils/urlParams.ts

import { useSearchParams } from "next/navigation";

const MIN_SPEED = 1;
const MAX_SPEED = 10;
const MIN_DURATION = 500; // 0.5s
const MAX_DURATION = 10000; // 10s

/**
 * A custom hook to parse and validate kolam-related URL search parameters.
 */
export const useKolamURLParams = () => {
  const searchParams = useSearchParams();

  const size = parseInt(searchParams.get("size") || "5", 10);
  const duration = parseInt(searchParams.get("duration") || "3000", 10);
  const initialAutoAnimate = searchParams.get("autoAnimate") === "true";

  return {
    size: Math.max(3, Math.min(15, size)), // Clamp size between 3 and 15
    duration: Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration)), // Clamp duration
    initialAutoAnimate,
  };
};

/**
 * Updates the URL's query string with the latest kolam parameters
 * without reloading the page.
 */
export const updateURL = (params: {
  size: number;
  duration: number;
  initialAutoAnimate: boolean;
}) => {
  const url = new URL(window.location.href);
  url.searchParams.set("size", String(params.size));
  url.searchParams.set("duration", String(params.duration));
  url.searchParams.set("autoAnimate", String(params.initialAutoAnimate));
  window.history.pushState({}, "", url.toString());
};

/**
 * Generates an embeddable URL for the kolam pattern.
 */
export const generateEmbedURL = (params: {
  size: number;
  background: string;
  brush: string;
}): string => {
  const url = new URL("/api/kolam", window.location.origin);
  url.searchParams.set("size", String(params.size));
  url.searchParams.set("background", params.background.replace("#", ""));
  url.searchParams.set("brush", params.brush.replace("#", ""));
  return url.toString();
};

/**
 * Converts animation speed (1-10) to a total duration in milliseconds.
 * Uses a non-linear scale for a better feel.
 */
export const speedToDuration = (speed: number): number => {
  const normalizedSpeed = (speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED); // 0 to 1
  // Use an inverse relationship: higher speed = lower duration
  // A power function (e.g., squared) makes the slider feel more responsive at higher speeds
  const duration =
    MAX_DURATION - Math.pow(normalizedSpeed, 2) * (MAX_DURATION - MIN_DURATION);
  return Math.round(duration);
};

/**
 * Converts a total duration in milliseconds back to an animation speed (1-10).
 */
export const durationToSpeed = (duration: number): number => {
  if (duration >= MAX_DURATION) return MIN_SPEED;
  if (duration <= MIN_DURATION) return MAX_SPEED;

  const normalizedDuration =
    (duration - MIN_DURATION) / (MAX_DURATION - MIN_DURATION); // 0 to 1
  const normalizedSpeed = Math.sqrt(1 - normalizedDuration); // Inverse of the power function

  const speed = normalizedSpeed * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
  return Math.round(speed);
};
