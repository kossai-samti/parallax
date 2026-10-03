import memoryOne from '../assets/memories/memory1.jpg'
import memoryTwo from '../assets/memories/memory2.jpg'
import memoryThree from '../assets/memories/memory3.jpg'
import memoryFour from '../assets/memories/memory4.jpg'
import memoryFive from '../assets/memories/memory5.jpg'

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
    title: 'Before I love your Mother',
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
    title: 'So… I man up',
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
      lines: ['Before I love your Mother...'],
      body: 'To be honest, I always try to remember how I fell in love with you for the first time.',
    },
    {
      kicker: 'And then',
      lines: ['But I simply can\'t.'],
      body: 'And it\'s not because I\'ve forgotten. It is just I can\'t remember how my life was without YOU.',
    },
    {
      kicker: null,
      lines: ['But still, I was able to retrieve glimpses from the past.'],
      body: 'And remember how all of this began. You were the only thing I wanted in that GC, every message I wrote, every "nigga" I wrote, I was hoping YOU were going to see every one of them.',
    },
  ],

  falling: [
    {
      lines: ['I don’t know exactly when it happened.'],
      body: 'But it did happen and I became a lover before becoming a boyfriend.',
    },
    {
      lines: ['Your jokes, your humor, your kindness.'],
      body: 'The brightness you brought every time you appeared made you rent-free in my heart. In this case, your heart, that mf isn\'t mine anymore.',
    },
    {
      lines: ['It\'d be cheesy if I said I didn\'t start loving you.'],
      body: 'Or realized I\'m in love with you because I was in love with you without even meeting YOU. But to be honest, it is what it is. I swear to God, I am pretty sure I\'ve been in love with YOU since before I was a nut in my dad\'s balls.',
    },
  ],

  idea: [
    {
      lines: ['Eventually, I realized I couldn’t keep this to myself or keep waiting any longer.'],
      body: 'But I wasn\'t sure how to tell you..',
    },
    {
      lines: ['Like I was pretty sure you were gonna reject.'],
      body: 'Or like I don\'t know, leak me to reddit to become the next 2 months meme.',
    },
    {
      lines: ['But..'],
      body: 'With the help of fish, and man-ing up, I knew that I must tell you even if you were gonna reject me.',
    },
  ],

  website: [
    {
      lines: ['So..'],
      body: 'In just a short time, I came up with this great idea (3 busy days) to create you a website.',
    },
    {
      lines: ['So I did my best tbh.'],
      body: 'And I was still having my doubts that YOU\'d reject me. But..',
    },
    {
      lines: ['Boooo hoooo YOU DIDNTTTT!!!!!!!!!.'],
      body: 'And to be honest.. Till this day I just can\'t believe, I have you, you are mine, you are MY girl, bcz you are literally everything I want.',
    },
  ],

  us: [
    {
      lines: ['And then you became part of my everyday life.'],
      body: 'A part I don\'t know how I can live without, and I don\'t wanna know tbh.',
    },
  ],

  love: [
    { lines: ['I love You.'], body: null },
    { lines: ['I love your Laugh, your Voice, Your browned like-honey eyes.'], body: null },
    { lines: ['Your hands, Your nails, Your longggg hairr, Your lips, Your everything.'], body: null },
    { lines: ['I love your Kindness, I love your jokes.'], body: null },
    { lines: ['I love myself cz I managed to have You.'], body: null },
    {
      lines: ['I love every tiny thing about you, except for your boobs ofc they aint tiny.'],
      body: 'Everything about you is literally perfection, and for some reason my eyes were able to see a glimpse of your perfection. I really love you so much. And I\'m really in Love with everything about you.',
    },
  ],

  gift: [
    {
      lines: ['I know this is not the best gift a bf could give to his girl…'],
      body: null,
    },
    {
      lines: ['But this long ass distance chained my ass, aswell as Tuna.'],
      body: null,
    },
    {
      lines: ['Thats why I did my best to make this one special to you, by making it only an introduction of your real gift.'],
      body: null,
    },
  ],
}

export const MEMORIES = [
  {
    caption: 'could be ussss',
    note: null,
    src: memoryOne,
  },
  {
    caption: 'could be ussss',
    note: null,
    src: memoryTwo,
  },
  {
    caption: 'could be ussss',
    note: null,
    src: memoryThree,
  },
  {
    caption: 'could be ussss',
    note: null,
    src: memoryFour,
  },
  {
    caption: 'could be ussss',
    note: null,
    src: memoryFive,
  },
]

export const OLD_SITE = {
  url: 'something-i-made-for-you.com',
  lines: ['Something I made for you.', 'Because you are everything I want.', 'Will you be my girl?'],
  question: 'Will you say yes?',
  cta: 'yes',
  alt: 'no',
}

export const GIFT = {
  kicker: 'The gift',
  title: 'The real gift.',
  body: 'Erm so yea I didnt only create a website, I\'ve actually created something for you, I dont wanna spoil it to you, so yea here is your gift.',
  ctaLabel: 'Open your gift',
  href: null,
  signature: '— yours',
}
