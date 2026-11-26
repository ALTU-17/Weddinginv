"use client";
import { useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Heart } from "lucide-react";
import { wedding } from "@/config/wedding";
import { prefersReducedMotion, titleCase } from "@/lib/format";
import { useFx } from "./Fx";

gsap.registerPlugin(useGSAP);

/**
 * Sage double doors → "TAP TO OPEN" plaque splits → doors slide apart → pearl curtains part →
 * valance drops → names appear → "View the invitation".
 */
export default function Entrance({ flash, onEnter }: { flash: RefObject<HTMLDivElement | null>; onEnter: () => void }) {
  const root = useRef<HTMLElement>(null);
  const opened = useRef(false);
  const entered = useRef(false);
  const fx = useFx();

  useGSAP(() => {
    gsap.set(".valance", { yPercent: -120, autoAlpha: 1 });
    gsap.set(".st > *", { opacity: 0, y: 14 });
    gsap.set("#contBtn", { xPercent: -50, y: 24 });
    gsap.set(".curt.l", { transformOrigin: "0 0" });
    gsap.set(".curt.r", { transformOrigin: "100% 0" });
  }, { scope: root });

  const open = () => {
    if (opened.current) return;
    opened.current = true;
    const W = window.innerWidth, H = window.innerHeight;
    const tl = gsap.timeline();
    tl.to(".leaf.l", { xPercent: -102, duration: 1.9, ease: "power3.inOut" }, 0)
      .to(".leaf.r", { xPercent: 102, duration: 1.9, ease: "power3.inOut" }, 0)
      .call(() => fx.burst(W / 2, H / 2, 70, { speed: 4.5, lift: 1, g: 0.02 }), [], 0.25)
      .to(".curt.l, .curt.r", { scaleX: 0.3, duration: 2.4, ease: "power3.inOut" }, 1.5)
      .to(".curtOpen", { opacity: 1, duration: 1.8, ease: "power1.inOut" }, 2.1)
      .to(".curt", { opacity: 0, duration: 1.5, ease: "power1.inOut" }, 2.5)
      .to(".valance", { yPercent: 0, duration: 1.8, ease: "power3.out" }, 2.0)
      .call(() => fx.burst(W / 2, H * 0.4, 50, { speed: 3, lift: 1.5, g: 0.01 }), [], 3.3)
      .to(".st > *", { opacity: 1, y: 0, duration: 1.1, stagger: 0.3, ease: "power2.out" }, 3.3)
      .to("#contBtn", { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, 5.4);
    if (prefersReducedMotion()) tl.timeScale(5);
  };

  const enter = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!opened.current || entered.current) return;
    entered.current = true;
    gsap.to(flash.current, { autoAlpha: 1, duration: 0.7, ease: "power1.in", onComplete: onEnter });
  };

  return (
    <section ref={root} id="gate" aria-label="Tap to open the invitation" onClick={open}>
      <div className="stage-bg" />
      <div className="curtOpen" />
      <div className="curt l" />
      <div className="curt r" />
      <div className="valance" />
      <div className="garden" />
      <div className="st">
        <Heart className="heart" aria-hidden="true" />
        <div className="bis2 ar">{wedding.bismillah}</div>
        <div className="l">{wedding.text.gateInvite}</div>
        <div className="nm">{titleCase(wedding.groom)}</div>
        <div className="amp2">&amp;</div>
        <div className="nm">{titleCase(wedding.bride)}</div>
        <div className="jr">{wedding.text.journey}</div>
      </div>
      <button className="btn" id="contBtn" type="button" onClick={enter}>VIEW THE INVITATION</button>
      <div className="leaf l"><div className="plaque"><span>TAP TO OPEN</span></div></div>
      <div className="leaf r"><div className="plaque"><span>TAP TO OPEN</span></div></div>
    </section>
  );
}
