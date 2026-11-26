import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/cinzel-decorative/700.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/great-vibes/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "You are cordially invited to a wedding celebration. Open your royal invitation.",
  // For a WhatsApp link preview, add: openGraph: { images: ["https://YOUR-SITE/preview.jpg"] }
  openGraph: { title: "Royal Wedding Invitation", description: "With the blessings of Allah, you are cordially invited ✨", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#e9dcb8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/img/dl.webp" type="image/webp" />
        <link rel="preload" as="image" href="/img/dr.webp" type="image/webp" />
        <link rel="preload" as="image" href="/img/pl.webp" type="image/webp" />
      </head>
      <body className="locked">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
