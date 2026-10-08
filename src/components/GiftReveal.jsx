import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GIFT } from "../content/story";
import { Heart } from "./art/creatures";
import { Particles } from "./art/scenery";
import { startScroll, stopScroll } from "../lib/smoothScroll";
import giftWallpaper from "../assets/Gift/wallpaper.jpg";
import bats from "../assets/Gift/bats.png";
import frogOne from "../assets/Gift/frog1.png";
import frogTwo from "../assets/Gift/frog2.png";
import kittenOne from "../assets/Gift/kitten1.png";
import kittenTwo from "../assets/Gift/kitten2.png";
import kitty from "../assets/Gift/kitty.png";
import monster from "../assets/Gift/monster.png";
import monsterTwo from "../assets/Gift/monster2.png";
import monsterThree from "../assets/Gift/monster3.png";
import petalOne from "../assets/Gift/petal1.png";
import petalTwo from "../assets/Gift/petal2.png";
import petalThree from "../assets/Gift/petal3.png";
import leaf from "../assets/Gift/leaf.png";
import mandarinSegment from "../assets/Gift/mandarin-segment-crop.png";
import mandarinSegmentTwo from "../assets/Gift/mandarin-segment2.png";
import mandarinSegmentThree from "../assets/Gift/mandarin-segment3.png";

const FALLING_ART = [
  [bats, "falling-art--bats", "8%", "12vw", "16s", "-1s", "-18vw", "420deg"],
  [
    frogOne,
    "falling-art--frog-one",
    "22%",
    "9vw",
    "20s",
    "-8s",
    "14vw",
    "-300deg",
  ],
  [
    frogTwo,
    "falling-art--frog-two",
    "76%",
    "8vw",
    "18s",
    "-12s",
    "-12vw",
    "260deg",
  ],
  [
    kittenOne,
    "falling-art--kitten-one",
    "38%",
    "10vw",
    "22s",
    "-4s",
    "16vw",
    "340deg",
  ],
  [
    kittenTwo,
    "falling-art--kitten-two",
    "88%",
    "8vw",
    "17s",
    "-14s",
    "-16vw",
    "-280deg",
  ],
  [kitty, "falling-art--kitty", "58%", "11vw", "24s", "-18s", "12vw", "300deg"],
  [
    monster,
    "falling-art--monster",
    "14%",
    "13vw",
    "19s",
    "-6s",
    "18vw",
    "-360deg",
  ],
  [
    monsterTwo,
    "falling-art--monster-two",
    "67%",
    "12vw",
    "21s",
    "-10s",
    "-18vw",
    "320deg",
  ],
  [
    monsterThree,
    "falling-art--monster-three",
    "94%",
    "10vw",
    "23s",
    "-20s",
    "-14vw",
    "-340deg",
  ],
  [
    petalOne,
    "falling-art--petal-one",
    "30%",
    "4.5vw",
    "11s",
    "-5s",
    "9vw",
    "420deg",
  ],
  [
    petalTwo,
    "falling-art--petal-two",
    "48%",
    "3.8vw",
    "13s",
    "-9s",
    "-8vw",
    "-320deg",
  ],
  [
    petalThree,
    "falling-art--petal-three",
    "82%",
    "4.2vw",
    "10s",
    "-2s",
    "7vw",
    "280deg",
  ],
  [leaf, "falling-art--leaf", "4%", "6vw", "15s", "-7s", "13vw", "-380deg"],
  [
    mandarinSegment,
    "falling-art--mandarin-segment",
    "45%",
    "8vw",
    "19s",
    "-15s",
    "-15vw",
    "300deg",
  ],
  [
    mandarinSegmentTwo,
    "falling-art--mandarin-segment-two",
    "62%",
    "7vw",
    "16s",
    "-3s",
    "12vw",
    "-340deg",
  ],
  [
    mandarinSegmentThree,
    "falling-art--mandarin-segment-three",
    "97%",
    "9vw",
    "22s",
    "-11s",
    "-13vw",
    "360deg",
  ],
];

export function GiftReveal({ open, onClose }) {
  const root = useRef(null);
  const opener = useRef(null);
  const closing = useRef(false);

  const closeGift = () => {
    const el = root.current;
    if (!el || !open || closing.current) return;

    closing.current = true;
    const closeTimeline = gsap.timeline({
      onComplete: () => {
        closing.current = false;
        onClose();
      },
    });
    closeTimeline.to(
      el.querySelector("[data-card]"),
      { opacity: 0, y: 54, scale: 0.94, duration: 0.42, ease: "power2.in" },
      0,
    );
    closeTimeline.to(
      el,
      {
        autoAlpha: 0,
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.72,
        ease: "power3.inOut",
      },
      0.1,
    );
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (open) {
      stopScroll();
      opener.current = document.activeElement;
    } else {
      startScroll();
    }

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { pointerEvents: "auto" });
        gsap.fromTo(
          el,
          { autoAlpha: 0, clipPath: "circle(0% at 50% 50%)" },
          {
            autoAlpha: 1,
            clipPath: "circle(150% at 50% 50%)",
            duration: 0.85,
            ease: "power3.inOut",
          },
        );
        gsap.fromTo(
          el.querySelector("[data-card]"),
          { opacity: 0, y: 74, scale: 0.9, rotationX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.78,
            ease: "power3.out",
            delay: 0.16,
          },
        );
        gsap.fromTo(
          el.querySelectorAll("[data-rise]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            delay: 0.3,
          },
        );
      } else {
        gsap.set(el, {
          autoAlpha: 0,
          clipPath: "circle(0% at 50% 50%)",
          pointerEvents: "none",
        });
      }
    }, el);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) {
      const prev = opener.current;
      if (prev && typeof prev.focus === "function") prev.focus();
      return;
    }
    const close = root.current?.querySelector(".gift__close");
    // the overlay is visibility:hidden until the fade starts, so wait a frame or two
    const focusTimer = window.setTimeout(() => close?.focus(), 80);
    const onKey = (e) => {
      if (e.key === "Escape") closeGift();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={open ? "gift gift--open" : "gift"}
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label={GIFT.title}
      style={
        open
          ? { "--gift-wallpaper": "url(" + giftWallpaper + ")" }
          : undefined
      }
    >
      <div className="gift__falling" aria-hidden="true">
        {FALLING_ART.map(
          ([src, className, left, size, duration, delay, drift, spin]) => (
            <img
              key={className}
              className={`gift__falling-art ${className}`}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                "--fall-left": left,
                "--fall-size": size,
                "--fall-duration": duration,
                "--fall-delay": delay,
                "--fall-drift": drift,
                "--fall-spin": spin,
              }}
            />
          ),
        )}
      </div>
      <Particles kind="heart" count={30} className="gift__particles" />
      <button
        type="button"
        className="gift__close"
        onClick={closeGift}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <article className="gift__card" data-card>
        <Heart className="gift__heart" />
        <p className="gift__kicker" data-rise>
          {GIFT.kicker}
        </p>
        <h2 className="gift__title" data-rise>
          {GIFT.title}
        </h2>
        <p className="gift__body" data-rise>
          {GIFT.body}
        </p>

        {GIFT.href ? (
          <a
            className="gift__cta"
            href={GIFT.href}
            target="_blank"
            rel="noreferrer"
            data-rise
          >
            {GIFT.linkLabel}
          </a>
        ) : (
          <p className="gift__hint" data-rise>
            {GIFT.ctaLabel} — add the link in src/content/story.js
          </p>
        )}

        <p className="gift__sign" data-rise>
          {GIFT.signature}
        </p>
      </article>
    </div>
  );
}
