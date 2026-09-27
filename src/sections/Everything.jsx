import { CHAPTERS } from '../content/story'
import { Chapter } from '../components/Chapter'
import { StoryPanels } from '../components/StoryPanels'
import { ART } from '../lib/assets'

const CH6 = ART[6]

function build(tl, root) {
  const leftHand  = root.querySelector('.ch-touch-hand--left')
  const rightHand = root.querySelector('.ch-touch-hand--right')
  const moon      = root.querySelector('.ch-love-moon')
  const hill      = root.querySelector('.ch-love-hill')
  const angel     = root.querySelector('.ch-love-angel-wrap')
  const entry     = root.querySelector('.ch-love-entry')

  // ── Parallax entry veil ──────────────────────────────────────────────────
  // A soft overlay fades out from the cats chapter palette into this scene,
  // giving a smooth parallax crossfade instead of a hard cut.
  if (entry) {
    tl.fromTo(entry, { opacity: 1 }, { opacity: 0, duration: 0.18, ease: 'power2.out', immediateRender: false }, 0)
  }

  // ── Hill — slides in then drifts down slowly ─────────────────────────────
  // Hill moves at a slightly lazier pace than the angel so the two feel like
  // separate physical layers rather than one rigid object.
  tl.fromTo(hill,
    { y: () => window.innerHeight * 0.28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.20, ease: 'power2.out', immediateRender: false }, 0)
  tl.to(hill, { y: () => window.innerHeight * 0.06, duration: 0.80, ease: 'sine.in' }, 0.20)

  // ── Angel / statue — enters faster, descends at a slightly quicker rate ──
  // The different speed from the hill is intentional — the slight drift
  // desync makes the scene feel alive rather than one flat card sliding down.
  tl.fromTo(angel,
    { y: () => window.innerHeight * 0.22, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.22, ease: 'power3.out', immediateRender: false }, 0.04)
  tl.to(angel, { y: () => window.innerHeight * 0.10, duration: 0.74, ease: 'sine.inOut' }, 0.26)

  // ── Moon — enters from below, then drifts gently upward ─────────────────
  // Keep the rise modest so it doesn't leave the frame mid-scroll.
  tl.fromTo(moon,
    { y: 44, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.16, ease: 'power2.out', immediateRender: false }, 0.08)
  tl.to(moon, { y: -48, duration: 0.76, ease: 'none' }, 0.24)

  // ── Left hand — drifts in from upper-left, moves up a touch and shrinks ──
  // The slight upward crawl and scale-down make it feel like it's reaching
  // across a distance rather than sliding on a rail.
  tl.fromTo(leftHand,
    { x: () => -window.innerWidth * 0.11, y: () => -window.innerHeight * 0.06, scale: 1.06, opacity: 0 },
    { x: 0, y: () => -window.innerHeight * 0.03, scale: 0.94, opacity: 0.88,
      duration: 0.74, ease: 'power1.inOut', immediateRender: false }, 0.22)

  // ── Right hand — sweeps in from the right, reaching toward centre ────────
  tl.fromTo(rightHand,
    { x: () => window.innerWidth * 0.10, y: () => window.innerHeight * 0.10, opacity: 0 },
    { x: 0, y: 0, opacity: 0.90, duration: 0.74, ease: 'power1.inOut', immediateRender: false }, 0.22)

  // ── Exit — fires only at the very end, right as ch7 takes over ──────────
  // Left hand lifts off first and fastest.
  tl.to(leftHand,
    { y: () => -window.innerHeight * 0.90, opacity: 0, duration: 0.10, ease: 'power2.in', immediateRender: false }, 0.88)

  // Moon exits a beat later — feels like a natural continuation of the upward
  // drift it has been doing all chapter.
  tl.to(moon,
    { y: () => -window.innerHeight * 1.1, opacity: 0, duration: 0.12, ease: 'power1.in', immediateRender: false }, 0.90)

  // Right hand lingers the longest — clearly desynced from the left.
  tl.to(rightHand,
    { y: () => -window.innerHeight * 0.75, opacity: 0, duration: 0.14, ease: 'power2.in', immediateRender: false }, 0.93)
}

export function Everything() {
  return (
    <Chapter
      chapter={CHAPTERS[5]}
      className="chapter--love"
      timeline={build}
      panels={<StoryPanels id="love" className="panel--center" />}
    >
      {/* Parallax entry overlay — fades out at the start of the scene */}
      <div className="ch-love-entry" aria-hidden="true" />

      {/* Hill and angel are siblings so GSAP can drive them at different speeds */}
      <img className="ch-love-hill" src={CH6.hill} alt="" aria-hidden="true" />
      <div className="ch-love-angel-wrap" aria-hidden="true">
        <img className="ch-love-angel" src={CH6.angel} alt="" />
      </div>

      <img className="ch-love-moon" src={CH6.moon} alt="" aria-hidden="true" />
      <img className="ch-touch-hand ch-touch-hand--left" src={CH6.leftHand} alt="" aria-hidden="true" />
      <img className="ch-touch-hand ch-touch-hand--right" src={CH6.rightHand} alt="" aria-hidden="true" />
    </Chapter>
  )
}
