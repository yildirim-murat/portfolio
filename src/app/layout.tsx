import type { Metadata, Viewport } from "next";
import { portfolio } from "@/data/portfolio";
import { hasConfiguredSiteUrl, siteUrl } from "@/lib/site-url";
import "./globals.css";

const description = portfolio.intro;

export const metadata: Metadata = {
  metadataBase: hasConfiguredSiteUrl ? siteUrl : undefined,
  title: {
    default: `${portfolio.name} — ${portfolio.title}`,
    template: `%s — ${portfolio.name}`,
  },
  description,
  applicationName: `${portfolio.name} portfolio`,
  authors: [{ name: portfolio.name }],
  creator: portfolio.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: `${portfolio.name} — ${portfolio.title}`,
    title: `${portfolio.name} — ${portfolio.title}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.name} — ${portfolio.title}`,
    description,
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2f0eb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
