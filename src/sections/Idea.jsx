import { CHAPTERS } from "../content/story";
import { Chapter } from "../components/Chapter";
import { StoryPanels } from "../components/StoryPanels";
import { Particles } from "../components/art/scenery";
import { ART } from "../lib/assets";
import { worldRefs } from "../lib/registry";

const CH3 = ART[3];
const vh = () => window.innerHeight;
const PAD_FIELD = [
  { src: CH3.padOne, className: "ch-lilypad--01" },
  { src: CH3.padTwo, className: "ch-lilypad--02" },
  { src: CH3.padOne, className: "ch-lilypad--03" },
  { src: CH3.padTwo, className: "ch-lilypad--04" },
  { src: CH3.padOne, className: "ch-lilypad--05" },
  { src: CH3.padTwo, className: "ch-lilypad--06" },
  { src: CH3.padOne, className: "ch-lilypad--07" },
  { src: CH3.padTwo, className: "ch-lilypad--08" },
  { src: CH3.padOne, className: "ch-lilypad--09" },
  { src: CH3.padTwo, className: "ch-lilypad--10" },
  { src: CH3.padOne, className: "ch-lilypad--11" },
];

function build(tl, root) {
  const lotus = worldRefs.root?.querySelector("[data-cel-lotus]");
  if (lotus) {
    // Give the flower a gentle scroll float after it has crossfaded into view.
    tl.fromTo(
      lotus,
      { y: 0, rotation: 0, scale: 1 },
      {
        y: -34,
        rotation: 6,
        scale: 1.1,
        duration: 0.613,
        ease: "sine.inOut",
        immediateRender: false,
      },
      0.167,
    );
  }
  const frogRunner = root.querySelector(".ch-frog-runner");
  if (frogRunner) {
    tl.fromTo(
      frogRunner,
      { x: () => -(frogRunner.offsetWidth + 40), y: 0 },
      {
        x: () => window.innerWidth + 40,
        y: 0,
        duration: 0.99,
        ease: "none",
        immediateRender: false,
      },
      0.005,
    );
  }

  // Every pad moves upward for the full chapter scroll. Varying travel
  // distances gives each pad a different speed without leaving any stationary
  // during part of the scroll.
  for (const [i, pad] of PAD_FIELD.entries()) {
    const el = root.querySelector(`.${pad.className}`);
    if (!el) continue;
    const lift = 0.42 + (i % 6) * 0.11;
    tl.to(el, { y: () => -vh() * lift, duration: 1, ease: "none" }, 0);
  }

  const sparks = root.querySelector(".ch-sparks");
  if (sparks)
    tl.to(
      sparks,
      { y: () => -vh() * 0.95, duration: 0.22, ease: "none" },
      0.78,
    );
}

export function Idea() {
  return (
    <Chapter
      chapter={CHAPTERS[2]}
      className="chapter--frog"
      timeline={build}
      scrollEnd="bottom top"
      panels={<StoryPanels id="idea" />}
    >
      {PAD_FIELD.map((pad) => (
        <img
          key={pad.className}
          className={`ch-lilypad ${pad.className}`}
          src={pad.src}
          alt=""
          aria-hidden="true"
        />
      ))}
      <div className="ch-frog-runner" aria-hidden="true">
        <span className="ch-frog-ripple ch-frog-ripple--near" />
        <span className="ch-frog-ripple ch-frog-ripple--far" />
        <img className="ch-frog" src={CH3.frog} alt="" />
      </div>
      <Particles kind="spark" count={14} className="ch-sparks" />
    </Chapter>
  );
}
