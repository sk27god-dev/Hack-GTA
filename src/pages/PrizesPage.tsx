import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Award, Sparkles, DollarSign, Crown, Zap, Shield, Gift, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playClickSound, playHoverSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export const PrizesPage: React.FC = () => {
  const { prizes, triggerMissionPassed } = useApp();

  useEffect(() => {
    // Stagger reveal for polaroids
    gsap.fromTo(
      '.polaroid',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.polaroid',
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Stagger reveal for category awards
    gsap.fromTo(
      '[id^="bounty-card-"]',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[id^="bounty-card-"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
      {/* 1. Grand Payday Marquee Header */}
      <div className="bg-[#110925]/75 border border-[#ff007f]/30 p-5 sm:p-10 text-center relative overflow-hidden rounded-lg shadow-[0_0_20px_rgba(255,0,127,0.2)]">
        <div className="absolute inset-0 halftone-bg opacity-10" />
        <div className="bullet-hole top-4 left-6 hidden sm:block" />
        <div className="bullet-hole bottom-4 right-6 hidden sm:block" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-block bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/35 px-3 sm:px-4 py-1 font-headline text-sm sm:text-xl tracking-widest transform -rotate-1 rounded">
            <Sparkles className="w-4 h-4 inline-block mr-1 text-[#ffe600]" />
            SECURED SYNDICATE ESCROW POOL
          </div>

          <h1 className="font-headline text-4xl xs:text-5xl sm:text-7xl md:text-8xl text-white drop-shadow-[0_0_15px_rgba(255,0,127,0.85)] leading-none">
            THE <span className="text-[#ffe600]">PAYDAY</span>
          </h1>

          <div className="bg-black/60 border border-[#00f5ff]/45 p-3 sm:p-4 max-w-xl mx-auto rounded shadow-[0_0_15px_rgba(0,245,255,0.25)]">
            <span className="block text-[10px] sm:text-xs font-bold text-[#00f5ff] uppercase tracking-widest mb-0.5">
              GUARANTEED TOTAL BOUNTY POOL
            </span>
            <span className="font-headline text-3xl xs:text-4xl sm:text-6xl text-[#ffe600] tracking-wide block leading-none drop-shadow-[0_0_10px_rgba(255,230,0,0.35)]">
              ₹35,000
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-355 font-medium max-w-2xl mx-auto pt-1 sm:pt-2">
            Disbursed immediately following the Grand Closing ceremony at The Palms Amphitheater.
            Wire transfer, certified check, or decentralized stablecoin settlement available.
          </p>
        </div>
      </div>

      {/* 2. Top 3 Podium Cards (Polaroid 3D Frames) */}
      <section className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl sm:text-5xl text-white drop-shadow-[0_0_8px_rgba(255,0,127,0.3)]">
            GRAND TOURNAMENT PODIUM
          </h2>
          <p className="font-marker text-xs sm:text-sm text-[#ff007f]">
            Overall General Standings Across All Tracks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2 sm:pt-4 items-end">
          {/* 2nd Place: Silver Runner Up */}
          <div className="order-2 md:order-1 polaroid bg-[#110925]/75 border border-[#00f5ff]/30 text-white p-4 rounded-lg shadow-[0_0_15px_rgba(0,245,255,0.15)] hover:border-[#00f5ff] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all transform -rotate-1 hover:rotate-0">
            <div className="relative border border-slate-700/60 overflow-hidden mb-3 rounded">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJPHfJquAUlkYaW2BlDh3xIutd2oUsjauq9wnywyUgpMdyBIJBKczISQ7hxisHPREho3JewnktQ7fJcFCtkqv3kf8a7uCvIu6cDXkFW0IdbuUdZIqxt-hPmpMGtUgCCWXSEC1Nz5rxanLbJbw8H119QdHy68mz-KhYW9yEY5ndzFRryqZj_MvouMegf_WuS8bkQG5Dpar6DGn2fEdzHapYKNPDvAzAmergIaLrtxyfusCaeM0R6NBm"
                alt="2nd Place Trophy"
                className="w-full h-48 sm:h-64 object-cover rounded"
              />
              <div className="absolute top-2 left-2 bg-[#87ceeb]/25 border border-[#87ceeb]/40 text-[#87ceeb] font-headline text-base sm:text-lg px-2.5 py-0.5 rounded">
                2ND PLACE
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-headline text-2xl sm:text-3xl text-white">THE CONSIGLIERE</h3>
              <span className="font-headline text-3xl sm:text-4xl text-[#00f5ff] block font-bold">₹10,000</span>
              <p className="text-xs text-zinc-350 font-medium">
                Silver Cup + Fast-Track Venture Incubator Access + Cloud Infrastructure Credits.
              </p>
            </div>
          </div>

          {/* 1st Place: Grand Champion Kingpin (Elevated Center) */}
          <div className="order-1 md:order-2 polaroid transform scale-100 sm:scale-105 border-2 border-[#ffe600]/80 p-5 rounded-lg shadow-[0_0_25px_rgba(255,230,0,0.3)] hover:scale-[1.07] transition-all bg-[#1a0c32]/85 text-white relative">
            <div className="absolute -top-3.5 sm:-top-4 -right-2 sm:-right-3 bg-[#ff007f] text-white border border-black font-headline text-sm sm:text-lg px-2.5 sm:px-3 py-0.5 sm:py-1 rotate-3 sm:rotate-6 z-20 rounded">
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block mr-1" /> GRAND CHAMPION
            </div>

            <div className="relative border border-slate-700/60 overflow-hidden mb-3 rounded">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAednQoOXLj6Ul2sPuhPwlk9zZ-kDi7ZY6tQtKd5F-Huywz8KsAAsVdbrfdGtgPgayQ1NMricFyYZcGKPXr_bIHUWtSdj25i_SJVLG48PhYNA7ejLcKr9ejYqVjL_YU5BdCvigZs7FSInxCWgwJkdOgaeQcvjf9U-wF6lylLBNl2iqadpMxgffKLizZovUUvoF48C4lOtjgm19Haa618CFjz6CUylvvChedz_prnSMcLIz8qnzK0wn0"
                alt="1st Place Gold Trophy"
                className="w-full h-52 sm:h-72 object-cover rounded"
              />
              <div className="absolute top-2 left-2 bg-[#ffe600] text-black border border-black font-headline text-lg sm:text-xl px-2.5 sm:px-3 py-0.5 sm:py-1 rounded">
                1ST PLACE • KINGPIN
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-headline text-3xl sm:text-4xl text-white">THE VICE OVERLORD</h3>
              <span className="font-headline text-4xl sm:text-5xl text-[#ffe600] block drop-shadow-[0_0_12px_rgba(255,230,0,0.45)]">
                ₹15,000
              </span>
              <p className="text-xs text-zinc-200 font-bold">
                Gold Cup + Guaranteed Seed Term Sheet + Direct VIP Pass to Global Tech Syndicate Finals.
              </p>
            </div>
          </div>

          {/* 3rd Place: Bronze Elite */}
          <div className="order-3 polaroid bg-[#110925]/75 border border-[#ff007f]/30 text-white p-4 rounded-lg shadow-[0_0_15px_rgba(255,0,127,0.15)] hover:border-[#ff007f] hover:shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-all transform rotate-1 hover:rotate-0">
            <div className="relative border border-slate-700/60 overflow-hidden mb-3 rounded">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0MUda7ipGT5vJo2WSCrC7gFPiUsmoKYyUtKHH9K9iKwNlgJVqyg4S1bkCGt9JbpTCwocbXHw-3L-5bTFnL_1-WAJektQyaLB6cOM084L4aBeQp3kx8ytVZHUGMnaWleXDU-QehA7MlM8xKg46jgRXIiix8NHOvGzBzl0xXRx7ZvnTaFYDQCPDhKQP_686mGHomqFAYi-ueAzVg662M8ribzejPs7sTDnypTgeGqST4ekQpfbMW23Y"
                alt="3rd Place Bronze Trophy"
                className="w-full h-48 sm:h-64 object-cover rounded"
              />
              <div className="absolute top-2 left-2 bg-amber-600/25 border border-amber-600/40 text-amber-500 font-headline text-base sm:text-lg px-2.5 py-0.5 rounded">
                3RD PLACE
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-headline text-2xl sm:text-3xl text-white">THE ENFORCER</h3>
              <span className="font-headline text-3xl sm:text-4xl text-amber-550 block font-bold">₹5,000</span>
              <p className="text-xs text-zinc-350 font-medium">
                Bronze Trophy + Enterprise Hardware Pass + Hardware Security Modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Bounties Grid ($25,000 USD each) */}
      <section className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
        <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div>
            <div className="inline-block bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/35 px-2.5 py-0.5 font-headline text-sm sm:text-lg tracking-wider mb-1 rounded">
              SPECIALIST AWARDS
            </div>
            <h2 className="font-headline text-3xl sm:text-5xl text-white drop-shadow-[0_0_8px_rgba(255,0,127,0.3)] leading-none">
              CATEGORY BOUNTIES & SIDE CONTRACTS
            </h2>
          </div>
          <span className="font-headline text-lg sm:text-2xl text-[#ff007f] bg-[#ff007f]/25 px-3 py-1 border border-[#ff007f]/35 rounded shadow-[0_0_8px_rgba(255,0,127,0.2)] self-start sm:self-auto">
            Diff PER BOUNTY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {prizes.map(bounty => (
            <div
              key={bounty.id}
              id={`bounty-card-${bounty.id}`}
              className="bg-[#110925]/75 border border-slate-700/60 p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1.5 transition-all rounded-lg text-white shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:border-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
            >
              <div>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 border flex items-center justify-center font-headline text-xl sm:text-2xl mb-2 sm:mb-3 shadow-[0_0_8px_rgba(0,245,255,0.2)] rounded"
                  style={{ backgroundColor: bounty.badgeBg, color: bounty.badgeText, borderColor: bounty.badgeText }}
                >
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <span className="font-marker text-xs text-[#ff007f] block mb-0.5">
                  {bounty.subtitle}
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl text-white leading-none mb-2">
                  {bounty.title}
                </h3>
                <p className="text-xs text-zinc-350 leading-relaxed mb-3 sm:mb-4">
                  {bounty.description}
                </p>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase">Payout</span>
                <span className="font-headline text-2xl sm:text-3xl text-[#00f5ff] drop-shadow-[0_0_5px_rgba(0,245,255,0.25)]">
                  {bounty.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sponsor Swag & Hardware Perk Stash */}
      <div className="bg-[#110925]/75 border border-[#ff007f]/30 p-5 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 rounded-lg shadow-[0_0_15px_rgba(255,0,127,0.1)]">
        <div className="space-y-1">
          <h3 className="font-headline text-2xl sm:text-3xl text-white flex items-center gap-2">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff007f] shrink-0" />
            <span>RUNNER LOADOUT & HARDWARE STASH</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 font-medium max-w-xl">
            Every accepted participant receives the limited-edition Vice City Tech Bomber Jacket,
            custom USB-C security key, NFC VIP badge, and $1,500 in cloud credits.
          </p>
        </div>

        <button
          id="claim-swag-sound-btn"
          onClick={() => triggerMissionPassed('LOADOUT DISPATCHED!', 'CHECK YOUR REGISTERED EMAIL')}
          className="bg-[#00f5ff] hover:bg-[#ffe600] text-black font-headline text-xl sm:text-2xl px-5 sm:px-6 py-2.5 border border-black transition-all shrink-0 cursor-pointer text-center rounded shadow-[0_0_10px_rgba(0,245,255,0.35)]"
        >
          <span>VIEW LOADOUT SPECS</span>
        </button>
      </div>
    </div>
  );
};
