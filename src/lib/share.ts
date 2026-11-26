import { wedding } from "@/config/wedding";
import { longDate, titleCase } from "./format";

export const shareUrl = () => wedding.shareUrl || window.location.href.split("#")[0];

export const shareText = () =>
  `Assalamu Alaikum 🌙\n\nWith the blessings of Allah, we joyfully invite you to the wedding of\n*${titleCase(wedding.groom)}* & *${titleCase(wedding.bride)}* ✨\n\n📅 ${longDate(wedding.weddingISO)}\n📍 ${wedding.venue.name}, ${wedding.venue.address}\n\nOpen your royal invitation 💌`;

export const shareMessage = () => `${shareText()}\n${shareUrl()}\n\nYour presence and duas will mean the world to us. 🤍`;

export const waLink = () => "https://wa.me/?text=" + encodeURIComponent(shareMessage());

export async function copyLink(): Promise<void> {
  const url = shareUrl();
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    const a = document.createElement("textarea");
    a.value = url;
    document.body.appendChild(a);
    a.select();
    try { document.execCommand("copy"); } catch { /* ignore */ }
    a.remove();
  }
}

/** Web Share API where supported, WhatsApp otherwise. */
export function nativeShare() {
  if (navigator.share) {
    navigator.share({ title: `${titleCase(wedding.groom)} & ${titleCase(wedding.bride)} · Wedding Invitation`, text: shareText(), url: shareUrl() }).catch(() => {});
  } else {
    window.open(waLink(), "_blank", "noopener");
  }
}
