import { useCallback, useEffect, useState } from 'react';
import './word-reel.css';

const CYCLE_MS = 3000;
const PEEK = 2; // rows of upcoming words visible next to the current one

// In 'down' mode (default) new words enter from the top and the reel
// scrolls down; upcoming words peek in above the current word, which sits
// at the bottom of the visible window. 'up' mode is the mirror: new words
// enter from the bottom, upcoming words peek in below, current word sits
// at the top. Either way "forward" always means the next word in the list
// and "backward" the previous one — direction only changes which way that
// looks, not the underlying sequence.
export default function WordReel({
  words,
  initialIndex = 0,
  autoAdvance = true,
  dimmed = false,
  direction = 'down',
  currentRowRef,
  onChange,
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [action, setAction] = useState(null); // 'forward' | 'backward' | null
  const [suppressTransition, setSuppressTransition] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    onChange?.(current);
  }, [current, onChange]);

  // Only starts a step if the reel is idle — a request that arrives mid-
  // animation (auto tick or wheel flick) is simply dropped.
  const beginStep = useCallback((next) => {
    setAction((current) => current ?? next);
  }, []);

  // Auto-advance, but only while the mouse isn't over the reel — hovering
  // hands control to the wheel instead.
  useEffect(() => {
    if (!autoAdvance || hovering) return undefined;
    const interval = setInterval(() => beginStep('forward'), CYCLE_MS);
    return () => clearInterval(interval);
  }, [autoAdvance, hovering, beginStep]);

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
      if (e.target !== e.currentTarget || !action) return;
      const delta = action === 'forward' ? 1 : -1;
      setSuppressTransition(true);
      setCurrent((i) => (i + delta + words.length) % words.length);
      setAction(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSuppressTransition(false));
      });
    },
    [action, words.length],
  );

  // 'down': current at the bottom, peeks above (descending stepsAhead).
  // 'up': current at the top, peeks below (ascending stepsAhead) — the
  // mirror image. Either way one hidden buffer row sits past each end,
  // ready to scroll into view for a forward or backward step.
  const stepsRange =
    direction === 'up'
      ? Array.from({ length: PEEK + 3 }, (_, i) => i - 1)
      : Array.from({ length: PEEK + 3 }, (_, i) => PEEK + 1 - i);

  const rows = stepsRange.map((stepsAhead) => {
    const idx = ((current + stepsAhead) % words.length + words.length) % words.length;
    return { stepsAhead, word: words[idx] };
  });

  // Which target ("0" or "-2" reel-rows) each action scrolls toward depends
  // on direction — see word-reel.css's --target-mult for how this and the
  // resting "-1" get turned into an actual transform.
  const zeroTargetAction = direction === 'up' ? 'backward' : 'forward';
  const targetMult = !action ? -1 : action === zeroTargetAction ? 0 : -2;

  return (
    <span
      className={`word-reel-track ${dimmed ? 'word-reel-dimmed' : ''} ${
        direction === 'up' ? 'word-reel-track-up' : ''
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onWheel={handleWheel}
    >
      <span
        className={`word-reel ${suppressTransition ? 'word-reel-no-transition' : ''}`}
        style={{ '--target-mult': targetMult }}
        onTransitionEnd={handleTransitionEnd}
      >
        {rows.map(({ stepsAhead, word }) => (
          <span
            key={stepsAhead}
            ref={stepsAhead === 0 ? currentRowRef : undefined}
            className={`word-reel-row word-reel-row-peek-${Math.min(Math.abs(stepsAhead), PEEK)}`}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
