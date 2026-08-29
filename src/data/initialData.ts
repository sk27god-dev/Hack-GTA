import { Competition, TimelineEvent, FAQItem, PrizeCategory, Team, User } from '../types';

export const INITIAL_COMPETITIONS: Competition[] = [
  {
    id: 'cyber-heist',
    title: 'CYBER HEIST',
    subtitle: 'Decentralized Vault Infiltration',
    track: 'Cybersecurity',
    description:
      'Infiltrate legacy banking simulated environments. Construct impenetrable decentralized vaults or engineer smart contract attack vectors. First to secure the payload wins.',
    rules: [
      'Teams must consist of 2 to 4 registered runners.',
      'All exploits must target the designated sandboxed Vice Node network only.',
      'Pre-written automated botnets are forbidden; code templates and framework scaffolds are permitted.',
      'Submissions require executable smart contracts or vulnerability exploit scripts with walkthrough proof.',
      'Judges will stress-test your defensive perimeter against automated zero-day scripts in round 2.'
    ],
    judgingCriteria: [
      { criterion: 'Vault Security & Resistance', weight: 35, description: 'Resilience against penetration attacks and fuzzing tests.' },
      { criterion: 'Exploit Creativity & Depth', weight: 30, description: 'Novelty of bypass methods and architectural execution.' },
      { criterion: 'Code Quality & Efficiency', weight: 20, description: 'Clean architecture, test coverage, and documentation.' },
      { criterion: 'Live Demo Defense', weight: 15, description: 'Stage defense against real-time red-team assault.' }
    ],
    schedule: {
      date: 'May 16, 2025',
      time: '11:00 AM - 11:00 AM (24 Hours)',
      location: 'The Data Vault (Underground Lab B)',
      stage: 'Round 1: Qualifying / Round 2: Mainframe Breach'
    },
    prize: '$120,000 Bounty Pool',
    prizeAmount: 120000,
    teamSize: 4,
    maxTeams: 64,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4eXUJVPuHfSES_OlHA6ptMv_EV98aTR9QlO1Lyq4kK6pj5BvQ1AglW96j3GyJIbNKONOcktfFbNOtVPSXDvt9tJH1Qhjbi_LP77IOr8ErfgQPd74aKQURp39fyWN7VhPXfoTni4rW8e8cpqeuCSICGi5iJlX_EuD5lJfX5ng8rG9aX3chXG8RCIg7MrRuzK1_KsVZpx6U_VXVl4D-D6lByUF-HrCC6z7_JyqU-xXzgJkpW7XogvTu',
    featured: true,
    colorAccent: 'cyan',
    tags: ['Cryptography', 'Smart Contracts', 'Penetration Testing', 'Blockchain']
  },
  {
    id: 'neon-drift',
    title: 'NEON DRIFT',
    subtitle: 'Autonomous High-Speed Algorithm Gauntlet',
    track: 'Algorithms',
    description:
      'Optimize algorithms for maximum real-time efficiency. Navigate sprawling simulated data highways, evade digital law enforcement, and outpace competing AI drivers on the Ocean Drive strip.',
    rules: [
      'Teams of 1 to 4 participants.',
      'Algorithms will be evaluated in the custom Vice Simulator 3D engine.',
      'Compute limits: Maximum 4 vCPUs and 8GB RAM per live benchmark run.',
      'Any intentional collision injection or memory corruption will lead to disqualification.'
    ],
    judgingCriteria: [
      { criterion: 'Lap Time & Latency', weight: 40, description: 'Fastest trajectory solving under adversarial traffic.' },
      { criterion: 'Pathfinding Optimization', weight: 30, description: 'Efficiency of A* / reinforcement learning algorithms.' },
      { criterion: 'Edge-Case Recovery', weight: 20, description: 'Handling obstacle anomalies and sudden map glitches.' },
      { criterion: 'Algorithmic Purity', weight: 10, description: 'Theoretical time/space complexity proof.' }
    ],
    schedule: {
      date: 'May 16-17, 2025',
      time: '02:00 PM - 04:30 PM Finals',
      location: 'Ocean Drive Circuit (Sim Stage Alpha)',
      stage: 'Heats -> Semifinals -> Grand Prix Final'
    },
    prize: '$90,000 Bounty Pool',
    prizeAmount: 90000,
    teamSize: 4,
    maxTeams: 48,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Wts5sTrvvQY6qOIhyrsWHQ6T0q7B1Rhmm6_GjgZWJlpSvu1wH2VFXEnbdgf0KEyX5RyGv2jWuQO6vznpd9aouda5MYdw3E-fsdJ07WpInaQkcLa2Ugi8tovj6MNPfsPU9AsJjEKSkbI2obIYCR4q4CcAEEZcpinPCaery4XNAoleJyI2SQEbrioomz3fh9Fko49anp0qTDizLofpFtnPnvT4HD2YuGmJVRUWK9xQ8NDfps47FcL5',
    featured: true,
    colorAccent: 'pink',
    tags: ['Pathfinding', 'Real-Time AI', 'Autonomous Systems', 'C++ / Rust / Python']
  },
  {
    id: 'code-breach',
    title: 'CODE BREACH',
    subtitle: 'Zero-Day Vulnerability Gauntlet',
    track: 'Cybersecurity',
    description:
      'Identify critical vulnerabilities in a synthetic metropolis network. Develop instant countermeasure patches and exploit legacy protocols before emergency grid lockdown.',
    rules: [
      'Capture The Flag (CTF) format spanning Web, Reverse Engineering, Binary Exploitation, and OSINT.',
      'Dynamic scoring: Point values decrease as more crews solve specific challenges.',
      'Flag sharing between distinct syndicates is strictly prohibited.'
    ],
    judgingCriteria: [
      { criterion: 'Flags Captured', weight: 60, description: 'Total points gathered in 24 hours.' },
      { criterion: 'Speed to First Blood', weight: 20, description: 'First solver bonus points.' },
      { criterion: 'Detailed Write-up', weight: 20, description: 'Technical elegance of exploit explanation.' }
    ],
    schedule: {
      date: 'May 17, 2025',
      time: '09:00 AM - 09:00 PM',
      location: 'The Bunker (Terminal Row 04)',
      stage: '24-Hour Jeopardy CTF Gauntlet'
    },
    prize: '$85,000 Bounty Pool',
    prizeAmount: 85000,
    teamSize: 4,
    maxTeams: 80,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmj6r3OufoRRXP77TmuPFy8jZvsgVkwA9pFzsPMElZqgbfQvARX3WbmQ-kn6FRg5TQ_qUKdpl7lUZTZHWBsdttHD8J5fTvy9G55H3zqfwMQ1ZA_bLG2yTvw7mk_CUYajOszOtDnQxsCv5TrKEPHdYkNlf9OTpFTgvoiwA7ZoD-xkkcEKJNiWfv0ysEPj53PKZbTEEn1FXexJ12_vcAF4bS7deXLkAxNCRhcxoi1_PwEjgTYqFvit4Y',
    featured: true,
    colorAccent: 'yellow',
    tags: ['CTF', 'Binary Exploitation', 'Reverse Engineering', 'Web Security']
  },
  {
    id: 'synapse-overdrive',
    title: 'SYNAPSE OVERDRIVE',
    subtitle: 'Autonomous AI Agents & Neural Hacks',
    track: 'Artificial Intelligence',
    description:
      'Build generative multi-agent systems and real-time vision bots that solve underworld logistical dilemmas, audio-visual synthesis, or automated syndicate defense.',
    rules: [
      'Must utilize open or API-driven LLM / Vision models.',
      'Working demo must be deployed live with verifiable API endpoints.',
      'Evaluation involves unscripted adversarial prompt injections from judges.'
    ],
    judgingCriteria: [
      { criterion: 'Autonomous Reliability', weight: 35, description: 'Agent resilience and multi-step reasoning capability.' },
      { criterion: 'Product Value & UX', weight: 30, description: 'User interface responsiveness and practical utility.' },
      { criterion: 'Architectural Elegance', weight: 20, description: 'Vector retrieval, latency benchmarks, and cost efficiency.' },
      { criterion: 'Pitch Delivery', weight: 15, description: '3-minute high-octane stage pitch.' }
    ],
    schedule: {
      date: 'May 16-17, 2025',
      time: '10:00 AM - 04:00 PM',
      location: 'Neural Terrace (Sky Level 3)',
      stage: '48-Hour Open Hackathon'
    },
    prize: '$75,000 Bounty Pool',
    prizeAmount: 75000,
    teamSize: 4,
    maxTeams: 50,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAY-Z8hs6MVcLv0MIresA0otRPL871r-qsIi7htuzMtikAmutKQeIsHBEaGd8wzqi202ImYpKAw0l0NQoC3dbJ6NMmfSI0ER42adBM2ozeWynQNJLxIhgkAHlCGaBAxWAee_IQsROxzRZSL-4jHDq3JDY1C04QSkOLYpFoAx4ymI94izMIv3b9KGYD5wMQ5C8PAw1xz_qNGKFdFxbTeuu8COVjlU1SlCtY8TaAUQGCej4J6rKM0heiF',
    featured: false,
    colorAccent: 'orange',
    tags: ['LLMs', 'Agentic Workflows', 'Computer Vision', 'PyTorch / LangChain']
  },
  {
    id: 'vice-arcade',
    title: 'VICE ARCADE: SHADER SHOWDOWN',
    subtitle: 'Retro-Futuristic Graphics & Engine Dev',
    track: 'Game Dev',
    description:
      'Develop dynamic WebGL shaders, retro-arcade physics games, and neon procedural environments within 48 hours. Maximize frames per second while pushing visual boundaries.',
    rules: [
      'Games/shaders must run smoothly in modern browsers at 60 FPS.',
      'Original assets or properly licensed open-source assets only.',
      'Theme will be modified with a secret modifier reveal on kickoff morning.'
    ],
    judgingCriteria: [
      { criterion: 'Visual Aesthetics & Shaders', weight: 40, description: 'Neon lighting, post-processing, and shader craft.' },
      { criterion: 'Gameplay & Physics Feel', weight: 30, description: 'Responsive controls, game loop, and excitement factor.' },
      { criterion: 'Performance Optimization', weight: 20, description: 'Zero stutter, memory management, and load times.' },
      { criterion: 'Theme Cohesion', weight: 10, description: 'True 80s / Vice Synthwave aesthetic.' }
    ],
    schedule: {
      date: 'May 16-17, 2025',
      time: '12:00 PM - 06:00 PM',
      location: 'The Arcade Arena (Level 1)',
      stage: 'Game Jam + Public Arcade Showcase'
    },
    prize: '$50,000 Bounty Pool',
    prizeAmount: 50000,
    teamSize: 3,
    maxTeams: 40,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCHjaibtxMeR-cm02s_k_MMWV2eGbIztBKJahUVBmMzn3ULWoHPYOW07Wzfd23ZYl5OvKXPqNwijDNY44IOe9QSk6kW4C-ok7Naagc570foZ9Y3ZuE7b8s9QLbY9ib7rpKEPrNmTqYQq7gUhpSCr1Vz-kUpcNFGLh9CVnwf5xsAdej2gMM_2Qe2zjB811xXw2A5r9CugPs7FAG9pcD_G8pSHuXn4kL5VcLrOO0GIYIlJbhN_FBPvdH',
    featured: false,
    colorAccent: 'pink',
    tags: ['WebGL', 'Three.js', 'GLSL', 'Canvas', 'Game Engine']
  },
  {
    id: 'grid-lockdown',
    title: 'GRID LOCKDOWN: INFRA SURVIVAL',
    subtitle: 'High-Availability Chaos Engineering',
    track: 'Open Innovation',
    description:
      'Keep critical cloud services alive while our automated syndicate AI launches unpredictable network outages, DDoS storms, database corruption, and node terminations.',
    rules: [
      'Teams get access to identical Kubernetes / Cloud clusters.',
      'Automated chaos monkey runs intermittently every 30 minutes.',
      'Uptime percentage and mean time to recovery (MTTR) determine standings.'
    ],
    judgingCriteria: [
      { criterion: 'Total Service Uptime', weight: 50, description: 'Percentage of synthetic 200 OK responses recorded.' },
      { criterion: 'Automated Self-Healing', weight: 30, description: 'Terraform / K8s auto-scaling resilience without manual intervention.' },
      { criterion: 'Root-Cause Post-Mortem', weight: 20, description: 'Incident response log accuracy and depth.' }
    ],
    schedule: {
      date: 'May 17, 2025',
      time: '01:00 PM - 07:00 PM',
      location: 'Server Silo 9 (Command Deck)',
      stage: 'Continuous Chaos Ingestion'
    },
    prize: '$60,000 Bounty Pool',
    prizeAmount: 60000,
    teamSize: 3,
    maxTeams: 32,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpEP6DyLLILMBNgPE-HNl3O5jotZmuAHBDexrRy2IbYI2kVrvwIkGTh_RkS88rUG_GJ-8GSLVAsiSBHcfTqfnTMnQojogs3hhbsV2htNyMW1huQoERXY8xX_XmovLrCRMFLiaDa5w0gyfIzrGiAbo8IMLepevYEh3YQmPj2ru_JLjgu1fMPxmqqrX7sxdCN0s7UW6094ZUbTz-R7uFuE9ZELZFIXcRMLWyOufUfW0g8xRdp9AyVN0V',
    featured: false,
    colorAccent: 'cyan',
    tags: ['DevOps', 'Kubernetes', 'Chaos Engineering', 'Observability']
  }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'timeline-1',
    time: '08:00 AM',
    date: 'May 16, 2025',
    day: 'Day 1',
    title: 'REGISTRATION OPENING',
    location: 'Vice City Hub (Main Gates)',
    description:
      'Secure your credentials, pick up your custom NFC badge, and gear up. Access to the main grid requires verified biometric clearance and team sync.',
    status: 'past',
    statusLabel: 'MISSION PASSED',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXx20THYEqOSwBzlQBtSH4mpOcgyFBlNo1NnTCS_3RBOzOBZk12wvuMbL-qPoqocA9MmwfSEe3rpD4me0zxPY9ScDNTFw2UeMHmM9FJSjHKImc3K-5LoEAUzrctpuIaAvSlRO-Oexi-wjQC0W68nlGUQMcbL_zMVgtQbo_x6frIS_HoQUzDRGgxTx9xkixc3tWNl4RRzdIRsMlbaYvgD5OlHLSO6j3IhbkD2v-x9f4QZizyd1dxeHl',
    track: 'General Operations'
  },
  {
    id: 'timeline-2',
    time: '11:00 AM',
    date: 'May 16, 2025',
    day: 'Day 1',
    title: 'CYBER HEIST QUALIFIERS',
    location: 'The Data Vault',
    description:
      'First stage algorithms. Crack the mainframe defenses and deploy decentralized smart contract escrow vaults before rival syndicates lock you out.',
    status: 'ongoing',
    statusLabel: 'IN PROGRESS',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpEP6DyLLILMBNgPE-HNl3O5jotZmuAHBDexrRy2IbYI2kVrvwIkGTh_RkS88rUG_GJ-8GSLVAsiSBHcfTqfnTMnQojogs3hhbsV2htNyMW1huQoERXY8xX_XmovLrCRMFLiaDa5w0gyfIzrGiAbo8IMLepevYEh3YQmPj2ru_JLjgu1fMPxmqqrX7sxdCN0s7UW6094ZUbTz-R7uFuE9ZELZFIXcRMLWyOufUfW0g8xRdp9AyVN0V',
    track: 'Cybersecurity'
  },
  {
    id: 'timeline-3',
    time: '04:30 PM',
    date: 'May 16, 2025',
    day: 'Day 1',
    title: 'NEON DRIFT FINALS',
    location: 'Ocean Drive Circuit',
    description:
      'High-speed autonomous vehicle racing. Bet your tokens on the fastest rig on the strip as algorithms drift across procedural neon hairpin turns.',
    status: 'upcoming',
    statusLabel: 'STANDBY',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCHjaibtxMeR-cm02s_k_MMWV2eGbIztBKJahUVBmMzn3ULWoHPYOW07Wzfd23ZYl5OvKXPqNwijDNY44IOe9QSk6kW4C-ok7Naagc570foZ9Y3ZuE7b8s9QLbY9ib7rpKEPrNmTqYQq7gUhpSCr1Vz-kUpcNFGLh9CVnwf5xsAdej2gMM_2Qe2zjB811xXw2A5r9CugPs7FAG9pcD_G8pSHuXn4kL5VcLrOO0GIYIlJbhN_FBPvdH',
    track: 'Algorithms'
  },
  {
    id: 'timeline-4',
    time: '09:00 PM',
    date: 'May 17, 2025',
    day: 'Day 2',
    title: 'GRAND CLOSING & PAYDAY',
    location: 'The Palms Amphitheater',
    description:
      'Final broadcast, live judge deliberative verdicts, and token distribution. Celebrate surviving the simulation with live retro synthwave headliners.',
    status: 'upcoming',
    statusLabel: 'FINAL DIRECTIVE',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCILjp1y-IAoYs-SvqqVpDzoHv1rEvcddn8cFW8A4kStZpmrl0AR6waoF8fD83Z2i9MdXWXijLjosFRzaXNEbEa1V_a-Hyq1yGZJQWRqs2Ggl1_bMxMO6kgNRgZedp3ab-lm10JIGqL4wGGj-Z2b2CJTxz4sZ4Hca3EqUqd2cK_jDJMZEAa5RvCXKqDaJQhitcY33gim3PBeDQJ3q9lM8dLd8GcYO5ZCdAvSAH_5vQIUp0hwFl5IfpB',
    track: 'Ceremony'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'REGISTRATION PROTOCOLS',
    answer:
      'The manifest closes 48 hours before drop. Ensure your credentials are fully verified through the central hub. Late entries will be flagged by syndicate dispatch and denied entry to the main staging grounds.',
    category: 'Registration',
    featured: true
  },
  {
    id: 'faq-2',
    question: 'CREW SIZE LIMITS',
    answer:
      'Squads are capped at four operators. Solos are permitted but highly discouraged for the 48-hour endurance gauntlet. Register your crew tag early to secure contiguous workspace, power drops, and encrypted router taps.',
    category: 'Registration',
    featured: true
  },
  {
    id: 'faq-3',
    question: 'HARDWARE RESTRICTIONS',
    answer:
      'Bring your own battle rigs (laptops, portable monitors, mechanical boards). Multi-gigabit power banks and direct network taps are provided at all tables. Airborne drones, signal jammers, and unshielded RF emitters are strictly prohibited inside venue airspace.',
    category: 'Rules & Loadout',
    featured: true
  },
  {
    id: 'faq-4',
    question: 'ACCOMMODATIONS & CRASH PADS',
    answer:
      'Designated crash pads and quiet rest capsules are available at affiliated synth-hotels in Sector 4. Check the Venues portal for sponsored access keys. Sleeping on the active competition floor is prohibited for safety.',
    category: 'Accommodations',
    featured: true
  },
  {
    id: 'faq-5',
    question: 'CODE REPOSITORY & TIME LOCKS',
    answer:
      'All project repositories must be created after the official opening countdown reaches zero. You may use public open-source libraries, UI packages, and pre-trained AI weights provided they are documented in your manifest.',
    category: 'Rules & Loadout',
    featured: false
  },
  {
    id: 'faq-6',
    question: 'PRIZE DISTRIBUTION & WIRE TRANSFERS',
    answer:
      'Winners will receive bounties in direct wire transfer, fiat check, or verified USDC / ETH smart contract payout upon verification of college credentials and tax documentation.',
    category: 'Prizes & Crypto',
    featured: false
  }
];

