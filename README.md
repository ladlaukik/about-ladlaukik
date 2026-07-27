# about-ladlaukik

Slide deck for the LTIADS Vyakhyan talk — an Electron app (React + Three.js inside),
packaged so it runs offline with its own bundled Chromium instead of depending on
whatever browser happens to be installed on the presenting machine.

## Running it locally

```
npm install
npm run dev
```

This opens the deck in a fullscreen Electron window with live-reload. Use the **Prev** /
**Next** buttons to move through the deck.

To build a standalone Windows app you can run without `npm run dev`:

```
npm run build:win
```

The packaged app lands in `build/`.

## How slides work

Each slide lives in its own folder under `src/renderer/src/slides/`, e.g. `slide-01/`,
as a self-contained React component (`Slide.jsx`) plus any assets it needs — nothing is
shared between slides unless it's meant to be. `src/renderer/src/slides/manifest.js`
lists the folders in the order they should appear.

To add a slide: create a new folder, add a `Slide.jsx` component, and add the folder
name to `manifest.js` in the right position. No other slide needs to change.

Slides that need a 3D model or scene can use `three` + `@react-three/fiber` (already a
project dependency) inside their own `Slide.jsx` — same self-contained-folder rule
applies.
