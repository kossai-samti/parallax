import { Children, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { useScrub } from '../lib/useScrub'
import { registerSection } from '../lib/registry'
import { animatePanels } from '../lib/panels'

const REVEAL_IN = { opacity: 0, yPercent: 60, clipPath: 'inset(0 0 100% 0)' }
const REVEAL_OUT = { opacity: 1, yPercent: 0, clipPath: 'inset(0 0 -12% 0)' }

export function Chapter({
  chapter,
  timeline,
  children,
  panels = [],
  customPanels = false,
  panelOptions,
  intro = false,
  className = '',
  scrollEnd = 'bottom bottom',
}) {
  const ref = useScrub((tl, root) => {
    const veil = root.querySelector('[data-veil]')
    if (veil) {
      tl.fromTo(
        veil,
        { opacity: 0, scale: 0.45 },
        { opacity: 0.9, scale: 1.1, duration: 0.05, ease: 'power1.in', immediateRender: false },
        0,
      )
      tl.to(veil, { opacity: 0, scale: 1.7, duration: 0.11, ease: 'power2.out' }, 0.05)
    }

    const head = root.querySelector('[data-chapter-head]')
    if (head) {
      if (intro) gsap.set(head, { opacity: 1, y: 0 })
      else {
        tl.fromTo(
          head,
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out', immediateRender: false },
          0,
        )
      }
      tl.to(head, { opacity: 0, y: -50, duration: 0.04, ease: 'power1.in' }, 0.2)
    }

    if (!customPanels) {
      animatePanels(tl, root.querySelectorAll('[data-panel]'), {
        staticFirst: intro,
        ...panelOptions,
      })
    }

    if (timeline) timeline(tl, root)

    tl.set({ _pad: 0 }, { _pad: 1, duration: 0 }, 1)
  }, scrollEnd)

  useLayoutEffect(() => {
    if (!intro) return
    const root = ref.current
    if (!root) return
    const bits = [...root.querySelectorAll('[data-panel]:first-child [data-reveal]')]
    const tween = gsap.fromTo(bits, REVEAL_IN, {
      ...REVEAL_OUT,
      duration: 1.15,
      stagger: 0.16,
      delay: 0.45,
      ease: 'power3.out',
    })
    return () => tween.kill()
  }, [intro, ref])

  return (
    <section
      className={`chapter ${className}`}
      ref={(el) => {
        ref.current = el
        registerSection(chapter.id, el)
      }}
      id={chapter.id}
      data-chapter={chapter.num}
      style={{ '--units': chapter.units }}
      aria-label={chapter.label}
    >
      <div className="chapter__stage">
        <div className="chapter__haze" aria-hidden="true" />
        <div className="chapter__veil" data-veil aria-hidden="true" />
        <header className="chapter__head" data-chapter-head>
          <span className="chapter__num">{chapter.num}</span>
          <span className="chapter__rule" />
          <span className="chapter__label">{chapter.label}</span>
        </header>
        {children}
        {Children.count(panels) > 0 ? <div className="chapter__panels">{panels}</div> : null}
      </div>
    </section>
  )
}

export function Panel({ kicker, children, className = '' }) {
  return (
    <div className={`panel ${className}`} data-panel>
      {kicker ? (
        <p className="panel__kicker" data-reveal>
          {kicker}
        </p>
      ) : null}
      <div data-reveal>{children}</div>
    </div>
  )
}
