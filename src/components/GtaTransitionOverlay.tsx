import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import gsap from 'gsap';

export interface GtaTransitionRef {
  triggerTransition: (targetTab: string, onMidpoint: () => void) => void;
}

const TAB_TITLES: Record<string, { title: string; subtitle: string; tag: string }> = {
  home: {
    tag: 'SECTOR 00',
    title: 'VICE TECH METROPOLIS',
    subtitle: 'TECH FEST 2025 // MAIN TERMINAL'
  },
  competitions: {
    tag: 'SECTOR 01',
    title: 'MISSION DIRECTIVES',
    subtitle: '6 COMPETITION TRACKS // $500K BOUNTY'
  },
  timeline: {
    tag: 'SECTOR 02',
    title: 'DISPATCH SCHEDULE',
    subtitle: '48-HOUR TIMELINE // LIVE OPERATIONS'
  },
  prizes: {
    tag: 'SECTOR 03',
    title: 'THE PAYDAY VAULT',
    subtitle: 'BOUNTY BREAKDOWN & SPONSOR PERKS'
  },
  faq: {
    tag: 'SECTOR 04',
    title: 'FIELD BRIEFING & FAQ',
    subtitle: 'RULES OF ENGAGEMENT & RECON INTEL'
  },
  admin: {
    tag: 'OVERRIDE',
    title: 'MISSION CONTROL',
    subtitle: 'ROOT AUTHORIZATION PROTOCOL'
  }
};

export const GtaTransitionOverlay = forwardRef<GtaTransitionRef>((_props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // Dark background
  const layer2Ref = useRef<HTMLDivElement>(null); // Vice Pink
  const layer3Ref = useRef<HTMLDivElement>(null); // Neon Cyan
  const layer4Ref = useRef<HTMLDivElement>(null); // Vice Yellow
  const layer5Ref = useRef<HTMLDivElement>(null); // Deep Asphalt Main
  const centerContentRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const [activeDetails, setActiveDetails] = useState(TAB_TITLES.home);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useImperativeHandle(ref, () => ({
    triggerTransition: (targetTab: string, onMidpoint: () => void) => {
      const details = TAB_TITLES[targetTab] || {
        tag: 'SECTOR LINK',
        title: targetTab.toUpperCase(),
        subtitle: 'VICE CITY GRID PROTOCOL'
      };
      setActiveDetails(details);
      setIsTransitioning(true);

      // Kill any active timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const layers = [
        layer1Ref.current,
        layer2Ref.current,
        layer3Ref.current,
        layer4Ref.current,
        layer5Ref.current
      ].filter(Boolean);

      // Reset initial positions
      gsap.set(containerRef.current, { display: 'flex', pointerEvents: 'auto' });
      gsap.set(layers, { xPercent: -100, skewX: -8 });
      gsap.set(centerContentRef.current, { scale: 0.85, opacity: 0 });
      gsap.set(flashRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
          gsap.set(containerRef.current, { display: 'none', pointerEvents: 'none' });
        }
      });

      timelineRef.current = tl;

      // 1. Staggered Multi-Layer Wipe In from Left
      tl.to(layers, {
        xPercent: 0,
        skewX: 0,
        duration: 0.38,
        stagger: 0.04,
        ease: 'power3.inOut'
      })
      // 2. White flash pulse & Stamp center card
      .to(
        centerContentRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.15,
          ease: 'back.out(2)'
        },
        '-=0.15'
      )
      .to(
        flashRef.current,
        {
          opacity: 0.6,
          duration: 0.08,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        },
        '-=0.15'
      )
      // Midpoint: execute the tab switch callback immediately while screen is 100% occluded
      .call(() => {
        onMidpoint();
      })
      // Brief pause for visual impact (GTA mission cut style)
      .to({}, { duration: 0.18 })
      // 3. Staggered Swipe Out to the Right
      .to(
        centerContentRef.current,
        {
          scale: 1.08,
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in'
        }
      )
      .to(
        layers,
        {
          xPercent: 105,
          skewX: 8,
          duration: 0.38,
          stagger: 0.035,
          ease: 'power3.inOut'
        },
        '-=0.1'
      );
    }
  }));

  // Initial hidden state
  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { display: 'none', pointerEvents: 'none' });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      id="gta-page-transition-overlay"
      className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none items-center justify-center"
      style={{ display: 'none' }}
      aria-hidden={!isTransitioning}
    >
      {/* Background Staggered Wipe Layers */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 bg-[#FFD54F] will-change-transform"
        style={{ transform: 'translateX(-100%)' }}
      />
      <div
        ref={layer2Ref}
        className="absolute inset-0 bg-[#00E5FF] will-change-transform"
        style={{ transform: 'translateX(-100%)' }}
      />
      <div
        ref={layer3Ref}
        className="absolute inset-0 bg-[#FF6FB5] will-change-transform"
        style={{ transform: 'translateX(-100%)' }}
      />
      <div
        ref={layer4Ref}
        className="absolute inset-0 bg-black will-change-transform"
        style={{ transform: 'translateX(-100%)' }}
      />
      <div
        ref={layer5Ref}
        className="absolute inset-0 bg-[#141419] flex items-center justify-center will-change-transform border-y-6 border-black"
        style={{ transform: 'translateX(-100%)' }}
      >
        {/* Halftone & Scanlines in the Main Dark Shutter */}
        <div className="absolute inset-0 opacity-15 halftone-bg pointer-events-none" />

        {/* Speed Lines Diagonal Accents */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(45deg,#FF6FB5,#FF6FB5_2px,transparent_2px,transparent_16px)]" />

        {/* Top & Bottom Neon Border Trims */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FF6FB5]" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#00E5FF]" />
      </div>

      {/* Screen White Flash */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white pointer-events-none opacity-0 z-20"
      />

      {/* Center Cinematic Mission Stamp */}
      <div
        ref={centerContentRef}
        className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto space-y-3 opacity-0"
      >
        {/* Sector Tag Pill */}
        <div className="inline-flex items-center gap-2 bg-[#FF6FB5] text-white px-3.5 py-1 comic-border-sm font-headline text-sm sm:text-base tracking-widest shadow-[3px_3px_0px_0px_#000000] -rotate-1">
          <span className="w-2 h-2 rounded-full bg-[#FFD54F] animate-ping" />
          <span>{activeDetails.tag}</span>
        </div>

        {/* Main Display Headline */}
        <div className="space-y-1">
          <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl text-white tracking-wider leading-none drop-shadow-[4px_4px_0px_#000]">
            {activeDetails.title}
          </h2>
          <p className="font-marker text-xs sm:text-base text-[#00E5FF] tracking-widest drop-shadow-[2px_2px_0px_#000]">
            {activeDetails.subtitle}
          </p>
        </div>

        {/* Cyber Loading Progress Bar */}
        <div className="w-48 sm:w-64 h-2 bg-black border border-zinc-700 p-0.5 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-[#FF6FB5] via-[#FFD54F] to-[#00E5FF] animate-pulse" />
        </div>
      </div>
    </div>
  );
});

GtaTransitionOverlay.displayName = 'GtaTransitionOverlay';
