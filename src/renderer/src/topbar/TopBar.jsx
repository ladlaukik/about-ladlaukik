import { useEffect } from 'react';
import { HomeIcon, GridIcon, ExpandIcon, CompressIcon, SunIcon, MoonIcon } from './icons.jsx';
import './topbar.css';

const REVEAL_THRESHOLD_PX = 12;

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
