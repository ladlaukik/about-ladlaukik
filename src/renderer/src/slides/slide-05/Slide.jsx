import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import WordReel from '../shared/WordReel.jsx';
import { useEquationBoxes } from '../shared/useEquationBoxes.js';
import { getLastWordIndex, setLastWordIndex } from '../shared/equationWordState.js';
import '../shared/equation-common.css';
import '../shared/equation-box.css';
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

const WORDS_REVERSED = [...WORDS].reverse();

const SETTLE_DELAY_MS = 800; // beat of stillness (matching slide-04's filled state) before transferring
const TRANSFER_MS = 1300;
const PARTICLE_COUNT = 14;

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
  const [transferred, setTransferred] = useState(false);
  const clipIdBase = useId();

  const handleContextChange = useCallback((i) => setLastWordIndex('context', i), []);
  const handleProgramChange = useCallback((i) => setLastWordIndex('program', i), []);

  useEffect(() => {
    const timer = setTimeout(() => setTransferred(true), SETTLE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // PRODUCT drains from its edge nearest PROCESS outward; PROCESS fills in
  // from that same shared edge — the two liquid levels move as a single
  // synchronized wipe, so it reads as one thing moving, not two unrelated
  // fades. Only the width/x below are computed per frame; the actual
  // motion is a CSS transition on those (see equation-box-fill).
  const processFillWidth = processBox ? processBox.width * (transferred ? 1 : 0) : 0;
  const processFillX = processBox ? processBox.x + processBox.width - processFillWidth : 0;
  const productFillWidth = productBox ? productBox.width * (transferred ? 0 : 1) : 0;
  const productFillX = productBox ? productBox.x + productBox.width - productFillWidth : 0;

  // A straight-line stream of dots along the same path the fill itself
  // travels (PRODUCT's left edge to PROCESS's right edge), staggered so
  // several are in flight at once — the "sucked in" read layered on top of
  // the plain wipe above.
  const particles = useMemo(() => {
    if (!processBox || !productBox) return [];
    const startX = productBox.x;
    const startY = productBox.y + productBox.height / 2;
    const endX = processBox.x + processBox.width;
    const endY = processBox.y + processBox.height / 2;
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      startX,
      startY: startY + (Math.random() - 0.5) * 6,
      dx: endX - startX,
      dy: endY - startY,
      delay: (i / PARTICLE_COUNT) * TRANSFER_MS,
    }));
  }, [processBox, productBox]);

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
        <span className={transferred ? 'equation-word-on-fill' : ''}>
          <WordReel
            words={WORDS}
            initialIndex={getLastWordIndex('context')}
            autoAdvance={false}
            dimmed={!transferred}
            currentRowRef={contextRowRef}
            onChange={handleContextChange}
          />
        </span>
        <span className="equation-operator">+</span>
        <span className={transferred ? 'equation-word-on-fill' : ''}>
          <WordReel
            words={WORDS_REVERSED}
            initialIndex={getLastWordIndex('program')}
            autoAdvance={false}
            dimmed={!transferred}
            direction="up"
            currentRowRef={programRowRef}
            onChange={handleProgramChange}
          />
        </span>
        <span className="equation-operator">=</span>
        <span
          className={`equation-word equation-word-design ${
            transferred ? 'equation-word-dimmed' : 'equation-word-on-fill'
          }`}
          ref={designRef}
        >
          DESIGN
        </span>

        <svg className="equation-box-svg" aria-hidden="true">
          <defs>
            {processBox && (
              <clipPath id={`${clipIdBase}-process`}>
                <rect
                  x={processBox.x}
                  y={processBox.y}
                  width={processBox.width}
                  height={processBox.height}
                  rx={processBox.rx}
                  ry={processBox.rx}
                />
              </clipPath>
            )}
            {productBox && (
              <clipPath id={`${clipIdBase}-product`}>
                <rect
                  x={productBox.x}
                  y={productBox.y}
                  width={productBox.width}
                  height={productBox.height}
                  rx={productBox.rx}
                  ry={productBox.rx}
                />
              </clipPath>
            )}
          </defs>

          {processBox && (
            <rect
              x={processFillX}
              y={processBox.y}
              width={processFillWidth}
              height={processBox.height}
              clipPath={`url(#${clipIdBase}-process)`}
              className="equation-box-fill"
            />
          )}
          {productBox && (
            <rect
              x={productFillX}
              y={productBox.y}
              width={productFillWidth}
              height={productBox.height}
              clipPath={`url(#${clipIdBase}-product)`}
              className="equation-box-fill"
            />
          )}

          {transferred &&
            particles.map((p) => (
              <circle
                key={p.id}
                cx={p.startX}
                cy={p.startY}
                r={3}
                className="equation-suck-particle"
                style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, animationDelay: `${p.delay}ms` }}
              />
            ))}

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
            className={`equation-box-label ${transferred ? 'equation-box-label-accent' : ''}`}
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
            className={`equation-box-label ${transferred ? '' : 'equation-box-label-accent'}`}
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
