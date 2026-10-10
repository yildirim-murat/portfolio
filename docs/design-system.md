# Visual system

The portfolio pairs warm, quiet editorial pages with one dark, interactive opening scene. The earth map establishes the connected-world theme, and the light sections keep project work and writing easy to scan.

## Visual tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f5f4ef` | Main page background |
| Paper deep | `#ecebe5` | Selected work section |
| Ink | `#20221f` | Main text |
| Muted | `#686b64` | Supporting text |
| Rule | `#dedfd8` | Fine dividers |
| Cobalt | `#2548f4` | Primary project artwork and links |
| Olive | `#7b8261` | Secondary project and emphasis |
| Lilac | `#d9d3ec` | Mono project artwork |
| Hero ink | `#141915` | Globe scene |

Manrope is self-hosted as a variable WOFF2 font for weights 200–800. The Latin and Latin Extended subsets cover Turkish copy. Its SIL Open Font License 1.1 is included at `public/fonts/OFL.txt`; source: [Google Fonts Manrope](https://github.com/google/fonts/tree/main/ofl/manrope).

Spacing and type scale with `clamp()`. Main content uses a 1240px maximum width and fluid page gutters; section layouts become single-column on narrow screens. The project gallery uses three distinct artwork treatments, each drawn in HTML and SVG so it stays sharp, local, and free of external image requests.

## Globe scene

`src/components/hero.tsx` owns the opening copy and the scroll handoff. It imports the WebGL scene only when the hero nears the viewport. `src/components/globe/globe-canvas.tsx` uses one merged point geometry for land, one merged line geometry for four routes, and a small set of location markers. The map contains 4,757 sampled land coordinates and draws roughly half of them on narrow viewports. The points were sampled at build time from [Natural Earth 1:110m land polygons](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), a public-domain geographic dataset; only the compact coordinates are retained here.

An inline dotted SVG map appears before the scene loads and when WebGL is unavailable or loses its context. Mouse dragging and arrow-key controls rotate the globe. The globe turns slowly and follows pointer movement subtly; reduced-motion settings stop the spin, parallax, reveal and scroll transform. The background and routes use low-contrast green-gray tones to keep the globe legible without a neon effect.

## Interaction and accessibility

Navigation and project links show visible focus outlines. The mobile menu exposes its expanded state and supports Escape. The globe is a named, keyboard-focusable group with arrow-key support and explicit rotate buttons; decorative canvas and fallback art stay out of the accessibility tree. Content maintains a semantic heading hierarchy, and all motion responds to `prefers-reduced-motion`.
