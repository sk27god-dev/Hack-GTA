import { useEffect, useState } from 'react';
import loadingDesktop from '../assets/videos/loading-desktop.mp4';
import loadingMobile from '../assets/videos/loading-mobile.mp4';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.body.style.overflow = '';
    };
  }, []);

  const finishLoading = () => {
    setFadeOut(true);

    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const loadingVideo = isMobile
    ? loadingMobile
    : loadingDesktop;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 999999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 700ms ease',
        overflow: 'hidden',
      }}
    >
      <video
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
    </div>
  );
}