import { CHAPTERS } from '../content/story'
import { Chapter } from '../components/Chapter'
import { StoryPanels } from '../components/StoryPanels'
import { Particles } from '../components/art/scenery'
import { ART } from '../lib/assets'
import { worldRefs } from '../lib/registry'

const CH2 = ART[2]

// Offsets are fractions of viewport height. The chapter trigger is `top
// bottom`, so the timeline is already ~20% along at scroll 0 - a fall that
// starts at 0 would begin half a screen off-screen and never be seen.
const vh = () => window.innerHeight
const vw = () => window.innerWidth

// Two speeds and two weights, deliberately unequal. Each pair has one heavy,
// opaque piece that barely drifts and one small, see-through piece that tears
// past it - if they all travelled the same distance in the same time the eye
// reads it as a single sheet of stickers sliding down. `delay` staggers when
// the real fall starts; `drift` bends the path sideways so nothing falls in a
// dead-straight line.
const FLOWS = [
  // big leaf - the slow anchor, almost hovering
  { sel: '.ch-leaf--big', inY: 0.12, outY: 0.4, r0: 22, r1: 66, delay: 0, drift: 0.02, ease: 'sine.inOut' },
  // small leaf - half transparent, three times the travel
  { sel: '.ch-leaf--small', inY: 0.3, outY: 1.35, r0: -40, r1: 250, delay: 0.16, drift: 0.07, ease: 'none' },
  // big segment - slow, barely turning
  { sel: '.ch-segment--big', inY: 0.08, outY: 0.36, r0: -16, r1: 32, delay: 0.1, drift: -0.02, ease: 'sine.inOut' },
  // small segment - transparent, spinning the other way
  { sel: '.ch-segment--small', inY: 0.35, outY: 1.5, r0: 30, r1: -230, delay: 0.26, drift: -0.06, ease: 'none' },
  // the whole fruit - heavy, slow, one long turn
  { sel: '.ch-mandarin', inY: 0.18, outY: 0.45, r0: 0, r1: 270, delay: 0.05, drift: -0.03, ease: 'sine.inOut' },
]

function build(tl, root) {
  // The stage is sticky and slides up a full viewport during the first slice
  // of the timeline, so anything inside it appears to *rise* on the way in.
  // Every floater therefore opens with a phase that travels exactly one vh
  // downward, which cancels that slide: on screen it holds still while the
  // scene enters. Only once the stage is pinned does the real fall begin.
  const pre = Math.min(0.4, vh() / root.offsetHeight)

  for (const f of FLOWS) {
    const el = root.querySelector(f.sel)
    if (!el) continue

    // Park each piece 70px clear of its own frame for the whole entry phase.
    // offsetTop/offsetHeight are measured inside .ch-floaters (inset: 0 over
    // the stage), so parking at -(top + height + 70) keeps the element above
    // the stage's document box entirely; -(top + height + 70) -> minus one
    // more viewport is exactly the downward travel that cancels the stage
    // slide. Without that it is drawn over the previous chapter's text for the
    // few hundred pixels where the two sticky stages overlap during the
    // handover, and it pokes through the stage's bottom edge as it rises.
    //
    // GSAP owns the transform outright - no CSS keyframes here, or they would
    // overwrite `y` mid-fall.
    const park = () => -(el.offsetTop + el.offsetHeight + 70)
    tl.fromTo(
      el,
      { y: () => park() - vh(), rotation: f.r0, x: 0 },
      {
        y: () => park(),
        rotation: f.r0 + (f.r1 - f.r0) * 0.3,
        x: 0,
        duration: pre,
        ease: 'none',
      },
      0,
    )

    // the real fall, staggered per piece by f.delay
    const start = pre + f.delay
    tl.to(
      el,
      {
        y: () => vh() * f.outY,
        rotation: f.r1,
        x: () => vw() * f.drift,
        duration: 1 - start,
        ease: f.ease,
      },
      start,
    )
  }

  // One finite turn in one direction. The shared celestial artwork is swapped
  // per chapter, so only animate it while this chapter's scrub is active.
  const body = worldRefs.root?.querySelector('[data-cel-body]')
  if (body) {
    const span = 1 - pre
    tl.fromTo(body, { rotation: 0 }, { rotation: 270, duration: span, ease: 'none' }, pre)
  }
}

export function Falling() {
  return (
    <Chapter
      chapter={CHAPTERS[1]}
      className="chapter--mandarin"
      timeline={build}
      panels={<StoryPanels id="falling" />}
    >
      <div className="ch-floaters" aria-hidden="true">
        <img className="ch-float ch-leaf ch-leaf--big" src={CH2.leaf} alt="" />
        <img className="ch-float ch-leaf ch-leaf--small" src={CH2.leaf} alt="" />
        <img className="ch-float ch-segment ch-segment--big" src={CH2.segment} alt="" />
        <img className="ch-float ch-segment ch-segment--small" src={CH2.segment} alt="" />
        <img className="ch-float ch-mandarin" src={CH2.mandarin} alt="" />
      </div>
      <Particles kind="petal" count={18} className="ch-petals" />
    </Chapter>
  )
}
