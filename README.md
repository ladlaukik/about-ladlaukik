# about-ladlaukik

Slide deck for the LTIADS Vyakhyan talk — a plain HTML/CSS/JS presentation with no build
step and no internet dependency, meant to run locally during the talk.

## Running it locally

You need Python 3 installed (or any static file server). From the project root:

```
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. The deck must be
served over HTTP (not opened directly as a `file://` path) so slide fragments can be
fetched correctly.

Use the **Prev** / **Next** buttons to move through the deck.

## How slides work

Each slide lives in its own folder under `slides/`, e.g. `slides/slide-01/`. A slide
folder contains that slide's HTML content plus any images, video, or scripts it needs —
nothing is shared between slides unless it's meant to be. `slides/manifest.js` lists the
folders in the order they should appear.

To add a slide: create a new folder under `slides/`, drop in its content, and add the
folder name to `slides/manifest.js` in the right position. No other files need to change.
