import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CHAPTERS, GIFT, STORY } from "../content/story";
import { Chapter, Panel } from "../components/Chapter";
import { animatePanels } from "../lib/panels";
import { Bat, Mandarin, Frog, Cat } from "../components/art/creatures";
import { PetalRain } from "../components/PetalRain";
import leftBranch from "../assets/Chapter7/tree-branches-left.png";
import rightBranch from "../assets/Chapter7/tree-branches-right.png";
import heartArtwork from "../assets/Chapter7/heart.png";

function build(tl, root) {
  const cameos = root.querySelectorAll(".ch-recap");
  cameos.forEach((el, i) => {
    tl.fromTo(
      el,
      { opacity: 0, scale: 0.4, yPercent: 60 },
      {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 0.1,
        ease: "back.out(1.8)",
        immediateRender: false,
      },
      0.06 + i * 0.11,
    );
    tl.to(
      el,
      {
        opacity: 0,
        scale: 1.25,
        yPercent: -30,
        duration: 0.14,
        ease: "power1.in",
      },
      0.2 + i * 0.11,
    );
  });

  const leftBranch = root.querySelector(".ch-gift-branch--left");
  const rightBranch = root.querySelector(".ch-gift-branch--right");
  const heart = root.querySelector(".ch-gift-heart-wrap");

  tl.fromTo(
    leftBranch,
    { xPercent: -10, yPercent: -6, scale: 0.82, opacity: 0 },
    {
      xPercent: 0,
      yPercent: 0,
      y: () => -window.innerHeight * 0.06,
      scale: 0.98,
      opacity: 1,
      duration: 0.72,
      ease: "power2.out",
      immediateRender: false,
    },
    0,
  );
  tl.to(
    leftBranch,
    {
      xPercent: 2,
      y: () => -window.innerHeight * 0.1,
      scale: 1.02,
      duration: 0.28,
      ease: "sine.inOut",
    },
    0.72,
  );
  tl.fromTo(
    rightBranch,
    { xPercent: 10, yPercent: 6, scale: 0.82, opacity: 0 },
    {
      xPercent: 0,
      yPercent: 0,
      y: () => window.innerHeight * 0.06,
      scale: 0.98,
      opacity: 1,
      duration: 0.72,
      ease: "power2.out",
      immediateRender: false,
    },
    0,
  );
  tl.to(
    rightBranch,
    {
      xPercent: -2,
      y: () => window.innerHeight * 0.12,
      scale: 0.98,
      duration: 0.28,
      ease: "sine.inOut",
    },
    0.72,
  );
  tl.fromTo(
    heart,
    { y: () => window.innerHeight * 0.08, scale: 0.72, opacity: 0 },
    {
      y: 0,
      scale: 1.04,
      opacity: 1,
      duration: 0.28,
      ease: "back.out(1.5)",
      immediateRender: false,
    },
    0.18,
  );
  tl.to(
    heart,
    {
      y: () => -window.innerHeight * 0.18,
      scale: 1.28,
      duration: 0.64,
      ease: "sine.inOut",
    },
    0.36,
  );

  tl.to(
    leftBranch,
    {
      xPercent: -24,
      yPercent: -18,
      rotation: -3,
      duration: 0.18,
      ease: "power2.inOut",
    },
    0.82,
  );
  tl.to(
    rightBranch,
    {
      xPercent: 24,
      yPercent: 18,
      rotation: 3,
      duration: 0.18,
      ease: "power2.inOut",
    },
    0.82,
  );
  tl.to(
    heart,
    {
      top: "22%",
      y: 0,
      scale: 1.16,
      duration: 0.18,
      ease: "power2.inOut",
    },
    0.82,
  );

  const shade = root.querySelector(".ch-gift-shade");
  if (shade) {
    tl.fromTo(
      shade,
      { opacity: 0 },
      {
        opacity: 0.46,
        duration: 0.24,
        ease: "power1.out",
        immediateRender: false,
      },
      0.64,
    );
  }

  animatePanels(tl, root.querySelectorAll("[data-panel]"));
}

export function Gift({ onOpen }) {
  const lines = STORY.gift;

  return (
    <Chapter
      chapter={CHAPTERS[6]}
      className="chapter--rose"
      timeline={build}
      scrollEnd="bottom top"
    >
      <div className="ch-gift-art" aria-hidden="true">
        <img
          className="ch-gift-branch ch-gift-branch--left"
          src={leftBranch}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="ch-gift-heart-wrap">
          <img className="ch-gift-heart" src={heartArtwork} alt="" loading="lazy" decoding="async" />
        </div>
        <img
          className="ch-gift-branch ch-gift-branch--right"
          src={rightBranch}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <PetalRain />
      </div>
      <div className="ch-gift-shade" aria-hidden="true" />

      <div className="ch-recap" aria-hidden="true">
        <Bat className="ch-recap__item ch-recap__item--bat" />
        <Mandarin className="ch-recap__item ch-recap__item--mandarin" />
        <Frog className="ch-recap__item ch-recap__item--frog" />
        <Cat className="ch-recap__item ch-recap__item--cat" tone="white" />
      </div>

      <div className="chapter__panels">
        {lines.map((block, i) => (
          <Panel key={i} className="panel--center panel--final">
            <h2 className="panel__line" data-reveal>
              {block.lines[0]}
            </h2>
          </Panel>
        ))}

        <Panel className="panel--center panel--gift">
          <div data-reveal>
            <p className="panel__kicker">{GIFT.kicker}</p>
            <button type="button" className="giftbtn" onClick={onOpen}>
              <span>{GIFT.ctaLabel}</span>
            </button>
          </div>
        </Panel>
      </div>
    </Chapter>
  );
}
