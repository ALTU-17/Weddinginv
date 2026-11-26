"use client";
import { useEffect, useRef, useState } from "react";

export default function Toast() {
  const [msg, setMsg] = useState("");
  const [on, setOn] = useState(false);
  const t = useRef<number | undefined>(undefined);
  useEffect(() => {
    const h = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail); setOn(true);
      window.clearTimeout(t.current); t.current = window.setTimeout(() => setOn(false), 2200);
    };
    window.addEventListener("noor-toast", h);
    return () => window.removeEventListener("noor-toast", h);
  }, []);
  return <div id="toast" className={on ? "on" : ""} role="status">{msg}</div>;
}