export const INITIAL_PRIZES: PrizeCategory[] = [
  {
    id: 'bounty-master-coder',
    title: 'MASTER CODER',
    subtitle: 'Cleanest Architecture',
    amount: '$25k',
    numericalAmount: 25000,
    icon: 'code',
    description: 'Awarded to the cleanest and most efficient implementation across all competition tracks.',
    badgeBg: '#FF6FB5',
    badgeText: '#000000',
    accentColor: '#FF6FB5'
  },
  {
    id: 'bounty-visual-elite',
    title: 'VISUAL ELITE',
    subtitle: 'Aesthetic Supremacy',
    amount: '$25k',
    numericalAmount: 25000,
    icon: 'brush',
    description: 'For the project with the most outstanding UI/UX design, visual identity, and theme consistency.',
    badgeBg: '#87ceeb',
    badgeText: '#000000',
    accentColor: '#87ceeb'
  },
  {
    id: 'bounty-innovator',
    title: 'INNOVATOR',
    subtitle: 'Moonshot Concept',
    amount: '$25k',
    numericalAmount: 25000,
    icon: 'lightbulb',
    description: 'Awarded to the most unique and ambitious solution that tackles a real-world dilemma with novel tech.',
    badgeBg: '#FFD54F',
    badgeText: '#000000',
    accentColor: '#FFD54F'
  },
  {
    id: 'bounty-fast-track',
    title: 'FAST TRACK',
    subtitle: 'Velocity & Execution',
    amount: '$25k',
    numericalAmount: 25000,
    icon: 'rocket_launch',
    description: 'First team to complete all core milestones with a production-ready, fully functional prototype.',
    badgeBg: '#000000',
    badgeText: '#FFFFFF',
    accentColor: '#00E5FF'
  }
];

