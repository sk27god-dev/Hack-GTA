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
    <footer className="bg-[#07040e] text-slate-300 border-t border-[#ff007f]/30 relative overflow-hidden select-none shadow-[0_-5px_15px_rgba(255,0,127,0.1)]">
      {/* Top Graphic Strip with Vice Neon Gradients */}
      <div className="h-2 bg-gradient-to-r from-[#ff007f] via-[#ffe600] to-[#00f5ff]" />

      {/* Decorative Grid and Palms Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
          {/* Col 1: Brand & Lore */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 bg-[#ff007f] border border-black flex items-center justify-center font-headline text-3xl text-white transform -rotate-3 shadow-[0_0_8px_#ff007f]">
                TF
              </div>
              <div>
                <span className="block font-headline text-3xl tracking-wider leading-none text-white drop-shadow-[2px_2px_0px_#ff007f]">
                  TECH FEST <span className="text-[#ff007f]">2025</span>
                </span>
                <span className="block font-marker text-xs text-[#00f5ff] tracking-widest">
                  VICE TECH NOIR
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              The premier underground collegiate hackathon and algorithm showdown. 48 hours of uninterrupted engineering, neural synthesis, and smart contract infiltration.
            </p>

            <div className="inline-flex items-center gap-2 bg-black/70 border border-zinc-700 px-3 py-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[#00f5ff] font-bold">GRID FREQUENCY: ACTIVE 24/7</span>
            </div>
          </div>

          {/* Col 2: Headquarters & Comms */}
          <div className="space-y-3.5 bg-black/60 border border-slate-700/60 p-5 rounded-md shadow-[0_0_15px_rgba(0,245,255,0.05)]">
            <div className="flex items-center justify-between">
              <h4 className="font-headline text-2xl text-[#00f5ff] tracking-wider flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ffe600]" />
                DISPATCH & COMMS
              </h4>
              <Radio className="w-4 h-4 text-[#ff007f] animate-pulse" />
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ffe600] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Drop Coordinates:</strong>
                  Ocean Drive Innovation Hub, Sector 04, Vice Metropolis
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#ff007f] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Official Comms:</strong>
                  dispatch@vicecitytech.edu
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                id="footer-contact-fixer-btn"
                onClick={openContactModal}
                className="w-full bg-[#ff007f] hover:bg-[#00f5ff] hover:text-black text-white font-headline text-lg sm:text-xl py-2 border border-black flex items-center justify-center gap-2 cursor-pointer transition-all rounded"
              >
                <Mail className="w-4 h-4" />
                <span>TRANSMIT DISPATCH MESSAGE</span>
              </button>

              {openCityMapModal && (
                <button
                  id="footer-city-map-btn"
                  onClick={openCityMapModal}
                  className="w-full bg-[#ffe600] hover:bg-[#00f5ff] text-black font-headline text-base sm:text-lg py-1.5 border border-black flex items-center justify-center gap-2 cursor-pointer transition-all rounded"
                >
                  <Compass className="w-4 h-4 text-black animate-spin [animation-duration:10s]" />
                  <span>VIEW VICE SATELLITE MAP</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 3: Intelligence Newsletter */}
          <div className="space-y-3.5">
            <h4 className="font-headline text-2xl text-[#ff007f] tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00f5ff]" />
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
                  className="w-full bg-black/60 border border-slate-700/60 rounded p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00f5ff] text-black font-headline text-xl py-2 border border-black hover:bg-[#ffe600] transition-all flex items-center justify-center gap-1.5 cursor-pointer rounded"
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
