import { useCallback } from 'react';
import WordReel from '../shared/WordReel.jsx';
import { useEquationBoxes } from '../shared/useEquationBoxes.js';
import { getLastWordIndex, setLastWordIndex } from '../shared/equationWordState.js';
import '../shared/equation-common.css';
import '../shared/equation-box.css';

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

const WORDS_REVERSED = [...WORDS].reverse();

export default function Slide() {
  const {
    equationRef,
    contextRowRef,
    programRowRef,
    designRef,
    processBox,
    productBox,
    drawn,
  } = useEquationBoxes();

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
      <div className="equation" ref={equationRef}>
        <WordReel
          words={WORDS}
          initialIndex={getLastWordIndex('context')}
          autoAdvance={false}
          dimmed
          currentRowRef={contextRowRef}
          onChange={handleContextChange}
        />
        <span className="equation-operator">+</span>
        <WordReel
          words={WORDS_REVERSED}
          initialIndex={getLastWordIndex('program')}
          autoAdvance={false}
          dimmed
          direction="up"
          currentRowRef={programRowRef}
          onChange={handleProgramChange}
        />
        <span className="equation-operator">=</span>
        <span className="equation-word equation-word-dimmed equation-word-design" ref={designRef}>
          DESIGN
        </span>

        <svg className="equation-box-svg" aria-hidden="true">
          {processBox && (
            <rect
              x={processBox.x}
              y={processBox.y}
              width={processBox.width}
              height={processBox.height}
              rx={processBox.rx}
              ry={processBox.rx}
              className="equation-box-rect"
              style={{
                strokeDasharray: processBox.perimeter,
                strokeDashoffset: drawn ? 0 : processBox.perimeter,
              }}
            />
          )}
          {productBox && (
            <rect
              x={productBox.x}
              y={productBox.y}
              width={productBox.width}
              height={productBox.height}
              rx={productBox.rx}
              ry={productBox.rx}
              className="equation-box-rect"
              style={{
                strokeDasharray: productBox.perimeter,
                strokeDashoffset: drawn ? 0 : productBox.perimeter,
              }}
            />
          )}
        </svg>

        {processBox && (
          <span
            className="equation-box-label"
            style={{
              left: processBox.x + processBox.height * 0.4,
              top: processBox.y,
              opacity: drawn ? 1 : 0,
            }}
          >
            Process
          </span>
        )}
        {productBox && (
          <span
            className="equation-box-label"
            style={{
              left: productBox.x + productBox.height * 0.4,
              top: productBox.y,
              opacity: drawn ? 1 : 0,
            }}
          >
            Product
          </span>
        )}
      </div>
    </div>
  );
}
