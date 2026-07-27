export function GridIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {[0, 6, 12].flatMap((x) =>
        [0, 6, 12].map((y) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="1" fill="currentColor" />
        )),
      )}
    </svg>
  );
}

export function PlayIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 1.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

export function HomeIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 7.5L8 2l6 5.5M3.5 6.3V14h9V6.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExpandIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CompressIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 1v4H1M11 1v4h4M15 11h-4v4M1 11h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <line x1="8" y1="0.5" x2="8" y2="2.3" />
        <line x1="8" y1="13.7" x2="8" y2="15.5" />
        <line x1="0.5" y1="8" x2="2.3" y2="8" />
        <line x1="13.7" y1="8" x2="15.5" y2="8" />
        <line x1="2.6" y1="2.6" x2="3.9" y2="3.9" />
        <line x1="12.1" y1="12.1" x2="13.4" y2="13.4" />
        <line x1="2.6" y1="13.4" x2="3.9" y2="12.1" />
        <line x1="12.1" y1="3.9" x2="13.4" y2="2.6" />
      </g>
    </svg>
  );
}

export function MoonIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.5 9.5A6 6 0 116.5 2.5a5 5 0 007 7z" fill="currentColor" />
    </svg>
  );
}
