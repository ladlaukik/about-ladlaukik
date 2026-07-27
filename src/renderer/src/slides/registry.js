import { manifest } from './manifest.js';

const slideModules = import.meta.glob('./**/Slide.jsx', { eager: true });

export { manifest };

export function getSlideComponent(name) {
  const entry = Object.entries(slideModules).find(([path]) => path.includes(`/${name}/`));
  return entry ? entry[1].default : null;
}
