import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GIFT } from '../content/story'
import { Heart } from './art/creatures'
import { Particles } from './art/scenery'
import { startScroll, stopScroll } from '../lib/smoothScroll'

export function GiftReveal({ open, onClose }) {
  const root = useRef(null)
  const opener = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (open) {
      stopScroll()
      opener.current = document.activeElement
    } else {
      startScroll()
    }

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { pointerEvents: 'auto' })
        gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' })
        gsap.fromTo(
          el.querySelector('[data-card]'),
          { opacity: 0, y: 60, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 },
        )
        gsap.fromTo(
          el.querySelectorAll('[data-rise]'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: 0.3 },
        )
      } else {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power1.in',
          onComplete: () => gsap.set(el, { pointerEvents: 'none' }),
        })
      }
    }, el)

    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    if (!open) {
      const prev = opener.current
      if (prev && typeof prev.focus === 'function') prev.focus()
      return
    }
    const close = root.current?.querySelector('.gift__close')
    // the overlay is visibility:hidden until the fade starts, so wait a frame or two
    const focusTimer = window.setTimeout(() => close?.focus(), 80)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className="gift"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label={GIFT.title}
    >
      <Particles kind="heart" count={30} className="gift__particles" />
      <button type="button" className="gift__close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <article className="gift__card" data-card>
        <Heart className="gift__heart" />
        <p className="gift__kicker" data-rise>
          {GIFT.kicker}
        </p>
        <h2 className="gift__title" data-rise>
          {GIFT.title}
        </h2>
        <p className="gift__body" data-rise>
          {GIFT.body}
        </p>

        {GIFT.href ? (
          <a className="gift__cta" href={GIFT.href} target="_blank" rel="noreferrer" data-rise>
            {GIFT.ctaLabel}
          </a>
        ) : (
          <p className="gift__hint" data-rise>
            {GIFT.ctaLabel} — add the link in src/content/story.js
          </p>
        )}

        <p className="gift__sign" data-rise>
          {GIFT.signature}
        </p>
      </article>
    </div>
  )
}
