import { useEffect, useRef, useState } from 'react';
import { manifest, getSlideComponent } from '../slides/registry.js';
import { useViewportSize } from '../hooks/useViewportSize.js';
import './deck-grid.css';

const COLUMNS = 4;
const GAP = 24;

export default function DeckGrid({ currentIndex, onSelect }) {
  const viewport = useViewportSize();
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cellWidth = containerWidth > 0 ? (containerWidth - GAP * (COLUMNS - 1)) / COLUMNS : 0;
  const scale = cellWidth > 0 && viewport.width > 0 ? cellWidth / viewport.width : 0;

  return (
    <div className="deck-grid">
      <div
        className="deck-grid-inner"
        ref={containerRef}
        style={{ '--columns': COLUMNS, '--gap': `${GAP}px` }}
      >
        {manifest.map((name, index) => {
          const SlideComponent = getSlideComponent(name);
          return (
            <button
              key={name}
              type="button"
              className={`grid-thumb ${index === currentIndex ? 'grid-thumb-current' : ''}`}
              onClick={() => onSelect(index)}
            >
              <div className="grid-thumb-viewport">
                {scale > 0 && (
                  <div
                    className="grid-thumb-stage"
                    style={{
                      width: viewport.width,
                      height: viewport.height,
                      transform: `scale(${scale})`,
                    }}
                  >
                    {SlideComponent ? (
                      <SlideComponent index={index} total={manifest.length} />
                    ) : null}
                  </div>
                )}
              </div>
              <div className="grid-thumb-number">{index + 1}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
