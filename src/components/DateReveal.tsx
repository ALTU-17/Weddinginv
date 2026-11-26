"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Clock, Moon } from "lucide-react";
import { wedding } from "@/config/wedding";
import { dateParts } from "@/lib/format";
import { useFx } from "./Fx";
import { Divider } from "./Sprite";

gsap.registerPlugin(useGSAP);

/** Sealed envelope → wax seal cracks → flap opens → letter slides out → the date scales up. */
export default function DateReveal() {
  const root = useRef<HTMLElement>(null);
  const done = useRef(false);
  const fx = useFx();
  const W = dateParts(wedding.weddingISO);
  const t = wedding.text;

  const reveal = () => {
    if (done.current) return;
    done.current = true;
    const q = gsap.utils.selector(root);
    const seal = q(".seal")[0].getBoundingClientRect();
    const env = q(".env")[0].getBoundingClientRect();
    const tl = gsap.timeline();
    tl.to(q("#revealBtn"), { autoAlpha: 0, duration: 0.3 }, 0)
      .set(q(".seal"), { animation: "none" }, 0)
      .call(() => fx.burst(seal.left + seal.width / 2, seal.top + seal.height / 2, 40, { speed: 4, lift: 1 }), [], 0)
      .to(q(".seal .sl"), { x: -30, y: 16, rotation: -30, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 0)
      .to(q(".seal .sr"), { x: 30, y: 20, rotation: 34, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 0)
      .to(q(".env-flap"), { rotationX: 180, transformOrigin: "50% 0", duration: 0.95, ease: "power2.inOut" }, 0.7)
      .set(q(".env-flap"), { zIndex: 1 }, 1.15)
      .to(q(".env-letter"), { yPercent: -62, duration: 1.3, ease: "expo.out" }, 1.5)
      .call(() => {
        fx.burst(env.left + env.width / 2, env.top + env.height / 2, 90, { speed: 6, lift: 1 });
        gsap.timeline().fromTo(q(".lightburst"), { scale: 0.1, opacity: 0 }, { scale: 0.6, opacity: 0.9, duration: 0.45 }).to(q(".lightburst"), { scale: 1, opacity: 0, duration: 1.3 });
      }, [], 2.1)
      .to(q("#sealStage"), { autoAlpha: 0, scale: 0.9, duration: 1, ease: "power2.inOut" }, 2.9)
      .fromTo(q("#dateCard"), { autoAlpha: 0, scale: 0.55, filter: "blur(10px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "back.out(1.5)", clearProps: "filter" }, 2.9)
      .call(() => { fx.burst(window.innerWidth / 2, window.innerHeight / 2, 110, { speed: 7, lift: 1 }); fx.confetti(); }, [], 3.4);
  };

  return (
    <section className="sec" id="s-date" ref={root}>
      <div className="lightburst" />
      <div className="stage">
        <div id="sealStage">
          <div className="eyebrow rv">{t.awaitsKicker}</div>
          <h2 className="t gold rv">{t.awaitsTitle}</h2>
          <p className="sub rv" style={{ margin: "0 auto" }}>{t.awaitsSub}</p>
          <div className="env rv">
            <div className="env-back" />
            <div className="env-letter"><Moon fill="currentColor" strokeWidth={0} /></div>
            <div className="env-front" />
            <div className="env-flap" />
            <div className="seal" role="button" aria-label="Break the seal" onClick={reveal}>
              <i className="sl"><Moon fill="currentColor" strokeWidth={0} /></i>
              <i className="sr"><Moon fill="currentColor" strokeWidth={0} /></i>
            </div>
          </div>
          <button className="btn rv" id="revealBtn" type="button" onClick={reveal}>{t.revealBtn}</button>
        </div>
        <div id="dateCard">
          <div className="dcard">
            <div className="eyebrow">{t.celebration}</div>
            <div className="dw gold">{W.weekday.toUpperCase()}</div>
            <div className="dd gold">{W.day}</div>
            <div className="dm gold">{W.month.toUpperCase()} {W.year}</div>
            <Divider />
            <div className="dt"><Clock className="ico" /><span>{wedding.weddingTimeText}</span></div>
            <div className="tag">{wedding.tagline}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
