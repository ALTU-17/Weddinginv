"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FxProvider } from "./Fx";
import Entrance from "./Entrance";
import Main from "./Main";
import Loader from "./Loader";
import Toast from "./Toast";

const PRELOAD = ["dl", "dr", "pl", "cu", "bg", "va", "ga"];

export default function Experience() {
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const flash = useRef<HTMLDivElement>(null);

  // Loading screen: wait for fonts + entrance images (max 2.5s so slow networks never get stuck).
  useEffect(() => {
    let alive = true;
    const imgs = PRELOAD.map((n) => new Promise<void>((res) => { const i = new Image(); i.onload = i.onerror = () => res(); i.src = `/img/${n}.webp`; }));
    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    Promise.race([Promise.all([fonts, ...imgs]), new Promise((r) => setTimeout(r, 2500))]).then(() => alive && setTimeout(() => setReady(true), 300));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", !entered);
  }, [entered]);

  // After the gate is replaced by the invitation, fade the golden flash away.
  useEffect(() => {
    if (entered) { window.scrollTo(0, 0); gsap.to(flash.current, { autoAlpha: 0, duration: 0.9, delay: 0.15 }); }
  }, [entered]);

  return (
    <FxProvider>
      {!entered && <Entrance flash={flash} onEnter={() => setEntered(true)} />}
      {entered && <Main />}
      <div id="flash" ref={flash} />
      <Toast />
      <Loader done={ready} />
    </FxProvider>
  );
}
