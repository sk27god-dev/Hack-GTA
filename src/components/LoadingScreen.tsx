import { useEffect, useState, useRef, useCallback } from 'react';
import loadingDesktop from '../assets/videos/loading-desktop.mp4';
import loadingMobile from '../assets/videos/loading-mobile.mp4';
import { getOrCreateAudio } from './GlobalMusic';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);

  const finishLoading = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFadeOut(true);

    const audio = getOrCreateAudio();
    if (audio) {
      audio.muted = false;
      audio.volume = 0.35;
      audio.play().catch(() => {});
    }

    setTimeout(() => {
      onComplete();
    }, 500);
  }, [onComplete]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize, { passive: true });
    document.body.style.overflow = 'hidden';

    // Fallback timer only if video is completely blocked/stalled (25 seconds)
    const safetyTimer = setTimeout(() => {
      finishLoading();
    }, 25000);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', checkScreenSize);
      document.body.style.overflow = '';
    };
  }, [finishLoading]);

  // Handle video autoplay at original speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay prevented by browser, waiting for user click/skip
        });
      }
    }
  }, [finishLoading, isMobile]);

  const loadingVideo = isMobile ? loadingMobile : loadingDesktop;

  return (
    <div
      onClick={finishLoading}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 999999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 500ms ease',
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <video
        ref={videoRef}
        key={loadingVideo}
        src={loadingVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onEnded={finishLoading}
        onError={finishLoading}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <button
        onClick={finishLoading}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.75)',
          color: '#00f5ff',
          border: '1px solid #00f5ff',
          padding: '6px 14px',
          fontFamily: 'sans-serif',
          fontSize: '11px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        SKIP ▸
      </button>
    </div>
  );
}