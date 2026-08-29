import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, ArrowRight, Shield, Sparkles, MapPin, Radio, CheckCircle, Compass } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openContactModal: () => void;
  openCityMapModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ openContactModal, openCityMapModal }) => {
  const { triggerMissionPassed } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    triggerMissionPassed('INTEL FEED SUBSCRIBED!', 'FREQUENCIES LINKED');
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#141419] text-white border-t-6 border-black relative overflow-hidden select-none">
      {/* Top Graphic Strip with Vice Neon Gradients */}
      <div className="h-3 bg-gradient-to-r from-[#FF6FB5] via-[#FFD54F] to-[#00E5FF] border-b-2 border-black" />

      {/* Decorative Grid and Palms Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
          {/* Col 1: Brand & Lore */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 bg-[#FF6FB5] comic-border-sm flex items-center justify-center font-headline text-3xl text-white transform -rotate-3">
                TF
              </div>
              <div>
                <span className="block font-headline text-3xl tracking-wider leading-none text-white drop-shadow-[2px_2px_0px_#FF6FB5]">
                  TECH FEST <span className="text-[#FF6FB5]">2025</span>
                </span>
                <span className="block font-marker text-xs text-[#00E5FF] tracking-widest">
                  VICE TECH NOIR
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              The premier underground collegiate hackathon and algorithm showdown. 48 hours of uninterrupted engineering, neural synthesis, and smart contract infiltration.
            </p>

            <div className="inline-flex items-center gap-2 bg-black/70 border border-zinc-700 px-3 py-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[#00E5FF] font-bold">GRID FREQUENCY: ACTIVE 24/7</span>
            </div>
          </div>

          {/* Col 2: Headquarters & Minimal Contact */}
          <div className="space-y-3.5 bg-black/40 border-2 border-zinc-800 p-5 rounded-none">
            <div className="flex items-center justify-between">
              <h4 className="font-headline text-2xl text-[#00E5FF] tracking-wider flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#FFD54F]" />
                DISPATCH & COMMS
              </h4>
              <Radio className="w-4 h-4 text-[#FF6FB5] animate-pulse" />
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFD54F] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Drop Coordinates:</strong>
                  Ocean Drive Innovation Hub, Sector 04, Vice Metropolis
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#FF6FB5] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Official Dispatch:</strong>
                  dispatch@vicecitytech.edu
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                id="footer-contact-fixer-btn"
                onClick={openContactModal}
                className="w-full bg-[#FF6FB5] hover:bg-[#00E5FF] hover:text-black text-white font-headline text-lg sm:text-xl py-2 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#000]"
              >
                <Mail className="w-4 h-4" />
                <span>TRANSMIT DISPATCH MESSAGE</span>
              </button>

              {openCityMapModal && (
                <button
                  id="footer-city-map-btn"
                  onClick={openCityMapModal}
                  className="w-full bg-[#FFD54F] hover:bg-[#00E5FF] text-black font-headline text-base sm:text-lg py-1.5 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000]"
                >
                  <Compass className="w-4 h-4 text-black animate-spin [animation-duration:10s]" />
                  <span>VIEW VICE SATELLITE MAP</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 3: Intelligence Newsletter */}
          <div className="space-y-3.5">
            <h4 className="font-headline text-2xl text-[#FF6FB5] tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00E5FF]" />
              INTELLIGENCE WIRE
            </h4>
            <p className="text-xs text-zinc-400">
              Receive encrypted updates on secret challenge modifiers, sponsor bounties, and keynote hacker drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="runner@vice.city"
                  className="w-full bg-black border-2 border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00E5FF] text-black font-headline text-xl py-2 comic-border-sm hover:bg-[#FFD54F] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_0px_#000]"
              >
                <span>LINK WIRE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-[#00E5FF] font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transceiver calibrated. Stand by for drop coordinates.</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar & Clean Disclaimer */}
        <div className="pt-6 border-t-2 border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            © 2025 Tech Fest: Vice Tech Noir. Built for Collegiate Hackers.
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <span>Protocol Rules</span>
            <span>•</span>
            <span>Privacy Cipher</span>
            <span>•</span>
            <span>Code of Honor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
