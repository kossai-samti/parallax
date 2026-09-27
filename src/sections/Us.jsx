import { CHAPTERS, MEMORIES } from '../content/story'
import { Chapter, Panel } from '../components/Chapter'
import { Cat } from '../components/art/creatures'
import { Particles } from '../components/art/scenery'
import { animatePanels } from '../lib/panels'

function build(tl, root) {
  root.querySelectorAll('.ch-cat').forEach((cat, i) => {
    tl.fromTo(
      cat,
      { xPercent: i % 2 === 0 ? -18 : 18, yPercent: 10 },
      { xPercent: 0, yPercent: 0, duration: 0.26, ease: 'power2.out' },
      i * 0.05,
    )
  })

  const glow = root.querySelector('.ch-softglow')
  if (glow) tl.fromTo(glow, { opacity: 0.15, scale: 0.8 }, { opacity: 0.55, scale: 1.15, duration: 1 }, 0)

  animatePanels(tl, [...root.querySelectorAll('[data-panel]'), ...root.querySelectorAll('.memory')], {
    inner: true,
    each: (t, el, i, at, seg) => {
      if (!el.classList.contains('memory')) return
      const tilt = i % 2 === 0 ? -1.1 : 1.1
      t.fromTo(el, { rotate: tilt * 2.4 }, { rotate: tilt, duration: seg * 0.3, ease: 'power2.out', immediateRender: false }, at)
    },
  })
}

function Memory({ item, index }) {
  return (
    <figure className="memory">
      <div className="memory__frame">
        {item.src ? (
          <img src={item.src} alt={item.caption} loading="lazy" />
        ) : (
          <div className="memory__empty">
            <span className="memory__slot">photo {String(index + 1).padStart(2, '0')}</span>
            <span className="memory__note">{item.note}</span>
          </div>
        )}
      </div>
      <figcaption className="memory__caption">{item.caption}</figcaption>
    </figure>
  )
}

export function Us() {
  return (
    <Chapter
      chapter={CHAPTERS[4]}
      className="chapter--cats"
      timeline={build}
      customPanels
      panels={[
        <Panel key="intro" className="panel--center">
          <h2 className="panel__line" data-reveal>
            'Lorem ipsum dolor sit amet.'
          </h2>
          <p className="panel__body" data-reveal>
            'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          </p>
        </Panel>,
        ...MEMORIES.map((item, i) => <Memory item={item} index={i} key={item.caption} />),
      ]}
    >
      <div className="ch-softglow" aria-hidden="true" />
      <Particles kind="dust" count={40} className="ch-motes" />
      <div className="ch-cats" aria-hidden="true">
        <Cat className="ch-cat ch-cat--white" tone="white" />
        <Cat className="ch-cat ch-cat--grey" tone="grey" />
      </div>
    </Chapter>
  )
}
