import { getOrCreateAudio } from '../components/GlobalMusic';

let audioCtx: AudioContext | null = null;

let audioInitialized = false;


/* ============================================================
   AUDIO CONTEXT
   ============================================================ */

const getAudioContext = () => {

  if (!audioCtx) {

    audioCtx = new (
      window.AudioContext ||
      (window as any).webkitAudioContext
    )();

  }


  if (audioCtx.state === 'suspended') {

    audioCtx.resume().catch(
      e =>
        console.warn(
          'Audio context resume failed:',
          e
        )
    );

  }


  return audioCtx;

};


/* ============================================================
   PRELOAD / WARM UP AUDIO
   ============================================================ */

const warmUpAudio = () => {

  if (audioInitialized) return;


  try {

    const ctx =
      getAudioContext();


    const unlockAudio = () => {

      if (
        ctx.state ===
        'suspended'
      ) {

        ctx.resume()
          .then(() => {

            audioInitialized =
              true;

          })
          .catch(
            e =>
              console.warn(
                'Audio unlock failed:',
                e
              )
          );

      } else {

        audioInitialized =
          true;

      }


      window.removeEventListener(
        'click',
        unlockAudio
      );

      window.removeEventListener(
        'mousedown',
        unlockAudio
      );

      window.removeEventListener(
        'touchstart',
        unlockAudio
      );

      window.removeEventListener(
        'keydown',
        unlockAudio
      );

    };


    window.addEventListener(
      'click',
      unlockAudio,
      { once: true }
    );

    window.addEventListener(
      'mousedown',
      unlockAudio,
      { once: true }
    );

    window.addEventListener(
      'touchstart',
      unlockAudio,
      { once: true }
    );

    window.addEventListener(
      'keydown',
      unlockAudio,
      { once: true }
    );


  } catch (
    e
  ) {

    console.warn(
      'Audio warm-up error:',
      e
    );

  }

};


/* ============================================================
   SOUND SETTINGS
   ============================================================ */

export const getSoundEnabled =
  (): boolean => {

    const saved =
      localStorage.getItem(
        'technova-sound'
      );


    return saved === null
      ? true
      : saved === 'on';

  };


export const setSoundEnabled = (
  enabled: boolean
) => {

  localStorage.setItem(
    'technova-sound',
    enabled
      ? 'on'
      : 'off'
  );


  const bgAudio =
    getOrCreateAudio();


  if (bgAudio) {

    bgAudio.muted =
      !enabled;


    /*
     * Preload the BGM immediately
     */

    bgAudio.preload =
      'auto';


    bgAudio.load();


    if (enabled) {

      bgAudio.play()
        .catch(
          e =>
            console.log(
              'BGM play failed/interrupted:',
              e
            )
        );

    } else {

      bgAudio.pause();

    }

  }

};


/* ============================================================
   INITIALIZE AUDIO
   ============================================================ */

export const initAudio =
  () => {


    /*
     * Prepare Web Audio immediately
     */

    warmUpAudio();


    const bgAudio =
      getOrCreateAudio();


    if (!bgAudio) return;


    /*
     * Force browser to preload audio
     */

    bgAudio.preload =
      'auto';


    bgAudio.loop =
      true;


    bgAudio.volume =
      0.35;


    bgAudio.muted =
      !getSoundEnabled();


    /*
     * Load audio immediately
     */

    bgAudio.load();


    if (
      getSoundEnabled()
    ) {

      const playAttempt =
        bgAudio.play();


      if (
        playAttempt !==
        undefined
      ) {

        playAttempt.catch(
          () => {


            /*
             * Autoplay blocked.
             * Start immediately on
             * first user interaction.
             */

            const playOnInteraction =
              () => {


                if (
                  bgAudio &&
                  getSoundEnabled()
                ) {

                  bgAudio.play()
                    .catch(
                      e =>
                        console.log(
                          'BGM play failed on interaction:',
                          e
                        )
                    );

                }


                window.removeEventListener(
                  'click',
                  playOnInteraction
                );

                window.removeEventListener(
                  'keydown',
                  playOnInteraction
                );

                window.removeEventListener(
                  'mousedown',
                  playOnInteraction
                );

                window.removeEventListener(
                  'touchstart',
                  playOnInteraction
                );

              };


            window.addEventListener(
              'click',
              playOnInteraction,
              { once: true }
            );

            window.addEventListener(
              'keydown',
              playOnInteraction,
              { once: true }
            );

            window.addEventListener(
              'mousedown',
              playOnInteraction,
              { once: true }
            );

            window.addEventListener(
              'touchstart',
              playOnInteraction,
              { once: true }
            );

          }
        );

      }

    }

  };


