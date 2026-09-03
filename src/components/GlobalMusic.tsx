import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';

import {
  Volume2,
  VolumeX
} from 'lucide-react';

import bgMusic from '../assets/GTA Theme.mp3';

let globalAudioInstance: HTMLAudioElement | null = null;

export const getOrCreateAudio = (): HTMLAudioElement | null => {
  if (typeof window === 'undefined') return null;
  if (!globalAudioInstance) {
    globalAudioInstance = new Audio();
    globalAudioInstance.src = bgMusic;
    globalAudioInstance.loop = true;
    globalAudioInstance.volume = 0.35;
    globalAudioInstance.preload = 'auto';
    try {
      globalAudioInstance.load();
    } catch {
      // Ignore
    }
  }
  return globalAudioInstance;
};

// Immediate pre-buffer on bundle load
if (typeof window !== 'undefined') {
  getOrCreateAudio();
}

export const GlobalMusic: React.FC = () => {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('technova-sound');
      if (saved === null) return true;
      return saved === 'on';
    } catch {
      return true;
    }
  });

  const isSoundOnRef = useRef(isSoundOn);
  isSoundOnRef.current = isSoundOn;

  const tryPlayAudio = useCallback(() => {
    if (!isSoundOnRef.current) return;
    const audio = getOrCreateAudio();
    if (!audio) return;
    
    audio.volume = 0.35;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay restrictions will be unlocked on first interaction
      });
    }
  }, []);

  /* Save preference */
  useEffect(() => {
    try {
      localStorage.setItem('technova-sound', isSoundOn ? 'on' : 'off');
    } catch {
      // Ignore
    }
  }, [isSoundOn]);

  /* Main Autoplay & User Interaction Unlocker */
  useEffect(() => {
    const audio = getOrCreateAudio();
    if (!audio) return;

    if (isSoundOn) {
      tryPlayAudio();
    } else {
      audio.pause();
    }

    const unlockAndPlay = () => {
      if (!isSoundOnRef.current) return;
      if (!audio.paused) return;

      audio.volume = 0.35;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio unlocked and playing smoothly
            cleanupListeners();
          })
          .catch(() => {
            // Still waiting for next valid interaction
          });
      }
    };

    const events = ['pointerdown', 'mousedown', 'touchstart', 'click', 'keydown', 'scroll', 'wheel'];
    
    const cleanupListeners = () => {
      events.forEach(evt => {
        window.removeEventListener(evt, unlockAndPlay);
      });
    };

    events.forEach(evt => {
      window.addEventListener(evt, unlockAndPlay, { passive: true });
    });

    // Handle tab visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
      } else if (isSoundOnRef.current) {
        tryPlayAudio();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cleanupListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSoundOn, tryPlayAudio]);

  /* TOGGLE SOUND */
  const toggleSound = () => {
    const audio = getOrCreateAudio();
    if (!audio) return;

    if (isSoundOn) {
      audio.pause();
      setIsSoundOn(false);
    } else {
      setIsSoundOn(true);
      audio.volume = 0.35;
      audio.play().catch(() => {});
    }
  };


  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <button
      id="global-sound-toggle-btn"
      onClick={toggleSound}
      aria-label={
        isSoundOn
          ? 'Turn background music off'
          : 'Turn background music on'
      }
      title={
        isSoundOn
          ? 'Turn music off'
          : 'Turn music on'
      }
      className="
        fixed
        right-4
        bottom-4
        sm:right-6
        sm:bottom-6
        z-[99999]
        w-12
        h-12
        sm:w-14
        sm:h-14
        bg-[#FF6FB5]
        hover:bg-[#00E5FF]
        text-black
        border-2
        border-black
        comic-border-sm
        flex
        items-center
        justify-center
        shadow-[4px_4px_0px_#000]
        hover:shadow-[5px_5px_0px_#000]
        active:translate-x-1
        active:translate-y-1
        transition-all
        duration-200
        cursor-pointer
      "
    >
      {isSoundOn ? (
        <Volume2
          className="
            w-6
            h-6
            sm:w-7
            sm:h-7
            text-black
            stroke-[2.5px]
          "
        />
      ) : (
        <VolumeX
          className="
            w-6
            h-6
            sm:w-7
            sm:h-7
            text-black
            stroke-[2.5px]
            opacity-70
          "
        />
      )}
    </button>
  );
};

export default GlobalMusic;