"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronsDown } from "lucide-react";
import { prefersReducedMotion } from "@/lib/format";
import { useFx } from "./Fx";
import InvitationCard from "./InvitationCard";
import DateReveal from "./DateReveal";
import Events from "./Events";
import Venue from "./Venue";
import Countdown from "./Countdown";
import Closing from "./Closing";
import FloatingActions from "./FloatingActions";
import { Sprite } from "./Sprite";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Main() {
  const root = useRef<HTMLElement>(null);
  const fx = useFx();

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // Cinematic scroll reveals (fade + rise + de-blur), once per element.
    gsap.set(".rv", { autoAlpha: 0 });
    gsap.set(".rv3d", { autoAlpha: 0 });
    ScrollTrigger.batch(".rv", {
      start: "top 90%", once: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 34, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.14, ease: "power3.out", clearProps: "filter" }),
    });
    ScrollTrigger.batch(".rv3d", {
      start: "top 92%", once: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, rotationX: 38, y: 70, scale: 0.9, transformPerspective: 1100, transformOrigin: "50% 100%" }, { autoAlpha: 1, rotationX: 0, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }),
    });
    // Parallax on the floating moons + lanterns.
    gsap.utils.toArray<HTMLElement>(".par").forEach((el) => {
      gsap.to(el, { y: parseFloat(el.dataset.speed || "0") * 500, ease: "none", scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    // Golden confetti when the visitor reaches the end of the invitation.
    ScrollTrigger.create({ trigger: "#s-close", start: "top 45%", once: true, onEnter: () => window.setTimeout(fx.confetti, 500) });
    // Light entrance burst as the invitation appears.
    const t = window.setTimeout(() => fx.burst(window.innerWidth / 2, window.innerHeight * 0.45, 60, { speed: 4, lift: 1 }), 700);
    return () => window.clearTimeout(t);
  }, { scope: root });

  return (
    <main ref={root} id="main">
      <div className="lanterns" aria-hidden="true">
        <div className="fl" style={{ left: "4%" }}><Sprite id="lantern" viewBox="0 0 60 120" /></div>
        <div className="fl" style={{ right: "4%", animationDelay: "-3s" }}><Sprite id="lantern" viewBox="0 0 60 120" /></div>
      </div>

      <section className="sec" id="s-card">
        <InvitationCard />
        <a href="#s-date" className="scroll-cue" aria-label="Scroll down"><ChevronsDown className="ico" /></a>
      </section>
      <DateReveal />
      <Events />
      <Venue />
      <Countdown />
      <Closing />
      <FloatingActions />
    </main>
  );
}
