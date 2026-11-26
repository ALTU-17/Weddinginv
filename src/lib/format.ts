import { wedding } from "@/config/wedding";

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: wedding.timeZone, ...o }).format(new Date(iso));

export const dateParts = (iso: string) => ({
  weekday: fmt(iso, { weekday: "long" }),
  day: fmt(iso, { day: "numeric" }),
  month: fmt(iso, { month: "long" }),
  year: fmt(iso, { year: "numeric" }),
});

export const longDate = (iso: string) => {
  const p = dateParts(iso);
  return `${p.weekday}, ${p.day} ${p.month} ${p.year}`;
};

/** "ARHAM SHEIKH" -> "Arham Sheikh" so names can be typed in any case in the config. */
export const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isLiteDevice = () => {
  if (typeof navigator === "undefined") return false;
  const n = navigator as Navigator & { deviceMemory?: number };
  return prefersReducedMotion() || (!!n.deviceMemory && n.deviceMemory <= 2) || (!!n.hardwareConcurrency && n.hardwareConcurrency <= 2);
};
