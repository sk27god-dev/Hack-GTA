import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Competition } from '../types';
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

  const tracks = [
    'All',
    'Cybersecurity',
    'Algorithms',
    'Artificial Intelligence',
    'Game Dev',
    'Open Innovation'
  ];

  const filteredCompetitions = competitions.filter(comp => {
    const matchesTrack = selectedTrack === 'All' || comp.track === selectedTrack;
    const matchesSearch =
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Header Banner */}
      <div className="bg-[#FF6FB5] comic-border-lg p-5 sm:p-10 text-white relative overflow-hidden">
        <div className="bullet-hole top-3 right-6 hidden sm:block" />
        <div className="bullet-hole bottom-3 left-6 hidden sm:block" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-block bg-black text-[#00E5FF] px-2.5 py-0.5 border-2 border-black font-headline text-sm sm:text-lg tracking-wider">
              BOUNTY BOARD • 6 ACTIVE MISSIONS
            </div>
            <h1 className="font-headline text-3xl xs:text-4xl sm:text-6xl lg:text-7xl text-white gta-shadow-black leading-none">
              COMPETITION TRACKS & OPERATIONAL GAUNTLETS
            </h1>
            <p className="text-xs xs:text-sm sm:text-base text-zinc-900 font-bold max-w-2xl leading-relaxed">
              Choose your specialization. From decentralized vault breaches to autonomous AI racers
              and chaos engineering, each track features independent bounties and industry judges.
            </p>
          </div>

          {openCityMapModal && (
            <div className="shrink-0">
              <button
                id="competitions-open-city-map-btn"
                onClick={openCityMapModal}
                className="bg-[#00E5FF] hover:bg-[#FFD54F] text-black font-headline text-xl sm:text-2xl px-5 py-3 comic-border comic-interactive flex items-center gap-2.5 cursor-pointer shadow-[5px_5px_0px_#000]"
              >
                <Compass className="w-6 h-6 text-black animate-spin [animation-duration:10s]" />
                <span>OPEN SATELLITE CITY MAP</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white comic-border p-3.5 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Track Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {tracks.map(track => (
            <button
              key={track}
              id={`filter-track-${track.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedTrack(track)}
              className={`font-headline text-sm sm:text-base md:text-lg px-2.5 sm:px-3 py-1 border-2 transition-all cursor-pointer ${
                selectedTrack === track
                  ? 'bg-black text-[#00E5FF] border-black shadow-[2px_2px_0px_#000]'
                  : 'bg-[#FFF5F0] text-black border-black hover:bg-[#FFD54F]'
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Search Field & City Map button */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
            <input
              id="search-competitions-input"
              type="text"
              placeholder="Search tracks, tags, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFF5F0] border-2 border-black pl-9 pr-3 py-1.5 text-xs font-bold focus:outline-none focus:bg-white"
            />
          </div>
          {openCityMapModal && (
            <button
              id="search-bar-city-map-btn"
              onClick={openCityMapModal}
              className="hidden sm:flex items-center gap-1.5 bg-[#FFD54F] hover:bg-[#00E5FF] text-black font-headline text-base px-3 py-1.5 border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000] shrink-0"
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
        <div className="text-center py-10 sm:py-12 bg-white border-3 border-black p-6 sm:p-8">
          <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF6FB5] mx-auto mb-2" />
          <h3 className="font-headline text-2xl sm:text-3xl text-black">NO TARGET TRACKS FOUND</h3>
          <p className="text-xs text-zinc-600">
            Try adjusting your search criteria or select 'All' to see every available mission.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCompetitions.map(comp => (
            <div
              key={comp.id}
              id={`comp-card-${comp.id}`}
              className="bg-white comic-border flex flex-col justify-between group hover:-translate-y-1 transition-all relative overflow-hidden"
            >
              {/* Top Image */}
              <div>
                <div className="relative border-b-3 border-black overflow-hidden">
                  <img
                    src={comp.image}
                    alt={comp.title}
                    className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black text-[#00E5FF] text-[10px] sm:text-xs font-bold px-2 py-0.5 border border-black uppercase font-headline">
                    {comp.track}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#FFD54F] text-black text-xs font-bold px-2 sm:px-2.5 py-0.5 border-2 border-black font-headline sm:text-base">
                    {comp.prize}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <span className="font-marker text-xs text-[#FF6FB5] block mb-0.5">
                    {comp.subtitle}
                  </span>
                  <h3 className="font-headline text-2xl sm:text-3xl text-black leading-none mb-2 group-hover:text-[#FF6FB5] transition-colors">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-zinc-700 leading-relaxed line-clamp-3 mb-4 font-medium">
                    {comp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {comp.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="bg-[#FFF5F0] border border-black text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 text-zinc-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Schedule quick line */}
                  <div className="bg-[#FFF5F0] border border-black p-2 text-[10px] sm:text-[11px] font-bold text-zinc-700 space-y-1 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF6FB5] shrink-0" />
                      <span className="truncate">{comp.schedule.date} • {comp.schedule.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="p-3.5 sm:p-4 bg-zinc-50 border-t-2 border-black flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-zinc-700 flex items-center gap-1">
                  <Users className="w-4 h-4 text-black shrink-0" />
                  <span>Max {comp.teamSize}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`view-comp-details-btn-${comp.id}`}
                    onClick={() => {
                      openCompetitionModal(comp);
                    }}
                    className="bg-white hover:bg-[#FFD54F] text-black font-headline text-sm sm:text-base px-2.5 sm:px-3 py-1 border-2 border-black transition-all cursor-pointer"
                  >
                    RULEBOOK
                  </button>

                  <button
                    id={`enlist-comp-btn-${comp.id}`}
                    onClick={() => {
                      openCrewModal(comp.id);
                    }}
                    className="bg-[#00E5FF] hover:bg-black hover:text-white text-black font-headline text-sm sm:text-base px-2.5 sm:px-3 py-1 comic-border-sm transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>ENLIST</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
