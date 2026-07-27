import { TALK_NAME, AUTHOR } from '../config.js';
import './landing.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-title">{TALK_NAME}</div>
      <div className="landing-author">{AUTHOR}</div>
    </div>
  );
}
