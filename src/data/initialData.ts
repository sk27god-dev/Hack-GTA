import {
  Competition,
  TimelineEvent,
  FAQItem,
  PrizeCategory,
  Team,
  User
} from '../types';

import hackathonPoster from '../assets/images/Hackathon.png';
import efootballPoster from '../assets/images/efootball_poster.jpg';
import bgmiPoster from '../assets/images/bgmi (1).png';

/**
 * ============================================================
 * ITSA PRESENTS — TECHNOVA 4.0
 * ============================================================
 *
 * Day 1: 25 September 2026
 * Events: E-Football & BGMI
 *
 * Day 2: 28 September 2026
 * Event: 12-Hour Hackathon
 *
 * Hackathon Timing:
 * 8:00 AM – 8:00 PM
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
      'The hackathon will run for 12 hours from 8:00 AM to 8:00 PM.',
      'Participants must report before the hackathon begins.',
      'Participants must carry their own laptops and required equipment.',
      'Meals will be provided to registered participants.',
      'Final submissions must be completed before 8:00 PM.'
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
      date: '28 September 2026',
      time: '8:00 AM – 8:00 PM',
      location: 'IT Labs',
      stage: '12-HOUR HACKATHON'
    },

    prize: '₹30,000',

    prizeAmount: 30000,

    teamSize: 4,

    teamSizeMin: 2,

    teamSizeMax: 4,

    teamSizeLabel: '2–4 MEMBERS',

    image: hackathonPoster,

    featured: true,

    colorAccent: 'cyan',

    tags: [
      '₹30,000 PRIZE POOL',
      'OPEN FOR ALL',
      '12 HOURS',
      '28 SEPTEMBER 2026',
      '8:00 AM – 8:00 PM',
      'IT LABS',
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
     E-FOOTBALL
     ========================================================== */

  {
    id: 'efootball',

    title: 'E-FOOTBALL',

    subtitle: 'FROM THE STREETS TO THE STADIUM.',

    track: 'Gaming',

    category: 'E-Football',

    description:
      'The gaming arena of TECHNOVA 4.0 featuring E-Football. Compete, dominate and fight your way to the top.',

    rules: [
      'Participants must register for the E-Football event.',
      'E-Football is a solo competition.',
      'Participants must follow the event-specific rules announced by the organisers.',
      'Any form of cheating or unfair play will result in disqualification.'
    ],

    judgingCriteria: [],

    schedule: {
      date: '25 September 2026',
      time: 'Throughout the day',
      location: 'TECHNOVA 4.0',
      stage: 'E-FOOTBALL'
    },

    prize: '₹2,500',

    prizeAmount: 2500,

    teamSize: 1,

    teamSizeMin: 1,

    teamSizeMax: 1,

    teamSizeLabel: 'SOLO',

    image: efootballPoster,

    featured: true,

    colorAccent: 'pink',

    tags: [
      '₹2,500 PRIZE POOL',
      '25 SEPTEMBER 2026',
      'SOLO COMPETITION',
      'FULL DAY EVENT',
      'TECHNOVA 4.0'
    ],

    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSczdPFgRyUKOi2dKMadTet-S6lVHwOcX85lOnfSKoMa0eu3Sg/viewform?usp=header',

    registrationType: 'google-form',

    showRules: true,

    showJudgingCriteria: false,

    showSchedule: true
  },

  /* ==========================================================
     BGMI
     ========================================================== */

  {
    id: 'bgmi',

    title: 'BGMI',

    subtitle: "THE STREETS AREN'T SAFE. • MODE: CLASSIC",

    track: 'Gaming',

    category: 'BGMI',

    description:
      'The gaming arena of TECHNOVA 4.0 featuring the BGMI Classic Squad Showdown. Form your squad and fight your way to the top.',

    rules: [
      'Participants must register for the BGMI Squad event.',
      'Each team must consist of exactly 4 players.',
      'Mode: Classic.',
      'Entry Fees: ₹200 per team.',
      'Participants must follow the event-specific rules announced by the organisers.',
      'Any form of cheating or unfair play will result in disqualification.'
    ],

    judgingCriteria: [],

    schedule: {
      date: '25 September 2026',
      time: 'Throughout the day',
      location: 'TECHNOVA 4.0',
      stage: 'BGMI'
    },

    prize: '₹2,500',

    prizeAmount: 2500,

    teamSize: 4,

    teamSizeMin: 4,

    teamSizeMax: 4,

    teamSizeLabel: 'TEAM OF 4 (SQUAD)',

    image: bgmiPoster,

    featured: true,

    colorAccent: 'cyan',

    tags: [
      '₹2,500 PRIZE POOL',
      '25 SEPTEMBER 2026',
      'TEAM OF 4 (SQUAD)',
      'MODE: CLASSIC',
      'FULL DAY EVENT',
      '₹200 / TEAM',
      'TECHNOVA 4.0'
    ],

    registrationUrl:
      'https://forms.gle/tcBTQ3WBHXXAhjPQA',

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

  /* ===================== DAY 1 ===================== */

  {
    id: 'timeline-efootball',

    time: 'THROUGHOUT THE DAY',

    date: '25 September 2026',

    day: 'Day 1',

    title: 'E-FOOTBALL GAMING ARENA',

    location: 'TECHNOVA 4.0',

    description:
      'The E-Football tournament takes place throughout Day 1. Compete in the solo gaming competition and fight your way to the top.',

    status: 'upcoming',

    statusLabel: 'STANDBY',

    image: efootballPoster,

    track: 'Gaming',

    category: 'E-Football',

    badgeColor: 'pink'
  },

  {
    id: 'timeline-bgmi',

    time: 'THROUGHOUT THE DAY',

    date: '25 September 2026',

    day: 'Day 1',

    title: 'BGMI SQUAD SHOWDOWN',

    location: 'TECHNOVA 4.0',

    description:
      'BGMI Classic Squad teams battle throughout Day 1 of TECHNOVA 4.0. Form your squad of four and compete for the prize pool.',

    status: 'upcoming',

    statusLabel: 'STANDBY',

    image: bgmiPoster,

    track: 'Gaming',

    category: 'BGMI',

    badgeColor: 'cyan'
  },


  /* ===================== DAY 2 ===================== */

  {
    id: 'timeline-hackathon-start',

    time: '08:00 AM',

    date: '28 September 2026',

    day: 'Day 2',

    title: 'HACKATHON BEGINS',

    location: 'IT Labs',

    description:
      'The 12-hour TECHNOVA Hackathon officially begins at 8:00 AM. Teams start building and developing their technology solutions.',

    status: 'upcoming',

    statusLabel: 'STANDBY',

    image: hackathonPoster,

    track: 'Hackathon',

    category: 'Hackathon',

    badgeColor: 'cyan'
  },

  {
    id: 'timeline-hackathon-end',

    time: '08:00 PM',

    date: '28 September 2026',

    day: 'Day 2',

    title: 'HACKATHON ENDS & FINAL SUBMISSION',

    location: 'IT Labs',

    description:
      'The 12-hour TECHNOVA Hackathon concludes at 8:00 PM. Teams complete and submit their final technology solutions.',

    status: 'upcoming',

    statusLabel: 'FINAL DIRECTIVE',

    image: hackathonPoster,

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
    id: 'faq-hackathon-date',

    question: 'When is the TECHNOVA Hackathon?',

    answer:
      'The TECHNOVA Hackathon will take place on 28 September 2026 from 8:00 AM to 8:00 PM.',

    category: 'Registration',

    featured: true
  },

  {
    id: 'faq-hackathon-duration',

    question: 'How long is the hackathon?',

    answer:
      'TECHNOVA Hackathon is a 12-hour event running from 8:00 AM to 8:00 PM on 28 September 2026.',

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
    id: 'faq-gaming-date',

    question: 'When are the gaming events?',

    answer:
      'The E-Football and BGMI gaming events will take place throughout the day on 25 September 2026.',

    category: 'Registration',

    featured: true
  },

  {
    id: 'faq-gaming-events',

    question: 'What gaming events are featured in TECHNOVA 4.0?',

    answer:
      'TECHNOVA 4.0 features two gaming tournaments: E-Football with a ₹2,500 prize pool and BGMI with a ₹2,500 prize pool.',

    category: 'Registration',

    featured: true
  },

  {
    id: 'faq-gaming',

    question: 'Are BGMI and E-Football team events?',

    answer:
      'E-Football is a solo competition, while BGMI is a 4-player Squad competition with an entry fee of ₹200 per team.',

    category: 'Rules & Loadout'
  },

  {
    id: 'faq-prizes',

    question: 'What are the prizes?',

    answer:
      'The Hackathon has a ₹30,000 prize pool. E-Football has ₹2,500 and BGMI has ₹2,500, making the total prize pool ₹35,000.',

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
    id: 'efootball-prize',

    title: 'E-FOOTBALL',

    subtitle: 'GAMING ARENA • SOLO',

    amount: '₹2,500',

    numericalAmount: 2500,

    icon: '⚽',

    description:
      '₹2,500 prize pool for the individual E-Football competition.',

    badgeBg: '#FF6FB5',

    badgeText: '#000000',

    accentColor: 'pink'
  },

  {
    id: 'bgmi-prize',

    title: 'BGMI',

    subtitle: 'GAMING ARENA • TEAM OF 4',

    amount: '₹2,500',

    numericalAmount: 2500,

    icon: '🎮',

    description:
      '₹2,500 prize pool for the BGMI Squad competition.',

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