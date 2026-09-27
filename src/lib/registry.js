const store = new Map()

export function registerSection(id, el) {
  if (el) store.set(id, el)
  else store.delete(id)
}

export function sectionOrder(ids) {
  return ids.map((id) => store.get(id)).filter(Boolean)
}

export const worldRefs = {
  root: null,
  celestial: null,
  halo: null,
  craters: null,
  rays: null,
  ring: null,
  bloom: null,
  stars: null,
  clouds: null,
  fog: null,
  bats: null,
  dust: null,
}

export function registerWorld(key, el) {
  worldRefs[key] = el
}
