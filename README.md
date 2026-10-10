# Portfolio starter

A minimal dark landing page built around an interactive point globe, with an accessible static fallback and the supplied brand mark.

## Requirements

- Node.js 22.14 or newer
- npm

## Local development

```powershell
npm ci
npm run dev
```

Then open <http://localhost:3000>. For LAN preview, this development config allows `192.168.1.9`; update `allowedDevOrigins` in `next.config.ts` if the machine's LAN address changes. The production commands are `npm run build` and `npm run start`. Run `npm run lint` and `npm run typecheck` before sharing changes.

## Project structure

- `src/app/` — App Router page, layout, and global styles
- `public/brand/logo.webp` — optimized display copy of the supplied logo
- `public/brand/logo.svg` and `public/brand/favicon.svg` — original supplied assets, kept unchanged
- `src/app/icon.png` — compact favicon derived from the supplied mark

The supplied SVG originals are kept byte-for-byte. The optimized derivatives are used in the starter so the large embedded PNG data in the originals is not downloaded on every page view.

## Next steps

Expand the landing page into the full portfolio with project case studies and experience content. The globe is already lazy-loaded and has a static fallback. Add Docker only when its development and production workflows are ready to maintain.
