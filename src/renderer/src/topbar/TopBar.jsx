import { useEffect } from 'react';
import { GridIcon, PlayIcon, ExpandIcon, CompressIcon } from './icons.jsx';
import './topbar.css';

const REVEAL_THRESHOLD_PX = 12;

export default function TopBar({
  visible,
  isFullscreen,
  onShow,
  onScheduleHide,
  onViewDeck,
  onPresent,
  onToggleFullscreen,
}) {
  useEffect(() => {
    function handleMouseMove(e) {
      if (e.clientY <= REVEAL_THRESHOLD_PX) {
        onShow();
      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [onShow]);

  return (
    <div
      className={`topbar ${visible ? 'topbar-visible' : ''}`}
      onMouseEnter={onShow}
      onMouseLeave={onScheduleHide}
    >
      <div className="topbar-left">
        <button type="button" className="topbar-button" onClick={onViewDeck}>
          <GridIcon />
          <span>View Deck</span>
        </button>
        <button type="button" className="topbar-button" onClick={onPresent}>
          <PlayIcon />
          <span>Present</span>
        </button>
      </div>
      <div className="topbar-right">
        <button
          type="button"
          className="topbar-icon-button"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <CompressIcon /> : <ExpandIcon />}
        </button>
      </div>
    </div>
  );
}
