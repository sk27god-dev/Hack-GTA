import {
  Competition,
  TimelineEvent,
  FAQItem,
  PrizeCategory,
  Team,
  User
} from '../types';

/**
 * ============================================================
 * ITSA PRESENTS — TECHNOVA 4.0
 * ============================================================
 *
 * Date: 26 September 2026
 *
 * Main Events:
 * 1. TECHNOVA HACKATHON
 * 2. BATTLEZONE
 *
 * ============================================================
 */

/* ============================================================
   COMPETITIONS
   ============================================================ */

export const INITIAL_COMPETITIONS: Competition[] = [
  {
    id: 'technova-hackathon',

    title: 'HACKATHON',

    subtitle: 'BUILD. INNOVATE. DOMINATE.',

    track: 'Hackathon',

    category: 'Hackathon',

    description:
      'A high-intensity 12-hour hackathon where teams turn ideas into working technology solutions. Build, innovate and compete at ITSA Presents TECHNOVA 4.0.',

    rules: [
      'Team size must be between 2 and 4 members.',
      'The hackathon will run for 12 hours.',
      'Participants must report before the hackathon begins.',
      'Participants must carry their own laptops and required equipment.',
      'Meals will be provided to registered participants.',
      'Final submissions must be completed before 7:30 PM.'
    ],

    judgingCriteria: [
      {
        criterion: 'Innovation',
        weight: 25,
        description:
          'Originality, creativity and uniqueness of the solution.'
      },
      {
        criterion: 'Technical Implementation',
        weight: 25,
        description:
          'Quality, functionality and effectiveness of the implementation.'
      },
      {
        criterion: 'Impact & Usefulness',
        weight: 25,
        description:
          'Practical value and potential real-world impact.'
      },
      {
        criterion: 'Presentation',
        weight: 25,
        description:
          'Clarity of demonstration, explanation and final presentation.'
      }
    ],

    schedule: {
      date: '26 September 2026',
      time: '7:30 AM – 7:30 PM',
      location: 'IT Labs',
      stage: '12-HOUR HACKATHON'
    },

    prize: '₹30,000',

    prizeAmount: 30000,

    teamSize: 4,

    teamSizeMin: 2,

    teamSizeMax: 4,

    teamSizeLabel: '2–4 MEMBERS',

    image: '/images/hackathon.jpg',

    featured: true,

    colorAccent: 'cyan',

    tags: [
      '₹30,000 PRIZE POOL',
      '12 HOURS',
      '7:30 AM – 7:30 PM',
      'IT LABS',
      'MEALS PROVIDED',
      'TEAM 2–4'
    ],

    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScuLzspcZJyN1zZBb4AkzqX9gQ9gVKYyihieiLAk0v5WyaH3g/viewform?usp=header',

    registrationType: 'google-form',

    showRules: true,

    showJudgingCriteria: true,

    showSchedule: true
  },

  /* ==========================================================
     BATTLEZONE
     ========================================================== */

  {
    id: 'battlezone',

    title: 'BATTLEZONE',

    subtitle: 'CHOOSE YOUR BATTLEFIELD.',

    track: 'Gaming',

    category: 'Battlezone',

    description:
      'The gaming arena of TECHNOVA 4.0 featuring Treasure Hunt, BGMI and FIFA Mobile / E-Football. Pick your battlefield and fight your way to the top.',

    rules: [
      'Participants must register for their selected Battlezone event.',
      'BGMI is a solo competition.',
      'FIFA Mobile / E-Football is a solo competition.',
      'Treasure Hunt requires a team of 3–4 participants.',
      'Participants must follow the event-specific rules announced by the organisers.',
      'Any form of cheating or unfair play will result in disqualification.'
    ],

    judgingCriteria: [],

    schedule: {
      date: '26 September 2026',
      time: 'Event timings will be announced',
      location: 'TECHNOVA 4.0',
      stage: 'BATTLEZONE'
    },

    prize: '₹5,000 TOTAL',

    prizeAmount: 5000,

    teamSize: 1,

    teamSizeMin: 1,

    teamSizeMax: 4,

    teamSizeLabel: 'SOLO / 3–4 TREASURE HUNT',

    image: '/images/battlezone.jpg',

    featured: true,

    colorAccent: 'pink',

    tags: [
      'TREASURE HUNT — ₹2,000',
      'BGMI — ₹1,500',
      'E-FOOTBALL — ₹1,500',
      'SOLO EVENTS',
      'TREASURE HUNT 3–4'
    ],

    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSczdPFgRyUKOi2dKMadTet-S6lVHwOcX85lOnfSKoMa0eu3Sg/viewform?usp=header',

    registrationType: 'google-form',

    showRules: true,

    showJudgingCriteria: false,

    showSchedule: true
  }
];

