"use client";
import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";

const two = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const target = new Date(wedding.weddingISO).getTime();
  const [left, setLeft] = useState(() => target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const over = left <= 0;
  const d = Math.max(left, 0);
  const tiles: [string, number][] = [["DAYS", Math.floor(d / 864e5)], ["HOURS", Math.floor((d % 864e5) / 36e5)], ["MINS", Math.floor((d % 36e5) / 6e4)], ["SECS", Math.floor((d % 6e4) / 1e3)]];
  return (
    <section className="sec" id="s-count" style={{ minHeight: "70vh" }}>
      <div className="eyebrow rv">COUNTING THE MOMENTS</div>
      <h2 className="t gold rv">Until We Celebrate</h2>
      {over ? (
        <div className="cd-done rv">Alhamdulillah — the celebration has begun ✨</div>
      ) : (
        <div className="cd rv" role="timer" aria-live="off">
          {tiles.map(([label, v]) => (
            <div className="tile" key={label}><b className="gold">{two(v)}</b><span>{label}</span></div>
          ))}
        </div>
      )}
    </section>
  );
}
