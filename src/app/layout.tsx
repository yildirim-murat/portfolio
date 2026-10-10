import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

function getConfiguredSiteUrl(value: string | undefined): URL | undefined {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value);
    const isHttp = url.protocol === "http:" || url.protocol === "https:";
    const isLocalHost =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "[::1]" ||
      url.hostname.endsWith(".localhost");

    if (!isHttp || url.username || url.password) return undefined;
    if (process.env.NODE_ENV === "production" && isLocalHost) return undefined;

    return new URL(`${url.origin}/`);
  } catch {
    return undefined;
  }
}

const siteUrl = getConfiguredSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const title = "Murat YILDIRIM | Software Developer";
const description =
  "Kurumlar ve bireyler için güvenli web uygulamaları, yönetim panelleri ve mobil çözümler geliştiren yazılım geliştirici.";
const socialImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Murat YILDIRIM, Software Developer",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title,
    description,
    url: siteUrl ? "/" : undefined,
    images: siteUrl ? [socialImage] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: siteUrl ? [socialImage] : undefined,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
