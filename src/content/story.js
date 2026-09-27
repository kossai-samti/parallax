export const SENDER = 'M'
export const RECEIVER = 'You'

const bat = {
  skyTop: '#04030a',
  skyMid: '#0b0817',
  skyLow: '#17102e',
  text: '#ece7fb',
  accent: '#8b6cf0',
  glow: '#5b3fc4',
  celHi: '#f4f1ff',
  celCore: '#cfc6f2',
  celEdge: '#6d5aa8',
}

const mandarin = {
  skyTop: '#2b0f04',
  skyMid: '#8c3410',
  skyLow: '#e8762a',
  text: '#fff2e2',
  accent: '#ff9a45',
  glow: '#ff6f1a',
  celHi: '#ffd9a0',
  celCore: '#ff9c33',
  celEdge: '#c04a0d',
}

const frog = {
  skyTop: '#04211f',
  skyMid: '#0d4a40',
  skyLow: '#2f8f6d',
  text: '#ecfff3',
  accent: '#8ff0a4',
  glow: '#25c98a',
  celHi: '#fff6c9',
  celCore: '#ffd75e',
  celEdge: '#e59a1c',
}

const monster = {
  skyTop: '#07030f',
  skyMid: '#1c0a35',
  skyLow: '#3f1274',
  text: '#f4e9ff',
  accent: '#c084fc',
  glow: '#a855f7',
  celHi: '#f0d9ff',
  celCore: '#b45cff',
  celEdge: '#4b1170',
}

const cats = {
  skyTop: '#c9ced6',
  skyMid: '#e4e7ec',
  skyLow: '#f6f5f3',
  text: '#26282e',
  accent: '#7c8290',
  glow: '#ffffff',
  celHi: '#ffffff',
  celCore: '#fdfbf6',
  celEdge: '#dcdfe6',
}

const everything = {
  skyTop: '#0a0411',
  skyMid: '#241039',
  skyLow: '#432060',
  text: '#f8f0ff',
  accent: '#d8b4fe',
  glow: '#a855f7',
  celHi: '#fbe6ff',
  celCore: '#c98cff',
  celEdge: '#5b1d86',
}

const rose = {
  skyTop: '#25040f',
  skyMid: '#6d0f3a',
  skyLow: '#c2417a',
  text: '#fff0f6',
  accent: '#ffb3d1',
  glow: '#ff4f92',
  celHi: '#ffe3ee',
  celCore: '#ff6fa6',
  celEdge: '#8d1147',
}

export const CHAPTERS = [
  {
    id: 'first-meeting',
    num: '01',
    icon: 'bat',
    emoji: '🦇',
    label: 'The first time I met you',
    title: 'Before you became\nsomeone I loved',
    world: 'gothic night',
    palette: bat,
    units: 5,
  },
  {
    id: 'falling',
    num: '02',
    icon: 'mandarin',
    emoji: '🍊',
    label: 'When I started falling for you',
    title: 'Somewhere along the way',
    world: 'warm mandarin',
    palette: mandarin,
    units: 5,
  },
  {
    id: 'idea',
    num: '03',
    icon: 'frog',
    emoji: '🐸',
    label: 'The moment I decided to ask you',
    title: 'So… I had an idea',
    world: 'playful pond',
    palette: frog,
    units: 5,
  },
  {
    id: 'website',
    num: '04',
    icon: 'monster',
    emoji: '💜',
    label: 'The website I made to ask you',
    title: 'Something I made for you',
    world: 'neon purple',
    palette: monster,
    units: 5,
  },
  {
    id: 'us',
    num: '05',
    icon: 'cat',
    emoji: '🐈',
    label: 'Us',
    title: 'Then there was us',
    world: 'soft grey',
    palette: cats,
    units: 5,
  },
  {
    id: 'love',
    num: '06',
    icon: 'heart',
    emoji: '❤️',
    label: 'Everything I love about you',
    title: 'All the small things',
    world: 'all of them at once',
    palette: everything,
    units: 5,
  },
  {
    id: 'gift',
    num: '07',
    icon: 'gift',
    emoji: '💗',
    label: 'The gift',
    title: 'For you',
    world: 'rose',
    palette: rose,
    units: 5,
  },
]

