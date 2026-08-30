import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FAQItem } from '../types';
import { playClickSound, playHoverSound } from '../utils/audio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  Radio,
  FileText,
  AlertTriangle,
  Lock,
  Mail
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQPageProps {
  openContactModal: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ openContactModal }) => {
  const { faqs } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true
  });

  const categories = [
    'All',
    'Registration',
    'Rules & Loadout',
    'Accommodations',
    'Prizes & Crypto'
  ];

  const filteredFaqs = faqs.filter(
    f => selectedCategory === 'All' || f.category === selectedCategory
  );

  const toggleFaq = (id: string) => {
    playClickSound();
    setOpenFaqIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    // Stagger reveal for FAQ items
    gsap.fromTo(
      '[id^="faq-item-"]',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[id^="faq-item-"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Header Banner */}
      <div className="bg-[#110925]/75 border border-[#ff007f]/30 p-5 sm:p-10 text-white relative overflow-hidden rounded-lg shadow-[0_0_20px_rgba(255,0,127,0.2)]">
        {/* Top Secret Stamp in corner matching wireframe */}
        <div className="inline-block sm:absolute top-4 right-4 bg-red-650/30 border border-red-500/50 text-red-500 font-headline text-sm sm:text-2xl px-2.5 sm:px-4 py-0.5 sm:py-1 sm:transform sm:rotate-12 shadow-[0_0_12px_rgba(239,68,68,0.25)] rounded mb-3 sm:mb-0">
          TOP SECRET • DECLASSIFIED
        </div>

        <div className="max-w-2xl space-y-2">
          <div className="inline-block bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/35 px-2.5 py-0.5 font-headline text-sm sm:text-lg tracking-wider rounded">
            SYNDICATE PROTOCOLS
          </div>
          <h1 className="font-headline text-3xl xs:text-4xl sm:text-6xl text-white drop-shadow-[0_0_12px_rgba(255,0,127,0.5)] leading-none">
            OPERATIONAL BRIEFING & FREQUENTLY ASKED INTEL
          </h1>
          <p className="text-xs sm:text-sm text-zinc-350 font-medium leading-relaxed">
            Review the official mandate before touching down in Sector 4. Ignorance of syndicate
            protocols will result in immediate disqualification by the arbiter council.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            id={`faq-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            onClick={() => {
              playClickSound();
              setSelectedCategory(cat);
            }}
            onMouseEnter={playHoverSound}
            className={`font-headline text-sm sm:text-lg md:text-xl px-3 sm:px-4 py-1 sm:py-1.5 border transition-all cursor-pointer rounded ${
              selectedCategory === cat
                ? 'bg-[#ff007f]/20 text-[#ff007f] border-[#ff007f] shadow-[0_0_10px_rgba(255,0,127,0.35)] -translate-y-0.5'
                : 'bg-black/35 text-slate-355 border-slate-750 hover:text-[#ffe600] hover:border-[#ffe600]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredFaqs.map(faq => {
          const isOpen = !!openFaqIds[faq.id];

          return (
            <div
              key={faq.id}
              id={`faq-item-${faq.id}`}
              className="border border-[#00f5ff]/30 bg-[#0b061c]/80 text-white overflow-hidden transition-all rounded shadow-[0_0_8px_rgba(0,245,255,0.15)]"
            >
              <button
                id={`faq-toggle-btn-${faq.id}`}
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-[#00f5ff]/10 transition-colors text-white"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#110925] border border-slate-700/60 text-[#00f5ff] flex items-center justify-center font-headline text-base sm:text-lg shrink-0 rounded">
                    ?
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#ff007f] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="font-headline text-xl sm:text-2xl md:text-3xl text-white leading-tight sm:leading-none">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black/60 border border-slate-700/60 flex items-center justify-center shrink-0 rounded">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#00f5ff]/20 bg-black/45">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions? Hotline Banner */}
      <div className="bg-[#110925]/75 border border-[#ff007f]/30 p-5 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 rounded-lg shadow-[0_0_15px_rgba(255,0,127,0.1)]">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-headline text-2xl sm:text-3xl text-[#ffe600] flex items-center justify-center sm:justify-start gap-2">
            <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff007f] animate-pulse shrink-0" />
            <span>STILL HAVE UNRESOLVED INQUIRIES?</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300">
            Open an encrypted transmission line to our event fixers and chief judges.
          </p>
        </div>

        <button
          id="faq-open-contact-btn"
          onClick={() => {
            playClickSound();
            openContactModal();
          }}
          className="bg-[#00f5ff] hover:bg-[#ffe600] text-black font-headline text-xl sm:text-2xl px-5 sm:px-6 py-2.5 border border-black transition-all shrink-0 cursor-pointer text-center rounded shadow-[0_0_10px_rgba(0,245,255,0.35)]"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" />
          <span>CONTACT FIXER</span>
        </button>
      </div>
    </div>
  );
};
