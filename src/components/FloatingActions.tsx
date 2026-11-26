"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link2, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { Ambient } from "@/lib/ambient";
import { copyLink, waLink } from "@/lib/share";
import { toast } from "@/lib/toast";

/** WhatsApp share · copy link · music toggle (music is OFF by default and never autoplays). */
export default function FloatingActions() {
  const box = useRef<HTMLDivElement>(null);
  const audio = useRef<Ambient | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    gsap.fromTo(box.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.6 });
    return () => audio.current?.dispose();
  }, []);

  const toggle = () => {
    audio.current ??= new Ambient();
    const now = audio.current.toggle();
    setOn(now);
    toast(now ? "Music on 🎶" : "Music off");
  };

  return (
    <div className="fabs" ref={box} style={{ opacity: 0, visibility: "hidden" }}>
      <a className="fab wa" href="#" aria-label="Share on WhatsApp" onClick={(e) => { e.preventDefault(); window.open(waLink(), "_blank", "noopener"); }}><MessageCircle className="ico" /></a>
      {/* <button className="fab" type="button" aria-label="Copy invitation link" onClick={async () => { await copyLink(); toast("Invitation link copied ✨"); }}><Link2 className="ico" /></button>
      <button className="fab" type="button" aria-label={on ? "Turn music off" : "Turn music on"} aria-pressed={on} onClick={toggle}>{on ? <Volume2 className="ico" /> : <VolumeX className="ico" />}</button> */}
    </div>
  );
}
