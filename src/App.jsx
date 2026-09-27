import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHAPTERS, SENDER, RECEIVER } from './content/story'
import { initSmoothScroll } from './lib/smoothScroll'
import { useActiveChapter } from './lib/useActiveChapter'
import { buildWorldTimeline, destroyWorldTimeline } from './lib/world'
import { sectionOrder } from './lib/registry'
import { World, Grain } from './components/World'
import { ChapterRail, Progress, ScrollHint, Footer } from './components/Chrome'
import { GiftReveal } from './components/GiftReveal'
import { FirstMeeting } from './sections/FirstMeeting'
import { Falling } from './sections/Falling'
import { Idea } from './sections/Idea'
import { Website } from './sections/Website'
import { Us } from './sections/Us'
import { Everything } from './sections/Everything'
import { Gift } from './sections/Gift'
import './styles/app.css'

gsap.registerPlugin(ScrollTrigger)

const IDS = CHAPTERS.map((c) => c.id)

export default function App() {
  const [giftOpen, setGiftOpen] = useState(false)
  const active = useActiveChapter()
  const worldTl = useRef(null)

  useEffect(() => initSmoothScroll(), [])

  useLayoutEffect(() => {
    let frame = 0
    let resizeTimer = 0

    const build = () => {
      destroyWorldTimeline(worldTl.current)
      worldTl.current = buildWorldTimeline(sectionOrder(IDS))
      ScrollTrigger.refresh()
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 220)
    }

    frame = window.requestAnimationFrame(build)
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      destroyWorldTimeline(worldTl.current)
      worldTl.current = null
    }
  }, [])

  return (
    <>
      <World />
      <Grain />

      <Progress />
      <ChapterRail active={active} />
      <ScrollHint />

      <main className="story">
        <h1 className="sr-only">{SENDER} &amp; {RECEIVER} — our story</h1>
        <FirstMeeting />
        <Falling />
        <Idea />
        <Website />
        <Us />
        <Everything />
        <Gift onOpen={() => setGiftOpen(true)} />
        <Footer />
      </main>

      <GiftReveal open={giftOpen} onClose={() => setGiftOpen(false)} />
    </>
  )
}
