"use client";
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { isLiteDevice, prefersReducedMotion } from "@/lib/format";

export interface BurstOpts { speed?: number; lift?: number; grow?: number; g?: number }
export interface FxApi {
  burst: (x: number, y: number, n: number, o?: BurstOpts) => void;
  confetti: () => void;
}
const Ctx = createContext<FxApi>({ burst() {}, confetti() {} });
export const useFx = () => useContext(Ctx);

interface Dust { x: number; y: number; r: number; vy: number; ph: number; a: number; c: string }
interface Spark { x: number; y: number; vx: number; vy: number; r: number; grow: number; life: number; decay: number; g: number; c: string }
interface Conf { x: number; y: number; w: number; h: number; vx: number; vy: number; rot: number; vr: number; c: string; ph: number }

const GOLDS = ["201,162,74", "181,138,69", "225,190,100", "150,120,60"];
const CONF = ["#D8B56D", "#B58A45", "#8b9b79", "#6f8260", "#e8c88a", "#c99a3f"];

/** One full-screen canvas: floating gold dust, light bursts, golden confetti and the desktop cursor sparkle. */
export function FxProvider({ children }: { children: ReactNode }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const s = useRef({ dust: [] as Dust[], sparks: [] as Spark[], conf: [] as Conf[], W: 0, H: 0, reduce: false, lite: false });

  const api = useMemo<FxApi>(() => ({
    burst(x, y, n, o = {}) {
      const st = s.current;
      if (st.reduce) n = Math.ceil(n / 4);
      if (st.lite) n = Math.ceil(n * 0.6);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * 6.283, sp = (o.speed ?? 5) * (0.3 + Math.random());
        st.sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (o.lift ?? 0), r: Math.random() * 2.4 + 0.8, grow: o.grow ?? 0, life: 1, decay: 0.008 + Math.random() * 0.014, g: o.g ?? 0.05, c: GOLDS[(Math.random() * 4) | 0] });
      }
    },
    confetti() {
      const st = s.current;
      const n = st.reduce ? 30 : st.lite ? 90 : 170;
      for (let i = 0; i < n; i++) st.conf.push({ x: Math.random() * st.W, y: -20 - Math.random() * st.H * 0.6, w: Math.random() * 8 + 5, h: Math.random() * 5 + 3, vx: (Math.random() - 0.5) * 2.4, vy: Math.random() * 3 + 2.2, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3, c: CONF[i % CONF.length], ph: Math.random() * 6.28 });
    },
  }), []);

  useEffect(() => {
    const cv = canvas.current!, ctx = cv.getContext("2d")!;
    const st = s.current;
    st.reduce = prefersReducedMotion();
    st.lite = isLiteDevice();
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.W = window.innerWidth; st.H = window.innerHeight;
      cv.width = st.W * dpr; cv.height = st.H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const nd = st.lite ? 18 : st.W < 600 ? 36 : 64;
    st.dust = Array.from({ length: nd }, (_, i) => ({ x: Math.random() * st.W, y: Math.random() * st.H, r: Math.random() * 1.8 + 0.5, vy: Math.random() * 0.25 + 0.08, ph: Math.random() * 6.28, a: (Math.random() * 0.6 + 0.25) * 0.7, c: GOLDS[i % 4] }));

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      ctx.clearRect(0, 0, st.W, st.H);
      for (const d of st.dust) {
        if (!st.reduce) { d.y -= d.vy; d.ph += 0.012; d.x += Math.sin(d.ph) * 0.25; if (d.y < -5) { d.y = st.H + 5; d.x = Math.random() * st.W; } }
        ctx.globalAlpha = d.a * (0.6 + 0.4 * Math.sin(d.ph * 3));
        ctx.fillStyle = `rgb(${d.c})`; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      }
      for (let i = st.sparks.length - 1; i >= 0; i--) {
        const p = st.sparks[i];
        p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.985; p.r += p.grow; p.life -= p.decay;
        if (p.life <= 0) { st.sparks.splice(i, 1); continue; }
        ctx.globalAlpha = Math.min(1, p.life); ctx.fillStyle = `rgb(${p.c})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      for (let i = st.conf.length - 1; i >= 0; i--) {
        const c = st.conf[i];
        c.ph += 0.06; c.x += c.vx + Math.sin(c.ph) * 0.8; c.y += c.vy; c.rot += c.vr;
        if (c.y > st.H + 30) { st.conf.splice(i, 1); continue; }
        ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot); ctx.scale(1, Math.cos(c.ph)); ctx.fillStyle = c.c; ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h); ctx.restore();
      }
    };
    raf = requestAnimationFrame(loop);

    let last = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || st.reduce) return;
      const n = performance.now(); if (n - last < 35) return; last = n;
      api.burst(e.clientX, e.clientY, 2, { speed: 1.6, g: 0.03 });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, [api]);

  return (
    <Ctx.Provider value={api}>
      {children}
      <canvas ref={canvas} id="fx" aria-hidden="true" />
    </Ctx.Provider>
  );
}
