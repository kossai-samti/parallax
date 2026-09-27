import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHAPTERS } from '../content/story'
import { worldRefs } from './registry'
import { wallFor, bodyFor } from './assets'

gsap.registerPlugin(ScrollTrigger)

const COLOR_KEYS = [
  'skyTop',
  'skyMid',
  'skyLow',
  'text',
  'accent',
  'glow',
  'celHi',
  'celCore',
  'celEdge',
]

const LAYERS = {
  rays: [0, 0, 1, 0, 0, 0, 0],
  ring: [0, 0, 0, 1, 0, 0.25, 0],
  bloom: [0.18, 0.24, 0.28, 0.34, 0.5, 0.3, 0.5],
  stars: [1, 0.22, 0.18, 0.32, 0, 0.55, 0],
  clouds: [0.6, 0.5, 0.45, 0.22, 0.75, 0.35, 0.18],
  fog: [0.95, 0.35, 0.2, 0.28, 0.5, 0.3, 0.22],
  bats: [1, 0, 0, 0, 0, 0, 0],
  dust: [0.18, 0.45, 0.4, 0.3, 0.6, 0.5, 0.85],
}

const CEL_SCALE = [0.66, 0.95, 1.2, 0.5, 0.66, 0.56, 0.8]
// ch2's body is a setting sun, so it sits low and right rather than up where
// the ch1 moon hangs - that also keeps it clear of the raised story text
const CEL_X = [70, 72, 50, 50, 50, 20, 50]
const CEL_Y = [23, 70, 50, 32, 38, 26, 34]

function pickColors(palette) {
  const out = {}
  for (const key of COLOR_KEYS) out[key] = palette[key]
  return out
}

