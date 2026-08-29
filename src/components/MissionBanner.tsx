import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, CheckCircle2 } from 'lucide-react';

export const MissionBanner: React.FC = () => {
  const { missionBanner, closeMissionBanner } = useApp();

  return (
    <AnimatePresence>
      {missionBanner && (
        <motion.div
          id="gta-mission-banner"
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-xl pointer-events-auto"
        >
          <div className="bg-[#FF6FB5] comic-border-lg p-5 relative overflow-hidden text-center text-white">
            {/* Background comic stripes */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[repeating-linear-gradient(45deg,#000_0,#000_10px,transparent_10px,transparent_20px)]" />

            {/* Bullet hole decorative corners */}
            <div className="bullet-hole top-2 left-2" />
            <div className="bullet-hole bottom-2 right-2" />

            <button
              id="close-mission-banner-btn"
              onClick={closeMissionBanner}
              className="absolute top-2 right-2 text-black hover:bg-black hover:text-white p-1 transition-colors border-2 border-black bg-white rounded-none cursor-pointer"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#FFD54F] text-black px-2 py-0.5 font-headline text-lg border-2 border-black tracking-wider flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-black" />
                  RESPECT +
                </span>
                <span className="bg-black text-[#00E5FF] px-2 py-0.5 font-headline text-lg border-2 border-black tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                  CONFIRMED
                </span>
              </div>

              <h2 className="font-headline text-3xl sm:text-4xl text-white gta-shadow-black tracking-wider leading-none my-1">
                {missionBanner.title}
              </h2>
              <p className="font-bold text-black bg-[#FFD54F] px-3 py-1 border-2 border-black inline-block text-xs sm:text-sm tracking-wide mt-1 uppercase">
                {missionBanner.subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
