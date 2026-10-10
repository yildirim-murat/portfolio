# Portfolio starter

A dark landing page with an interactive point globe, an accessible static fallback, and the supplied brand mark. Production builds are static exports for Cloudflare Pages.

## Requirements

- Node.js 22.14 or newer
- npm

## Local development

```powershell
npm ci
npm run dev
```

Then open <http://localhost:3000>. For LAN preview, this development config allows `192.168.1.9`; update `allowedDevOrigins` in `next.config.ts` if the machine's LAN address changes. Run `npm run lint`, `npm run typecheck`, and `npm run build` before sharing changes. The build writes a static site to `out/`; optionally preview it with Python's built-in server using `python -m http.server 8000 --directory out`, then open <http://localhost:8000>. There is no Next.js production server in this deployment mode.

## Cloudflare Pages

Configure the project with the **Next.js (Static HTML Export)** preset, build command `npm run build`, and output directory `out`. This is equivalent to Cloudflare's documented `npx next build` command. Node.js 22.14 or newer is required; Cloudflare Pages currently defaults to Node.js 22.16. To pin a version explicitly, set `NODE_VERSION` in the Pages build environment.

Set `NEXT_PUBLIC_SITE_URL` in the production build environment to the site's full public origin (for example, `https://example.com`). This value is used for canonical, Open Graph, and Twitter image URLs; when it is absent or invalid, the build omits those absolute URLs instead of publishing localhost metadata. The 1200 × 630 social preview is generated at build time at `/og-image.png`.

`public/robots.txt` allows indexing. Add a sitemap directive only after the production domain is known and a sitemap is published.

## Project structure

- `src/app/` — App Router page, layout, and global styles
- `public/brand/logo.webp` — optimized display copy of the supplied logo
- `public/brand/logo.svg` and `public/brand/favicon.svg` — original supplied assets, kept unchanged
- `src/app/icon.png` — compact favicon derived from the supplied mark

The supplied SVG originals are kept byte-for-byte. The optimized derivatives are used in the starter so the large embedded PNG data in the originals is not downloaded on every page view.

## Next steps

Expand the landing page into the full portfolio with project case studies and experience content. The globe is already lazy-loaded and has a static fallback. Add Docker only when its development and production workflows are ready to maintain.
