import { useCallback, useState } from 'react';
import { manifest } from './slides/manifest.js';

const FADE_MS = 350;

const slideModules = import.meta.glob('./slides/*/Slide.jsx', { eager: true });

function getSlideComponent(name) {
  const entry = Object.entries(slideModules).find(([path]) =>
    path.includes(`/slides/${name}/`),
  );
  return entry ? entry[1].default : null;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (next) => {
      if (next < 0 || next >= manifest.length || next === index || fading) return;
      setFading(true);
      setTimeout(() => {
        setIndex(next);
        setFading(false);
      }, FADE_MS);
    },
    [index, fading],
  );

  const SlideComponent = getSlideComponent(manifest[index]);

  return (
    <div id="deck">
      <button
        id="prev-button"
        className="nav-button"
        aria-label="Previous slide"
        disabled={index === 0}
        onClick={() => goTo(index - 1)}
      >
        &#8592;
      </button>
      <div id="slide-content" className={fading ? 'fade-out' : ''}>
        {SlideComponent ? <SlideComponent /> : null}
      </div>
      <button
        id="next-button"
        className="nav-button"
        aria-label="Next slide"
        disabled={index === manifest.length - 1}
        onClick={() => goTo(index + 1)}
      >
        &#8594;
      </button>
    </div>
  );
}