export function buildWorldTimeline(sections) {
  const root = worldRefs.root
  const max = document.documentElement.scrollHeight - window.innerHeight
  if (!root || sections.length < 2 || max <= 0) return null

  const state = pickColors(CHAPTERS[0].palette)

  const write = () => {
    const s = document.documentElement.style
    s.setProperty('--sky-top', state.skyTop)
    s.setProperty('--sky-mid', state.skyMid)
    s.setProperty('--sky-low', state.skyLow)
    s.setProperty('--story-text', state.text)
    s.setProperty('--story-accent', state.accent)
    s.setProperty('--world-glow', state.glow)
    s.setProperty('--cel-hi', state.celHi)
    s.setProperty('--cel-core', state.celCore)
    s.setProperty('--cel-edge', state.celEdge)
  }
  write()

  const node = (name) => root.querySelector(`[data-layer="${name}"]`)
  const layerEls = Object.fromEntries(
    Object.keys(LAYERS).map((key) => [key, node(key)]).filter(([, el]) => el),
  )
  for (const [key, el] of Object.entries(layerEls)) {
    gsap.set(el, { opacity: LAYERS[key][0] })
  }
  const cel = root.querySelector('[data-celestial]')
  const halo = root.querySelector('[data-layer="halo"]')

  const place = { x: CEL_X[0], y: CEL_Y[0], scale: CEL_SCALE[0] }
  const placeHalo = { x: CEL_X[0], y: CEL_Y[0], scale: CEL_SCALE[0] * 1.6 }

  const writePlace = () => {
    if (cel) {
      cel.style.setProperty('--cel-x', `${place.x}%`)
      cel.style.setProperty('--cel-y', `${place.y}%`)
      cel.style.setProperty('--cel-scale', String(place.scale))
    }
    if (halo) {
      halo.style.setProperty('--cel-x', `${placeHalo.x}%`)
      halo.style.setProperty('--cel-y', `${placeHalo.y}%`)
      halo.style.setProperty('--cel-scale', String(placeHalo.scale))
    }
  }
  writePlace()

  const placeTo = (i) => ({
    x: CEL_X[i],
    y: CEL_Y[i],
    scale: CEL_SCALE[i],
  })
  const placeHaloTo = (i) => ({
    x: CEL_X[i],
    y: CEL_Y[i],
    scale: CEL_SCALE[i] * 1.6,
  })

  const offsets = sections.map((el) => el.getBoundingClientRect().top + window.scrollY)
  const vh = window.innerHeight

  // The single wallpaper and single round body are swapped by src, derived
  // from scroll progress rather than from tween callbacks. That makes it
  // direction-agnostic (scrolling back up restores chapter 1) and
  // self-correcting: if a hot reload ever leaves the timeline out of sync with
  // the DOM, the very next scroll tick rewrites both srcs to match the scroll
  // position instead of leaving a stale image on screen.
  const wallImg = root.querySelector('[data-cel-wall]')
  const bodyImg = root.querySelector('[data-cel-body]')
  const lotusImg = root.querySelector('[data-cel-lotus]')
  if (lotusImg) gsap.set(lotusImg, { opacity: 0, y: 30, scale: 0.9, rotation: 0 })
  // Crossfade the world during the approach to the next chapter so its palette
  // and art have arrived by the time the new scene takes over.
  const bounds = offsets.slice(1)
  const starts = bounds.map((top) => Math.max(0, top - vh * 0.95) / max)
  const cutovers = bounds.map((top) => Math.max(0, top - vh * 0.475) / max)
  const ends = bounds.map((top) => top / max)
  let shownChapter = -1

  const syncArt = (progress) => {
    let idx = 0
    for (let i = 0; i < cutovers.length; i += 1) {
      if (progress >= cutovers[i]) idx = i + 1
    }
    if (idx === shownChapter) return
    shownChapter = idx
    root.dataset.chapter = String(idx + 1)
    // idx is the 0-based section index, so the chapter number is idx + 1
    const wall = wallFor(idx + 1)
    // Keep the lotus in its own image layer so it can crossfade with the
    // mandarin instead of replacing it in one shared slot.
    const body = idx + 1 === 3 ? null : bodyFor(idx + 1)
    // Keep a previous src loaded while hidden when a chapter has no art. Its
    // palette gradient then becomes the scene background without reusing ch1.
    if (wallImg && wall && wall !== wallImg.getAttribute('src')) wallImg.src = wall
    if (bodyImg && body && body !== bodyImg.getAttribute('src')) {
      bodyImg.src = body
      // Each chapter gets an upright central illustration, independent of the
      // previous chapter's scrubbed rotation.
      gsap.set(bodyImg, { x: 0, y: 0, rotation: 0, scale: 1 })
    }
  }

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: document.documentElement,
      start: 0,
      end: 'max',
      scrub: 0.4,
      invalidateOnRefresh: true,
      // Swap the art here rather than from a tween's onUpdate: tween callbacks
      // only fire while that tween is the active one, and the boundary tweens
      // have gaps between them. This fires on every scroll tick, and reading
      // progress off the trigger makes it work in both scroll directions.
      onUpdate: (self) => syncArt(self.progress),
    },
  })

  // Pin the timeline duration to exactly 1 so every position below is a plain
  // fraction of total scroll. Without this, ScrollTrigger would stretch the
  // timeline's own (content-derived) duration across the whole page.
  tl.set({ _span: 0 }, { _span: 1, duration: 0 }, 1)

  for (let i = 0; i < sections.length - 1; i += 1) {
    const boundary = offsets[i + 1]
    const from = Math.max(0, boundary - vh * 0.95)
    const at = from / max
    const dur = Math.max(0.001, (boundary - from) / max)

    if (lotusImg && i === 1) {
      tl.fromTo(
        lotusImg,
        { opacity: 0, y: 30, scale: 0.9, rotation: 0 },
        { opacity: 1, y: 0, scale: 1, rotation: 0, duration: dur, ease: 'sine.inOut', immediateRender: false },
        at,
      )
    }
    if (lotusImg && i === 2) {
      tl.to(lotusImg, { opacity: 0, duration: dur, immediateRender: false }, at)
    }

    // Chapter one's moon drop is local to that scene. Ease it back to neutral
    // during its existing handoff so later chapter artwork starts centered.
    if (i === 0 && cel) {
      const drop = { value: 90 }
      tl.fromTo(
        drop,
        { value: 90 },
        {
          value: 0,
          duration: dur,
          immediateRender: false,
          onUpdate: () => cel.style.setProperty('--cel-drop', `${drop.value}px`),
        },
        at,
      )
    }

    tl.to(
      state,
      { ...pickColors(CHAPTERS[i + 1].palette), duration: dur, immediateRender: false, onUpdate: write },
      at,
    )

    for (const [key, el] of Object.entries(layerEls)) {
      tl.to(el, { opacity: LAYERS[key][i + 1], duration: dur, immediateRender: false }, at)
    }

    if (cel || halo) {
      tl.to(place, { ...placeTo(i + 1), duration: dur, immediateRender: false, onUpdate: writePlace }, at)
      tl.to(
        placeHalo,
        { ...placeHaloTo(i + 1), duration: dur, immediateRender: false, onUpdate: writePlace },
        at,
      )
    }
  }

  syncArt(0)

  // With only one wallpaper and one round body in the DOM a chapter change is a
  // src swap, which would pop. Fade the outgoing art out over the first half of
  // the palette crossfade and the incoming art back in over the second half,
  // so the swap instant (syncArt at the cutover) happens at exactly zero
  // opacity. If these tweens are ever lost the art is still correct and you
  // only get a pop, never the wrong picture.
  if (wallImg || bodyImg) {
    for (let i = 0; i < cutovers.length; i += 1) {
      const out = cutovers[i] - starts[i]
      const back = ends[i] - cutovers[i]
      if (out <= 0 || back <= 0) continue
      const nextArt = [wallFor(i + 2), i + 2 === 3 ? null : bodyFor(i + 2)]
      for (const [j, el] of [wallImg, bodyImg].entries()) {
        if (!el) continue
        tl.to(el, { opacity: 0, duration: out, immediateRender: false }, starts[i])
        if (nextArt[j]) {
          tl.to(el, { opacity: 1, duration: back, immediateRender: false }, cutovers[i])
        }
      }
    }
  }

  // The slice's rotation belongs to the chapter that owns it: Falling.jsx
  // turns the body on the same timeline as its falling pieces, over one
  // revolution that ends before the handover. Rotating here would drag the
  // slice through chapter 3's approach as well.

  return tl
}

export function destroyWorldTimeline(tl) {
  if (tl) {
    tl.scrollTrigger?.kill()
    tl.kill()
  }
  ScrollTrigger.refresh()
}
