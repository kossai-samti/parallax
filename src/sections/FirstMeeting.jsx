import { CHAPTERS } from '../content/story'
import { Chapter } from '../components/Chapter'
import { StoryPanels } from '../components/StoryPanels'
import { worldRefs } from '../lib/registry'
import { ART } from '../lib/assets'

function build(tl, root) {
  const bat = root.querySelector('.ch-bat')
  if (bat) {
    // Three beats on a 0..1 timeline. The trigger is `top bottom`, so it runs
    // a viewport-height early and the playhead is already ~0.17 at scroll 0 -
    // the bat has to be settled at the bottom of frame by then, which is why
    // the fade-in is over by 0.14.
    //
    // Animate `y` in px, never `yPercent`: GSAP would overwrite the
    // translate(-50%,-50%) that centres the element on its left/top anchor.
    const vh = () => window.innerHeight
    tl.fromTo(
      bat,
      { y: 0, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.14, ease: 'power2.out', immediateRender: false },
      0,
    )
    // a long, slow climb through the scene - a sixth of a viewport at most
    tl.to(bat, { y: () => -vh() * 0.16, duration: 0.66, ease: 'sine.inOut' }, 0.14)
    // then, as the scene leaves, up and out of frame
    tl.to(bat, { y: () => -vh() * 1.35, duration: 0.2, ease: 'power2.in' }, 0.8)
  }

  const orb = worldRefs.root?.querySelector('[data-celestial]')
  if (orb) {
    const drop = { v: 0 }
    tl.to(
      drop,
      {
        v: 90,
        duration: 1,
        onUpdate: () => orb.style.setProperty('--cel-drop', `${drop.v}px`),
      },
      0,
    )
  }
}

export function FirstMeeting() {
  return (
    <Chapter
      chapter={CHAPTERS[0]}
      className="chapter--bats"
      timeline={build}
      intro
      panels={<StoryPanels id="first-meeting" />}
    >
      <img className="ch-bat" src={ART[1].batHero} alt="" aria-hidden="true" />
    </Chapter>
  )
}
