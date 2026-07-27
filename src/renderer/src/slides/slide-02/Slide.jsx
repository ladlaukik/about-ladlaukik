import { useCallback } from 'react';
import WordReel from '../shared/WordReel.jsx';
import { setLastWordIndex } from '../shared/equationWordState.js';
import '../shared/equation-common.css';

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

// PROGRAM reuses the same word list, just reversed, so the two reels don't
// show the same word at the same time.
const WORDS_REVERSED = [...WORDS].reverse();

export default function Slide() {
  // slide-03 resumes on whichever word each reel last showed here.
  const handleContextChange = useCallback((i) => setLastWordIndex('context', i), []);
  const handleProgramChange = useCallback((i) => setLastWordIndex('program', i), []);

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
        <WordReel words={WORDS} onChange={handleContextChange} />
        <span className="equation-operator">+</span>
        <WordReel words={WORDS_REVERSED} direction="up" onChange={handleProgramChange} />
        <span className="equation-operator">=</span>
        <span className="equation-word equation-word-design">DESIGN</span>
      </div>
    </div>
  );
}
