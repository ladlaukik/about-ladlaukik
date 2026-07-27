import './title-slide.css';

export default function Slide() {
  return (
    <div className="title-slide">
      <div className="title-slide-left">
        <div className="title-brand">LTIADS</div>
      </div>
      <div className="title-slide-divider" />
      <div className="title-slide-right">
        <div className="title-meta">
          <div className="title-meta-row">
            <span className="title-meta-label">TITLE</span>
            <span className="title-meta-colon">:</span>
            <span className="title-meta-value">Process over Product</span>
          </div>
          <div className="title-meta-row">
            <span className="title-meta-label">LTIADS</span>
            <span className="title-meta-colon">:</span>
            <span className="title-meta-value">August 24, 2021</span>
          </div>
        </div>
        <div className="title-lockup">
          <span className="title-word title-word-process">Process</span>
          <svg
            className="title-diagonal"
            viewBox="0 0 100 70"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="4" y1="66" x2="96" y2="4" stroke="#33363a" strokeWidth="1.4" />
          </svg>
          <span className="title-word title-word-product">Product</span>
        </div>
        <div className="title-signature">
          <span className="title-signature-first">Laukik</span>{' '}
          <span className="title-signature-last">lad</span>
        </div>
      </div>
    </div>
  );
}
