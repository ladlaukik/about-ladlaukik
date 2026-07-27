import { useCallback, useEffect, useRef, useState } from 'react';
import { getLastWordIndex, setLastWordIndex } from '../shared/equationWordState.js';
import './equation-slide.css';

const WORDS = [
  'Variables',
  'Inputs',
  'Constraints',
  'Context',
  'Stimuli',
  'Data',
  'Materials',
  'Site',
  'Brief',
  'Ideas',
  'Intuition',
  'Curiosity',
  'Instinct',
  'Emotion',
  'Experience',
  'Observation',
  'Questions',
  'Ambiguity',
  'Possibility',
  'Chaos',
];

const PEEK = 2; // rows of upcoming words visible above the current one

export default function Slide() {
  // Picks up wherever slide-02 last left the scroll, instead of restarting
  // at "Variables" — and then just sits there; no auto-advance on this
  // slide, only the wheel.
  const [current, setCurrent] = useState(getLastWordIndex);
  const [direction, setDirection] = useState(null); // 'forward' | 'backward' | null
  const [suppressTransition, setSuppressTransition] = useState(false);
  const equationRef = useRef(null);
  const productRef = useRef(null);
  const [box, setBox] = useState(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    setLastWordIndex(current);
  }, [current]);

  const beginStep = useCallback((dir) => {
    setDirection((current) => current ?? dir);
  }, []);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      beginStep(e.deltaY > 0 ? 'forward' : 'backward');
    },
    [beginStep],
  );

  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget || !direction) return;
      const delta = direction === 'forward' ? 1 : -1;
      setSuppressTransition(true);
      setCurrent((i) => (i + delta + WORDS.length) % WORDS.length);
      setDirection(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSuppressTransition(false));
      });
    },
    [direction],
  );

  // Draw the box around the static word "PRODUCT" — it doesn't move or
  // resize as the blank scrolls, so this only needs to (re)measure on mount
  // and on resize, not on every word change. It draws itself once.
  useEffect(() => {
    const equationEl = equationRef.current;
    const productEl = productRef.current;
    if (!equationEl || !productEl) return undefined;

    const measure = () => {
      const equationRect = equationEl.getBoundingClientRect();
      const productRect = productEl.getBoundingClientRect();
      const padX = productRect.height * 0.32;
      const padY = productRect.height * 0.14;
      setBox({
        x: productRect.left - equationRect.left - padX,
        y: productRect.top - equationRect.top - padY,
        width: productRect.width + padX * 2,
        height: productRect.height + padY * 2,
      });
    };

    measure();
    setDrawn(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawn(true));
    });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const rx = box ? Math.min(box.height * 0.22, 16) : 0;
  const perimeter = box ? 2 * (box.width + box.height) - 8 * rx + 2 * Math.PI * rx : 0;

  // Same structure as slide-02: current word at the bottom, upcoming words
  // peeking above, one buffer row on each side just off the track.
  const rows = [];
  for (let stepsAhead = PEEK + 1; stepsAhead >= -1; stepsAhead -= 1) {
    const idx = ((current + stepsAhead) % WORDS.length + WORDS.length) % WORDS.length;
    rows.push({ stepsAhead, word: WORDS[idx] });
  }

  return (
    <div className="equation-slide">
      <div className="equation-slide-overlay">
        <div className="equation-slide-title">. What is design?</div>
        <div className="equation-slide-description">
          Design is usually judged by what it produces — but every product is just the visible
          residue of a process. This talk starts with the harder question: process of what?
        </div>
      </div>
      <div className="equation" ref={equationRef}>
        <span className="equation-blank-track" onWheel={handleWheel}>
          <span
            className={`equation-blank-reel ${
              direction ? `scrolling-${direction}` : ''
            } ${suppressTransition ? 'no-transition' : ''}`}
            onTransitionEnd={handleTransitionEnd}
          >
            {rows.map(({ stepsAhead, word }) => (
              <span
                key={stepsAhead}
                className={`equation-blank-row equation-blank-row-peek-${Math.min(
                  Math.abs(stepsAhead),
                  PEEK,
                )}`}
              >
                {word}
              </span>
            ))}
          </span>
        </span>
        <span className="equation-operator">+</span>
        <span className="equation-word">PROCESS</span>
        <span className="equation-operator equation-arrow">&#8594;</span>
        <span className="equation-word" ref={productRef}>
          PRODUCT
        </span>
        <svg className="equation-box-svg" aria-hidden="true">
          {box && (
            <rect
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
              rx={rx}
              ry={rx}
              className="equation-box-rect"
              style={{ strokeDasharray: perimeter, strokeDashoffset: drawn ? 0 : perimeter }}
            />
          )}
        </svg>
      </div>
    </div>
  );
}
