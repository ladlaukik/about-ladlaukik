# about-ladlaukik

LTIADS Vyakhyan talk deck — HTML slide presentation, local-first, no build step, no
internet dependency at presentation time.

## Structure
- `slides/slide-NN-<short-name>/` — one folder per slide. Contains that slide's HTML
  fragment plus any media/animations/scripts unique to it.
- `index.html` — orchestrator: loads slides in order, handles next/prev nav, fade transition.
- `js/main.js` — navigation + slide-loading logic.
- `css/main.css` — shared styles.
- `slides/manifest.js` — ordered array of slide folder names.

## Conventions
- Vanilla HTML/CSS/JS only. No frameworks, no build step, no npm dependencies unless
  explicitly requested.
- Each slide folder is self-contained — adding/reordering/removing a slide should never
  require touching another slide folder.
- All media referenced with paths relative to that slide's own folder.
- Videos/images are local files only — never remote URLs.
- Run via local static server, not file:// (avoids fetch/CORS issues):
  `python3 -m http.server 8000`

## Workflow
- New slide: create `slides/slide-NN-<name>/`, add its folder name to manifest.js, add
  `slide.html` + assets.
- Commit after each meaningful slide addition.
