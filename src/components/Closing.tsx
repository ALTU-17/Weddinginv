"use client";
import { useMemo } from "react";
import { Heart, Share2 } from "lucide-react";
import { wedding } from "@/config/wedding";
import { titleCase } from "@/lib/format";
import { nativeShare } from "@/lib/share";
import { useFx } from "./Fx";
import { Divider, Sprite } from "./Sprite";

export default function Closing() {
  const fx = useFx();
  const t = wedding.text;
  const moons = useMemo(() => Array.from({ length: 14 }, () => ({
    left: Math.random() * 92 + 2, top: Math.random() * 90 + 2, s: 10 + Math.random() * 14,
    d: 2 + Math.random() * 3, dl: Math.random() * 3, sp: Math.random() * 0.1 - 0.05,
  })), []);
  return (
    <section className="sec" id="s-close">
      <div className="stars" aria-hidden="true">
        {moons.map((m, i) => (
          <span className="par" data-speed={m.sp.toFixed(3)} key={i} style={{ position: "absolute", left: `${m.left}%`, top: `${m.top}%` }}>
            <Sprite id="moon" viewBox="0 0 24 24" className="star" style={{ "--s": `${m.s}px`, "--d": `${m.d}s`, "--dl": `${m.dl}s`, position: "static" } as React.CSSProperties} />
          </span>
        ))}
      </div>
      <Sprite id="bigmoon" viewBox="0 0 100 100" className="moon rv" />
      <p className="msg1 rv">{t.closing1}</p>
      <p className="msg2 rv">{t.closing2}</p>
      <Divider className="rv" />
      <div className="love rv">{t.withLove}</div>
      <div className="sig gold rv">{titleCase(wedding.groom)} &amp; {titleCase(wedding.bride)}</div>
      <div className="btns rv" style={{ marginTop: 30 }}>
        <button className="btn" type="button" onClick={nativeShare}><Share2 />SHARE INVITATION</button>
        <button className="btn ghost" type="button" onClick={() => { fx.confetti(); fx.burst(window.innerWidth / 2, window.innerHeight * 0.6, 80, { speed: 6, lift: 2 }); }}><Heart />CELEBRATE AGAIN</button>
      </div>
      <div className="foot">Developed by Altamash Shaikh</div>
      <div className="foot1">mob no: 9766220055</div>
    </section>
  );
}
