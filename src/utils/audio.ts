import { getOrCreateAudio } from '../components/GlobalMusic';

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const getSoundEnabled = (): boolean => {
  const saved = localStorage.getItem('technova-sound');
  return saved === null ? true : saved === 'on';
};

export const setSoundEnabled = (enabled: boolean) => {
  localStorage.setItem('technova-sound', enabled ? 'on' : 'off');
  const bgAudio = getOrCreateAudio();
  if (bgAudio) {
    bgAudio.muted = !enabled;
    if (enabled) {
      bgAudio.play().catch(e => console.log('BGM play failed/interrupted:', e));
    } else {
      bgAudio.pause();
    }
  }
};

export const initAudio = () => {
  const bgAudio = getOrCreateAudio();
  if (!bgAudio) return;
  
  bgAudio.loop = true;
  bgAudio.volume = 0.35;
  bgAudio.muted = !getSoundEnabled();
  
  if (getSoundEnabled()) {
    const playAttempt = bgAudio.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        // Autoplay prevented. Register interaction listeners to start playback on first gesture.
        const playOnInteraction = () => {
          if (bgAudio && getSoundEnabled()) {
            bgAudio.play().catch(e => console.log('BGM play failed on interaction:', e));
          }
          // Remove event listeners
          window.removeEventListener('click', playOnInteraction);
          window.removeEventListener('keydown', playOnInteraction);
          window.removeEventListener('mousedown', playOnInteraction);
          window.removeEventListener('touchstart', playOnInteraction);
        };
        
        window.addEventListener('click', playOnInteraction);
        window.addEventListener('keydown', playOnInteraction);
        window.addEventListener('mousedown', playOnInteraction);
        window.addEventListener('touchstart', playOnInteraction);
      });
    }
  }
};

export const playClickSound = () => {
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.warn('Web Audio click error:', e);
  }
};

export const playHoverSound = () => {
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn('Web Audio hover error:', e);
  }
};

export const playMissionPassedSound = () => {
  if (!getSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Arpeggiated victory chord (C4, E4, G4, C5)
    const notes = [261.63, 329.63, 392.00, 523.25];
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = now + idx * 0.12;
      const noteDuration = 0.8;
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, noteStart);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, noteStart);
      filter.frequency.exponentialRampToValueAtTime(2000, noteStart + 0.1);
      filter.frequency.exponentialRampToValueAtTime(400, noteStart + noteDuration);
      
      gain.gain.setValueAtTime(0.0, noteStart);
      gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(noteStart);
      osc.stop(noteStart + noteDuration);
    });
  } catch (e) {
    console.warn('Web Audio fanfare error:', e);
  }
};
