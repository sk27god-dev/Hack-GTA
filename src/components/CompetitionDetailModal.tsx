import React from 'react';
import { Competition } from '../types';
import { playClickSound } from '../utils/audio';
import {
  X,
  Trophy,
  Users,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CompetitionDetailModalProps {
  competition: Competition | null;
  onClose: () => void;
  onRegister: (compId: string) => void;
}

export const CompetitionDetailModal: React.FC<CompetitionDetailModalProps> = ({
  competition,
  onClose,
  onRegister
}) => {
  if (!competition) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div
        id="competition-detail-container"
        className="bg-[#FFF5F0] comic-border-xl w-full max-w-3xl max-h-[92vh] flex flex-col relative overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-black text-white px-3.5 sm:px-5 py-2.5 sm:py-3 border-b-4 border-black flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-[#FF6FB5] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 border border-black uppercase font-headline shrink-0">
              {competition.track}
            </span>
            <h3 className="font-headline text-lg sm:text-3xl tracking-wider text-[#00E5FF] truncate">
              {competition.title}
            </h3>
          </div>
          <button
            id="close-competition-detail-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-white hover:text-[#FF6FB5] p-1 cursor-pointer shrink-0"
            aria-label="Close competition detail"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
          {/* Hero Banner with Comic Frame */}
          <div className="relative border-2 sm:border-3 border-black overflow-hidden shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000]">
            <img
              src={competition.image}
              alt={competition.title}
              className="w-full h-36 xs:h-44 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
              <span className="font-marker text-[#FFD54F] text-[10px] sm:text-sm tracking-wider">
                {competition.subtitle}
              </span>
              <h2 className="font-headline text-2xl xs:text-3xl sm:text-5xl text-white gta-shadow-black leading-none">
                {competition.title}
              </h2>
            </div>
            {/* Stamp Badge */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#00E5FF] text-black border-2 border-black font-headline text-sm sm:text-xl px-2 sm:px-3 py-0.5 sm:py-1 -rotate-3 shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
              BOUNTY: {competition.prize}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            <div className="bg-white border-2 border-black p-2 sm:p-2.5 text-center">
              <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase">
                Prize Bounty
              </span>
              <span className="font-headline text-lg sm:text-2xl text-[#FF6FB5]">
                {competition.prize}
              </span>
            </div>
            <div className="bg-white border-2 border-black p-2 sm:p-2.5 text-center">
              <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase">
                Squad Limit
              </span>
              <span className="font-headline text-base sm:text-2xl text-black flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 1–{competition.teamSize} Ops
              </span>
            </div>
            <div className="bg-white border-2 border-black p-2 sm:p-2.5 text-center">
              <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase">
                Max Capacity
              </span>
              <span className="font-headline text-base sm:text-2xl text-black">
                {competition.maxTeams || 64} Squads
              </span>
            </div>
            <div className="bg-white border-2 border-black p-2 sm:p-2.5 text-center">
              <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase">
                Classification
              </span>
              <span className="font-headline text-base sm:text-2xl text-[#00E5FF] truncate block">
                {competition.track}
              </span>
            </div>
          </div>

          {/* Briefing Description */}
          <div className="bg-white border-2 border-black p-3.5 sm:p-4 shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
            <h4 className="font-headline text-xl sm:text-2xl text-black mb-1.5 sm:mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6FB5]" />
              MISSION BRIEFING & DIRECTIVE
            </h4>
            <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
              {competition.description}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2.5 sm:mt-3">
              {competition.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-[#FFF5F0] border border-black px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-bold text-zinc-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Schedule & Location */}
          <div className="bg-[#FFF5F0] border-2 border-black p-3.5 sm:p-4">
            <h4 className="font-headline text-lg sm:text-xl text-black mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#00E5FF]" />
              SCHEDULE & DROP COORDINATES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
              <div className="flex items-center gap-2 bg-white border border-black p-2">
                <Clock className="w-4 h-4 text-[#FF6FB5] shrink-0" />
                <div>
                  <span className="font-bold text-zinc-500 block text-[9px] sm:text-[10px]">TIME WINDOW</span>
                  <span className="font-bold text-black">{competition.schedule.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white border border-black p-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-zinc-500 block text-[9px] sm:text-[10px]">SECTOR VENUE</span>
                  <span className="font-bold text-black">{competition.schedule.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rules & Protocols */}
          <div className="bg-white border-2 border-black p-3.5 sm:p-4 shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
            <h4 className="font-headline text-xl sm:text-2xl text-black mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              OPERATIONAL RULES & PROTOCOLS
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs font-medium text-zinc-800">
              {competition.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="bg-black text-white w-4 h-4 rounded-none flex items-center justify-center font-headline text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Judging Rubric Breakdown */}
          <div className="bg-white border-2 border-black p-3.5 sm:p-4 shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
            <h4 className="font-headline text-xl sm:text-2xl text-black mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD54F]" />
              EVALUATION & JUDGING RUBRIC
            </h4>
            <div className="space-y-2 sm:space-y-2.5">
              {competition.judgingCriteria.map((crit, idx) => (
                <div key={idx} className="border-b border-zinc-200 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-xs font-bold mb-0.5">
                    <span className="text-black">{crit.criterion}</span>
                    <span className="bg-[#FF6FB5] text-white px-1.5 sm:px-2 py-0.2 border border-black font-headline text-xs sm:text-sm">
                      {crit.weight}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 border border-black mb-1">
                    <div
                      className="bg-[#00E5FF] h-full"
                      style={{ width: `${crit.weight}%` }}
                    />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-zinc-600">{crit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA Strip */}
        <div className="bg-black p-3.5 sm:p-4 border-t-4 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="text-white flex items-center justify-between sm:block">
            <span className="text-[10px] sm:text-xs text-zinc-400 block">TARGET BOUNTY</span>
            <span className="font-headline text-xl sm:text-2xl text-[#FFD54F]">{competition.prize}</span>
          </div>

          <button
  id={`register-modal-btn-${competition.id}`}
  onClick={() => {
    playClickSound();

    if (competition.registrationUrl) {
      window.open(competition.registrationUrl, '_blank', 'noopener,noreferrer');
    }

    onClose();
  }}
  className="w-full sm:w-auto bg-[#FF6FB5] hover:bg-[#00E5FF] hover:text-black text-white font-headline text-xl sm:text-2xl px-5 sm:px-6 py-2 sm:py-2.5 comic-border-sm comic-interactive flex items-center justify-center gap-2 cursor-pointer text-center"
>
            <span>ASSEMBLE CREW / REGISTER</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
