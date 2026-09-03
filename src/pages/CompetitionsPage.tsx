import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Competition } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Users,
  Trophy,
  ArrowRight,
  Filter,
  Layers,
  Sparkles,
  Calendar,
  Zap,
  Compass,
  MapPin
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CompetitionsPageProps {
  openCompetitionModal: (comp: Competition) => void;
  openCrewModal: (compId?: string) => void;
  openCityMapModal?: () => void;
}

export const CompetitionsPage: React.FC<CompetitionsPageProps> = ({
  openCompetitionModal,
  openCrewModal,
  openCityMapModal
}) => {
  const { competitions } = useApp();
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Stagger reveal for Competitions cards
    gsap.fromTo(
      '[id^="comp-card-"]',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[id^="comp-card-"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedTrack, searchQuery]);

  const tracks = [
    'All',
    'Hackathon',
    'Gaming',
    'E-Football',
    'BGMI'
  ];

  const filteredCompetitions = competitions.filter(comp => {
    const matchesTrack =
      selectedTrack === 'All' ||
      comp.track.toLowerCase() === selectedTrack.toLowerCase() ||
      comp.category.toLowerCase() === selectedTrack.toLowerCase() ||
      comp.title.toLowerCase().includes(selectedTrack.toLowerCase());
    const matchesSearch =
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Header Banner */}
      <div className="bg-[#110925]/75 border border-[#ff007f]/30 p-5 sm:p-10 text-white relative overflow-hidden rounded-lg shadow-[0_0_20px_rgba(255,0,127,0.2)]">
        <div className="bullet-hole top-3 right-6 hidden sm:block" />
        <div className="bullet-hole bottom-3 left-6 hidden sm:block" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-block bg-[#00f5ff]/20 text-[#00f5ff] px-2.5 py-0.5 border border-[#00f5ff]/35 font-headline text-sm sm:text-lg tracking-wider rounded">
              BOUNTY BOARD • 3 OFFICIAL MISSIONS
            </div>
            <h1 className="font-headline text-3xl xs:text-4xl sm:text-6xl lg:text-7xl text-white drop-shadow-[0_0_12px_rgba(255,0,127,0.6)] leading-none">
              COMPETITION TRACKS & GAUNTLETS
            </h1>
            <p className="text-xs xs:text-sm sm:text-base text-zinc-350 font-bold max-w-2xl leading-relaxed">
              Choose your battlefield. From the 12-hour TECHNOVA Hackathon to high-octane E-Football and BGMI showdowns, each mission features independent prize pools and dedicated brackets.
            </p>
          </div>

          {openCityMapModal && (
            <div className="shrink-0">
              <button
                id="competitions-open-city-map-btn"
                onClick={openCityMapModal}
                className="bg-[#00f5ff] hover:bg-[#ffe600] text-black font-headline text-xl sm:text-2xl px-5 py-3 border border-black flex items-center gap-2.5 cursor-pointer rounded transition-all shadow-[0_0_15px_rgba(0,245,255,0.4)]"
              >
                <Compass className="w-6 h-6 text-black animate-spin [animation-duration:10s]" />
                <span>OPEN SATELLITE CITY MAP</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#110925]/75 border border-slate-700/60 p-3.5 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 rounded-md shadow-[0_0_15px_rgba(0,245,255,0.03)]">
        {/* Track Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {tracks.map(track => (
            <button
              key={track}
              id={`filter-track-${track.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedTrack(track)}
              className={`font-headline text-sm sm:text-base md:text-lg px-2.5 sm:px-3 py-1 border transition-all cursor-pointer rounded ${
                selectedTrack === track
                  ? 'bg-[#00f5ff]/20 text-[#00f5ff] border-[#00f5ff] shadow-[0_0_8px_rgba(0,245,255,0.35)]'
                  : 'bg-black/35 text-slate-300 border-slate-750 hover:text-[#ffe600] hover:border-[#ffe600]'
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Search Field & City Map button */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
            <input
              id="search-competitions-input"
              type="text"
              placeholder="Search tracks, tags, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-slate-750 pl-9 pr-3 py-1.5 text-xs text-white rounded focus:outline-none focus:border-[#00f5ff]"
            />
          </div>
          {openCityMapModal && (
            <button
              id="search-bar-city-map-btn"
              onClick={openCityMapModal}
              className="hidden sm:flex items-center gap-1.5 bg-[#ffe600] hover:bg-[#00f5ff] text-black font-headline text-base px-3 py-1.5 border border-black cursor-pointer rounded transition-all shadow-[0_0_8px_rgba(255,230,0,0.2)] shrink-0"
              title="View on City Map"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>MAP</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Competition Cards */}
      {filteredCompetitions.length === 0 ? (
        <div className="text-center py-10 sm:py-12 bg-[#110925]/75 border border-[#ff007f]/30 rounded-lg p-6 sm:p-8">
          <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff007f] mx-auto mb-2" />
          <h3 className="font-headline text-2xl sm:text-3xl text-white">NO TARGET TRACKS FOUND</h3>
          <p className="text-xs text-zinc-400">
            Try adjusting your search criteria or select 'All' to see every available mission.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredCompetitions.map((comp, idx) => {
            const isThirdCard = idx === 2 && filteredCompetitions.length === 3;
            return (
              <div
                key={comp.id}
                id={`comp-card-${comp.id}`}
                className={`bg-[#110925]/75 border border-[#ff007f]/30 flex flex-col justify-between group hover:-translate-y-1.5 transition-all relative overflow-hidden rounded-lg shadow-[0_0_12px_rgba(255,0,127,0.15)] hover:border-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.25)] text-white ${
                  isThirdCard ? 'md:col-span-2 md:w-[calc(50%-0.75rem)] md:mx-auto w-full' : 'w-full'
                }`}
              >
              {/* Top Image */}
              <div>
                <div className="relative border-b border-slate-700/60 overflow-hidden">
                  <img
                    src={comp.image}
                    alt={comp.title}
                    className="w-full h-48 sm:h-56 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black/85 text-[#00f5ff] text-[10px] sm:text-xs font-bold px-2 py-0.5 border border-[#00f5ff]/40 uppercase font-headline rounded">
                    {comp.track}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#ffe600] text-black text-xs font-bold px-2 sm:px-2.5 py-0.5 border border-black font-headline sm:text-base rounded shadow-[0_0_8px_rgba(255,230,0,0.3)]">
                    {comp.prize}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <span className="font-marker text-xs text-[#ff007f] block mb-0.5">
                    {comp.subtitle}
                  </span>
                  <h3 className="font-headline text-2xl sm:text-3xl text-white leading-none mb-2 group-hover:text-[#00f5ff] transition-colors">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-zinc-350 leading-relaxed line-clamp-3 mb-4 font-medium">
                    {comp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {comp.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="bg-black/45 border border-slate-700/60 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 text-zinc-300 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Schedule quick line */}
                  <div className="bg-black/55 border border-slate-700/60 p-2 text-[10px] sm:text-[11px] font-bold text-zinc-300 space-y-1 mb-2 rounded">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#ff007f] shrink-0" />
                      <span className="truncate">{comp.schedule.date} • {comp.schedule.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="p-3.5 sm:p-4 bg-black/45 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                  <Users className="w-4 h-4 text-zinc-300 shrink-0" />
                  <span>Max {comp.teamSize}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`view-comp-details-btn-${comp.id}`}
                    onClick={() => {
                      openCompetitionModal(comp);
                    }}
                    className="bg-transparent border border-slate-650 hover:bg-[#ffe600] hover:text-black hover:border-black text-slate-250 font-headline text-sm sm:text-base px-2.5 sm:px-3 py-1 transition-all cursor-pointer rounded"
                  >
                    RULEBOOK
                  </button>

                  <button
                    id={`enlist-comp-btn-${comp.id}`}
                    onClick={() => {
                      openCrewModal(comp.id);
                    }}
                    className="bg-[#00f5ff] hover:bg-[#ffe600] text-black font-headline text-sm sm:text-base px-2.5 sm:px-3 py-1 border border-black transition-all flex items-center gap-1 cursor-pointer rounded shadow-[0_0_8px_rgba(0,245,255,0.25)]"
                  >
                    <span>ENLIST</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
};
