/**
 * ✏️  EDIT YOUR WEDDING DETAILS HERE — every name, date, time, venue and message
 * used anywhere on the website comes from this one file.
 */
export type EventIcon = "moon" | "heart";

export interface WeddingEvent {
  title: string;
  iso: string; // ISO date-time with timezone offset
  time: string; // text shown on the card
  venue: string;
  icon: EventIcon;
}

export const wedding = {
  groom: "Heena Kausar",
  bride: "Shaikh Faisal",
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",

  timeZone: "Asia/Kolkata",
  weddingISO: "2026-12-27T19:30:00+05:30", // main date + countdown target
  weddingTimeText: "InshaAllah After Namaz-e-Asar at Meraj Masjid, Nizamganj Colony, Aurangabad", // text shown on the card
  tagline: "An evening of love, duas and togetherness.",

  events: [
    { title: "NIKAH CEREMONY", iso: "2026-12-27T19:30:00+05:30", time: "4:45 PM", venue: "After Namaz-e-Asar at Meraj Masjid, Nizamganj Colony", icon: "moon" },
    { title: "WALIMA CELEBRATION", iso: "2026-12-21T20:00:00+05:30", time: "7:00 PM", venue: "Grand Imperial Garden", icon: "heart" },
  ] as WeddingEvent[],

  venue: {
    name: "Fatema Lawans",
    address: "InshaAllah After Namz-e-Magrib, at Fatema Lawans,Jinsi, Aurangabad, Maharashtra",
    mapsQuery: "Royal Palace Banquet Hall, Aurangabad, Maharashtra, India", // dummy – replace with the real place / coordinates
  },

  /** Your live website URL (used in the WhatsApp message). Leave empty to use the current page URL. */
  shareUrl: "",
  /** Optional instrumental .mp3 (e.g. "/audio/nikah.mp3" placed in /public). Empty = soft built-in ambient music. Never autoplays. */
  audioUrl: "",

  text: {
    gateInvite: "You are cordially invited to celebrate the wedding of",
    cardBlessing: "Together with the blessings of Allah and our beloved families",
    cardInvite: "We joyfully invite you to celebrate the wedding of",
    roleGroom: "BRIDE",
    roleBride: "GROOM",
    journey: "Two Souls, One Beautiful Journey",
    awaitsKicker: "SAVE THE DATE",
    awaitsTitle: "A Special Day Awaits...",
    awaitsSub: "Something beautiful is waiting to be revealed.",
    revealBtn: "REVEAL THE WEDDING DATE",
    celebration: "THE WEDDING CELEBRATION",
    venueKicker: "WE WOULD LOVE TO CELEBRATE WITH YOU",
    closing1: "Your presence will make our celebration even more special.",
    closing2: "May Allah bless this beautiful union with endless love, happiness, barakah and togetherness. Ameen.",
    withLove: "WITH LOVE & DUAS",
  },
};

export type Wedding = typeof wedding;
