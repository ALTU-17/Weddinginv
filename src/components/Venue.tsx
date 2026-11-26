import { MapPin, Navigation } from "lucide-react";
import { wedding } from "@/config/wedding";

export default function Venue() {
  const q = encodeURIComponent(wedding.venue.mapsQuery);
  return (
    <section className="sec" id="s-venue">
      <div className="eyebrow rv">{wedding.text.venueKicker}</div>
      <div className="vname gold rv">{wedding.venue.name}</div>
      <div className="vaddr rv"><MapPin className="ico" /><span>{wedding.venue.address}</span></div>
      <div className="venue-art rv">
        {/* Replace /public/img/venue.svg with a real venue photo (e.g. venue.webp) any time. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/venue.svg" alt="Illustration of the royal palace venue" width={400} height={250} loading="lazy" />
      </div>
      <div className="btns rv">
        <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer"><MapPin />OPEN IN GOOGLE MAPS</a>
        <a className="btn ghost" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer"><Navigation />GET DIRECTIONS</a>
      </div>
    </section>
  );
}
