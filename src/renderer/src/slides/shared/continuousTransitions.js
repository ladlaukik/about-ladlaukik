// Slide pairs whose content is deliberately near-identical — slide-02's
// scroll settling into slide-03's highlighted boxes, slide-03's boxes
// filling in on slide-04, slide-04's fill migrating on slide-05. Deck.jsx
// skips its fade-to-black between these so only what's actually new
// animates in, instead of the whole slide flashing out and back.
const CONTINUOUS_PAIRS = [
  ['slide-02', 'slide-03'],
  ['slide-03', 'slide-04'],
  ['slide-04', 'slide-05'],
];

export function isContinuousTransition(fromName, toName) {
  return CONTINUOUS_PAIRS.some(
    ([a, b]) => (fromName === a && toName === b) || (fromName === b && toName === a),
  );
}
