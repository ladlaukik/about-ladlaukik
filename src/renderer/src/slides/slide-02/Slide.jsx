import { useEffect, useState } from 'react';
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
const TRANSITION_MS = 450;
const PEEK = 2; // rows of neighboring words visible above/below the current one

export default function Slide() {
  const [current, setCurrent] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let swapTimeout;
    const interval = setInterval(() => {
      setScrolling(true);
      swapTimeout = setTimeout(() => {
        setCurrent((i) => (i + 1) % WORDS.length);
        setScrolling(false);
      }, TRANSITION_MS);
    }, CYCLE_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(swapTimeout);
    };
  }, []);

  // One extra buffer row below the visible window (offset PEEK + 1) so the
  // reel always has a word ready to scroll in — never an empty gap.
  const rows = [];
  for (let offset = -PEEK; offset <= PEEK + 1; offset += 1) {
    const idx = ((current + offset) % WORDS.length + WORDS.length) % WORDS.length;
    rows.push({ offset, word: WORDS[idx] });
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
        <span className="equation-blank-track">
          <span className={`equation-blank-reel ${scrolling ? 'scrolling' : ''}`}>
            {rows.map(({ offset, word }) => (
              <span
                key={offset}
                className={`equation-blank-row equation-blank-row-peek-${Math.min(Math.abs(offset), PEEK)}`}
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
