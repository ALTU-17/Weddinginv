# Royal Noor – 3D Interactive Muslim Wedding Invitation

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP (+ ScrollTrigger) · lucide-react

## Run
```bash
npm install
npm run dev        # http://localhost:3000  (open on your phone via your computer's LAN IP)
npm run build && npm start
```
Deploy free on Vercel / Netlify: push to GitHub → import the repo → deploy. Share the live link on WhatsApp.

## Change names, dates, venue, messages
Everything lives in **`src/config/wedding.ts`**: names (now "Groom" / "Bride"), date + time, events,
venue + Google Maps search text, all headings/messages, `shareUrl` (your live URL) and optional `audioUrl`.

## Images (public/img)
`dl.webp` / `dr.webp` left/right door · `pl.webp` plaque · `cu.webp` open curtains · `va.webp` valance ·
`ga.webp` garden · `bg.webp` linen background · `venue.svg` venue picture (swap for a real photo anytime).

## Where things are
- `components/Entrance.tsx` – door → curtains → names (GSAP timeline)
- `components/DateReveal.tsx` – wax seal / envelope / date reveal (GSAP timeline)
- `components/Main.tsx` – scroll reveals, parallax, confetti trigger (ScrollTrigger)
- `components/Fx.tsx` – gold dust, light bursts, confetti, desktop cursor sparkle (one canvas)
- `lib/ambient.ts` – optional soft music (OFF by default, never autoplays)

Respects `prefers-reduced-motion`; low-memory phones get lighter particle effects.
WhatsApp link preview: add an absolute `openGraph.images` URL in `src/app/layout.tsx` after hosting.