export const SAMPLE_USERS: User[] = [
  {
    uid: 'user-lance',
    email: 'lance.vance@vice.city',
    displayName: 'Lance Vance',
    college: 'Vice Beach Tech University',
    year: 2,
    phone: '+1 (305) 555-0144',
    role: 'user',
    registeredCompetitions: ['cyber-heist'],
    teamIds: ['team-starfish'],
    createdAt: '2025-04-15'
  },
  {
    uid: 'user-tommy',
    email: 'tommy.vercetti@vice.city',
    displayName: 'Tommy V. (Admin)',
    college: 'Ocean View Institute of Tech',
    year: 4,
    phone: '+1 (305) 555-0192',
    role: 'admin',
    registeredCompetitions: ['cyber-heist', 'neon-drift'],
    teamIds: ['team-starfish'],
    createdAt: '2025-04-10'
  }
];

export const SAMPLE_TEAMS: Team[] = [
  {
    id: 'team-starfish',
    code: 'VICE99',
    name: 'Starfish Syndicate',
    competitionId: 'cyber-heist',
    competitionTitle: 'CYBER HEIST',
    captainId: 'user-lance',
    captainName: 'Lance Vance',
    captainEmail: 'lance.vance@vice.city',
    members: [
      { uid: 'user-lance', displayName: 'Lance Vance', email: 'lance.vance@vice.city', college: 'Vice Beach Tech', role: 'captain', joinedAt: '2025-04-15' }
    ],
    maxMembers: 4,
    status: 'ready',
    projectTitle: 'Zero-Knowledge Payday Vault',
    projectRepo: 'https://github.com/vice-syndicate/payday-vault',
    createdAt: '2025-04-10'
  },
  {
    id: 'team-cortez',
    code: 'CORTEZ',
    name: 'Neon Drift Cyber Ops',
    competitionId: 'neon-drift',
    competitionTitle: 'NEON DRIFT',
    captainId: 'user-mercedes',
    captainName: 'Mercedes Cortez',
    captainEmail: 'mercedes@vice.city',
    members: [
      { uid: 'user-mercedes', displayName: 'Mercedes Cortez', email: 'mercedes@vice.city', college: 'Escobar State', role: 'captain', joinedAt: '2025-04-16' }
    ],
    maxMembers: 4,
    status: 'recruiting',
    projectTitle: 'Neural Pathfinding Highway Mesh',
    projectRepo: 'https://github.com/vice-syndicate/highway-mesh',
    createdAt: '2025-04-16'
  }
];
