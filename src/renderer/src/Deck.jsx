import { useCallback, useEffect, useRef, useState } from 'react';
import { manifest, getSlideComponent } from './slides/registry.js';

const FADE_MS = 350;
const CENTER_OPACITY = 0.1;
const OPACITY_SLOPE = 1.8; // reaches 0/1 at the screen's far edges

export default function Deck({ index, onIndexChange }) {
  const [fading, setFading] = useState(false);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

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

  useEffect(() => {
    function handleMouseMove(e) {
      const t = e.clientX / window.innerWidth;
      const prevOpacity = Math.min(1, Math.max(0, CENTER_OPACITY + (0.5 - t) * OPACITY_SLOPE));
      const nextOpacity = Math.min(1, Math.max(0, CENTER_OPACITY + (t - 0.5) * OPACITY_SLOPE));

      if (prevButtonRef.current) {
        prevButtonRef.current.style.opacity = index === 0 ? '' : String(prevOpacity);
      }
      if (nextButtonRef.current) {
        nextButtonRef.current.style.opacity =
          index === manifest.length - 1 ? '' : String(nextOpacity);
      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [index]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(index - 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goTo, index]);

  // Left click anywhere advances, right click anywhere goes back — except on the
  // nav buttons themselves, which already have their own explicit direction.
  const handleDeckClick = useCallback(
    (e) => {
      if (e.target.closest('.nav-button')) return;
      goTo(index + 1);
    },
    [goTo, index],
  );

  const handleDeckContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target.closest('.nav-button')) return;
      goTo(index - 1);
    },
    [goTo, index],
  );

  const SlideComponent = getSlideComponent(manifest[index]);

  return (
    <div id="deck" onClick={handleDeckClick} onContextMenu={handleDeckContextMenu}>
      <button
        ref={prevButtonRef}
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
        ref={nextButtonRef}
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
