import { TALK_NAME, AUTHOR } from '../../../config.js';
import './slide-overlay.css';

export default function SlideOverlay({ title, description = [], topicName, index, total }) {
  const slideNumber = typeof index === 'number' ? index + 1 : null;

  return (
    <>
      <div className="template-scrim" />
      <div className="template-overlay">
        <div className="template-text">
          <div className="template-title">. {title}</div>
          {description.length > 0 && (
            <div className="template-description">
              {description.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}
        </div>
        <div className="template-footer">
          <span className="template-footer-text">
            {TALK_NAME} // {topicName} // {AUTHOR}
            {slideNumber !== null && (
              <>
                {' '}
                // {slideNumber}
                {total ? `/${total}` : ''}
              </>
            )}
          </span>
          <span className="template-logo">
            I<sup>a</sup>
          </span>
        </div>
      </div>
    </>
  );
}
