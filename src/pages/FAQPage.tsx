import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQItem } from '../types';
import { playClickSound, playHoverSound } from '../utils/audio';
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Header Banner */}
      <div className="bg-[#FFF5F0] comic-border-lg p-5 sm:p-10 relative overflow-hidden">
        {/* Top Secret Stamp in corner matching wireframe */}
        <div className="inline-block sm:absolute top-4 right-4 bg-red-600 text-white font-headline text-sm sm:text-2xl px-2.5 sm:px-4 py-0.5 sm:py-1 border-2 sm:border-3 border-black sm:transform sm:rotate-12 shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000] mb-3 sm:mb-0">
          TOP SECRET • DECLASSIFIED
        </div>

        <div className="max-w-2xl space-y-2">
          <div className="inline-block bg-[#00E5FF] text-black px-2.5 py-0.5 border-2 border-black font-headline text-sm sm:text-lg tracking-wider">
            SYNDICATE PROTOCOLS
          </div>
          <h1 className="font-headline text-3xl xs:text-4xl sm:text-6xl text-black leading-none">
            OPERATIONAL BRIEFING & FREQUENTLY ASKED INTEL
          </h1>
          <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed">
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
            className={`font-headline text-sm sm:text-lg md:text-xl px-3 sm:px-4 py-1 sm:py-1.5 border-2 transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#FF6FB5] text-white border-black shadow-[3px_3px_0px_#000] -translate-y-0.5'
                : 'bg-white text-black border-black hover:bg-[#FFD54F]'
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
              className="bg-white comic-border transition-all"
            >
              <button
                id={`faq-toggle-btn-${faq.id}`}
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-amber-50"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-[#00E5FF] border border-black flex items-center justify-center font-headline text-base sm:text-lg shrink-0">
                    ?
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#FF6FB5] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="font-headline text-xl sm:text-2xl md:text-3xl text-black leading-tight sm:leading-none">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FFF5F0] border-2 border-black flex items-center justify-center shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t-2 border-black bg-[#FFF5F0]">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions? Hotline Banner */}
      <div className="bg-[#141419] text-white comic-border p-5 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-headline text-2xl sm:text-3xl text-[#FFD54F] flex items-center justify-center sm:justify-start gap-2">
            <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6FB5] animate-pulse shrink-0" />
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
          className="bg-[#00E5FF] hover:bg-[#FF6FB5] hover:text-white text-black font-headline text-xl sm:text-2xl px-5 sm:px-6 py-2.5 comic-border-sm transition-all shrink-0 cursor-pointer text-center"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" />
          <span>CONTACT FIXER</span>
        </button>
      </div>
    </div>
  );
};
