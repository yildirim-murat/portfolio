import { ImageResponse } from "next/og";

export const dynamic = "force-static";

import { portfolio } from "@/data/portfolio";

export const alt = `${portfolio.name} — ${portfolio.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          background: "#f2f0eb",
          color: "#202522",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 25, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {portfolio.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: "-0.06em" }}>{portfolio.name}</div>
          <div style={{ fontSize: 34, color: "#68706a" }}>{portfolio.title}</div>
        </div>
        <div style={{ fontSize: 21, color: "#68706a" }}>Selected work · 2025</div>
      </div>
    ),
    size,
  );
}
