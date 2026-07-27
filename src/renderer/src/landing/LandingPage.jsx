import { TALK_NAME, AUTHOR } from '../config.js';
import { GridIcon, PlayIcon } from '../topbar/icons.jsx';
import './landing.css';

export default function LandingPage({ onViewDeck, onPresent }) {
  return (
    <div className="landing">
      <div className="landing-title">{TALK_NAME}</div>
      <div className="landing-author">{AUTHOR}</div>
      <div className="landing-actions">
        <button type="button" className="landing-action" onClick={onViewDeck}>
          <GridIcon size={20} />
          <span>View Deck</span>
        </button>
        <div className="landing-divider" />
        <button type="button" className="landing-action" onClick={onPresent}>
          <PlayIcon size={17} />
          <span>Present</span>
        </button>
      </div>
    </div>
  );
}
