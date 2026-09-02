import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Gamepad2,
  Goal,
  Sparkles,
  Crown,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playClickSound, playHoverSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export const PrizesPage: React.FC = () => {
  const { prizes } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.prize-header',
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

      // Main hackathon prize
      gsap.fromTo(
        '.main-prize-card',
        {
          opacity: 0,
          y: 60,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.main-prize-card',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Battlezone cards
      gsap.fromTo(
        '.battle-prize-card',
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.battle-prizes-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * Only use the three official prizes.
   * This also protects the page if an old localStorage entry
   * somehow contains outdated prize categories.
   */
  const officialPrizes = prizes.filter(prize => {
    const title = prize.title.toLowerCase();

    return (
      title.includes('hackathon') ||
      title.includes('bgmi') ||
      title.includes('e-football') ||
      title.includes('efootball') ||
      title.includes('fifa')
    );
  });

  const hackathonPrize =
    officialPrizes.find(prize =>
      prize.title.toLowerCase().includes('hackathon')
    );

  const bgmiPrize =
    officialPrizes.find(prize =>
      prize.title.toLowerCase().includes('bgmi')
    );

  const eFootballPrize =
    officialPrizes.find(prize => {
      const title = prize.title.toLowerCase();

      return (
        title.includes('e-football') ||
        title.includes('efootball') ||
        title.includes('fifa')
      );
    });

  const totalPrize = 35000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-14">

      {/* ============================================================
          HEADER
          ============================================================ */}

      <section className="prize-header">
        <div className="relative overflow-hidden rounded-xl border border-[#ff007f]/40 bg-[#110925]/85 shadow-[0_0_30px_rgba(255,0,127,0.18)]">

          {/* Background effects */}
          <div className="absolute inset-0 halftone-bg opacity-10" />

          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#ff007f]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00f5ff]/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center px-5 py-10 sm:px-10 sm:py-14">

            <div className="inline-flex items-center gap-2 bg-[#00f5ff]/10 border border-[#00f5ff]/40 text-[#00f5ff] px-3 sm:px-5 py-1.5 rounded mb-4 transform -rotate-1">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />

              <span className="font-headline text-sm sm:text-lg tracking-widest">
                TECHNOVA 4.0
              </span>
            </div>

            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl text-white leading-none drop-shadow-[0_0_18px_rgba(255,0,127,0.7)]">
              THE <span className="text-[#ff007f]">PRIZE</span> POOL
            </h1>

            <p className="font-marker text-sm sm:text-base text-[#00f5ff] mt-3 tracking-wide">
              THREE BATTLEGROUNDS • ONE TECHNOVA
            </p>

            {/* Total */}
            <div className="mt-7 mx-auto max-w-md bg-black/60 border border-[#ffe600]/50 rounded-lg p-5 shadow-[0_0_25px_rgba(255,230,0,0.15)]">

              <span className="block text-[10px] sm:text-xs font-bold text-[#00f5ff] uppercase tracking-[0.25em] mb-2">
                TOTAL PRIZE POOL
              </span>

              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-7 h-7 sm:w-9 sm:h-9 text-[#ffe600]" />

                <span className="font-headline text-5xl sm:text-6xl md:text-7xl text-[#ffe600] leading-none drop-shadow-[0_0_15px_rgba(255,230,0,0.45)]">
                  ₹{totalPrize.toLocaleString('en-IN')}+
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto mt-5">
              Bring your best game. Build. Battle. Compete.
              <br className="hidden sm:block" />
              The biggest rewards are waiting at the end of the mission.
            </p>
          </div>
        </div>
      </section>


      {/* ============================================================
          MAIN HACKATHON PRIZE
          ============================================================ */}

      <section className="main-prize-card">

        <div className="text-center mb-5 sm:mb-7">

          <div className="inline-flex items-center gap-2 bg-[#ffe600]/15 border border-[#ffe600]/40 text-[#ffe600] px-3 sm:px-4 py-1 rounded transform rotate-1">
            <Crown className="w-4 h-4" />

            <span className="font-headline text-sm sm:text-lg tracking-wider">
              GRAND MISSION
            </span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl text-white mt-3">
            TECHNOVA HACKATHON
          </h2>

          <p className="font-marker text-xs sm:text-sm text-[#ff007f] mt-1">
            BUILD • AUTOMATE • VISUALIZE • WIN
          </p>
        </div>


        <div className="relative overflow-hidden rounded-xl border-2 border-[#ffe600]/70 bg-gradient-to-br from-[#1a0c32] via-[#110925] to-[#080414] shadow-[0_0_35px_rgba(255,230,0,0.2)]">

          {/* Glow effects */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#ffe600]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-[#ff007f]/10 rounded-full blur-3xl" />

          <div className="relative z-10 p-6 sm:p-10 md:p-14 text-center">

            <div className="flex justify-center mb-5">

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#ffe600] bg-[#ffe600]/10 flex items-center justify-center shadow-[0_0_25px_rgba(255,230,0,0.3)]">

                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffe600]" />

              </div>

            </div>

            

            <div className="font-headline text-6xl sm:text-8xl md:text-9xl text-[#ffe600] leading-none mt-2 drop-shadow-[0_0_20px_rgba(255,230,0,0.45)]">
              ₹30,000
            </div>

            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mt-5 leading-relaxed">
              The ultimate TECHNOVA challenge. Solve the problem statement,
              build your solution, automate the workflow and visualize the
              results to claim the biggest bounty of the event.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-7">

              <span className="bg-[#ffe600]/10 border border-[#ffe600]/35 text-[#ffe600] px-3 py-1.5 rounded text-xs font-bold">
                ₹30,000 PRIZE
              </span>

              <span className="bg-[#00f5ff]/10 border border-[#00f5ff]/35 text-[#00f5ff] px-3 py-1.5 rounded text-xs font-bold">
                HACKATHON
              </span>

              <span className="bg-[#ff007f]/10 border border-[#ff007f]/35 text-[#ff007f] px-3 py-1.5 rounded text-xs font-bold">
                TECHNOVА 4.0
              </span>

            </div>

          </div>
        </div>
      </section>


      {/* ============================================================
          BATTLEZONE
          ============================================================ */}

      <section>

        <div className="text-center mb-6 sm:mb-8">

          <div className="inline-flex items-center gap-2 bg-[#ff007f]/15 border border-[#ff007f]/40 text-[#ff007f] px-3 sm:px-4 py-1 rounded">
            <Zap className="w-4 h-4" />

            <span className="font-headline text-sm sm:text-lg tracking-wider">
              BATTLEZONE
            </span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl text-white mt-3">
            GAME BOUNTIES
          </h2>

          <p className="font-marker text-xs sm:text-sm text-[#00f5ff] mt-1">
            TWO GAMES • ₹5,000 TOTAL
          </p>
        </div>


        <div className="battle-prizes-grid grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-5xl mx-auto">

          {/* ========================================================
              BGMI
              ======================================================== */}

          <div
            className="battle-prize-card group relative overflow-hidden rounded-xl border border-[#00f5ff]/40 bg-[#110925]/85 p-6 sm:p-8 text-white shadow-[0_0_20px_rgba(0,245,255,0.1)] hover:border-[#00f5ff] hover:shadow-[0_0_30px_rgba(0,245,255,0.25)] hover:-translate-y-2 transition-all duration-300"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >

            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#00f5ff]/10 rounded-full blur-3xl group-hover:bg-[#00f5ff]/20 transition-all" />

            <div className="relative z-10">

              <div className="flex items-start justify-between gap-4">

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/40 flex items-center justify-center">
                  <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#00f5ff]" />
                </div>

                <span className="font-headline text-sm sm:text-base bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff] px-3 py-1 rounded">
                  BATTLE 01
                </span>

              </div>

              <p className="font-marker text-xs text-[#00f5ff] mt-6">
                BATTLEGROUND MOBILE
              </p>

              <h3 className="font-headline text-4xl sm:text-5xl text-white mt-1">
                BGMI
              </h3>

              <div className="h-px bg-[#00f5ff]/20 my-5" />

              <span className="block text-xs text-zinc-400 uppercase tracking-widest">
                PRIZE
              </span>

              <span className="font-headline text-5xl sm:text-6xl text-[#00f5ff] block mt-1 drop-shadow-[0_0_12px_rgba(0,245,255,0.35)]">
                ₹2,500
              </span>

              <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
                Enter the BattleZone and prove your skills in BGMI.
                Only the strongest player walks away with the bounty.
              </p>

            </div>
          </div>


          {/* ========================================================
              E-FOOTBALL
              ======================================================== */}

          <div
            className="battle-prize-card group relative overflow-hidden rounded-xl border border-[#ff007f]/40 bg-[#110925]/85 p-6 sm:p-8 text-white shadow-[0_0_20px_rgba(255,0,127,0.1)] hover:border-[#ff007f] hover:shadow-[0_0_30px_rgba(255,0,127,0.25)] hover:-translate-y-2 transition-all duration-300"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >

            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#ff007f]/10 rounded-full blur-3xl group-hover:bg-[#ff007f]/20 transition-all" />

            <div className="relative z-10">

              <div className="flex items-start justify-between gap-4">

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/40 flex items-center justify-center">
                  <Goal className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff007f]" />
                </div>

                <span className="font-headline text-sm sm:text-base bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f] px-3 py-1 rounded">
                  BATTLE 02
                </span>

              </div>

              <p className="font-marker text-xs text-[#ff007f] mt-6">
                FOOTBALL SHOWDOWN
              </p>

              <h3 className="font-headline text-4xl sm:text-5xl text-white mt-1">
                E-FOOTBALL
              </h3>

              <div className="h-px bg-[#ff007f]/20 my-5" />

              <span className="block text-xs text-zinc-400 uppercase tracking-widest">
                PRIZE
              </span>

              <span className="font-headline text-5xl sm:text-6xl text-[#ff007f] block mt-1 drop-shadow-[0_0_12px_rgba(255,0,127,0.35)]">
                ₹2,500
              </span>

              <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
                Take control of the pitch, outplay your opponent and
                claim the E-Football BattleZone bounty.
              </p>

            </div>
          </div>

        </div>
      </section>


      {/* ============================================================
          FINAL PRIZE SUMMARY
          ============================================================ */}

      <section className="border border-[#00f5ff]/25 bg-[#110925]/70 rounded-xl p-5 sm:p-8 shadow-[0_0_20px_rgba(0,245,255,0.08)]">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          <div className="text-center sm:text-left">

            <div className="flex items-center justify-center sm:justify-start gap-2">

              <Sparkles className="w-5 h-5 text-[#ffe600]" />

              <span className="font-headline text-xl sm:text-2xl text-white">
                THREE MISSIONS. ₹35,000+ AT STAKE.
              </span>

            </div>

            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Technova Hackathon + BGMI + E-Football
            </p>

          </div>

          <div className="flex items-center gap-2">

            <span className="font-headline text-3xl sm:text-4xl text-[#ffe600]">
              ₹35,000+
            </span>

          </div>

        </div>

      </section>

    </div>
  );
};