/* ============================================================
   TIMELINE
   ============================================================ */

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'timeline-reporting',

    time: '07:00 AM',

    date: '26 September 2026',

    day: 'Day 1',

    title: 'REPORTING & REGISTRATION',

    location: 'IT Labs',

    description:
      'Participants report at the venue, complete registration and prepare for TECHNOVA 4.0.',

    status: 'upcoming',

    statusLabel: 'STANDBY',

    image: '/images/hackathon.jpg',

    track: 'TECHNOVA 4.0',

    category: 'TECHNOVA',

    badgeColor: 'cyan'
  },

  {
    id: 'timeline-hackathon-start',

    time: '07:30 AM',

    date: '26 September 2026',

    day: 'Day 1',

    title: 'HACKATHON BEGINS',

    location: 'IT Labs',

    description:
      'The 12-hour TECHNOVA Hackathon begins. Teams start building their solutions.',

    status: 'upcoming',

    statusLabel: 'IN PROGRESS',

    image: '/images/hackathon.jpg',

    track: 'Hackathon',

    category: 'Hackathon',

    badgeColor: 'cyan'
  },

  {
    id: 'timeline-battlezone',

    time: 'THROUGHOUT THE DAY',

    date: '26 September 2026',

    day: 'Day 1',

    title: 'BATTLEZONE',

    location: 'TECHNOVA 4.0',

    description:
      'Treasure Hunt, BGMI and FIFA Mobile / E-Football competitions take place during the event.',

    status: 'upcoming',

    statusLabel: 'STANDBY',

    image: '/images/battlezone.jpg',

    track: 'Gaming',

    category: 'Battlezone',

    badgeColor: 'pink'
  },

  {
    id: 'timeline-hackathon-end',

    time: '07:30 PM',

    date: '26 September 2026',

    day: 'Day 1',

    title: 'HACKATHON ENDS',

    location: 'IT Labs',

    description:
      'The 12-hour hackathon concludes and teams submit their final solutions.',

    status: 'upcoming',

    statusLabel: 'FINAL DIRECTIVE',

    image: '/images/hackathon.jpg',

    track: 'Hackathon',

    category: 'Hackathon',

    badgeColor: 'yellow'
  }
];

