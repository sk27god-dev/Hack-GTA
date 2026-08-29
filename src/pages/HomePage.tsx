import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Competition, FAQItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import gtaHeroPoster from '../assets/images/gta_hero_poster.jpg';
import { playClickSound, playHoverSound, playMissionPassedSound } from '../utils/audio';
import {
  Flame,
  ArrowRight,
  Shield,
  Users,
  Trophy,
  Terminal,
  Zap,
  Sparkles,
  Calendar,
  Layers,
  Cpu,
  Radio,
  CheckCircle2,
  Lock,
  ChevronRight,
  Compass,
  MapPin,
  Award,
  DollarSign,
  Crown,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Code
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  openCompetitionModal: (comp: Competition) => void;
  openAuthModal: () => void;
  openCrewModal: () => void;
  openCityMapModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  openCompetitionModal,
  openAuthModal,
  openCrewModal,
  openCityMapModal
}) => {
  const { competitions, timeline, faqs, prizes, triggerMissionPassed } = useApp();
  const { currentUser } = useAuth();
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [selectedTimelineDay, setSelectedTimelineDay] = useState<'All' | 'Day 1' | 'Day 2' | 'Day 3'>('Day 1');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': false
  });

  const featuredComps = competitions.filter(c => c.featured);

  // Syndicate Operation Sectors for the interactive section
  const syndicateSectors = [
    {
      id: 'cyber',
      sector: 'SECTOR 01',
      title: 'CYBER HEIST & EXPLOIT LABS',
      track: 'Cybersecurity',
      bounty: '$120,000',
      description: 'Breach mock bank mainframes, capture distributed flags, and patch live zero-day vulnerabilities in a high-intensity red/blue cyber battleground.',
      stats: '4 Members • 48H Sprint',
      icon: Shield,
      accent: '#00E5FF'
    },
    {
      id: 'algo',
      sector: 'SECTOR 02',
      title: 'NEON ALGO & HIGH-FREQUENCY ORDER GRID',
      track: 'Algorithms',
      bounty: '$95,000',
      description: 'Deploy real-time algorithmic market engines competing on microsecond order fills, arbitrage optimization, and dynamic hedging models.',
      stats: '2-4 Members • Live Benchmarks',
      icon: Cpu,
      accent: '#FFD54F'
    },
    {
      id: 'ai',
      sector: 'SECTOR 03',
      title: 'OCEAN DRIVE AUTONOMOUS AI & NEURAL VISION',
      track: 'Artificial Intelligence',
      bounty: '$110,000',
      description: 'Train edge neural perception and reinforcement agents to steer simulated autonomous racers across live Vice Metropolis sensor tracks.',
      stats: '1-4 Members • GPU Node Access',
      icon: Terminal,
      accent: '#FF6FB5'
    },
    {
      id: 'web3',
      sector: 'SECTOR 04',
      title: 'ZERO-DAY DECENTRALIZED PROTOCOLS',
      track: 'Web3 & Decentralization',
      bounty: '$100,000',
      description: 'Design censorship-resistant peer-to-peer liquidity networks and zero-knowledge rollups with verifiable on-chain settlement.',
      stats: '2-4 Members • Testnet Audit',
      icon: Zap,
      accent: '#00E5FF'
    }
  ];

  // Motion container variants for entrance sequence
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const activeSector = syndicateSectors[activeSectorIndex];

  // Preview Timeline filtered items (Top 4 for Day 1/2/3)
  const previewTimelineEvents = timeline
    .filter(e => selectedTimelineDay === 'All' || e.day === selectedTimelineDay)
    .slice(0, 4);

  // Top General FAQs for preview
  const previewFaqs = faqs.slice(0, 4);

  const toggleHomeFaq = (id: string) => {
    playClickSound();
    setOpenFaqIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH GTA POSTER & HIGH-IMPACT CTAs */}
      {/* ========================================================================= */}
      <section className="relative min-h-[75vh] xs:min-h-[80vh] sm:min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden border-b-6 border-black bg-[#141419]">
        {/* Attached GTA Poster Image properly fitted */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={gtaHeroPoster}
            alt="Grand Theft Auto Tech Fest 2025 Poster"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>

        {/* Content Container - Headline at Top, Buttons at Bottom */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full h-full min-h-[75vh] xs:min-h-[80vh] sm:min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between items-center py-5 sm:py-8 md:py-10 px-4 sm:px-6"
        >
          {/* Top: Tech Fest Headline */}
          <motion.div variants={heroItemVariants} className="pt-2 sm:pt-4 text-center">
            <h1 className="font-headline text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider leading-none text-white drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[5px_5px_0px_#000]">
              TECH FEST <span className="text-[#FF6FB5]">2025</span>
            </h1>
          </motion.div>

          {/* Bottom: Action Buttons */}
          <motion.div
            variants={heroItemVariants}
            className="pb-3 sm:pb-6 md:pb-8 w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
          >
            {currentUser ? (
              <button
                id="hero-manage-squad-btn"
                onClick={openCrewModal}
                className="w-full sm:w-auto bg-[#FF6FB5] hover:bg-[#00E5FF] hover:text-black text-white font-headline text-lg sm:text-2xl px-6 sm:px-8 py-2.5 sm:py-3 comic-border comic-interactive flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_0px_#000]"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>COMMAND SQUAD</span>
              </button>
            ) : (
              <button
                id="hero-enlist-squad-btn"
                onClick={openAuthModal}
                className="w-full sm:w-auto bg-[#FF6FB5] hover:bg-[#00E5FF] hover:text-black text-white font-headline text-lg sm:text-2xl px-6 sm:px-8 py-2.5 sm:py-3 comic-border comic-interactive flex items-center justify-center gap-3 cursor-pointer shadow-[4px_4px_0px_0px_#000]"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD54F]" />
                <span>ENLIST SQUAD NOW</span>
              </button>
            )}

            <button
              id="hero-explore-tracks-btn"
              onClick={() => setActiveTab('competitions')}
              className="w-full sm:w-auto bg-white hover:bg-[#FFD54F] text-black font-headline text-lg sm:text-2xl px-6 sm:px-8 py-2.5 sm:py-3 comic-border comic-interactive flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_#000]"
            >
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>EXPLORE TRACKS</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE SYNDICATE DIRECTIVES SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white comic-border-lg p-5 sm:p-8 relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-black">
            <div>
              <div className="inline-block bg-[#00E5FF] text-black px-3 py-0.5 border-2 border-black font-headline text-sm sm:text-base tracking-wider mb-1">
                UNDERGROUND SYNDICATE DIRECTIVE
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-black leading-none">
                48-HOUR VICE TECH SPRINT
              </h2>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#FFF5F0] border-2 border-black px-3 py-1.5 text-center">
                <span className="block font-headline text-lg sm:text-xl text-[#FF6FB5] leading-none">$500,000</span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">Pool Bounty</span>
              </div>
              <div className="bg-[#FFF5F0] border-2 border-black px-3 py-1.5 text-center">
                <span className="block font-headline text-lg sm:text-xl text-[#00E5FF] leading-none">500+</span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">Operatives</span>
              </div>
              <div className="bg-[#FFF5F0] border-2 border-black px-3 py-1.5 text-center">
                <span className="block font-headline text-lg sm:text-xl text-[#FFD54F] leading-none">48 Hours</span>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">Non-Stop</span>
              </div>
            </div>
          </div>

          {/* Interactive Sectors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
            {/* Left: Sector Selector Tabs */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                Select Operation Sector:
              </span>
              {syndicateSectors.map((sector, idx) => {
                const isSelected = activeSectorIndex === idx;
                const Icon = sector.icon;
                return (
                  <button
                    key={sector.id}
                    id={`sector-tab-${sector.id}`}
                    onClick={() => {
                      playClickSound();
                      setActiveSectorIndex(idx);
                    }}
                    className={`w-full text-left p-3 border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#FF6FB5] -translate-y-0.5'
                        : 'bg-[#FFF5F0] hover:bg-[#FFD54F] text-black border-black'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 flex items-center justify-center border-2 border-black shrink-0 ${
                          isSelected ? 'bg-[#FF6FB5] text-white' : 'bg-white text-black'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span
                          className={`text-[10px] font-bold uppercase block tracking-wider ${
                            isSelected ? 'text-[#00E5FF]' : 'text-zinc-500'
                          }`}
                        >
                          {sector.sector} • {sector.bounty}
                        </span>
                        <span className="font-headline text-base sm:text-lg leading-tight block truncate">
                          {sector.title}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isSelected ? 'text-[#FF6FB5] translate-x-1' : 'text-zinc-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right: Active Sector Dossier Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSector.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#141419] text-white comic-border p-5 sm:p-7 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="bg-[#FF6FB5] text-white text-xs font-headline px-2.5 py-0.5 border border-black uppercase tracking-wider">
                      {activeSector.sector}
                    </span>
                    <span className="text-[#00E5FF] font-headline text-lg sm:text-xl">
                      BOUNTY: {activeSector.bounty}
                    </span>
                  </div>

                  <h3 className="font-headline text-2xl sm:text-3xl text-white leading-tight">
                    {activeSector.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                    {activeSector.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className="bg-black text-zinc-300 text-xs px-2.5 py-1 border border-zinc-700 font-bold">
                      {activeSector.stats}
                    </span>
                    <span className="bg-black text-[#FFD54F] text-xs px-2.5 py-1 border border-zinc-700 font-bold">
                      Track: {activeSector.track}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-3">
                    <button
                      id="sector-action-explore-btn"
                      onClick={() => setActiveTab('competitions')}
                      className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#FFD54F] text-black font-headline text-lg px-5 py-2 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>VIEW ALL MISSIONS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {openCityMapModal && (
                      <button
                        id="sector-action-map-btn"
                        onClick={openCityMapModal}
                        className="w-full sm:w-auto bg-[#FFD54F] hover:bg-[#FF6FB5] hover:text-white text-black font-headline text-lg px-4 py-2 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000]"
                      >
                        <Compass className="w-4 h-4 animate-spin [animation-duration:10s]" />
                        <span>SATELLITE MAP</span>
                      </button>
                    )}
                    {currentUser ? (
                      <button
                        id="sector-action-crew-btn"
                        onClick={openCrewModal}
                        className="w-full sm:w-auto bg-white hover:bg-[#FF6FB5] hover:text-white text-black font-headline text-lg px-4 py-2 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Users className="w-4 h-4" />
                        <span>SQUAD ROSTER</span>
                      </button>
                    ) : (
                      <button
                        id="sector-action-enlist-btn"
                        onClick={openAuthModal}
                        className="w-full sm:w-auto bg-white hover:bg-[#FF6FB5] hover:text-white text-black font-headline text-lg px-4 py-2 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-4 h-4" />
                        <span>ENLIST NOW</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PRIME DIRECTIVES (FEATURED COMPETITIONS SECTION) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-block bg-[#FFD54F] text-black px-3 py-0.5 border-2 border-black font-headline text-base sm:text-lg tracking-wider mb-1">
              TARGET BOUNTIES
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl text-black leading-none">
              PRIME DIRECTIVES & TRACKS
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {openCityMapModal && (
              <button
                id="directives-satellite-map-btn"
                onClick={openCityMapModal}
                className="bg-[#FFD54F] hover:bg-[#00E5FF] text-black font-headline text-lg sm:text-xl px-3.5 py-1.5 comic-border-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_0px_#000]"
              >
                <Compass className="w-4 h-4 text-black" />
                <span>VICE RADAR</span>
              </button>
            )}
            <button
              id="view-all-competitions-btn"
              onClick={() => setActiveTab('competitions')}
              className="bg-white hover:bg-[#00E5FF] text-black font-headline text-lg sm:text-xl px-4 py-1.5 comic-border-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_0px_#000]"
            >
              <span>VIEW ALL 6 MISSIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Competition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredComps.map(comp => (
            <div
              key={comp.id}
              id={`featured-card-${comp.id}`}
              className="bg-white comic-border p-4 flex flex-col justify-between group hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#000]"
            >
              <div>
                {/* Image Banner */}
                <div className="relative border-2 border-black overflow-hidden mb-3">
                  <img
                    src={comp.image}
                    alt={comp.title}
                    className="w-full h-40 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black text-[#00E5FF] text-[10px] sm:text-xs font-bold px-2 py-0.5 border border-black uppercase font-headline">
                    {comp.track}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#FFD54F] text-black text-xs font-bold px-2 py-0.5 border border-black font-headline sm:text-sm">
                    {comp.prize}
                  </div>
                </div>

                <span className="font-marker text-xs text-[#FF6FB5] block mb-0.5">
                  {comp.subtitle}
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl text-black leading-none mb-2 group-hover:text-[#FF6FB5] transition-colors">
                  {comp.title}
                </h3>
                <p className="text-xs text-zinc-600 line-clamp-3 mb-4 leading-relaxed font-medium">
                  {comp.description}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-black flex items-center justify-between">
                <div className="text-xs text-zinc-700 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Max {comp.teamSize} Operators</span>
                </div>

                <button
                  id={`inspect-comp-btn-${comp.id}`}
                  onClick={() => openCompetitionModal(comp)}
                  className="bg-[#00E5FF] hover:bg-black hover:text-white text-black font-headline text-base sm:text-lg px-3 py-1 comic-border-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>INSPECT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LIVE MISSION SCHEDULE / TIMELINE PREVIEW SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#18181F] text-white comic-border-lg p-5 sm:p-8 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 halftone-bg opacity-10" />

          {/* Top Bar with Day Filters */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-800">
            <div>
              <div className="inline-block bg-[#FF6FB5] text-white px-3 py-0.5 font-headline text-sm sm:text-base border-2 border-black tracking-wider mb-1">
                SECTOR SCHEDULE
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-white leading-none">
                MISSION TIMELINE & DROPOFFS
              </h2>
            </div>

            {/* Day Selector Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {(['Day 1', 'Day 2', 'Day 3'] as const).map(day => (
                <button
                  key={day}
                  id={`home-timeline-day-btn-${day.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    playClickSound();
                    setSelectedTimelineDay(day);
                  }}
                  className={`font-headline text-base sm:text-lg px-3.5 py-1 comic-border-sm cursor-pointer transition-all ${
                    selectedTimelineDay === day
                      ? 'bg-[#00E5FF] text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-black/60 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Events Preview Grid */}
          <div className="relative z-10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {previewTimelineEvents.map(event => (
              <div
                key={event.id}
                className="bg-black/70 border-2 border-zinc-700 p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 hover:border-[#00E5FF] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#00E5FF] font-mono font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time} • {event.day}</span>
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl text-white mt-1 leading-tight">
                      {event.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs px-2 py-0.5 font-bold uppercase shrink-0 ${
                      event.status === 'past'
                        ? 'stamp-passed'
                        : event.status === 'ongoing'
                        ? 'stamp-progress animate-pulse'
                        : 'stamp-upcoming'
                    }`}
                  >
                    {event.statusLabel || (event.status === 'past' ? 'PASSED' : event.status === 'ongoing' ? 'ACTIVE' : 'STANDBY')}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1 font-bold text-zinc-300">
                    <MapPin className="w-3 h-3 text-[#FFD54F]" />
                    <span>{event.location}</span>
                  </div>
                  <span className="bg-zinc-800 text-[#FF6FB5] px-1.5 py-0.2 font-mono font-bold uppercase text-[10px]">
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Jump to Full Timeline */}
          <div className="relative z-10 pt-6 mt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-zinc-400 font-medium">
              * Atomic clock sync enabled. All competition venues are within Sector 4 Vice Palms.
            </span>
            <button
              id="home-view-full-timeline-btn"
              onClick={() => setActiveTab('timeline')}
              className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#FFD54F] text-black font-headline text-lg sm:text-xl px-5 py-2 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#000]"
            >
              <Calendar className="w-4 h-4" />
              <span>EXPLORE COMPLETE 3-DAY TIMELINE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHORT PRIZE POOL SECTION ($500,000 THE PAYDAY) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFF5F0] comic-border-lg p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2 border-black">
            <div>
              <div className="inline-block bg-[#FF6FB5] text-white px-3 py-0.5 border-2 border-black font-headline text-base sm:text-lg tracking-wider mb-1">
                SECURED ESCROW VAULT
              </div>
              <h2 className="font-headline text-3xl sm:text-5xl text-black leading-none">
                THE PAYDAY // $500,000 BOUNTY POOL
              </h2>
            </div>
            <button
              id="home-explore-prizes-btn"
              onClick={() => setActiveTab('prizes')}
              className="bg-black hover:bg-[#00E5FF] hover:text-black text-white font-headline text-lg sm:text-xl px-4 py-2 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#000]"
            >
              <Trophy className="w-4 h-4 text-[#FFD54F]" />
              <span>VIEW FULL PRIZE BREAKDOWN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Tier Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end">
            {/* 2nd Place */}
            <div className="bg-white comic-border p-4 sm:p-5 order-2 md:order-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                <span className="bg-[#00E5FF] text-black font-headline text-sm px-2 py-0.5 border border-black uppercase font-bold">
                  2ND PLACE RUNNER-UP
                </span>
                <Award className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="font-headline text-3xl sm:text-4xl text-black leading-none mb-1">
                $120,000
              </div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase block mb-3">
                Silver Vice Trophy + Perks
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>$120,000 Guaranteed Cash Wire</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>$30,000 Cloud GPU Compute Credits</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Silver Syndicate Challenge Medallions</span>
                </li>
              </ul>
            </div>

            {/* 1st Place Champion */}
            <div className="bg-[#141419] text-white comic-border-lg p-5 sm:p-6 order-1 md:order-2 transform md:-translate-y-2 hover:scale-[1.02] transition-all shadow-[6px_6px_0px_#FFD54F]">
              <div className="flex items-center justify-between border-b-2 border-zinc-700 pb-2 mb-3">
                <span className="bg-[#FFD54F] text-black font-headline text-sm sm:text-base px-2.5 py-0.5 border border-black uppercase font-bold flex items-center gap-1">
                  <Crown className="w-4 h-4 text-black" />
                  GRAND CHAMPION
                </span>
                <Trophy className="w-6 h-6 text-[#FFD54F] animate-bounce" />
              </div>
              <div className="font-headline text-4xl sm:text-6xl text-[#FFD54F] leading-none mb-1">
                $200,000
              </div>
              <span className="text-xs font-bold text-[#00E5FF] uppercase block mb-3 tracking-wider">
                Golden Vice Champion Trophy + Fast-Track
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-200 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD54F] shrink-0" />
                  <span><strong>$200,000 Cash</strong> Disbursed Instantly</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD54F] shrink-0" />
                  <span>Direct Venture Capital Seed Fast-Track</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD54F] shrink-0" />
                  <span>Custom Handcrafted 24k Gold Palm Trophy</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD54F] shrink-0" />
                  <span>$50,000 AI Infrastructure Grant</span>
                </li>
              </ul>
            </div>

            {/* 3rd Place */}
            <div className="bg-white comic-border p-4 sm:p-5 order-3 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                <span className="bg-[#FF6FB5] text-white font-headline text-sm px-2 py-0.5 border border-black uppercase font-bold">
                  3RD PLACE BRONZE
                </span>
                <Award className="w-5 h-5 text-amber-700" />
              </div>
              <div className="font-headline text-3xl sm:text-4xl text-black leading-none mb-1">
                $70,000
              </div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase block mb-3">
                Bronze Vice Trophy + Hardware Rigs
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-700 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>$70,000 Guaranteed Cash Wire</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Custom Edge Dev Hardware Kits</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bronze Syndicate Medallions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Category Bounties Strip */}
          <div className="bg-black text-white p-4 border-2 border-black flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFD54F] shrink-0" />
              <div>
                <span className="font-headline text-lg text-white block leading-none">
                  +$110,000 IN SPECIAL CATEGORY BOUNTIES
                </span>
                <span className="text-[11px] text-zinc-400">
                  Best Zero-Day Exploit ($30K) • Best Neural AI UI ($30K) • Fastest Algo Order Fill ($30K) • Rookie Breakthrough ($20K)
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('prizes')}
              className="bg-[#FFD54F] hover:bg-white text-black font-headline text-base px-4 py-1.5 comic-border-sm cursor-pointer whitespace-nowrap"
            >
              INSPECT ALL PERKS
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. GENERAL FAQ PREVIEW ACCORDION SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white comic-border-lg p-5 sm:p-8 md:p-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b-2 border-black">
            <div>
              <div className="inline-block bg-[#00E5FF] text-black px-3 py-0.5 border-2 border-black font-headline text-base sm:text-lg tracking-wider mb-1">
                DECLASSIFIED INTEL
              </div>
              <h2 className="font-headline text-3xl sm:text-5xl text-black leading-none">
                FREQUENTLY ASKED PROTOCOLS
              </h2>
            </div>
            <button
              id="home-view-all-faqs-btn"
              onClick={() => setActiveTab('faq')}
              className="bg-[#FF6FB5] hover:bg-black text-white font-headline text-lg sm:text-xl px-4 py-1.5 comic-border-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#000]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>VIEW ALL INTEL & FAQS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Accordion Questions */}
          <div className="space-y-3">
            {previewFaqs.map(faq => {
              const isOpen = !!openFaqIds[faq.id];
              return (
                <div
                  key={faq.id}
                  id={`home-faq-item-${faq.id}`}
                  className="border-2 border-black bg-[#FFF5F0] overflow-hidden transition-all shadow-[2px_2px_0px_#000]"
                >
                  <button
                    onClick={() => toggleHomeFaq(faq.id)}
                    className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FFD54F]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <HelpCircle className="w-4 h-4 text-[#FF6FB5] shrink-0" />
                      <span className="font-headline text-lg sm:text-xl text-black truncate">
                        {faq.question}
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-none bg-black text-white flex items-center justify-center shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-3.5 sm:p-4 pt-0 text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium border-t border-black/20 bg-white">
                          {faq.answer}
                          <div className="mt-2 text-[10px] font-bold text-zinc-500 uppercase">
                            Protocol Category: {faq.category}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HIGH-VOLTAGE GTA CALL TO ACTION STRIP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FF6FB5] comic-border-lg p-6 sm:p-10 md:p-12 text-center text-white relative overflow-hidden">
          <div className="bullet-hole top-4 left-6 hidden sm:block" />
          <div className="bullet-hole bottom-4 right-6 hidden sm:block" />

          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl text-white gta-shadow-black leading-none">
              READY TO CLAIM THE $500,000 PAYDAY?
            </h2>
            <p className="text-xs sm:text-base text-zinc-900 font-bold max-w-xl mx-auto">
              Squad registrations are open across all collegiate campuses. Lock in your crew handle
              before grid manifest closing.
            </p>

            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              {currentUser ? (
                <button
                  id="cta-manage-crew-btn"
                  onClick={openCrewModal}
                  className="w-full sm:w-auto bg-black text-[#00E5FF] hover:bg-white hover:text-black font-headline text-xl sm:text-2xl md:text-3xl px-6 sm:px-8 py-3 comic-border comic-interactive flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_#000]"
                >
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>MANAGE YOUR CREW</span>
                </button>
              ) : (
                <button
                  id="cta-register-now-btn"
                  onClick={openAuthModal}
                  className="w-full sm:w-auto bg-black text-white hover:bg-white hover:text-black font-headline text-xl sm:text-2xl md:text-3xl px-6 sm:px-8 py-3 comic-border comic-interactive flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_#000]"
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD54F]" />
                  <span>REGISTER OPERATIVE ID</span>
                </button>
              )}

              <button
                id="celebrate-btn"
                onClick={() => triggerMissionPassed('VICE TECH ACTIVATED!', 'ALL SYSTEMS ARMED')}
                className="w-full sm:w-auto bg-[#FFD54F] text-black hover:bg-white font-headline text-xl sm:text-2xl md:text-3xl px-5 sm:px-6 py-3 comic-border comic-interactive flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_#000]"
                title="Trigger GTA Victory Fanfare"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>SOUND THE HORNS</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
