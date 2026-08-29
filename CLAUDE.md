# CLAUDE.md - Project Context & Architecture

## 📌 Project Overview
**Tech Fest 2025 – Vice Tech Noir** is a collegiate hackathon and tech festival web application themed after Grand Theft Auto (GTA: Vice City). It provides a full-featured participant and organizer experience including event registrations, team recruitment, dynamic timeline drop-offs, a $500K prize pool breakdown, declassified FAQ intel, an interactive city radar, a Web Audio retro synthesizer, and a hidden administrator dashboard.

---

## 🏛️ System Architecture

### 1. Framework & Core Libraries
- **React 19** with **Vite 6** and **TypeScript 5.8**.
- **Tailwind CSS v4** (`@tailwindcss/vite`) utilizing custom utility classes (`comic-border`, `comic-border-lg`, `comic-interactive`, `halftone-bg`, etc.).
- **Motion (`motion/react`)** for animated transitions and accordion states.
- **Lucide React** for icons across all modules.
- **Canvas Confetti** for mission celebration triggers.
- **Pure Web Audio API Synthesizer** in `src/utils/audio.ts` generating real-time waveforms without relying on external audio assets.

### 2. State & Data Layer
- **`AppContext` (`src/context/AppContext.tsx`)**:
  - Manages `competitions`, `timeline`, `prizes`, `faqs`, `teams`, `contactQueries`, and `broadcastBanner`.
  - Persists updates to `localStorage` (`techfest_competitions_v2`, `techfest_teams_v2`, `techfest_timeline_v2`, etc.).
  - Exposes methods: `registerForCompetition`, `createTeam`, `joinTeam`, `leaveTeam`, `updateCompetition`, `updateTimelineEvent`, `setBroadcastBanner`, `submitContactQuery`, and `triggerMissionPassed`.
- **`AuthContext` (`src/context/AuthContext.tsx`)**:
  - Manages the active authenticated user, user list, and authorization states.
  - **Single Participant Runner Rule**: The default user persona is strictly set to **Lance Vance** (`lance.vance@vice.city`, `role: 'user'`). Secondary sample runner (`Cam Jones`) and `captain` role options have been completely removed.
  - `isAdmin`: Computed boolean (`currentUser?.role === 'admin'`).
  - `loginAsAdmin(passcode)`: Validates credentials (`admin` / `admin123`) and sets `role: 'admin'`.

### 3. Layout & Page Routing
- **`App.tsx`**: Single-page navigation controller managing active tabs:
  - `home`: `HomePage.tsx`
  - `competitions`: `CompetitionsPage.tsx`
  - `timeline`: `TimelinePage.tsx`
  - `prizes`: `PrizesPage.tsx`
  - `faq`: `FAQPage.tsx`
  - `admin`: `AdminDashboard.tsx` (Protected route requiring `isAdmin === true`)
- **Global Modals (`src/components/`)**:
  - `AuthModal`: User login and registration.
  - `AdminLoginModal`: Secret clearance dialog triggered by logo triple-tap.
  - `CrewModal`: Team management, squad creation, and joining with 6-digit codes.
  - `CompetitionDetailModal`: Deep-dive track inspection modal.
  - `FixerContactModal`: Organizer contact inquiry form.
  - `CityMapModal`: Campus satellite radar modal.
  - `GtaTransitionOverlay`: Fullscreen GTA "MISSION PASSED" / "WASTED" celebration banner.

---

## 🔒 Secret Admin Access Implementation
- **Trigger**: Triple-tap gesture on the **Tech Fest 2025** logo in `Navbar.tsx` (3 clicks/taps within 1600ms).
- **Clean UI**: No visual counters, click badges, or debug numbers are rendered on the logo.
- **Modal**: Displays `AdminLoginModal.tsx` requiring:
  - **Admin ID**: `admin` or `tommy.vercetti@vice.city`
  - **Passcode**: `admin123`
- **Unlock**: On verification, `loginAsAdmin` is called, role is set to `admin`, audio fanfare plays, and navigation switches to the `admin` dashboard tab.

---

## 🎨 Visual & Styling Standards (Anti-Slop)
- **Palette**: Neon Pink (`#FF6FB5`), Cyan (`#00E5FF`), Vice Yellow (`#FFD54F`), Dark Slate Noir (`#141419` / `#18181F`), Soft Cream (`#FFF5F0`).
- **Borders & Shadows**: High-contrast black comic borders (`comic-border`: 3px solid #000 with 4px offset shadow).
- **Typography**: Display headings in impactful retro typefaces paired with high-legibility body text and JetBrains Mono for system codes/timestamps.
- **Labels & Chips**: Single-line text inside tags and pills (no wrapped text).

---

## 🛠️ Development & Build Commands
- **Development**: `npm run dev` (Runs on `0.0.0.0:3000`)
- **Build**: `npm run build` (Outputs to `dist/`)
- **Lint / Type Check**: `npm run lint` (`tsc --noEmit`)

---

## 📍 Current Project State
- ✅ Default single participant Runner (**Lance Vance**) active out-of-the-box.
- ✅ Clean **Tech Fest 2025** logo with invisible triple-tap Easter egg.
- ✅ Admin gateway with passcode protection (`admin123`).
- ✅ Rich **Home Page** featuring Directives, Timeline Preview, Short Prize Pool, and General FAQ Accordion.
- ✅ Sound FX synthesized via Web Audio API.
- ✅ Linter and production builds passing with zero errors.