/* ============================================================
   FAQ
   ============================================================ */

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-hackathon-team',

    question: 'What is the hackathon team size?',

    answer:
      'Hackathon teams must have a minimum of 2 members and a maximum of 4 members.',

    category: 'Registration',

    featured: true
  },

  {
    id: 'faq-hackathon-duration',

    question: 'How long is the hackathon?',

    answer:
      'TECHNOVA Hackathon is a 12-hour event running from 7:30 AM to 7:30 PM on 26 September 2026.',

    category: 'Rules & Loadout',

    featured: true
  },

  {
    id: 'faq-hackathon-location',

    question: 'Where will the hackathon take place?',

    answer:
      'The TECHNOVA Hackathon will be conducted at the IT Labs.',

    category: 'Accommodations'
  },

  {
    id: 'faq-meals',

    question: 'Will meals be provided?',

    answer:
      'Yes. Meals will be provided to registered hackathon participants.',

    category: 'Accommodations'
  },

  {
    id: 'faq-battlezone',

    question: 'What events are included in Battlezone?',

    answer:
      'Battlezone includes Treasure Hunt, BGMI and FIFA Mobile / E-Football.',

    category: 'Registration',

    featured: true
  },

  {
    id: 'faq-treasure-team',

    question: 'What is the Treasure Hunt team size?',

    answer:
      'Treasure Hunt teams must have 3 to 4 participants.',

    category: 'Rules & Loadout'
  },

  {
    id: 'faq-gaming',

    question: 'Are BGMI and E-Football team events?',

    answer:
      'No. BGMI and FIFA Mobile / E-Football are individual competitions.',

    category: 'Rules & Loadout'
  },

  {
    id: 'faq-prizes',

    question: 'What are the prizes?',

    answer:
      'The Hackathon has a ₹30,000 prize pool. Battlezone has ₹2,000 for Treasure Hunt and ₹1,500 each for BGMI and FIFA Mobile / E-Football.',

    category: 'Prizes & Crypto',

    featured: true
  }
];

/* ============================================================
   PRIZES
   ============================================================ */

export const INITIAL_PRIZES: PrizeCategory[] = [
  {
    id: 'hackathon-prize',

    title: 'HACKATHON',

    subtitle: '12-HOUR BUILD BATTLE',

    amount: '₹30,000',

    numericalAmount: 30000,

    icon: '💻',

    description:
      '₹30,000 prize pool for the TECHNOVA 4.0 Hackathon.',

    badgeBg: '#00E5FF',

    badgeText: '#000000',

    accentColor: 'cyan'
  },

  {
    id: 'treasure-prize',

    title: 'TREASURE HUNT',

    subtitle: 'BATTLEZONE',

    amount: '₹2,000',

    numericalAmount: 2000,

    icon: '🗺️',

    description:
      '₹2,000 prize pool for the Battlezone Treasure Hunt.',

    badgeBg: '#FFD54F',

    badgeText: '#000000',

    accentColor: 'yellow'
  },

  {
    id: 'bgmi-prize',

    title: 'BGMI',

    subtitle: 'BATTLEZONE • SOLO',

    amount: '₹1,500',

    numericalAmount: 1500,

    icon: '🎮',

    description:
      '₹1,500 prize pool for the individual BGMI competition.',

    badgeBg: '#FF6FB5',

    badgeText: '#000000',

    accentColor: 'pink'
  },

  {
    id: 'efootball-prize',

    title: 'FIFA MOBILE / E-FOOTBALL',

    subtitle: 'BATTLEZONE • SOLO',

    amount: '₹1,500',

    numericalAmount: 1500,

    icon: '⚽',

    description:
      '₹1,500 prize pool for the individual FIFA Mobile / E-Football competition.',

    badgeBg: '#00E5FF',

    badgeText: '#000000',

    accentColor: 'cyan'
  }
];

/* ============================================================
   SAMPLE TEAMS
   ============================================================ */

export const SAMPLE_TEAMS: Team[] = [];

/* ============================================================
   SAMPLE USERS
   ============================================================ */

export const SAMPLE_USERS: User[] = [
  {
    uid: 'demo-user-1',

    email: 'demo@technova.com',

    displayName: 'TECHNOVA OPERATIVE',

    college: 'ITSA',

    year: 2,

    phone: '',

    role: 'user',

    avatar: '',

    registeredCompetitions: [],

    teamIds: [],

    createdAt: '2026-08-01'
  },

  {
    uid: 'admin-1',

    email: 'admin@technova.com',

    displayName: 'TECHNOVA ADMIN',

    college: 'ITSA',

    year: 2,

    phone: '',

    role: 'admin',

    avatar: '',

    registeredCompetitions: [],

    teamIds: [],

    createdAt: '2026-08-01'
  }
];