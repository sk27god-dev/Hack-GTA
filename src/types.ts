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
  registeredCompetitions: string[]; // Competition IDs
  teamIds: string[]; // Team IDs
  createdAt: string;
}

export interface Competition {
  id: string;
  title: string;
  subtitle?: string;
  track: 'Cybersecurity' | 'Algorithms' | 'Web3 & Decentralization' | 'Artificial Intelligence' | 'Game Dev' | 'Open Innovation';
  description: string;
  rules: string[];
  judgingCriteria: { criterion: string; weight: number; description: string }[];
  schedule: {
    date: string;
    time: string;
    location: string;
    stage: string;
  };
  prize: string;
  prizeAmount: number;
  teamSize: number;
  maxTeams?: number;
  image: string;
  featured: boolean;
  colorAccent?: 'cyan' | 'pink' | 'yellow' | 'orange';
  tags: string[];
}

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
  code: string; // 6-digit invite code
  name: string;
  competitionId: string;
  competitionTitle: string;
  captainId: string;
  captainName: string;
  captainEmail: string;
  members: TeamMember[];
  maxMembers: number;
  status: 'recruiting' | 'ready' | 'submitted';
  projectTitle?: string;
  projectRepo?: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  date: string;
  day: 'Day 1' | 'Day 2' | 'Day 3';
  title: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'past';
  statusLabel?: 'MISSION PASSED' | 'IN PROGRESS' | 'STANDBY' | 'FINAL DIRECTIVE';
  image: string;
  track?: string;
  badgeColor?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Registration' | 'Rules & Loadout' | 'Accommodations' | 'Prizes & Crypto';
  featured?: boolean;
}

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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  codename?: string;
  topic: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'resolved';
}
