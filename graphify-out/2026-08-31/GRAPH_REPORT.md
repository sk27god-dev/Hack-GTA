# Graph Report - Hack-GTA  (2026-08-30)

## Corpus Check
- 30 files · ~97,610 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 201 nodes · 391 edges · 11 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3f2489f5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- AppContext.tsx
- dependencies
- Tech Fest 2025 – Vice Tech Noir 🌴💻
- devDependencies
- compilerOptions
- CLAUDE.md - Project Context & Architecture
- package.json
- Competition
- vite-env.d.ts

## God Nodes (most connected - your core abstractions)
1. `playClickSound()` - 28 edges
2. `useApp()` - 25 edges
3. `useAuth()` - 17 edges
4. `compilerOptions` - 15 edges
5. `Competition` - 14 edges
6. `Tech Fest 2025 – Vice Tech Noir 🌴💻` - 11 edges
7. `playMissionPassedSound()` - 10 edges
8. `⚡ Key Features` - 8 edges
9. `AppContextType` - 7 edges
10. `FAQItem` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CityMapModalProps` --references--> `Competition`  [EXTRACTED]
  src/components/CityMapModal.tsx → src/types.ts
- `CompetitionDetailModalProps` --references--> `Competition`  [EXTRACTED]
  src/components/CompetitionDetailModal.tsx → src/types.ts
- `CompetitionDetailModal()` --calls--> `playClickSound()`  [EXTRACTED]
  src/components/CompetitionDetailModal.tsx → src/utils/audio.ts
- `AppContextType` --references--> `Competition`  [EXTRACTED]
  src/context/AppContext.tsx → src/types.ts
- `CompetitionsPageProps` --references--> `Competition`  [EXTRACTED]
  src/pages/CompetitionsPage.tsx → src/types.ts

## Import Cycles
- None detected.

## Communities (11 total, 0 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.12
Nodes (35): App(), MainApp(), AdminLoginModal(), AdminLoginModalProps, AuthModal(), AuthModalProps, CrewModal(), CrewModalProps (+27 more)

### Community 1 - "AppContext.tsx"
Cohesion: 0.19
Nodes (20): AppContext, AppContextType, MissionPassedBanner, AuthContext, AuthContextType, INITIAL_COMPETITIONS, INITIAL_FAQS, INITIAL_PRIZES (+12 more)

### Community 2 - "dependencies"
Cohesion: 0.09
Nodes (23): canvas-confetti, dotenv, express, @google/genai, gsap, lucide-react, motion, dependencies (+15 more)

### Community 3 - "Tech Fest 2025 – Vice Tech Noir 🌴💻"
Cohesion: 0.09
Nodes (22): 1. 🏠 Dynamic Home Dashboard, 1. Install Dependencies, 2. 🎯 Mission Directives & Competitions, 2. Start Local Development Server, 3. 📅 3-Day Mission Timeline, 3. Type Checking & Verification, 4. 💰 The Payday ($500,000 Secured Prize Pool), 5. 👥 Squad Roster & Crew Syndicate (+14 more)

### Community 4 - "devDependencies"
Cohesion: 0.10
Nodes (20): autoprefixer, esbuild, vite, devDependencies, autoprefixer, esbuild, tailwindcss, tsx (+12 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): DOM, DOM.Iterable, ES2022, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+10 more)

### Community 6 - "CLAUDE.md - Project Context & Architecture"
Cohesion: 0.18
Nodes (10): 1. Framework & Core Libraries, 2. State & Data Layer, 3. Layout & Page Routing, CLAUDE.md - Project Context & Architecture, 📍 Current Project State, 🛠️ Development & Build Commands, 📌 Project Overview, 🔒 Secret Admin Access Implementation (+2 more)

### Community 7 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, clean, dev, lint, preview (+2 more)

### Community 8 - "Competition"
Cohesion: 0.23
Nodes (9): CITY_LOCATIONS, CityMapModal(), CityMapModalProps, MapLocation, CompetitionDetailModal(), CompetitionDetailModalProps, CompetitionsPageProps, HomePageProps (+1 more)

### Community 9 - "vite-env.d.ts"
Cohesion: 0.33
Nodes (5): *.jpg, *.mp3, *.png, *.svg, *.webp

## Knowledge Gaps
- **89 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `package.json`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `playClickSound()` connect `App.tsx` to `Competition`, `AppContext.tsx`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11918367346938775 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Tech Fest 2025 – Vice Tech Noir 🌴💻` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._