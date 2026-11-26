"use client";
import { Calendar, Clock, Heart, MapPin, Moon } from "lucide-react";
import { wedding } from "@/config/wedding";
import { longDate } from "@/lib/format";
import { Divider } from "./Sprite";
import { useTilt } from "./useTilt";

const ICONS = { moon: Moon, heart: Heart };

function EventCard({ e }: { e: (typeof wedding.events)[number] }) {
  const tilt = useTilt<HTMLElement>(7);
  const I = ICONS[e.icon];
  return (
    <article className="ecard rv" ref={tilt}>
      <div className="eico"><I className="ico" /></div>
      <h3 className="gold">{e.title}</h3>
      <ul>
        <li><Calendar className="ico" /><span>{longDate(e.iso)}</span></li>
        <li><Clock className="ico" /><span>{e.time}</span></li>
        <li><MapPin className="ico" /><span>Venue: {e.venue}</span></li>
      </ul>
    </article>
  );
}

export default function Events() {
  return (
    <section className="sec" id="s-events">
      <div className="eyebrow rv">THE CELEBRATIONS</div>
      <h2 className="t gold rv">Join Us For</h2>
      <Divider className="rv" />
      <div id="events">{wedding.events.map((e) => <EventCard key={e.title} e={e} />)}</div>
    </section>
  );
}
