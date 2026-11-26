"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/format";

/** 3D tilt with GSAP: follows pointer/finger, and (Android) the phone's gyroscope when `gyro` is true. */
export function useTilt<T extends HTMLElement>(max = 9, gyro = false) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.45, ease: "power2.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.45, ease: "power2.out" });
    const set = (x: number, y: number) => {
      rx(-y * max); ry(x * max);
      el.style.setProperty("--mx", `${50 + x * 50}%`); el.style.setProperty("--my", `${50 + y * 50}%`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const leave = () => set(0, 0);
    el.addEventListener("pointermove", move);
    ["pointerleave", "pointerup", "pointercancel"].forEach((n) => el.addEventListener(n, leave));
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const orient = (e: DeviceOrientationEvent) => { if (e.gamma != null && e.beta != null) set(clamp(e.gamma / 28), clamp((e.beta - 50) / 28)); };
    const canGyro = gyro && "DeviceOrientationEvent" in window && window.matchMedia("(pointer:coarse)").matches &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission !== "function";
    if (canGyro) window.addEventListener("deviceorientation", orient, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      ["pointerleave", "pointerup", "pointercancel"].forEach((n) => el.removeEventListener(n, leave));
      window.removeEventListener("deviceorientation", orient);
    };
  }, [max, gyro]);
  return ref;
}
