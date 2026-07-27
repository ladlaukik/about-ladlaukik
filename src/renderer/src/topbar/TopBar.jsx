import { useEffect } from 'react';
import { HomeIcon, GridIcon, ExpandIcon, CompressIcon, SunIcon, MoonIcon } from './icons.jsx';
import './topbar.css';

const REVEAL_THRESHOLD_PX = 4; // the screen's top edge, not the bar's whole footprint
const REVEAL_DELAY_MS = 1000;

export default function TopBar({
  visible,
  isFullscreen,
  theme,
  showNavButtons,
  onShow,
  onScheduleHide,
  onHome,
  onDeck,
  onToggleFullscreen,
  onToggleTheme,
}) {
  useEffect(() => {
    let revealTimer = null;
    let inZone = false;

    function handleMouseMove(e) {
      const nowInZone = e.clientY <= REVEAL_THRESHOLD_PX;
      if (nowInZone && !inZone) {
        inZone = true;
        revealTimer = setTimeout(onShow, REVEAL_DELAY_MS);
      } else if (!nowInZone && inZone) {
        inZone = false;
        clearTimeout(revealTimer);
        revealTimer = null;
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(revealTimer);
    };
  }, [onShow]);

  return (
    <div
      className={`topbar ${visible ? 'topbar-visible' : ''}`}
      onMouseEnter={onShow}
      onMouseLeave={onScheduleHide}
    >
      <div className="topbar-left">
        {showNavButtons && (
          <>
            <button type="button" className="topbar-button" onClick={onHome}>
              <HomeIcon />
              <span>Home</span>
            </button>
            <button type="button" className="topbar-button" onClick={onDeck}>
              <GridIcon />
              <span>Deck</span>
            </button>
          </>
        )}
      </div>
      <div className="topbar-right">
        <button
          type="button"
          className="topbar-icon-button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
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
