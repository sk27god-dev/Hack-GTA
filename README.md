# Tech Fest 2025 – Vice Tech Noir 🌴💻

> A Grand Theft Auto (GTA: Vice City)-inspired collegiate hackathon & tech fest application featuring mission tracks, interactive timeline drop-offs, dynamic escrow prize pools, squad crew formation, and an authentic Web Audio synth engine.

---

## 📖 Table of Contents

- [Overview & Aesthetics](#-overview--aesthetics)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [User Personas & Role Matrix](#-user-personas--role-matrix)
- [Secret Admin Access (Easter Egg)](#-secret-admin-access-easter-egg)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Audio & Sound Effects Engine](#-audio--sound-effects-engine)
- [Production Build & Deployment](#-production-build--deployment)

---

## 🌴 Overview & Aesthetics

**Tech Fest 2025** is themed around a retro-futuristic **GTA Vice City / 80s Tech Noir** atmosphere. The user interface blends vibrant neo-arcade comic aesthetics (high-contrast comic borders, bold marker fonts, halftone screen overlays, and authentic GTA mission status stamps) with a modern, responsive Single Page Application (SPA).

---

## ⚡ Key Features

### 1. 🏠 Dynamic Home Dashboard
- **Hero Section**: Features the custom GTA Vice City poster banner with fast CTAs to enlist squads or explore competition directives.
- **Underground Syndicate Directives**: Interactive sector dossiers (Cyber Heist, Neon Algo, Autonomous AI, Web3) with live bounty values and specs.
- **Prime Directives (Competitions)**: Featured competition showcase cards with instant "Inspect" modal triggers.
- **Sector Schedule (Timeline Preview)**: Multi-day filter tabs (Day 1 / Day 2 / Day 3) with real-time status badges (`MISSION PASSED`, `ACTIVE`, `STANDBY`).
- **Escrow Vault ($500,000 Prize Pool)**: 3-tier podium hierarchy (1st, 2nd, 3rd) and special category bounty highlights.
- **Declassified Intel (FAQ Accordion)**: Top queries on eligibility, squad sizes, evaluation criteria, and prize distribution.

### 2. 🎯 Mission Directives & Competitions
- 6 fully loaded tracks across AI, Cybersecurity, Algorithmic Trading, Robotics, Game Development, and Web3.
- Interactive category filtering, search, and detailed modal views with rulebooks, scoring rubrics, and direct registration.

### 3. 📅 3-Day Mission Timeline
- Interactive chronological schedule covering Registration, Keynotes, Hacking Milestones, Mentor Check-ins, Demo Pitches, and the Midnight Payday Award Ceremony.
- Status filters for completed, active, and upcoming events with real-time venue tags.

### 4. 💰 The Payday ($500,000 Secured Prize Pool)
- Detailed breakdown of monetary prizes, venture capital seed fast-tracks, compute grants, and special achievements.
- Category bounties for Best UI, Best Exploit, Fastest Algo, and Rookie Breakthrough.

### 5. 👥 Squad Roster & Crew Syndicate
- Team creation and 6-character syndicate code generation.
- Real-time squad recruitment, member joining, squad promotion, and leave capabilities.
- Live squad readiness checklists and progress trackers.

### 6. 🗺️ Vice City Radar & Satellite Map
- Interactive map modal displaying key campus operation zones: Vice Beach Innovation Center, Neon Alley Hacker Den, Starfish Island VIP Labs, and Ocean Drive Arena.

### 7. 🛡️ Mission Control (Admin Dashboard)
- Mission announcements broadcast banner system with real-time audio cues.
- Manage competition statuses, edit bounties, and toggle visibility.
- Monitor registered squads, member rosters, and approval statuses.
- Review submitted questions and inquiries from participants.

---

## 🏗️ Architecture & Tech Stack

```
Tech Fest 2025 SPA
 ├── Presentation Layer (React 19 + Tailwind CSS v4 + Motion)
 ├── Audio Synthesizer (Web Audio API Synthesizer + Custom Sound Effects)
 ├── State Management (React Context API + LocalStorage Persistent Stores)
 │    ├── AuthContext: User profiles, roles, authentication state
 │    └── AppContext: Competitions, teams, timeline, FAQs, broadcasts
 └── Asset & Vector Pipeline (Lucide Icons, Canvas Confetti, Comic CSS Framework)
```

- **Frontend Core**: React 19, TypeScript
- **Styling & Design System**: Tailwind CSS v4, custom GTA comic borders (`comic-border`, `comic-border-lg`, `comic-interactive`), halftone overlays, custom font pairings (Pricedown-style headlines, Permanent Marker subheaders, JetBrains Mono tags)
- **Animations**: `motion/react` for fluid layout and component transitions
- **Celebration Effects**: `canvas-confetti` for mission passed events
- **Audio Engine**: Pure Web Audio API (`AudioContext`) oscillator synthesizers simulating GTA sound effects (Mission Passed fanfare, radar beeps, retro synth pulses)
- **Build Tooling**: Vite 6, Node.js, TSX

---

## 📂 Project Structure

```
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images & GTA posters
│   ├── components/             # Reusable UI & Modal components
│   │   ├── AdminLoginModal.tsx # Secret admin authorization modal
│   │   ├── AuthModal.tsx       # Participant login/registration modal
│   │   ├── CityMapModal.tsx    # Vice City satellite radar map
│   │   ├── CompetitionDetailModal.tsx # In-depth track dossiers
│   │   ├── CrewModal.tsx       # Squad command & syndicate joining
│   │   ├── FixerContactModal.tsx # Organizer contact & ticket submitter
│   │   ├── Footer.tsx          # 80s neon footer with sponsor grid
│   │   ├── GtaTransitionOverlay.tsx # "Wasted" / "Mission Passed" banner
│   │   ├── MissionBanner.tsx   # Live emergency broadcast ribbon
│   │   └── Navbar.tsx          # Top navigation with secret triple-tap
│   ├── context/
│   │   ├── AppContext.tsx      # Main application data store
│   │   └── AuthContext.tsx     # Authentication and persona manager
│   ├── data/
│   │   └── initialData.ts      # Default competitions, timeline & FAQs
│   ├── pages/
│   │   ├── AdminDashboard.tsx  # Mission control panel for admins
│   │   ├── CompetitionsPage.tsx# All competition directives
│   │   ├── FAQPage.tsx         # Full FAQ dossier with category filters
│   │   ├── HomePage.tsx        # High-impact landing page
│   │   ├── PrizesPage.tsx      # $500K escrow vault breakdown
│   │   └── TimelinePage.tsx    # 3-Day schedule
│   ├── utils/
│   │   └── audio.ts            # Web Audio API retro synth sound engine
│   ├── types.ts                # Shared TypeScript models & interfaces
│   ├── index.css               # Global styles & comic design utilities
│   ├── main.tsx                # React entry point
│   └── App.tsx                 # Master layout & modal router
├── index.html                  # HTML entry point with retro meta tags
├── metadata.json               # Application metadata & capabilities
├── package.json                # NPM dependencies and scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 👤 User Personas & Role Matrix

| Persona | Name | Role | Email | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Runner (Default)** | Lance Vance | `user` | `lance.vance@vice.city` | Standard participant runner who can browse events, join/command squads, and inspect tracks. |
| **Admin (Hidden)** | Tommy Vercetti | `admin` | `tommy.vercetti@vice.city` | Root organizer with full broadcast, event, and squad management powers. |

*Note: The platform defaults to a single participant runner (`Lance Vance`) to provide a clean, production-like experience for all visitors.*

---

## 🕵️ Secret Admin Access (Easter Egg)

To access **Mission Control (Admin Dashboard)**:

1. Locate the **TECH FEST 2025** logo in the top-left corner of the navigation bar.
2. **Tap or Click the Logo 3 times** in rapid succession (within 1.6 seconds).
3. The **Admin Clearance Gateway Modal** will automatically appear.
4. Enter the administrator credentials:
   - **Admin ID**: `technova-admin` *(or `tommy.vercetti@vice.city`)*
   - **Passcode**: `secret-pass-2026`
5. Press **AUTHORIZE CLEARANCE** to unlock full root administrator permissions and jump into the Admin Dashboard.
6. An **Exit Admin** button is available in the navigation bar to quickly return to standard participant mode.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 3. Type Checking & Verification
```bash
npm run lint
```

---

## 🔊 Audio & Sound Effects Engine

The app includes a fully synthesized sound engine built on the **Web Audio API** (`src/utils/audio.ts`) with no external audio files required:
- `playMissionPassedSound()`: 8-note rising synth fanfare with frequency modulation.
- `playClickSound()`: Retro mechanical keypress click.
- `playHoverSound()`: High-frequency radar blip.
- `playWastedSound()`: Low-frequency dramatic impact.
- `playAlertSound()`: Urgent two-tone emergency broadcast siren.
- `playSuccessChime()`: Upbeat harmonic chime.

---

## 📦 Production Build & Deployment

To compile the application for production:
```bash
npm run build
```
Static artifacts are output to `/dist` ready for Cloud Run, Vercel, or any standard web server.
