export type UserRole = 'user' | 'admin';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  college: string;
  year: number | string;
  phone: string;
  role: UserRole;
  avatar?: string;
  registeredCompetitions: string[];
  teamIds: string[];
  createdAt: string;
}

/* ============================================================
   COMPETITIONS / EVENTS
   ============================================================ */

export interface Competition {
  id: string;

  title: string;
  subtitle?: string;

  /*
   * Main category of the event.
   *
   * Examples:
   * - Hackathon
   * - Battlezone
   */
  track: string;

  description: string;

  /*
   * Optional category used by some homepage/card components.
   */
  category?: string;

  /*
   * Event details
   */
  rules: string[];

  judgingCriteria: {
    criterion: string;
    weight: number;
    description: string;
  }[];

  schedule: {
    date: string;
    time: string;
    location: string;
    stage: string;
  };

  /*
   * Prize information
   */
  prize: string;
  prizeAmount: number;

  /*
   * Existing app compatibility
   *
   * teamSize = maximum team size.
   */
  teamSize: number;

  /*
   * New flexible team-size information.
   *
   * Example:
   * Hackathon → 2–4
   * Treasure Hunt → 3–4
   * BGMI → Solo
   * E-Football → Solo
   */
  teamSizeMin?: number;
  teamSizeMax?: number;
  teamSizeLabel?: string;

  maxTeams?: number;

  /*
   * Image shown on event cards.
   */
  image: string;

  featured: boolean;

  /*
   * GTA / TECHNOVA accent system.
   */
  colorAccent?: 'cyan' | 'pink' | 'yellow' | 'orange';

  /*
   * Tags displayed on cards/details.
   */
  tags: string[];

  /*
   * External Google Form registration.
   */
  registrationUrl?: string;

  /*
   * Registration method.
   */
  registrationType?: 'google-form' | 'internal';

  /*
   * Controls visibility of unfinished sections.
   */
  showRules?: boolean;
  showJudgingCriteria?: boolean;
  showSchedule?: boolean;
}

/* ============================================================
   TEAMS
   ============================================================ */

export interface TeamMember {
  uid: string;
  displayName: string;
  email: string;
  college?: string;

  role: 'captain' | 'member';

  joinedAt: string;
}

export interface Team {
  id: string;

  code: string;
  name: string;

  competitionId: string;
  competitionTitle: string;

  captainId: string;
  captainName: string;
  captainEmail: string;

  members: TeamMember[];

  maxMembers: number;

  status:
    | 'recruiting'
    | 'ready'
    | 'submitted';

  projectTitle?: string;
  projectRepo?: string;

  createdAt: string;
}

/* ============================================================
   TIMELINE
   ============================================================ */

export interface TimelineEvent {
  id: string;

  time: string;
  date: string;

  /*
   * Kept for compatibility with the existing timeline system.
   */
  day: 'Day 1' | 'Day 2' | 'Day 3';

  title: string;

  location: string;

  description: string;

  status:
    | 'upcoming'
    | 'ongoing'
    | 'past';

  statusLabel?:
    | 'MISSION PASSED'
    | 'IN PROGRESS'
    | 'STANDBY'
    | 'FINAL DIRECTIVE';

  image: string;

  /*
   * Existing event track.
   */
  track?: string;

  /*
   * Used by HomePage / event filtering.
   */
  category?: string;

  badgeColor?: string;
}

/* ============================================================
   FAQ
   ============================================================ */

export interface FAQItem {
  id: string;

  question: string;
  answer: string;

  category:
    | 'Registration'
    | 'Rules & Loadout'
    | 'Accommodations'
    | 'Prizes & Crypto';

  featured?: boolean;
}

/* ============================================================
   PRIZES
   ============================================================ */

export interface PrizeCategory {
  id: string;

  title: string;
  subtitle: string;

  amount: string;
  numericalAmount: number;

  icon: string;

  description: string;

  badgeBg: string;
  badgeText: string;

  accentColor: string;
}

/* ============================================================
   CONTACT / FIXER MESSAGES
   ============================================================ */

export interface ContactMessage {
  id: string;

  name: string;
  email: string;

  codename?: string;

  topic: string;
  message: string;

  createdAt: string;

  status:
    | 'unread'
    | 'resolved';
}