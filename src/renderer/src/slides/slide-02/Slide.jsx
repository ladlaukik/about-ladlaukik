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

export default function Slide() {
  const [current, setCurrent] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const prevIndex = (current - 1 + WORDS.length) % WORDS.length;
  const nextIndex = (current + 1) % WORDS.length;

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

  return (
    <div className="equation-slide">
      <h1 className="equation-slide-title">. What is design?</h1>
      <p className="equation-slide-description">
        Design is usually judged by what it produces — but every product is just the visible
        residue of a process. This talk starts with the harder question: process of what?
      </p>
      <div className="equation">
        <span className="equation-blank-track">
          <span className={`equation-blank-reel ${scrolling ? 'scrolling' : ''}`}>
            <span className="equation-blank-row equation-blank-row-peek">{WORDS[prevIndex]}</span>
            <span className="equation-blank-row equation-blank-row-current">{WORDS[current]}</span>
            <span className="equation-blank-row equation-blank-row-peek">{WORDS[nextIndex]}</span>
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
