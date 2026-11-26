import { wedding } from "@/config/wedding";

/** Soft instrumental ambience synthesised with WebAudio (no audio file needed). Off until the visitor taps. */
export class Ambient {
  private on = false;
  private ctx?: AudioContext;
  private master?: GainNode;
  private timer?: number;
  private el?: HTMLAudioElement;

  get playing() { return this.on; }

  toggle(): boolean {
    this.on = !this.on;
    if (wedding.audioUrl) {
      if (!this.el) { this.el = new Audio(wedding.audioUrl); this.el.loop = true; this.el.volume = 0.5; }
      if (this.on) void this.el.play().catch(() => {}); else this.el.pause();
      return this.on;
    }
    if (!this.ctx) this.start();
    if (this.ctx!.state === "suspended") void this.ctx!.resume();
    this.master!.gain.setTargetAtTime(this.on ? 0.55 : 0, this.ctx!.currentTime, 0.5);
    return this.on;
  }

  private start() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = (this.ctx = new AC());
    const master = (this.master = ctx.createGain());
    master.gain.value = 0;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1500;
    const dl = ctx.createDelay(2); dl.delayTime.value = 0.45;
    const fb = ctx.createGain(); fb.gain.value = 0.4;
    master.connect(lp); lp.connect(ctx.destination); lp.connect(dl); dl.connect(ctx.destination); dl.connect(fb); fb.connect(dl);
    ([[73.42, "sine", 0.5], [110, "sine", 0.35], [146.83, "triangle", 0.18], [220.5, "triangle", 0.1]] as [number, OscillatorType, number][]).forEach(([f, t, g], i) => {
      const o = ctx.createOscillator(), v = ctx.createGain();
      o.type = t; o.frequency.value = f; o.detune.value = i * 3; v.gain.value = g * 0.35;
      o.connect(v); v.connect(master); o.start();
    });
    const scale = [293.66, 311.13, 369.99, 392, 440, 466.16, 554.37, 587.33]; // D Hijaz-style
    const pluck = () => {
      if (!this.on) return;
      const f = scale[(Math.random() * scale.length) | 0] * (Math.random() > 0.75 ? 0.5 : 1);
      const o = ctx.createOscillator(), v = ctx.createGain(), n = ctx.currentTime;
      o.type = "triangle"; o.frequency.value = f;
      v.gain.setValueAtTime(0, n); v.gain.linearRampToValueAtTime(0.22, n + 0.012); v.gain.exponentialRampToValueAtTime(0.001, n + 2.4);
      o.connect(v); v.connect(master); v.connect(dl); o.start(n); o.stop(n + 2.5);
    };
    this.timer = window.setInterval(() => { pluck(); if (Math.random() > 0.55) setTimeout(pluck, 380); }, 1900);
  }

  dispose() { if (this.timer) clearInterval(this.timer); void this.ctx?.close(); this.el?.pause(); }
}
