# AURA — Creative Studio

An English, left-to-right website for AURA, a conceptual advertising and branding studio. It combines glass surfaces, original SVG illustrations, subtle animation, and a responsive layout.

## Run locally

No dependency installation or build step is required:

```sh
python3 -m http.server 4173 --directory dist
```

Then open `http://localhost:4173`.

## Features

- Desktop navigation and a mobile menu, studio introduction, four services, filterable concept projects, and project detail dialogs
- A collaboration process and frequently asked questions
- A validated form to download or copy an English project brief
- Scroll reveals, a floating sculpture, a moving text strip, rotating decorations, and subtle pointer effects on cards
- System `prefers-reduced-motion` support and a manual animation toggle
- Local fonts and illustrations, with no analytics or external asset requests from the browser

## Content and contact behavior

AURA is the sample identity for this project. Madar, Sobh, and Rooyesh are design concepts, not real client commissions. The site does not invent client testimonials or performance statistics.

The project form creates a text brief on the visitor's device. It does not send emails, submit requests to a server, or store contact details. To receive inquiries online, add a real contact destination and the appropriate submission service.

The complete source is available as `aura-source.zip` on the published site.

## Structure

- `dist/index.html`: English content and page structure
- `dist/styles.css`: visual design and responsive layout
- `dist/app.js`: interactions and project brief form
- `dist/assets/`: local fonts and SVG illustrations
- `dist/aura-source.zip`: downloadable source archive
- `.openai/hosting.json`: Sites publication configuration

The bundled Vazirmatn font by Saber Rastikerdar and contributors is distributed under the SIL Open Font License. Its license is included in `dist/assets/OFL.txt`.
