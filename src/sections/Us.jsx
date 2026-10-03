import { CHAPTERS, MEMORIES } from "../content/story";
import { gsap } from "gsap";
import { Chapter, Panel } from "../components/Chapter";
import { Particles } from "../components/art/scenery";
import { animatePanels } from "../lib/panels";
import { ART } from "../lib/assets";

const CH5 = ART[5];

function build(tl, root) {
  const clouds = root.querySelector(".ch-cats-clouds");
  const leftKitten = root.querySelector(".ch-cat--left");
  const rightKitten = root.querySelector(".ch-cat--right");
  const memories = root.querySelectorAll(".memory");

  tl.fromTo(
    clouds,
    { y: () => window.innerHeight * 0.04, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.42,
      ease: "power2.out",
      immediateRender: false,
    },
    0,
  );
  tl.to(
    clouds,
    { y: () => -window.innerHeight * 0.06, duration: 0.58, ease: "none" },
    0.42,
  );

  tl.fromTo(
    leftKitten,
    {
      xPercent: -12,
      y: () => window.innerHeight * 0.12,
      scale: 0.9,
      opacity: 0,
    },
    {
      xPercent: 0,
      y: 0,
      scale: 1.02,
      opacity: 1,
      duration: 0.38,
      ease: "power2.out",
      immediateRender: false,
    },
    0.08,
  );
  tl.to(
    leftKitten,
    {
      y: () => window.innerHeight * 0.08,
      scale: 1.08,
      duration: 0.62,
      ease: "sine.inOut",
    },
    0.38,
  );

  tl.fromTo(
    rightKitten,
    {
      xPercent: 12,
      y: () => window.innerHeight * 0.08,
      scale: 0.9,
      opacity: 0,
    },
    {
      xPercent: 0,
      y: 0,
      scale: 1.02,
      opacity: 1,
      duration: 0.42,
      ease: "power2.out",
      immediateRender: false,
    },
    0.16,
  );
  tl.to(
    rightKitten,
    {
      y: () => -window.innerHeight * 0.08,
      scale: 1.08,
      duration: 0.58,
      ease: "sine.inOut",
    },
    0.42,
  );

  animatePanels(
    tl,
    [
      ...root.querySelectorAll("[data-panel]"),
      ...root.querySelectorAll(".memory"),
    ],
    {
      inner: true,
      each: (t, el, i, at, seg) => {
        if (!el.classList.contains("memory")) return;
        const tilt = i % 2 === 0 ? -1.1 : 1.1;
        t.fromTo(
          el,
          { rotate: tilt * 2.4 },
          {
            rotate: tilt,
            duration: seg * 0.3,
            ease: "power2.out",
            immediateRender: false,
          },
          at,
        );
      },
    },
  );

  const exit = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  exit.to(
    rightKitten,
    {
      y: () => -window.innerHeight * 0.95,
      opacity: 0,
      duration: 0.38,
      ease: "power2.in",
    },
    0,
  );
  exit.to(
    leftKitten,
    {
      y: () => window.innerHeight * 0.7,
      opacity: 0,
      duration: 0.7,
      ease: "power1.in",
    },
    0,
  );
  exit.to(
    clouds,
    {
      y: () => window.innerHeight * 0.48,
      opacity: 0,
      duration: 0.55,
      ease: "power1.in",
    },
    0,
  );
  exit.to(
    memories,
    {
      y: () => -window.innerHeight * 0.72,
      opacity: 0,
      duration: 0.62,
      ease: "power1.in",
      stagger: 0.05,
    },
    0,
  );
}

function Memory({ item, index }) {
  return (
    <figure className="memory">
      <div className="memory__frame">
        {item.src ? (
          <img src={item.src} alt={item.caption} loading="lazy" />
        ) : (
          <div className="memory__empty">
            <span className="memory__slot">
              photo {String(index + 1).padStart(2, "0")}
            </span>
            <span className="memory__note">{item.note}</span>
          </div>
        )}
      </div>
      <figcaption className="memory__caption">{item.caption}</figcaption>
    </figure>
  );
}

export function Us() {
  return (
    <Chapter
      chapter={CHAPTERS[4]}
      className="chapter--cats"
      timeline={build}
      customPanels
      panels={[
        <Panel key="intro" className="panel--us-copy">
          <div className="us-copy__side us-copy__side--left" data-reveal>
            <h2 className="panel__line">And then you became part of my everyday life.</h2>
          </div>
          <div className="us-copy__side us-copy__side--right" data-reveal>
            <p className="panel__body">A part I don&apos;t know how I can live without, and I don&apos;t wanna know tbh.</p>
          </div>
        </Panel>,
        ...MEMORIES.map((item, i) => (
          <Memory item={item} index={i} key={item.caption} />
        )),
      ]}
    >
      <Particles kind="dust" count={40} className="ch-motes" />
      <div className="ch-cats" aria-hidden="true">
        <img className="ch-cats-clouds" src={CH5.clouds} alt="" />
        <img className="ch-cat ch-cat--left" src={CH5.leftKitten} alt="" />
        <img className="ch-cat ch-cat--right" src={CH5.rightKitten} alt="" />
      </div>
    </Chapter>
  );
}
