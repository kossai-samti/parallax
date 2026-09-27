import { useLayoutEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHAPTERS } from '../content/story'

export function useActiveChapter() {
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const triggers = CHAPTERS.map((chapter, i) =>
      ScrollTrigger.create({
        trigger: `#${chapter.id}`,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) setActive(i)
        },
      }),
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return active
}
