import { CHAPTERS } from "../content/story";
import { Chapter } from "../components/Chapter";
import { StoryPanels } from "../components/StoryPanels";
import { ART } from "../lib/assets";
import { gsap } from "gsap";

const CH6 = ART[6];

function build(tl, root) {
  const leftHand = root.querySelector(".ch-touch-hand--left");
  const rightHand = root.querySelector(".ch-touch-hand--right");
  const moon = root.querySelector(".ch-love-moon");
  const hill = root.querySelector(".ch-love-hill");
  const angel = root.querySelector(".ch-love-angel-wrap");
  const entry = root.querySelector(".ch-love-entry");

  // ── Parallax entry veil ──────────────────────────────────────────────────
  // A soft overlay fades out from the cats chapter palette into this scene,
  // giving a smooth parallax crossfade instead of a hard cut.
  if (entry) {
    tl.fromTo(
      entry,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.18,
        ease: "power2.out",
        immediateRender: false,
      },
      0,
    );
  }

  // ── Hill — slides in then drifts down slowly ─────────────────────────────
  // Hill moves at a slightly lazier pace than the angel so the two feel like
  // separate physical layers rather than one rigid object.
  tl.fromTo(
    hill,
    { y: () => window.innerHeight * 0.28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
      immediateRender: false,
    },
    0,
  );
  tl.to(
    hill,
    { y: () => window.innerHeight * 0.06, duration: 0.8, ease: "sine.in" },
    0.2,
  );

  // ── Angel / statue — enters faster, descends at a slightly quicker rate ──
  // The different speed from the hill is intentional — the slight drift
  // desync makes the scene feel alive rather than one flat card sliding down.
  tl.fromTo(
    angel,
    { y: () => window.innerHeight * 0.22, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.22,
      ease: "power3.out",
      immediateRender: false,
    },
    0.04,
  );
  tl.to(
    angel,
    { y: () => window.innerHeight * 0.1, duration: 0.74, ease: "sine.inOut" },
    0.26,
  );

  // ── Moon — enters from below, then drifts gently upward ─────────────────
  // Keep the rise modest so it doesn't leave the frame mid-scroll.
  tl.fromTo(
    moon,
    { y: 44, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.16,
      ease: "power2.out",
      immediateRender: false,
    },
    0.08,
  );
  tl.to(moon, { y: -48, duration: 0.76, ease: "none" }, 0.24);

  // ── Left hand — drifts in from upper-left, moves up a touch and shrinks ──
  // The slight upward crawl and scale-down make it feel like it's reaching
  // across a distance rather than sliding on a rail.
  tl.fromTo(
    leftHand,
    {
      x: () => -window.innerWidth * 0.11,
      y: () => -window.innerHeight * 0.06,
      scale: 1.06,
      opacity: 0,
    },
    {
      x: 0,
      y: () => -window.innerHeight * 0.03,
      scale: 0.94,
      opacity: 0.88,
      duration: 0.74,
      ease: "power1.inOut",
      immediateRender: false,
    },
    0.22,
  );

  // ── Right hand — sweeps in from the right, reaching toward centre ────────
  tl.fromTo(
    rightHand,
    {
      x: () => window.innerWidth * 0.1,
      y: () => window.innerHeight * 0.1,
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      opacity: 0.9,
      duration: 0.74,
      ease: "power1.inOut",
      immediateRender: false,
    },
    0.22,
  );

  // The lift belongs to the final viewport of chapter 6. This is the actual
  // handoff window: the stage is still visible, then chapter 7 takes over.
  const exit = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  // Each upward layer gets its own pace for a stronger depth effect.
  exit.to(
    leftHand,
    {
      y: () => -window.innerHeight * 0.85,
      opacity: 0,
      duration: 0.16,
      ease: "power2.in",
    },
    0,
  );
  exit.to(
    rightHand,
    {
      y: () => -window.innerHeight * 0.92,
      opacity: 0,
      duration: 0.24,
      ease: "power2.in",
    },
    0,
  );
  exit.to(
    moon,
    {
      y: () => -window.innerHeight * 1.1,
      opacity: 0,
      duration: 0.34,
      ease: "power1.in",
    },
    0,
  );
  // Hill and statue move downward together at the same slower speed.
  exit.to(
    [angel, hill],
    {
      y: () => window.innerHeight * 0.5,
      opacity: 0,
      duration: 0.48,
      ease: "power2.in",
    },
    0,
  );
}

export function Everything() {
  return (
    <Chapter
      chapter={CHAPTERS[5]}
      className="chapter--love"
      timeline={build}
      panelOptions={{ firstHold: 0.22 }}
      panels={<StoryPanels id="love" className="panel--center" />}
    >
      {/* Parallax entry overlay — fades out at the start of the scene */}
      <div className="ch-love-entry" aria-hidden="true" />

      {/* Hill and angel are siblings so GSAP can drive them at different speeds */}
      <img className="ch-love-hill" src={CH6.hill} alt="" aria-hidden="true" />
      <div className="ch-love-angel-wrap" aria-hidden="true">
        <img className="ch-love-angel" src={CH6.angel} alt="" />
      </div>

      <img className="ch-love-moon" src={CH6.moon} alt="" aria-hidden="true" />
      <img
        className="ch-touch-hand ch-touch-hand--left"
        src={CH6.leftHand}
        alt=""
        aria-hidden="true"
      />
      <img
        className="ch-touch-hand ch-touch-hand--right"
        src={CH6.rightHand}
        alt=""
        aria-hidden="true"
      />
    </Chapter>
  );
}
