# Kodoku no Gourmet Pilgrimage Map

**English** | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

A public interactive map of locations featured in the *Kodoku no Gourmet* (`孤独のグルメ`) manga and television series. The project converts places from a public Google My Maps collection into searchable and filterable data, presented on a global vector basemap for planning location visits.

## Features

- **Global vector map:** MapLibre GL JS with OpenFreeMap Liberty vector tiles (no token required)
- **274 source locations:** Covers the manga, Seasons 1–10, specials, streaming originals, and *それぞれの孤独のグルメ*
- **Linked location filters:** Filter by country or region → Japan region (when Japan is selected) → city → district, as well as series, season, cuisine category, and operating status
- **Search:** Find places by restaurant name, dish, area, or address
- **Open locations by default:** The “marked as open only” filter is enabled initially and can be turned off at any time
- **Place details:** View the episode, dish, address, source notes, Google Maps search, and Tabelog search
- **Six-language interface:** 日本語, English, 繁體中文（台灣）, 繁體中文（香港）, 简体中文, and 한국어
- **Localized basemap labels:** Map labels follow the selected site language via OpenMapTiles multi-language data
- **International SEO:** Prerendered locale URLs, localized metadata, hreflang, canonical URLs, structured data, sitemap, robots rules, and a dedicated social card
- **Responsive layout:** Side-by-side map and sidebar on desktop, with a collapsible filter and place list on mobile
- **Visible attribution:** The source map, source date, and opening-hours warning are shown prominently in the sidebar

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- MapLibre GL JS
- Plain CSS

## Local Development

### 1. Requirements

- Node.js `>= 20.9.0`
- npm

No token or registration is required — the map uses free OpenFreeMap tiles by default.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` in the project root:

```env
SITE_URL=https://example.com

# Optional: override the default map style (defaults to OpenFreeMap Liberty)
# NEXT_PUBLIC_MAP_STYLE_URL=https://tiles.openfreemap.org/styles/liberty
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_MAP_STYLE_URL` | No | Custom MapLibre-compatible style URL; defaults to OpenFreeMap Liberty |
| `SITE_URL` | In production | Public site origin used for canonical, hreflang, sitemap, and social metadata URLs |

These variables are included in the client bundle at build time. Restart the development server after changing them, and rebuild the site on the deployment platform.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Create a production build

```bash
npm run build
npm start
```

## Map and Internationalization

The default map style is:

```text
https://tiles.openfreemap.org/styles/liberty
```

Map labels are dynamically switched to match the site language, using OpenMapTiles multi-language name fields (`name:ja`, `name:en`, `name:zh`, `name:ko`) with a fallback to the local name.

Interface copy is centralized in `src/i18n/messages.ts`, with search metadata in `src/i18n/seo.ts`. Update all six locales whenever user-visible or search-facing text changes. Each locale has its own indexable URL (`/en`, `/ja`, `/zh-CN`, `/zh-TW`, `/zh-HK`, `/ko`) with reciprocal hreflang links. The root URL follows the browser language; a language selected manually is stored in LocalStorage and a cookie, then restored on later visits.

The map is powered by free OpenFreeMap tiles. Do not remove or cover the OpenStreetMap attribution in the lower-right corner.

## Data Source

The only location dataset is:

[Google My Maps: 「『孤独のグルメ』ＭＡＰ！（漫画＆ドラマSeason１～１０）」](https://www.google.com/maps/d/u/0/viewer?mid=1dH-zOGzRwCZ8cgFKaOlFBn8JDM8)

- Generated data: `src/data/restaurants.json`
- Runtime types and exports: `src/data/index.ts`
- Country, Japan region, city, and district hierarchy: `src/data/geography.ts`
- Import script: `scripts/import-google-mymaps.mjs`
- Source map update shown by the project: April 2026

Operating status and cuisine categories are inferred by the import script from source text. The country, Japan region, city, and district hierarchy is derived at runtime from source addresses and area fields without using another location dataset. In Japan, “district” generally corresponds to a ward, town, or address locality below the prefecture level.

Because the manga and television series span many years, a place may have closed, paused operations, or moved. Confirm current details directly with the venue before visiting.

### Refresh the source data

```bash
npm run data:sync
npm run build
```

The sync command downloads the KML over the network and fully rewrites `src/data/restaurants.json`. Before committing the result, inspect the place count, source update date, cuisine classifications, operating statuses, and the generated diff.

## Project Structure

```text
src/
├── app/
│   ├── globals.css          # Global, responsive, and MapLibre styles
│   ├── [locale]/page.tsx    # Localized HTML, metadata, and structured data
│   ├── layout.tsx           # Root layout, metadata base, and MapLibre CSS
│   ├── page.tsx             # Browser/preference locale redirect
│   ├── robots.ts            # Search crawler rules
│   └── sitemap.ts           # Localized sitemap and hreflang entries
├── components/
│   ├── HomePage.tsx         # Interactive page state, filters, and locale routing
│   ├── MapView.tsx          # MapLibre map, markers, popups, and label language
│   └── Sidebar.tsx          # Search, filters, place list, and attribution
├── data/
│   ├── categories.ts        # Cuisine categories, colors, and icons
│   ├── geography.ts         # Country, Japan region, city, and district hierarchy
│   ├── index.ts             # Data types and exports
│   └── restaurants.json     # Location data generated from KML
└── i18n/
    ├── messages.ts          # Six-language interface copy
    ├── routing.ts           # Locale detection and URL helpers
    └── seo.ts               # Localized search and social metadata

scripts/
└── import-google-mymaps.mjs # Google My Maps KML importer
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Run TypeScript checks and create a production build |
| `npm start` | Start the completed production build |
| `npm run data:sync` | Regenerate place data from the configured Google My Maps source |
