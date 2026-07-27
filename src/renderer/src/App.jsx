import { useCallback, useEffect, useRef, useState } from 'react';
import Deck from './Deck.jsx';
import LandingPage from './landing/LandingPage.jsx';
import DeckGrid from './grid/DeckGrid.jsx';
import TopBar from './topbar/TopBar.jsx';

const HIDE_DELAY_MS = 3000;

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'deck' | 'grid'
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [barVisible, setBarVisible] = useState(true);
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const hideTimer = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showBar = useCallback(() => {
    setBarVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const scheduleHideBar = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBarVisible(false), HIDE_DELAY_MS);
  }, []);

  useEffect(() => {
    scheduleHideBar();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [scheduleHideBar]);

  useEffect(() => {
    window.api.isFullscreen().then(setIsFullscreen);
    const unsubscribe = window.api.onFullscreenChange(setIsFullscreen);
    return unsubscribe;
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== 'Escape') return;
      if (isFullscreen) {
        window.api.setFullscreen(false);
        showBar();
        scheduleHideBar();
      } else if (view === 'grid') {
        setView('deck');
      } else {
        setView('grid');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, view, showBar, scheduleHideBar]);

  const handlePresent = useCallback(() => {
    window.api.setFullscreen(true);
    setView('deck');
  }, []);

  const handleViewDeck = useCallback(() => {
    setView('grid');
  }, []);

  const handleGoHome = useCallback(() => {
    setView('landing');
  }, []);

  const handleSelectSlide = useCallback((index) => {
    setSlideIndex(index);
    setView('deck');
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    window.api.setFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleToggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <>
      {!isFullscreen && (
        <TopBar
          visible={barVisible}
          isFullscreen={isFullscreen}
          theme={theme}
          showNavButtons={view !== 'landing'}
          onShow={showBar}
          onScheduleHide={scheduleHideBar}
          onHome={handleGoHome}
          onDeck={handleViewDeck}
          onToggleFullscreen={handleToggleFullscreen}
          onToggleTheme={handleToggleTheme}
        />
      )}
      {view === 'landing' && (
        <LandingPage onViewDeck={handleViewDeck} onPresent={handlePresent} />
      )}
      {view === 'deck' && <Deck index={slideIndex} onIndexChange={setSlideIndex} />}
      {view === 'grid' && <DeckGrid currentIndex={slideIndex} onSelect={handleSelectSlide} />}
    </>
  );
}
