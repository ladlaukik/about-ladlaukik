export function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {[0, 6, 12].flatMap((x) =>
        [0, 6, 12].map((y) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="1" fill="currentColor" />
        )),
      )}
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 1.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

export function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

export function CompressIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
