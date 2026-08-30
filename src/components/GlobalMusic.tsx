import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import {
  Volume2,
  VolumeX
} from 'lucide-react';

import bgMusic from '../assets/audio/gta-theme.mp3.mp3';


const GlobalMusic: React.FC = () => {

  const audioRef =
    useRef<HTMLAudioElement | null>(null);


  /* ============================================================
     SOUND STATE
     ============================================================ */

  const [isSoundOn, setIsSoundOn] =
    useState<boolean>(() => {

      try {

        const saved =
          localStorage.getItem(
            'technova-sound'
          );

        if (saved === null) {
          return true;
        }

        return saved === 'on';

      } catch {

        return true;

      }

    });


  const [hasInteracted, setHasInteracted] =
    useState(false);


  /* ============================================================
     CREATE AUDIO
     ============================================================ */

  useEffect(() => {

    const audio =
      new Audio(bgMusic);

    audio.loop = true;

    audio.volume = 0.35;

    audio.preload = 'auto';

    audioRef.current = audio;


    return () => {

      audio.pause();

      audio.currentTime = 0;

      audioRef.current = null;

    };

  }, []);


  /* ============================================================
     SAVE SOUND PREFERENCE
     ============================================================ */

  useEffect(() => {

    try {

      localStorage.setItem(
        'technova-sound',
        isSoundOn ? 'on' : 'off'
      );

    } catch {

      // Ignore localStorage errors.

    }

  }, [isSoundOn]);


  /* ============================================================
     AUTOPLAY
     ============================================================ */

  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio || !isSoundOn) {
      return;
    }


    audio.play().catch(() => {

      /*
       Browser blocked autoplay.

       The interaction listener below will
       start the music after the user clicks.
      */

    });

  }, [isSoundOn]);


  /* ============================================================
     START AFTER USER INTERACTION
     ============================================================ */

  useEffect(() => {

    if (!isSoundOn || hasInteracted) {
      return;
    }


    const startMusic =
      async () => {

        const audio =
          audioRef.current;

        if (!audio) {
          return;
        }


        try {

          await audio.play();

          setHasInteracted(true);

        } catch {

          // Browser may still block playback.

        }

      };


    const handleInteraction =
      () => {

        startMusic();

      };


    document.addEventListener(
      'click',
      handleInteraction,
      { once: true }
    );

    document.addEventListener(
      'keydown',
      handleInteraction,
      { once: true }
    );

    document.addEventListener(
      'touchstart',
      handleInteraction,
      { once: true }
    );


    return () => {

      document.removeEventListener(
        'click',
        handleInteraction
      );

      document.removeEventListener(
        'keydown',
        handleInteraction
      );

      document.removeEventListener(
        'touchstart',
        handleInteraction
      );

    };

  }, [
    isSoundOn,
    hasInteracted
  ]);


  /* ============================================================
     TOGGLE SOUND
     ============================================================ */

  const toggleSound =
    async () => {

      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }


      if (isSoundOn) {

        audio.pause();

        setIsSoundOn(false);

      } else {

        setIsSoundOn(true);

        setHasInteracted(true);

        audio.volume = 0.35;


        try {

          await audio.play();

        } catch {

          // Playback may be blocked.

        }

      }

    };


  /* ============================================================
     RENDER
     ============================================================ */

  return (

    <button

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

        bg-black
        text-white

        border-2
        border-white

        comic-border-sm

        flex
        items-center
        justify-center

        shadow-[4px_4px_0px_#FF6FB5]

        hover:bg-[#FF6FB5]
        hover:text-black
        hover:border-black

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
          "
        />

      ) : (

        <VolumeX
          className="
            w-6
            h-6
            sm:w-7
            sm:h-7
          "
        />

      )}

    </button>

  );

};


export default GlobalMusic;