import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TimelineEvent } from '../types';
import { playClickSound, playHoverSound } from '../utils/audio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Flag,
  Flame,
  Filter
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TimelinePage: React.FC = () => {
  const { timeline } = useApp();
  const [selectedDay, setSelectedDay] = useState<'All' | 'Day 1' | 'Day 2' | 'Day 3'>('All');

  const filteredEvents = timeline.filter(
    e => selectedDay === 'All' || e.day === selectedDay
  );

  useEffect(() => {
    // Stagger reveal for timeline items
    gsap.fromTo(
      '[id^="timeline-event-"]',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[id^="timeline-event-"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedDay]);

  const getStatusStamp = (event: TimelineEvent) => {
    switch (event.status) {
      case 'past':
        return (
          <span className="stamp-passed text-sm sm:text-base font-bold px-3 py-1 uppercase inline-block">
            {event.statusLabel || 'MISSION PASSED'}
          </span>
        );
      case 'ongoing':
        return (
          <span className="stamp-progress text-sm sm:text-base font-bold px-3 py-1 uppercase inline-block animate-pulse">
            {event.statusLabel || 'IN PROGRESS'}
          </span>
        );
      case 'upcoming':
      default:
        return (
          <span className="stamp-upcoming text-sm sm:text-base font-bold px-3 py-1 uppercase inline-block">
            {event.statusLabel || 'STANDBY'}
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Header Banner */}
      <div className="bg-[#110925]/75 border border-[#ff007f]/30 p-5 sm:p-10 text-white relative overflow-hidden rounded-lg shadow-[0_0_20px_rgba(255,0,127,0.2)]">
        <div className="absolute inset-0 halftone-bg opacity-10" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5">
            <div className="inline-block bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/35 px-2.5 py-0.5 font-headline text-sm sm:text-lg tracking-wider rounded">
              SECTOR FLIGHT PLAN
            </div>
            <h1 className="font-headline text-3xl xs:text-4xl sm:text-6xl lg:text-7xl text-white drop-shadow-[0_0_12px_rgba(255,0,127,0.5)] leading-none">
              MISSION LOG & DROPOFF SCHEDULE
            </h1>
            <p className="text-xs sm:text-sm text-zinc-350 font-medium max-w-xl">
              Strict 48-hour protocol timeline. Synced with Vice Metropolis atomic clocks. Do not
              miss your deployment windows.
            </p>
          </div>

          {/* Countdown badge matching wireframe */}
          <div className="w-full md:w-auto bg-black/60 border border-[#00f5ff]/45 p-3 sm:p-4 text-center rounded shadow-[0_0_15px_rgba(0,245,255,0.25)]">
            <span className="block text-[9px] sm:text-[10px] font-bold text-[#ff007f] uppercase tracking-widest mb-0.5">
              GRID LOCKDOWN IN
            </span>
            <span className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#00f5ff] tracking-wider block drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]">
              02D : 14H : 33M : 09S
            </span>
          </div>
        </div>
      </div>

      {/* Day Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {(['All', 'Day 1', 'Day 2', 'Day 3'] as const).map(day => (
          <button
            key={day}
            id={`filter-day-${day.toLowerCase().replace(' ', '-')}`}
            onClick={() => {
              playClickSound();
              setSelectedDay(day);
            }}
            onMouseEnter={playHoverSound}
            className={`font-headline text-sm sm:text-lg md:text-xl px-3 sm:px-5 py-1 sm:py-1.5 border transition-all cursor-pointer rounded ${
              selectedDay === day
                ? 'bg-[#ff007f]/20 text-[#ff007f] border-[#ff007f] shadow-[0_0_10px_rgba(255,0,127,0.35)] -translate-y-0.5'
                : 'bg-black/35 text-slate-350 border-slate-750 hover:text-[#ffe600] hover:border-[#ffe600]'
            }`}
          >
            {day === 'All' ? 'ALL MILESTONES' : day.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 before:content-[''] before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-1.5 before:bg-gradient-to-b before:from-[#ff007f] before:via-[#7000ff] before:to-[#00f5ff]">
        {filteredEvents.map((event, idx) => (
          <div key={event.id} id={`timeline-event-${event.id}`} className="relative group">
            {/* Timeline Marker Pin */}
            <div
              className={`absolute -left-6 sm:-left-10 top-5 sm:top-6 w-6 h-6 sm:w-8 sm:h-8 rounded border flex items-center justify-center font-headline text-xs sm:text-sm z-10 ${
                event.status === 'past'
                  ? 'bg-[#103030]/90 text-[#00f5ff] border-[#00f5ff]/40'
                  : event.status === 'ongoing'
                  ? 'bg-[#ff007f]/30 text-[#ff007f] border-[#ff007f] animate-bounce'
                  : 'bg-black/85 text-zinc-400 border-zinc-700/60'
              }`}
            >
              {idx + 1}
            </div>

            {/* Event Card */}
            <div className="bg-[#110925]/75 border border-slate-700/60 p-4 sm:p-6 transition-all rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:border-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-zinc-800 pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="bg-black/85 text-[#00f5ff] px-2 sm:px-2.5 py-0.5 font-headline text-xs sm:text-sm border border-[#00f5ff]/35 flex items-center gap-1 rounded">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {event.time}
                    </span>
                    <span className="bg-black/45 text-zinc-300 px-2 py-0.5 text-[10px] sm:text-xs font-bold border border-slate-700/50 rounded">
                      {event.date} ({event.day})
                    </span>
                    {event.track && (
                      <span className="bg-[#ffe600] text-black px-2 py-0.5 text-[10px] sm:text-xs font-bold border border-black uppercase rounded">
                        {event.track}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl text-white leading-none pt-1 group-hover:text-[#00f5ff] transition-colors">
                    {event.title}
                  </h3>
                </div>

                {/* Status Stamp */}
                <div className="shrink-0 flex justify-start sm:justify-end">
                  {getStatusStamp(event)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
                {/* Event Image */}
                <div className="md:col-span-4">
                  <div className="relative border border-slate-700/60 overflow-hidden rounded-md">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-32 sm:h-44 object-cover"
                    />
                  </div>
                </div>

                {/* Event Description & Location */}
                <div className="md:col-span-8 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400">
                    <MapPin className="w-4 h-4 text-[#ff007f] shrink-0" />
                    <span className="text-white uppercase">{event.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                    {event.description}
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-zinc-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#00f5ff] shrink-0" />
                    <span className="truncate">SYNCHRONIZED WITH SECTOR DISPATCH TOWER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
