import { CHAPTERS, OLD_SITE } from '../content/story'
import { Chapter } from '../components/Chapter'
import { StoryPanels } from '../components/StoryPanels'
import { Heart } from '../components/art/creatures'
import { MonsterCan } from '../components/MonsterCan'
import { Particles } from '../components/art/scenery'
import { ART } from '../lib/assets'

function build(tl, root) {
  const win = root.querySelector('.browser')
  const loader = root.querySelector('.browser__loader')
  const line = root.querySelector('.site__url span')
  const lines = root.querySelectorAll('.site__line')
  const ask = root.querySelector('.site__ask')
  const yes = root.querySelector('.site__yes')
  const no = root.querySelector('.site__no')
  const burst = root.querySelector('.ch-burst')
  tl.fromTo(win, { opacity: 0, scale: 0.86, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.1, ease: 'power2.out', immediateRender: false }, 0.04)
  tl.fromTo(line, { xPercent: -100 }, { xPercent: 0, duration: 0.08, ease: 'none', immediateRender: false }, 0.14)
  tl.to(loader, { opacity: 0, duration: 0.05 }, 0.26)
  tl.to(loader, { scale: 0.6, duration: 0.05 }, 0.26)

  lines.forEach((el, i) => {
    tl.fromTo(
      el,
      { opacity: 0, yPercent: 80, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, yPercent: 0, clipPath: 'inset(0 0 -20% 0)', duration: 0.05, ease: 'power2.out', immediateRender: false },
      0.32 + i * 0.05,
    )
  })

  tl.fromTo(ask, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.06, ease: 'back.out(1.8)', immediateRender: false }, 0.5)
  tl.to(no, { xPercent: -160, rotate: -22, opacity: 0, duration: 0.05 }, 0.62)
  tl.to(yes, { scale: 1.12, duration: 0.05, ease: 'power1.out' }, 0.62)
  tl.to(yes, { scale: 1, duration: 0.04 }, 0.68)

  tl.fromTo(burst, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1.4, duration: 0.06 }, 0.62)
  tl.to(burst, { opacity: 0, scale: 2, duration: 0.12 }, 0.68)

  tl.to(win, { opacity: 0, scale: 0.92, y: -50, duration: 0.08 }, 0.78)

}

export function Website() {
  return (
    <Chapter
      chapter={CHAPTERS[3]}
      className="chapter--monster"
      timeline={build}
      panels={<StoryPanels id="website" />}
    >
      <MonsterCan />
      <Particles kind="spark" count={20} className="ch-neon" />

      <div className="ch-browser">
        <div className="browser" aria-label={`A recreation of ${OLD_SITE.url}`}>
          <div className="browser__bar">
            <span className="browser__dot" />
            <span className="browser__dot" />
            <span className="browser__dot" />
            <div className="site__url">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
              </svg>
              <span>{OLD_SITE.url}</span>
            </div>
          </div>
          <div className="browser__body">
            <div className="browser__loader" aria-hidden="true">
              <i />
            </div>
            <div className="site">
              <p className="site__line">{OLD_SITE.lines[0]}</p>
              <p className="site__line">{OLD_SITE.lines[1]}</p>
              <p className="site__line">{OLD_SITE.lines[2]}</p>
              <div className="site__ask">
                <Heart className="site__heart" />
                <p className="site__question">{OLD_SITE.question}</p>
                <div className="site__buttons">
                  <span className="site__yes">{OLD_SITE.cta}</span>
                  <span className="site__no">{OLD_SITE.alt}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ch-burst" aria-hidden="true" />
        </div>
      </div>
    </Chapter>
  )
}
