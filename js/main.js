import { manifest } from "../slides/manifest.js";

const FADE_MS = 350;

const contentEl = document.getElementById("slide-content");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentIndex = 0;

async function loadSlide(index, { animate = true } = {}) {
  const name = manifest[index];
  const response = await fetch(`slides/${name}/slide.html`);
  const html = await response.text();

  if (animate) {
    contentEl.classList.add("fade-out");
    await wait(FADE_MS);
  }

  contentEl.innerHTML = html;
  updateButtons(index);

  if (animate) {
    contentEl.classList.remove("fade-out");
  }
}

function updateButtons(index) {
  prevButton.disabled = index === 0;
  nextButton.disabled = index === manifest.length - 1;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

prevButton.addEventListener("click", () => {
  if (currentIndex === 0) return;
  currentIndex -= 1;
  loadSlide(currentIndex);
});

nextButton.addEventListener("click", () => {
  if (currentIndex === manifest.length - 1) return;
  currentIndex += 1;
  loadSlide(currentIndex);
});

loadSlide(currentIndex, { animate: false });
