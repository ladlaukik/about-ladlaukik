// Lets slide-03 resume the word-scroll wherever slide-02 last left it,
// without the two slide folders otherwise depending on each other.
let lastWordIndex = 0;

export function getLastWordIndex() {
  return lastWordIndex;
}

export function setLastWordIndex(index) {
  lastWordIndex = index;
}
