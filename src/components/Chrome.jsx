import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "../content/story";
import { Bat, Mandarin, Frog, Monster, Cat, Heart } from "./art/creatures";
import { scrollToEl } from "../lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  bat: Bat,
  mandarin: Mandarin,
  frog: Frog,
  monster: Monster,
  cat: Cat,
  heart: Heart,
  gift: GiftIcon,
};

function GiftIcon({ className = "" }) {
  return (
    <svg
      className={`gifticon ${className}`}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path d="M24 20v22M8 20h32v22H8z" />
      <path d="M24 20c-6 0-12-1-12-6s8-5 12 6c4-11 12-11 12-6s-6 6-12 6z" />
    </svg>
  );
}

function complementaryColor(hex) {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgb(${255 - red}, ${255 - green}, ${255 - blue})`;
}

export function Progress({ active = 0 }) {
  const fill = useRef(null);
  const sceneFill = useRef(null);
  const softWhiteMeter = [0, 3, 5].includes(active);

  useLayoutEffect(() => {
    const el = fill.current;
    const sceneEl = sceneFill.current;
    if (!el || !sceneEl) return;
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: "max",
          scrub: 0.2,
        },
      },
    );
    const sceneTrigger = ScrollTrigger.create({
      trigger: `#${CHAPTERS[active]?.id}`,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => gsap.set(sceneEl, { scaleY: self.progress }),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      sceneTrigger.kill();
    };
  }, [active]);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <i className="progress__fill" ref={fill} />
      </div>
      <div
        className="scene-progress"
        style={{
          "--scene-meter-color": softWhiteMeter
            ? "#f8f7ff"
            : complementaryColor(CHAPTERS[active]?.palette.accent ?? "#ffffff"),
          "--scene-meter-glow": softWhiteMeter
            ? "rgba(248, 247, 255, 0.58)"
            : complementaryColor(CHAPTERS[active]?.palette.accent ?? "#ffffff"),
        }}
        aria-hidden="true"
      >
        <span className="scene-progress__track">
          <i className="scene-progress__fill" ref={sceneFill} />
        </span>
        <span className="scene-progress__label">scene</span>
      </div>
    </>
  );
}

export function ChapterRail({ active }) {
  return (
    <nav className="rail" aria-label="Chapters">
      <ol>
        {CHAPTERS.map((chapter, i) => {
          const Icon = ICONS[chapter.icon];
          return (
            <li key={chapter.id} className={i === active ? "is-active" : ""}>
              <button
                type="button"
                onClick={() => scrollToEl(document.getElementById(chapter.id))}
                aria-current={i === active ? "true" : undefined}
                aria-label={chapter.label}
              >
                <span className="rail__icon">
                  <Icon className={`rail__art rail__art--${chapter.icon}`} />
                </span>
                <span className="rail__num">{chapter.num}</span>
                <span className="rail__label">{chapter.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function ScrollHint() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      opacity: 0,
      y: 24,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: 40,
        end: 240,
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="hint" ref={ref} aria-hidden="true">
      <span>scroll</span>
      <i />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer footer--gift">
      <p>Every world on this page exists because of you.</p>
      <button
        type="button"
        className="linkbtn linkbtn--ghost"
        onClick={() => scrollToEl(document.body)}
      >
        <span>Read it again</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20V6m0 0l-6 6m6-6l6 6" />
        </svg>
      </button>
    </footer>
  );
}
