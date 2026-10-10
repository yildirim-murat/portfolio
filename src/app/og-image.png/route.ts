import { ImageResponse } from "next/og";
import { createElement } from "react";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          alignItems: "flex-start",
          background: "#101717",
          color: "#f3f1e9",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "76px 88px",
          position: "relative",
          width: "100%",
          fontFamily: "Arial, sans-serif",
        },
      },
      createElement(
        "div",
        {
          style: {
            color: "#b7c9c4",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.18em",
            marginBottom: 28,
            textTransform: "uppercase",
          },
        },
        "Software Developer · Türkiye",
      ),
      createElement(
        "div",
        {
          style: {
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-0.055em",
            lineHeight: 1.05,
          },
        },
        "Murat YILDIRIM",
      ),
      createElement(
        "div",
        {
          style: {
            color: "#c5d7d1",
            fontSize: 27,
            lineHeight: 1.45,
            marginTop: 26,
            maxWidth: 820,
          },
        },
        "Kurumlar ve bireyler için güvenli web uygulamaları, yönetim panelleri ve mobil çözümler.",
      ),
      createElement("div", {
        style: {
          background: "#9ee6cb",
          bottom: 76,
          height: 4,
          left: 88,
          position: "absolute",
          width: 84,
        },
      }),
    ),
    { width: 1200, height: 630 },
  );
}
