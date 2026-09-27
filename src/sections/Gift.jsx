import { CHAPTERS, GIFT, STORY } from '../content/story'
import { Chapter, Panel } from '../components/Chapter'
import { animatePanels } from '../lib/panels'
import { Bat, Mandarin, Frog, Cat, Heart } from '../components/art/creatures'
import { Particles } from '../components/art/scenery'

function build(tl, root) {
  const cameos = root.querySelectorAll('.ch-recap')
  cameos.forEach((el, i) => {
    tl.fromTo(
      el,
      { opacity: 0, scale: 0.4, yPercent: 60 },
      { opacity: 1, scale: 1, yPercent: 0, duration: 0.1, ease: 'back.out(1.8)', immediateRender: false },
      0.06 + i * 0.11,
    )
    tl.to(el, { opacity: 0, scale: 1.25, yPercent: -30, duration: 0.14, ease: 'power1.in' }, 0.2 + i * 0.11)
  })

  const glow = root.querySelector('.ch-finalglow')
  if (glow) tl.fromTo(glow, { opacity: 0.2, scale: 0.75 }, { opacity: 0.75, scale: 1.3, duration: 1 }, 0)

  animatePanels(tl, root.querySelectorAll('[data-panel]'))
}

export function Gift({ onOpen }) {
  const lines = STORY.gift

  return (
    <Chapter chapter={CHAPTERS[6]} className="chapter--rose" timeline={build}>
      <div className="ch-finalglow" aria-hidden="true" />
      <Particles kind="heart" count={22} className="ch-petals-heart" />
      <Particles kind="petal" count={26} className="ch-petals" />

      <div className="ch-recap" aria-hidden="true">
        <Bat className="ch-recap__item ch-recap__item--bat" />
        <Mandarin className="ch-recap__item ch-recap__item--mandarin" />
        <Frog className="ch-recap__item ch-recap__item--frog" />
        <Cat className="ch-recap__item ch-recap__item--cat" tone="white" />
      </div>

      <div className="chapter__panels">
        {lines.map((block, i) => (
          <Panel key={i} className="panel--center panel--final">
            <h2 className="panel__line" data-reveal>
              {block.lines[0]}
            </h2>
          </Panel>
        ))}

        <Panel className="panel--center panel--gift">
          <div data-reveal>
            <Heart className="panel__heart" />
            <p className="panel__kicker">{GIFT.kicker}</p>
            <button type="button" className="giftbtn" onClick={onOpen}>
              <span>{GIFT.ctaLabel}</span>
            </button>
            <p className="panel__fine">scroll back up any time — it will still be here</p>
          </div>
        </Panel>
      </div>
    </Chapter>
  )
}
