# AURA — Creative Studio

An English, left-to-right marketing website for a conceptual advertising and branding studio, built with Next.js 16, React 19, TypeScript, and the App Router. The design combines glass surfaces, original SVG artwork, responsive layouts, and accessible motion controls.

## Development

Requires Node.js 20.9 or newer and npm. Install the locked dependencies, then start the development server:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build and run

```sh
npm run typecheck
npm run build
npm start
```

The production server runs at `http://localhost:3000`. To produce the static export used by Sites instead:

```sh
npm run build:static
python3 -m http.server 4173 --directory out
```

Open `http://localhost:4173` to inspect the exported site. The static build sets `AURA_STATIC_EXPORT=1`, enabling Next.js static export to `out/`. `.openai/hosting.json` points Sites to that directory. Use `npm run build` before running `npm start`; a static export is served directly as files.

## Features and content

- Studio introduction, four services, filterable concept projects, and accessible project dialogs
- Mobile navigation, a collaboration process, and frequently asked questions
- Scroll reveals, floating artwork, a moving text strip, and subtle card tilt
- System reduced-motion support and a manual animation preference
- Local fonts and illustrations
- A validated project brief form with text download and clipboard support

AURA is a sample company identity. Madar, Sobh, and Rooyesh are illustrative design concepts, not real client commissions. No client testimonials or performance statistics are claimed.

The form prepares an English brief on the visitor's device. It does not send email, submit inquiries, or store contact details. No backend or database is required. Add a real contact destination and submission service before using the form to receive inquiries.

## Source and structure

Both build commands run `npm run package:source`, which creates `public/aura-source.zip`. The archive is available at `/aura-source.zip` when the site is served and contains the project source, excluding dependencies, build output, and Git metadata. To refresh the download during development, run `npm run package:source` separately.

- `app/`: App Router pages, layout, and global styles
- `components/`: reusable server-rendered sections and client-side interactions
- `public/assets/`: local fonts and SVG artwork
- `scripts/package-source.mjs`: downloadable source packaging
- `next.config.ts`: standard build and optional static export configuration
- `.openai/hosting.json`: Sites identity and deployment configuration

The project repository is [mphcfp/cfp-](https://github.com/mphcfp/cfp-).

The bundled Vazirmatn font by Saber Rastikerdar and contributors is distributed under the SIL Open Font License; see `public/assets/OFL.txt`.
