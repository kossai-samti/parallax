// Every photo the site uses lives under src/assets/ChapterN/ and is listed here.
// Vite fingerprints and optimises these imports, so refer to them via this file
// rather than by string path.
//
// To add artwork for a later chapter, drop the files in src/assets/ChapterN/
// and add the imports + entry below.

import ch1Wall from '../assets/Chapter1/wall-01-night.jpg'
import ch1Moon from '../assets/Chapter1/moon-crop.png'
import ch1BatHero from '../assets/Chapter1/bats1-crop.png'
import ch1BatWing from '../assets/Chapter1/bats2-crop.png'

import ch2Wall from '../assets/Chapter2/wall-02-sunset.jpg'
import ch2Slice from '../assets/Chapter2/mandarin-slice-crop.png'
import ch2Leaf from '../assets/Chapter2/leaf-crop.png'
import ch2Segment from '../assets/Chapter2/mandarin-segment-crop.png'
import ch2Mandarin from '../assets/Chapter2/mandarin.png'

import ch3Wall from '../assets/Chapter3/wall-03-pond.jpg'
import ch3Lotus from '../assets/Chapter3/lily-pad3.png'
import ch3Frog from '../assets/Chapter3/frog.gif'
import ch3PadOne from '../assets/Chapter3/lily-pad1.png'
import ch3PadTwo from '../assets/Chapter3/lily-pad2.png'

import ch4Wall from '../assets/Chapter4/wall-04-neon.jpg'

import ch5Wall from '../assets/Chapter5/wall-05-night.jpg'
import ch5Clouds from '../assets/Chapter5/clouds.png'
import ch5LeftKitten from '../assets/Chapter5/kitten-left.png'
import ch5RightKitten from '../assets/Chapter5/kitten-right.png'

import ch6Wall from '../assets/Chapter6/wall-06-violet.jpg'
import ch6Hill from '../assets/Chapter6/hill.png'
import ch6Angel from '../assets/Chapter6/angel.png'
import ch6Moon from '../assets/Chapter6/moon-purple.png'
import ch6LeftHand from '../assets/Chapter6/left-hand.png'
import ch6RightHand from '../assets/Chapter6/right-hand.png'

import ch7Wall from '../assets/Chapter7/wall-07-rose.jpg'

export const ART = {
  1: {
    wall: ch1Wall,
    // the round body in the sky - see lib/world.js
    body: ch1Moon,
    batHero: ch1BatHero,
    batWing: ch1BatWing,
  },
  2: {
    wall: ch2Wall,
    // the mandarin slice is round, so it takes the same slot the moon fills
    body: ch2Slice,
    leaf: ch2Leaf,
    segment: ch2Segment,
    // the whole fruit, falling through the sky alongside the pieces
    mandarin: ch2Mandarin,
  },
  3: {
    wall: ch3Wall,
    // The lotus is the chapter's central artwork, in the same slot as the
    // moon and mandarin slice in the two previous scenes.
    body: ch3Lotus,
    frog: ch3Frog,
    padOne: ch3PadOne,
    padTwo: ch3PadTwo,
  },
  4: {
    wall: ch4Wall,
  },
  5: {
    wall: ch5Wall,
    clouds: ch5Clouds,
    leftKitten: ch5LeftKitten,
    rightKitten: ch5RightKitten,
  },
  6: {
    wall: ch6Wall,
    hill: ch6Hill,
    angel: ch6Angel,
    moon: ch6Moon,
    leftHand: ch6LeftHand,
    rightHand: ch6RightHand,
  },
  7: {
    wall: ch7Wall,
  },
}

// The world layer holds exactly ONE wallpaper and ONE round body and swaps
// their src as chapters change - it never stacks two images in the same slot.
// Two opaque siblings would simply paint over each other, so any frame where
// the crossfade state is missing (a hot reload, a refresh mid-build) would
// show the later one at full opacity and hide the earlier one completely.
//
// The lookup coerces with Number() on purpose: story.js stores `num` as a
// padded STRING ('01', '02'), so ART['02'] is undefined and the fallback
// would swallow the swap silently - chapter 2 would quietly keep showing the
// night sky and the moon with no error anywhere. Chapters without artwork
// return null so the world shows that chapter's palette without old art.
const artFor = (num) => ART[Number(num)]

export const wallFor = (num) => artFor(num)?.wall ?? null
export const bodyFor = (num) => artFor(num)?.body ?? null