/* ============================================================
   CLICK SOUND
   ============================================================ */

export const playClickSound =
  () => {

    if (
      !getSoundEnabled()
    ) return;


    try {

      const ctx =
        getAudioContext();


      const osc =
        ctx.createOscillator();


      const gain =
        ctx.createGain();


      osc.type =
        'sine';


      osc.frequency.setValueAtTime(
        800,
        ctx.currentTime
      );


      osc.frequency.exponentialRampToValueAtTime(
        100,
        ctx.currentTime +
          0.1
      );


      gain.gain.setValueAtTime(
        0.15,
        ctx.currentTime
      );


      gain.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime +
          0.1
      );


      osc.connect(
        gain
      );


      gain.connect(
        ctx.destination
      );


      osc.start();


      osc.stop(
        ctx.currentTime +
          0.1
      );


    } catch (
      e
    ) {

      console.warn(
        'Web Audio click error:',
        e
      );

    }

  };


/* ============================================================
   HOVER SOUND
   ============================================================ */

export const playHoverSound =
  () => {

    if (
      !getSoundEnabled()
    ) return;


    try {

      const ctx =
        getAudioContext();


      const osc =
        ctx.createOscillator();


      const gain =
        ctx.createGain();


      osc.type =
        'triangle';


      osc.frequency.setValueAtTime(
        1200,
        ctx.currentTime
      );


      gain.gain.setValueAtTime(
        0.04,
        ctx.currentTime
      );


      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime +
          0.05
      );


      osc.connect(
        gain
      );


      gain.connect(
        ctx.destination
      );


      osc.start();


      osc.stop(
        ctx.currentTime +
          0.05
      );


    } catch (
      e
    ) {

      console.warn(
        'Web Audio hover error:',
        e
      );

    }

  };


/* ============================================================
   MISSION PASSED SOUND
   ============================================================ */

export const playMissionPassedSound =
  () => {

    if (
      !getSoundEnabled()
    ) return;


    try {

      const ctx =
        getAudioContext();


      const now =
        ctx.currentTime;


      const notes = [

        261.63,

        329.63,

        392.00,

        523.25

      ];


      notes.forEach(
        (
          freq,
          idx
        ) => {


          const osc =
            ctx.createOscillator();


          const gain =
            ctx.createGain();


          const noteStart =
            now +
            idx * 0.12;


          const noteDuration =
            0.8;


          osc.type =
            'sawtooth';


          osc.frequency.setValueAtTime(
            freq,
            noteStart
          );


          const filter =
            ctx.createBiquadFilter();


          filter.type =
            'lowpass';


          filter.frequency.setValueAtTime(
            200,
            noteStart
          );


          filter.frequency.exponentialRampToValueAtTime(
            2000,
            noteStart +
              0.1
          );


          filter.frequency.exponentialRampToValueAtTime(
            400,
            noteStart +
              noteDuration
          );


          gain.gain.setValueAtTime(
            0,
            noteStart
          );


          gain.gain.linearRampToValueAtTime(
            0.08,
            noteStart +
              0.05
          );


          gain.gain.exponentialRampToValueAtTime(
            0.001,
            noteStart +
              noteDuration
          );


          osc.connect(
            filter
          );


          filter.connect(
            gain
          );


          gain.connect(
            ctx.destination
          );


          osc.start(
            noteStart
          );


          osc.stop(
            noteStart +
              noteDuration
          );

        }
      );


    } catch (
      e
    ) {

      console.warn(
        'Web Audio fanfare error:',
        e
      );

    }

  };