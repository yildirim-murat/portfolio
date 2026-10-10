# Murat’s portfolio

A responsive personal portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

Use Node.js 22.14 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Copy `.env.example` to `.env` to set the public site origin used for canonical metadata and sitemap URLs:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Run with Docker Compose

Development mounts the working tree into the container and serves port 3000:

```bash
docker compose --profile development up --build dev
```

Build and run the standalone production image:

```bash
docker compose --profile production up --build web
```

Both services read `.env` when present. Stop them with `Ctrl+C`, or run `docker compose --profile development down` / `docker compose --profile production down` in another terminal.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

Playwright stores browser binaries under `.cache/ms-playwright`. Set `PLAYWRIGHT_BROWSERS_PATH` to that directory before installing Chromium and running the browser suite.

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = ".cache/ms-playwright"
npx playwright install chromium
npm test
```

To use an already installed Chrome or Edge executable, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for the test run. Responsive screenshots are saved under `.cache/qa/screenshots`.

## Project content

Edit the profile, selected projects, experience, and social links in `src/data/portfolio.ts`. Keep public profile URLs and project demo/source links accurate; entries without a public link are presented as concepts.
