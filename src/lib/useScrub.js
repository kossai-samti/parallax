import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './smoothScroll'

gsap.registerPlugin(ScrollTrigger)

export function useScrub(build, end = 'bottom bottom') {
  const ref = useRef(null)
  const latest = useRef(build)

  useLayoutEffect(() => {
    latest.current = build
  })

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    // With reduced motion we never build the scrubbed timelines at all. The
    // `.is-reduced` stylesheet lays the story out as a plain document, so there
    // is nothing for the timeline to drive and nothing to fight with it.
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end,
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      })
      latest.current(tl, root)
    }, root)

    return () => ctx.revert()
  }, [end])

  return ref
}
