import { differenceInMinutes } from "date-fns";

export default function AgendaUtils() {
  const formatDuration = (start: Date, end: Date) => {
    const totalMinutes = Math.abs(differenceInMinutes(end, start));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")} horas`;
    }
    return `${minutes} min`;
  };

  const isLightColor = (color: string) => {
    let hex = color;
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }

    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      return false;
    }

    const brightness = (299 * r + 587 * g + 114 * b) / 1000;

    return brightness > 128;
  };

  const getDarkerColor = (color: string) => {
    let hex = color;
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }

    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      return "#000000";
    }

    r = Math.floor(r * 0.8);
    g = Math.floor(g * 0.8);
    b = Math.floor(b * 0.8);

    const newHex =
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");

    return newHex;
  };

  return {
    formatDuration,
    isLightColor,
    getDarkerColor,
  };
}
