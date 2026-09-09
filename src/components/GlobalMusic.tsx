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


let globalAudioInstance:
  HTMLAudioElement |
  null = null;


/* ============================================================
   CREATE + PRELOAD GLOBAL AUDIO
   ============================================================ */

export const getOrCreateAudio =
  (): HTMLAudioElement | null => {

    if (
      typeof window ===
      'undefined'
    ) {

      return null;

    }


    if (
      !globalAudioInstance
    ) {

      globalAudioInstance =
        new Audio();


      globalAudioInstance.preload =
        'auto';


      globalAudioInstance.loop =
        true;


      globalAudioInstance.volume =
        0.35;


      globalAudioInstance.src =
        bgMusic;


      /*
       * Start downloading immediately
       */

      try {

        globalAudioInstance.load();

      } catch {

        // Ignore preload errors

      }

    }


    return globalAudioInstance;

  };


/* ============================================================
   PRELOAD AS SOON AS MODULE LOADS
   ============================================================ */

if (
  typeof window !==
  'undefined'
) {

  const audio =
    getOrCreateAudio();


  if (audio) {

    audio.preload =
      'auto';


    try {

      audio.load();

    } catch {

      // Ignore

    }

  }

}


/* ============================================================
   GLOBAL MUSIC COMPONENT
   ============================================================ */

export const GlobalMusic:
  React.FC =
  () => {


    const [
      isSoundOn,
      setIsSoundOn
    ] =
      useState<boolean>(
        () => {

          try {

            const saved =
              localStorage.getItem(
                'technova-sound'
              );


            return (
              saved === null ||
              saved === 'on'
            );

          } catch {

            return true;

          }

        }
      );


    const isSoundOnRef =
      useRef(
        isSoundOn
      );


    isSoundOnRef.current =
      isSoundOn;


    /* ========================================================
       SAVE SOUND SETTING
       ======================================================== */

    useEffect(
      () => {

        try {

          localStorage.setItem(

            'technova-sound',

            isSoundOn
              ? 'on'
              : 'off'

          );

        } catch {

          // Ignore

        }

      },
      [
        isSoundOn
      ]
    );


    /* ========================================================
       NORMAL PLAY FUNCTION
       ======================================================== */

    const tryPlayWithSound =
      useCallback(
        () => {


          if (
            !isSoundOnRef.current
          ) {

            return;

          }


          const audio =
            getOrCreateAudio();


          if (!audio) {

            return;

          }


          audio.volume =
            0.35;


          audio.muted =
            false;


          const playPromise =
            audio.play();


          if (
            playPromise !==
            undefined
          ) {

            playPromise.catch(
              () => {

                /*
                 * Browser blocked autoplay.
                 * Interaction listener below
                 * will handle playback.
                 */

              }
            );

          }

        },
        []
      );


    /* ========================================================
       AUTOPLAY + FIRST INTERACTION FALLBACK
       ======================================================== */

    useEffect(
      () => {


        const audio =
          getOrCreateAudio();


        if (!audio) {

          return;

        }


        /*
         * Make sure browser starts
         * downloading the file
         */

        audio.preload =
          'auto';


        try {

          audio.load();

        } catch {

          // Ignore

        }


        if (
          !isSoundOnRef.current
        ) {

          audio.pause();

          return;

        }


        /*
         * ----------------------------------------------------
         * STEP 1:
         * TRY MUTED AUTOPLAY
         *
         * Browsers are much more likely
         * to allow muted autoplay.
         * ----------------------------------------------------
         */

        audio.volume =
          0.35;


        audio.muted =
          true;


        const mutedPlayPromise =
          audio.play();


        if (
          mutedPlayPromise !==
          undefined
        ) {

          mutedPlayPromise
            .then(
              () => {


                /*
                 * Audio is now playing.
                 *
                 * Try to unmute.
                 */

                setTimeout(
                  () => {

                    if (
                      isSoundOnRef.current
                    ) {

                      audio.muted =
                        false;

                    }

                  },
                  100
                );

              }
            )
            .catch(
              () => {

                /*
                 * Even muted autoplay
                 * was blocked.
                 */

              }
            );

        }


        /*
         * ----------------------------------------------------
         * STEP 2:
         * FIRST USER INTERACTION FALLBACK
         *
         * pointerdown fires earlier
         * than click.
         * ----------------------------------------------------
         */

        let unlocked =
          false;


        const unlockAndPlay =
          () => {


            if (
              unlocked ||
              !isSoundOnRef.current
            ) {

              return;

            }


            const activeAudio =
              getOrCreateAudio();


            if (
              !activeAudio
            ) {

              return;

            }


            activeAudio.volume =
              0.35;


            activeAudio.muted =
              false;


            const playPromise =
              activeAudio.play();


            if (
              playPromise !==
              undefined
            ) {

              playPromise
                .then(
                  () => {

                    unlocked =
                      true;


                    cleanupListeners();

                  }
                )
                .catch(
                  () => {

                    /*
                     * Keep listeners alive
                     * until valid interaction.
                     */

                  }
                );

            }

          };


        const events = [

          'pointerdown',

          'mousedown',

          'touchstart',

          'keydown',

          'click'

        ];


        const cleanupListeners =
          () => {

            events.forEach(
              event => {

                window.removeEventListener(

                  event,

                  unlockAndPlay,

                  true

                );

              }
            );

          };


        events.forEach(
          event => {

            window.addEventListener(

              event,

              unlockAndPlay,

              true

            );

          }
        );


        /*
         * ----------------------------------------------------
         * VISIBILITY CHANGE
         * ----------------------------------------------------
         */

        const handleVisibilityChange =
          () => {


            if (
              document.hidden
            ) {

              audio.pause();

            }


            else if (

              isSoundOnRef.current

            ) {

              tryPlayWithSound();

            }

          };


        document.addEventListener(

          'visibilitychange',

          handleVisibilityChange

        );


        return () => {


          cleanupListeners();


          document.removeEventListener(

            'visibilitychange',

            handleVisibilityChange

          );

        };


      },
      [
        tryPlayWithSound
      ]
    );


    /* ========================================================
       TOGGLE SOUND
       ======================================================== */

    const toggleSound =
      () => {


        const audio =
          getOrCreateAudio();


        if (!audio) {

          return;

        }


        if (
          isSoundOn
        ) {


          audio.pause();


          audio.muted =
            true;


          setIsSoundOn(
            false
          );


        }


        else {


          setIsSoundOn(
            true
          );


          audio.volume =
            0.35;


          audio.muted =
            false;


          audio.play()
            .catch(
              () => {

                /*
                 * Browser interaction should
                 * allow this because this is
                 * directly inside button click.
                 */

              }
            );

        }

      };


    /* ========================================================
       RENDER
       ======================================================== */

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