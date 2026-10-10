# Globe landing

The opening page uses a nearly black field, cool gray-white type, and a restrained warm highlight for Istanbul. The supplied brand mark is shown at the upper left; the hero stays focused on the name, role, and one-line introduction.

## Type and color

The hero name uses a self-hosted variable Space Grotesk face from `public/fonts/space-grotesk/`, with Latin and Latin Extended subsets for Turkish characters; its OFL license is included alongside the files. It is scoped to the name only, while the remaining page uses the local system sans stack, so there are no remote font requests. The background is `#080b0f`, primary type is `#edf0f2`, secondary type is `#a8b1b8`, the Istanbul marker uses a muted sand tone (`#e9d2aa`), and the address markers use a pale ice blue (`#bdd9e6`) echoed by their softer rings. The canvas, copy, and brand mark keep their dimensions from first paint so the fallback-to-WebGL handoff does not shift the layout.

## Globe

`src/components/hero.tsx` is a server-rendered main landmark. `src/components/globe/globe-loader.tsx` observes the globe stage and loads the R3F scene only when it approaches the viewport. Until then, and whenever WebGL is unavailable or its context is lost, a compact inline dotted world map remains visible.

`src/components/globe/globe-canvas.tsx` builds one GPU point geometry from 4,757 sampled land coordinates and adds 14 location markers from `src/components/globe/globe-locations.ts`: Istanbul and 13 destinations, including three in Africa, one in Saudi Arabia, two in China, two in North America, and one in South America. One Istanbul-origin request line at a time cycles through those destinations. It eases in, travels, briefly settles, then fades fully before the next request. Istanbul pulses at departure and the destination pulses at arrival. Narrow viewports draw every other land point. The land coordinates were sampled at build time from Natural Earth 1:110m polygons; that geographic dataset is public domain. The retained point list is local, attributed in `src/components/globe/world-points.ts`, and does not fetch data at runtime.

Mouse dragging turns and tilts the globe, and arrow keys provide keyboard control when the map is focused. The globe rotates slowly and responds slightly to pointer position; `prefers-reduced-motion` stops automatic rotation, parallax, and heartbeat animation while keeping manual controls available. Touch scrolling remains usable over the map. The static fallback and reduced-motion scene omit request lines.

The contact screen’s low-contrast dotted silhouette in `public/images/turkey-dotted-map.svg` uses the Natural Earth 1:110m Admin 0 Turkey boundary, projected into the SVG viewBox and filled with a repeated dot pattern. Natural Earth data is public domain; the SVG is static and does not fetch map data at runtime.
