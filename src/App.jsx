import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS, SENDER, RECEIVER } from "./content/story";
import { initSmoothScroll, prefersReducedMotion } from "./lib/smoothScroll";
import { useActiveChapter } from "./lib/useActiveChapter";
import { buildWorldTimeline, destroyWorldTimeline } from "./lib/world";
import { sectionOrder } from "./lib/registry";
import { World, Grain } from "./components/World";
import { ChapterRail, Progress, ScrollHint, Footer } from "./components/Chrome";
import { GiftReveal } from "./components/GiftReveal";
import { FirstMeeting } from "./sections/FirstMeeting";
import { Falling } from "./sections/Falling";
import { Idea } from "./sections/Idea";
import { Website } from "./sections/Website";
import { Us } from "./sections/Us";
import { Everything } from "./sections/Everything";
import { Gift } from "./sections/Gift";
import themeSong from "./assets/theme/The place where it rained.mp3";
import "./styles/app.css";

gsap.registerPlugin(ScrollTrigger);

const IDS = CHAPTERS.map((c) => c.id);
const START_VOLUME = 0.08;
const FULL_VOLUME = 1;
const START_FADE_MS = 4000;
const VOLUME_RAMP_MS = 1800;

export default function App() {
  const [giftOpen, setGiftOpen] = useState(false);
  const active = useActiveChapter();
  const worldTl = useRef(null);
  const audioRef = useRef(null);
  const volumeFrame = useRef(0);
  const audioStartedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(themeSong);
    audio.loop = true;
    audio.volume = 0;
    audio.muted = true;
    audioRef.current = audio;
    const interactionEvents = ["pointerdown", "touchstart", "keydown", "wheel"];

    const fadeIn = () => {
      const startedAt = performance.now();

      const fade = (now) => {
        const progress = Math.min((now - startedAt) / START_FADE_MS, 1);
        audio.volume = START_VOLUME * progress;
        if (progress < 1) {
          volumeFrame.current = window.requestAnimationFrame(fade);
        }
      };

      volumeFrame.current = window.requestAnimationFrame(fade);
    };

    const startAudio = (fromUserGesture = false) => {
      if (audioStartedRef.current) {
        if (fromUserGesture) {
          audio.muted = false;
          audio.play().catch(() => {});
        }
        return;
      }
      if (audio.currentTime < 15) audio.currentTime = 15;
      if (fromUserGesture) audio.muted = false;
      audio
        .play()
        .then(() => {
          audio.muted = false;
          audioStartedRef.current = true;
          fadeIn();
        })
        .catch(() => {
          audio.muted = true;
        });
    };
    const startFromInteraction = () => startAudio(true);
    interactionEvents.forEach((event) =>
      window.addEventListener(event, startFromInteraction, { passive: true }),
    );
    startAudio();

    return () => {
      interactionEvents.forEach((event) =>
        window.removeEventListener(event, startFromInteraction),
      );
      window.cancelAnimationFrame(volumeFrame.current);
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
      audioStartedRef.current = false;
    };
  }, []);

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioStartedRef.current) return undefined;

    const targetVolume = active >= 6 ? FULL_VOLUME : START_VOLUME;
    const initialVolume = audio.volume;
    const startedAt = performance.now();

    window.cancelAnimationFrame(volumeFrame.current);

    const rampVolume = (now) => {
      const progress = Math.min((now - startedAt) / VOLUME_RAMP_MS, 1);
      audio.volume = initialVolume + (targetVolume - initialVolume) * progress;
      if (progress < 1)
        volumeFrame.current = window.requestAnimationFrame(rampVolume);
    };

    volumeFrame.current = window.requestAnimationFrame(rampVolume);

    return () => window.cancelAnimationFrame(volumeFrame.current);
  }, [active]);

  useLayoutEffect(() => {
    let frame = 0;
    let resizeTimer = 0;

    const build = () => {
      destroyWorldTimeline(worldTl.current);
      if (prefersReducedMotion()) {
        worldTl.current = null;
        return;
      }
      worldTl.current = buildWorldTimeline(sectionOrder(IDS));
      ScrollTrigger.refresh();
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 220);
    };

    frame = window.requestAnimationFrame(build);
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      destroyWorldTimeline(worldTl.current);
      worldTl.current = null;
    };
  }, []);

  return (
    <>
      <World />
      <Grain />

      <Progress active={active} />
      <ChapterRail active={active} />
      <ScrollHint />

      <main className="story">
        <h1 className="sr-only">
          {SENDER} &amp; {RECEIVER} — our story
        </h1>
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
  );
}
