import { useCallback, useEffect, useState } from 'react';
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

const CYCLE_MS = 3000;
const PEEK = 2; // rows of upcoming words visible above the current one

export default function Slide() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null); // 'forward' | 'backward' | null
  const [suppressTransition, setSuppressTransition] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Only starts a step if the reel is idle — a request that arrives mid-
  // animation (auto tick or wheel flick) is simply dropped.
  const beginStep = useCallback((dir) => {
    setDirection((current) => current ?? dir);
  }, []);

  // Auto-advance, but only while the mouse isn't over the reel — hovering
  // hands control to the wheel instead.
  useEffect(() => {
    if (hovering) return undefined;
    const interval = setInterval(() => beginStep('forward'), CYCLE_MS);
    return () => clearInterval(interval);
  }, [hovering, beginStep]);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      beginStep(e.deltaY > 0 ? 'forward' : 'backward');
    },
    [beginStep],
  );

  // Once the scroll transition finishes, swap in the new word and snap the
  // reel back to its resting position with transitions off — otherwise that
  // reset itself gets animated, producing a jagged double-motion right as
  // the word changes. Transitions are re-enabled two frames later, once the
  // instant reset has actually painted.
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

  // At rest, the current word sits at the bottom of the visible window with
  // upcoming words peeking in above it and nothing below. One extra buffer
  // row above (PEEK + 1 steps ahead) and one below (1 step behind) sit just
  // off the track, ready to scroll into view for a forward or backward step.
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
      <div className="equation">
        <span
          className="equation-blank-track"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onWheel={handleWheel}
        >
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
        <span className="equation-word">PRODUCT</span>
      </div>
    </div>
  );
}
