import { gsap } from 'gsap'

export function animatePanels(tl, els, opts = {}) {
  const { inner = true, rise = 44, exit = true, staticFirst = false, startAt = 0, firstHold = 0, each } = opts
  const list = [...els]
  const seg = (1 - startAt) / Math.max(list.length, 1)
  const laterSeg = firstHold > 0 && list.length > 1 ? (1 - startAt - firstHold) / (list.length - 1) : seg

  list.forEach((el, i) => {
    const at = firstHold > 0 && i > 0
      ? startAt + firstHold + (i - 1) * laterSeg
      : startAt + i * seg
    const panelSeg = firstHold > 0 && i === 0 ? firstHold : laterSeg

    if (staticFirst && i === 0) {
      gsap.set(el, { opacity: 1 })
      if (exit && list.length > 1) {
        tl.to(el, { opacity: 0, y: -rise * 0.7, duration: panelSeg * 0.3, ease: 'power1.in' }, at + panelSeg * 0.7)
      }
      if (each) each(tl, el, i, at, panelSeg)
      return
    }

    if (inner) {
      const bits = [...el.querySelectorAll('[data-reveal]')]
      bits.forEach((node, j) => {
        tl.fromTo(
          node,
          { opacity: 0, yPercent: 60, clipPath: 'inset(0 0 100% 0)' },
          {
            opacity: 1,
            yPercent: 0,
            clipPath: 'inset(0 0 -12% 0)',
            duration: panelSeg * 0.3,
            ease: 'power2.out',
            immediateRender: false,
          },
          at + j * 0.012,
        )
      })
    }

    tl.fromTo(
      el,
      { opacity: 0, y: rise },
      { opacity: 1, y: 0, duration: panelSeg * 0.3, ease: 'power2.out', immediateRender: false },
      at,
    )

    if (exit && i < list.length - 1) {
      const exitAt = at + panelSeg * 0.7
      tl.to(el, { opacity: 0, y: -rise * 0.7, duration: panelSeg * 0.3, ease: 'power1.in' }, exitAt)
    }

    if (each) each(tl, el, i, at, panelSeg)
  })

  return seg
}