export const STORY = {
  'first-meeting': [
    {
      kicker: 'Chapter one',
      lines: ['Before you became someone I loved…'],
      body: 'you were just a girl I had never met.',
    },
    {
      kicker: 'And then',
      lines: ['It was an ordinary day.'],
      body: 'Put the place, the hour, and the first thing she said here. The real version is always better than the dramatic one.',
    },
    {
      kicker: null,
      lines: ['I had no idea what was starting.'],
      body: 'To me you were a stranger with a name. That was the whole story.',
    },
  ],

  falling: [
    {
      lines: ['I don’t know exactly when it happened.'],
      body: 'There was no moment. No music. Nothing clicked and stayed clicked.',
    },
    {
      lines: ['At some point, talking to you stopped feeling ordinary.'],
      body: 'Same words. Different weight. I started looking forward to it.',
    },
    {
      lines: ['And I realized I was starting to fall for you.'],
      body: 'And I liked the fall far too much to say anything about it.',
    },
  ],

  idea: [
    {
      lines: ['Eventually, I realized I couldn’t keep this to myself.'],
      body: 'Not the feeling. Not one word of it. I had run out of ways to hide it.',
    },
    {
      lines: ['So obviously…'],
      body: 'A long pause. Very suspenseful. Very dramatic.',
    },
    {
      lines: ['…I made you a website.'],
      body: 'Because of course I did.',
      cta: { to: 'website', label: 'Keep reading' },
    },
  ],

  website: [
    {
      lines: ['So I built one.'],
      body: 'Late nights, too much CSS, and one very large question at the bottom of it.',
    },
    {
      lines: ['And somehow…'],
      body: 'You opened it. You scrolled. You didn’t close the tab.',
    },
    {
      lines: ['You said yes.'],
      body: 'And then the world kept going, but everything in it had changed.',
    },
  ],

  us: [
    {
      lines: ['And then you became part of my everyday life.'],
      body: 'Not a chapter. Just… Tuesday. And every other day after it.',
    },
  ],

  love: [
    { lines: ['I love the way you…'], body: null },
    { lines: ['…make ordinary things interesting.'], body: null },
    { lines: ['…get excited about the things you love.'], body: null },
    { lines: ['…are completely yourself.'], body: null },
    { lines: ['…make me want to be better without ever asking me to be.'], body: null },
    {
      lines: ['All of that is you.'],
      body: 'And I get to keep it. That is still the part I can’t get used to.',
    },
  ],

  gift: [
    {
      lines: ['I made all of this because I wanted to give you something…'],
      body: null,
    },
    {
      lines: ['…that exists only because you exist in my life.'],
      body: null,
    },
    {
      lines: ['And this is for you.'],
      body: null,
    },
  ],
}

export const MEMORIES = [
  {
    caption: 'This.',
    note: 'Drop the photo into src/assets/memories/ and set src.',
    src: null,
  },
  {
    caption: 'This stupid conversation.',
    note: 'The one you still have open somewhere.',
    src: null,
  },
  {
    caption: 'This day.',
    note: 'Nothing happened. That is why it matters.',
    src: null,
  },
  {
    caption: 'This moment I still remember.',
    note: 'You probably have no idea which one.',
    src: null,
  },
]

export const OLD_SITE = {
  url: 'something-i-made-for-you.com',
  lines: ['I wrote it down', 'because I could not say it', 'out loud.'],
  question: 'will you be my girlfriend?',
  cta: 'yes',
  alt: 'no',
}

export const GIFT = {
  kicker: 'The gift',
  title: 'Something that only exists because of you',
  body: 'Replace this with the real gift — a letter, a photo, a playlist, an app. Anything that makes them laugh or cry a little.',
  ctaLabel: 'Open your gift',
  href: null,
  signature: '— yours',
}
