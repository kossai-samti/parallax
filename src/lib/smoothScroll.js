import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let instance = null

export function initSmoothScroll() {
  if (prefersReducedMotion() || instance) return () => {}

  instance = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1,
    touchMultiplier: 1.7,
    smoothWheel: true,
  })

  const onScroll = () => ScrollTrigger.update()
  const onTick = (time) => instance.raf(time * 1000)

  instance.on('scroll', onScroll)
  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(onTick)
    instance.off('scroll', onScroll)
    instance.destroy()
    instance = null
  }
}

export function scrollToEl(target) {
  if (!target) return
  if (instance) {
    instance.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 3) })
    return
  }
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function stopScroll() {
  if (instance) instance.stop()
}

export function startScroll() {
  if (instance) instance.start()
}
