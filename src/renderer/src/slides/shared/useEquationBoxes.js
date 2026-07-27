import { useEffect, useRef, useState } from 'react';

// Padding/corner-radius proportions shared by every PROCESS/PRODUCT box
// across slide-03/04/05, so they all read as the same visual language.
// `rect` is a plain {left,top,width,height} — either a real DOMRect or a
// synthetic one spanning from CONTEXT's current word to PROGRAM's.
function boxGeometry(rect, equationRect) {
  const padX = rect.height * 0.32;
  const padY = rect.height * 0.14;
  const box = {
    x: rect.left - equationRect.left - padX,
    y: rect.top - equationRect.top - padY,
    width: rect.width + padX * 2,
    height: rect.height + padY * 2,
  };
  const rx = Math.min(box.height * 0.22, 16);
  const perimeter = 2 * (box.width + box.height) - 8 * rx + 2 * Math.PI * rx;
  return { ...box, rx, perimeter };
}

// The boxes' "hand-drawn" stroke reveal should only ever play once per
// session (the first time slide-03 is reached) — slide-04/05 pick up with
// them already fully drawn, since they're meant to read as the same boxes
// persisting through the continuous chain, not being redrawn each time.
let hasDrawnOnce = false;

// Measures PROCESS (spanning CONTEXT's current word through PROGRAM's) and
// PRODUCT (around DESIGN) off the real rendered elements, redrawing on
// resize. `drawn` flips true two frames after mount/resize (skipped if the
// boxes have already drawn once this session) — pair it with a CSS
// transition (see equation-box-rect) for a "just drawn" reveal.
export function useEquationBoxes() {
  const equationRef = useRef(null);
  const contextRowRef = useRef(null);
  const programRowRef = useRef(null);
  const designRef = useRef(null);
  const [processBox, setProcessBox] = useState(null);
  const [productBox, setProductBox] = useState(null);
  const [drawn, setDrawn] = useState(hasDrawnOnce);

  useEffect(() => {
    const equationEl = equationRef.current;
    const contextEl = contextRowRef.current;
    const programEl = programRowRef.current;
    const designEl = designRef.current;
    if (!equationEl || !contextEl || !programEl || !designEl) return undefined;

    const measure = () => {
      const equationRect = equationEl.getBoundingClientRect();
      const contextRect = contextEl.getBoundingClientRect();
      const programRect = programEl.getBoundingClientRect();
      const processRect = {
        left: contextRect.left,
        top: contextRect.top,
        width: programRect.right - contextRect.left,
        height: contextRect.height,
      };
      setProcessBox(boxGeometry(processRect, equationRect));
      setProductBox(boxGeometry(designEl.getBoundingClientRect(), equationRect));
    };

    measure();
    window.addEventListener('resize', measure);

    if (hasDrawnOnce) {
      setDrawn(true);
      return () => window.removeEventListener('resize', measure);
    }

    setDrawn(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDrawn(true);
        hasDrawnOnce = true;
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return { equationRef, contextRowRef, programRowRef, designRef, processBox, productBox, drawn };
}
