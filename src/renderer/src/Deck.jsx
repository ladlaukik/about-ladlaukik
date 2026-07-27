import { useCallback, useState } from 'react';
import { manifest, getSlideComponent } from './slides/registry.js';

const FADE_MS = 350;

export default function Deck({ index, onIndexChange }) {
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (next) => {
      if (next < 0 || next >= manifest.length || next === index || fading) return;
      setFading(true);
      setTimeout(() => {
        onIndexChange(next);
        setFading(false);
      }, FADE_MS);
    },
    [index, fading, onIndexChange],
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
        {SlideComponent ? <SlideComponent index={index} total={manifest.length} /> : null}
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
