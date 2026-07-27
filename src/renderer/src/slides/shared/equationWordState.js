// Lets slide-03 resume the CONTEXT/PROGRAM word-scrolls wherever slide-02
// last left them, without the two slide folders otherwise depending on
// each other.
let lastIndices = { context: 0, program: 0 };

export function getLastWordIndex(key) {
  return lastIndices[key] ?? 0;
}

export function setLastWordIndex(key, index) {
  lastIndices = { ...lastIndices, [key]: index };
}
