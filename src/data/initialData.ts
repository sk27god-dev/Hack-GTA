import {
  Competition,
  TimelineEvent,
  FAQItem,
  PrizeCategory,
  Team,
  User
} from '../types';

import hackersImg from '../assets/images/Hackers.jpg';
import efootballPoster from '../assets/images/efootball_poster.jpg';
import bgmiPoster from '../assets/images/bgmi_poster.jpg';
import itLabImg from '../assets/images/IT-Lab.jpg';
import coderImg from '../assets/images/coder.jpg';
import eventImg from '../assets/images/Event.jpg';

/**
 * ============================================================
 * ITSA PRESENTS — TECHNOVA 4.0
 * ============================================================
 *
 * Date: 26 September 2026
 *
 * Main Events:
 * 1. TECHNOVA HACKATHON
 * 2. E-FOOTBALL
 * 3. BGMI
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

    image: hackersImg,

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
     CARD 1 — E-FOOTBALL
     ========================================================== */

  {
    id: 'efootball',

    title: 'E-FOOTBALL',

    subtitle: 'FROM THE STREETS TO THE STADIUM.',

    track: 'Gaming',

    category: 'E-Football',

    description:
      'The gaming arena of TECHNOVA 4.0 featuring E-Football. Pick your battlefield and fight your way to the top.',

    rules: [
      'Participants must register for the E-Football event.',
      'E-Football is a solo competition.',
      'Participants must follow the event-specific rules announced by the organisers.',
      'Any form of cheating or unfair play will result in disqualification.'
    ],

    judgingCriteria: [],

    schedule: {
      date: '26 September 2026',
      time: 'Event timings will be announced',
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
      'SOLO COMPETITION',
      'TECHNOVA 4.0',
      'TIMINGS TBA'
    ],

    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSczdPFgRyUKOi2dKMadTet-S6lVHwOcX85lOnfSKoMa0eu3Sg/viewform?usp=header',

    registrationType: 'google-form',

    showRules: true,

    showJudgingCriteria: false,

    showSchedule: true
  },

  /* ==========================================================
     CARD 2 — BGMI
     ========================================================== */

  {
    id: 'bgmi',

    title: 'BGMI',

    subtitle: "THE STREETS AREN'T SAFE. • MODE: CLASSIC",

    track: 'Gaming',

    category: 'BGMI',

    description:
      'The gaming arena of TECHNOVA 4.0 featuring BGMI Classic Squad Showdown. Pick your battlefield and fight your way to the top.',

    rules: [
      'Participants must register for the BGMI Squad event (Team of 4).',
      'Mode: Classic.',
      'Entry Fees: ₹200 per team.',
      'Participants must follow the event-specific rules announced by the organisers.',
      'Any form of cheating or unfair play will result in disqualification.'
    ],

    judgingCriteria: [],

    schedule: {
      date: '26 September 2026',
      time: 'Event timings will be announced',
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
      'TEAM OF 4 (SQUAD)',
      'MODE: CLASSIC',
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

    image: itLabImg,

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

    image: coderImg,

    track: 'Hackathon',

    category: 'Hackathon',

    badgeColor: 'cyan'
  },

  {
    id: 'timeline-gaming',

    time: 'THROUGHOUT THE DAY',

    date: '26 September 2026',

    day: 'Day 1',

    title: 'E-FOOTBALL & BGMI GAMING ARENA',

    location: 'TECHNOVA 4.0',

    description:
      'BGMI and E-Football solo competitions take place throughout the event.',

    status: 'upcoming',

    statusLabel: 'STANDBY',

    image: efootballPoster,

    track: 'Gaming',

    category: 'Gaming',

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

    image: eventImg,

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
    id: 'faq-gaming-events',

    question: 'What gaming events are featured in TECHNOVA 4.0?',

    answer:
      'TECHNOVA 4.0 features two individual gaming tournaments: E-Football (₹2,500 prize pool) and BGMI (₹2,500 prize pool).',

    category: 'Registration',

    featured: true
  },

  {
    id: 'faq-gaming',

    question: 'Are BGMI and E-Football team events?',

    answer:
      'E-Football is a solo competition (₹30 per person), while BGMI is a 4-player Squad competition (₹200 per team, TDM mode).',

    category: 'Rules & Loadout'
  },

  {
    id: 'faq-prizes',

    question: 'What are the prizes?',

    answer:
      'The Hackathon has a ₹30,000 prize pool. E-Football has ₹2,500 and BGMI has ₹2,500, making the total prize pool ₹35,000+.',

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

    subtitle: 'GAMING ARENA • SOLO',

    amount: '₹2,500',

    numericalAmount: 2500,

    icon: '🎮',

    description:
      '₹2,500 prize pool for the individual BGMI competition.',

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