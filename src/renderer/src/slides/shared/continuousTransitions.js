// Slide pairs whose content is deliberately near-identical (e.g. slide-02's
// scroll settling into slide-03's highlighted version of the same equation).
// Deck.jsx skips its fade-to-black between these so only what's actually new
// animates in, instead of the whole slide flashing out and back.
const CONTINUOUS_PAIRS = [['slide-02', 'slide-03']];

export function isContinuousTransition(fromName, toName) {
  return CONTINUOUS_PAIRS.some(
    ([a, b]) => (fromName === a && toName === b) || (fromName === b && toName === a),
  );
}
