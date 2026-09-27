# Our Story

A single-page, scroll-driven love letter. Seven chapters morph into one another as you
scroll — the world behind the text changes colour, light and weather while the story moves
from "the first time I met you" to the gift at the end.

Everything is one continuous page. There are no routes and no page transitions.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build
npm run lint
```

## How it works

- **Lenis** provides the smooth inertial scrolling.
- **GSAP ScrollTrigger** drives every animation. Each chapter owns a scrubbed timeline, so
  all motion is a pure function of scroll position — nothing plays on a timer.
- A single **fixed world layer** sits behind the story and interpolates between each
  chapter's palette, so the background is always transitioning rather than cutting.
- All artwork is **inline SVG and CSS** — no image assets, no icon fonts, no network calls.

```
src/
  content/story.js     <- all copy, palettes, photos and the gift live here
  lib/
    smoothScroll.js    Lenis setup, scrollToEl, reduced-motion guard
    useScrub.js        builds one GSAP context + ScrollTrigger per chapter
    panels.js          shared panel enter/exit choreography
    world.js           palette + celestial crossfade between chapters
    registry.js        section id -> element lookup
    useActiveChapter.js  which chapter is on screen (drives the rail)
  components/
    World.jsx          fixed atmosphere (sky, stars, clouds, moon, bats, grain)
    Chapter.jsx        sticky stage + panel wrapper used by every section
    Chrome.jsx         progress bar, chapter rail, scroll hint, footer
    GiftReveal.jsx     the final overlay
    StoryPanels.jsx    renders the text blocks for a chapter
    art/               creatures.jsx, scenery.jsx (inline SVG)
  sections/            one file per chapter
  styles/              index.css holds tokens; the rest are split by concern
```

## Make it yours

Almost everything you would want to change is in **`src/content/story.js`**.

1. **Names** — `SENDER` and `RECEIVER` near the top.
2. **The words** — `STORY` is keyed by chapter id (`first-meeting`, `falling`, `idea`,
   `website`, `us`, `love`, `gift`). Each block is `{ lines, kicker, body }`.
3. **Colours** — each chapter in `CHAPTERS` has a `palette`. These drive the CSS custom
   properties that the world layer and all text colours animate between.
4. **Photos** — `MEMORIES` powers the "Us" chapter. Drop files into
   `src/assets/memories/` and set each `src`:

   ```js
   { caption: 'This.', src: new URL('./assets/memories/us-01.jpg', import.meta.url).href }
   ```

   Leave `src: null` and you get the illustrated placeholder instead.
5. **The gift** — set `GIFT.href` to a link, a file, a video, anything. While it is `null`
   the final card shows a "add the link" hint instead of a dead button.
6. **The old website** — `OLD_SITE` in the same file holds the fake browser window shown in
   chapter four.

### Adding a chapter

1. Add an entry to `CHAPTERS` (it needs `id`, `num`, `label`, `units`, `palette`, `icon`).
2. Create `src/sections/YourChapter.jsx` that renders `<Chapter>` with your art and panels.
3. Mount it in `src/App.jsx` between the neighbouring sections.
4. Give the section a `chapter--yourname` class and style it in `src/styles/chapters.css`.

Section height is `units * 100svh`, so `units: 5` gives each chapter five screens of scroll.
That is the main dial for pacing.

### Adding chapter artwork

The world layer holds **exactly one** wallpaper image and **one** round body image, and
swaps their `src` as you scroll. Never add a second one to stack beside them: two opaque
siblings paint over each other, and any frame where the crossfade state is missing leaves
the wrong picture on top.

1. Drop the files in `src/assets/ChapterN/`.
2. Import them in **`src/lib/assets.js`** and add an entry to `ART`:

   ```js
   3: { wall: ch3Wall, body: ch3Something },
   ```

3. `wallFor(n)` / `bodyFor(n)` return the chapter's art, falling back to chapter 1's night
   sky and moon for any chapter that has none. Chapters 3-7 are on that fallback today.

Watch the key type: `story.js` stores `num` as a padded **string** (`'01'`, `'02'`), so
`ART[chapter.num]` is `undefined` and would silently fall back to chapter 1 — every chapter
would keep showing the first one with no error anywhere. `wallFor`/`bodyFor` coerce with
`Number()`, and callers should prefer the plain 1-based index.

The celestial body is expected to be round and transparent at the corners, because it sits
on a palette-driven gradient disc that reads as glow. Keep each chapter's props inside that
chapter's `.chapter__stage` — it clips with `overflow: hidden`, which is what stops a
chapter's floating art from being drawn over its neighbour.

## Accessibility

- If the visitor has `prefers-reduced-motion: reduce`, smooth scrolling is disabled, scrubbed
  timelines are skipped, and the story reflows into a plain vertical document — the whole
  text is readable without any animation.
- Chapters are labelled sections; the gift overlay is a proper modal dialog with focus
  handling and Escape to close.
- There is a real `<h1>` and a skip-free reading order for screen readers.

## Browser support

Modern evergreen browsers. Uses `svh` units, CSS nesting-free plain CSS, `clip-path`, and
`backdrop-filter`.
