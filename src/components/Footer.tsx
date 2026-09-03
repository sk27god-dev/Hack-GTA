import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  ArrowRight,
  CheckCircle,
  Compass,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openContactModal: () => void;
  openCityMapModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  openContactModal,
  openCityMapModal,
}) => {
  const { triggerMissionPassed } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) return;

    setSubscribed(true);

    triggerMissionPassed(
      'INTEL FEED SUBSCRIBED!',
      'FREQUENCIES LINKED'
    );

    setNewsletterEmail('');

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      className="relative overflow-hidden border-t-4 border-black select-none transition-colors duration-300"
      style={{
        backgroundColor: 'var(--footer-bg)',
        color: 'var(--footer-text)',
      }}
    >
      {/* Top Neon Gradient Line */}
      <div className="h-1.5 bg-gradient-to-r from-[#ff007f] via-[#ffe600] to-[#00f5ff]" />

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(#ff007f_1px,transparent_1px)]
            [background-size:24px_24px]
          "
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-14">
        {/* MAIN BRANDING */}
        <div className="text-center mb-12">
          <h2
            className="
              font-headline
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              tracking-wider
              leading-none
              uppercase
              text-[#ff007f]
              drop-shadow-[4px_4px_0px_#000]
            "
          >
            TECHNOVA
            <span className="text-[#00E5FF] dark:text-[#ffe600]"> 4.0</span>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[3px] w-12 sm:w-20 bg-[#ff007f]" />

            <span
              className="
                font-marker
                text-xs
                sm:text-sm
                md:text-base
                tracking-[0.25em]
                text-[#00838f]
                dark:text-[#00f5ff]
                font-bold
              "
            >
              ITSA • VICE CITY NETWORK
            </span>

            <div className="h-[3px] w-12 sm:w-20 bg-[#ff007f]" />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT */}
          <div className="flex items-center">
            <div className="max-w-md">
              <h3
                className="
                  font-headline
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  leading-tight
                  uppercase
                "
                style={{ color: 'var(--footer-text)' }}
              >
                WHERE CONVERSATIONS TURN
                <br />
                INTO COLLABORATIONS, AND
                <br />
                IDEAS INTO REALITY
                <span className="text-[#ff007f]"> — BY ITSA.</span>
              </h3>

              <div className="flex items-center gap-3 mt-7">
                <div className="w-12 h-[3px] bg-[#ff007f]" />

                <span
                  className="
                    font-marker
                    text-xs
                    sm:text-sm
                    tracking-widest
                    font-bold
                  "
                  style={{ color: 'var(--footer-text-muted)' }}
                >
                  BUILD • CREATE • INNOVATE
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h3
              className="
                font-headline
                text-4xl
                sm:text-5xl
                text-[#ff007f]
                tracking-wide
              "
            >
              CONTACT US •
            </h3>

            <p className="mt-2 text-sm sm:text-base">
              <span className="font-bold" style={{ color: 'var(--footer-text)' }}>Email: </span>

              <a
                href="mailto:itsa@sjcem.edu.in"
                className="text-[#00838f] dark:text-[#00f5ff] hover:text-[#ff007f] font-bold transition-colors underline decoration-2 underline-offset-2"
              >
                itsa@sjcem.edu.in
              </a>
            </p>

            <div
              className="h-[2px] my-5"
              style={{ backgroundColor: 'var(--footer-border)' }}
            />

            <div className="space-y-1 text-sm sm:text-base" style={{ color: 'var(--footer-text)' }}>
              <p className="text-[#ff007f] font-bold">Palghar</p>
              <p>SJCEM</p>
              <p>Vevor, Manor Road</p>
              <p>Palghar (E)</p>
              <p>Dist. Palghar - 401404</p>
            </div>

            <div
              className="h-[2px] my-5"
              style={{ backgroundColor: 'var(--footer-border)' }}
            />

            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-[#ff007f] font-bold">Stalk Us</p>

              <a
                href="https://www.instagram.com/itsa_sjcem?igsi=dXR5YXpqb2xiaXp0"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#00838f] dark:text-[#00f5ff] hover:text-[#ff007f] font-bold transition-colors"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/in/itsa-sjcem-57782b251?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#00838f] dark:text-[#00f5ff] hover:text-[#ff007f] font-bold transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* FUNCTIONAL BUTTONS */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            id="footer-contact-fixer-btn"
            onClick={openContactModal}
            className="
              w-full bg-[#ff007f] hover:bg-[#00f5ff]
              hover:text-black text-white font-headline
              text-base sm:text-lg py-3 px-4 border-2 border-black
              shadow-[3px_3px_0px_#000]
              flex items-center justify-center gap-2
              cursor-pointer transition-all duration-200
            "
          >
            <Mail className="w-4 h-4" />
            <span>TRANSMIT DISPATCH MESSAGE</span>
          </button>

          {openCityMapModal && (
            <button
              id="footer-city-map-btn"
              onClick={openCityMapModal}
              className="
                w-full bg-[#ffe600] hover:bg-[#00f5ff]
                text-black font-headline text-base sm:text-lg
                py-3 px-4 border-2 border-black
                shadow-[3px_3px_0px_#000]
                flex items-center justify-center gap-2
                cursor-pointer transition-all duration-200
              "
            >
              <Compass className="w-4 h-4 animate-spin [animation-duration:10s]" />
              <span>VIEW VICE SATELLITE MAP</span>
            </button>
          )}

          <form onSubmit={handleSubscribe} className="w-full flex h-full">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="FEEDBACK / EMAIL"
              className="
                min-w-0 flex-1 border-2 border-black
                px-3 text-xs sm:text-sm
                shadow-[2px_2px_0px_#000]
                placeholder-zinc-500 focus:outline-none
                focus:border-[#ff007f]
              "
              style={{
                backgroundColor: 'var(--card-bg-solid)',
                color: 'var(--text-primary)',
              }}
            />

            <button
              type="submit"
              className="
                bg-[#00f5ff] hover:bg-[#ffe600]
                text-black font-headline px-4 text-sm
                border-2 border-black border-l-0
                shadow-[2px_2px_0px_#000]
                flex items-center justify-center gap-1
                cursor-pointer transition-all duration-200
                whitespace-nowrap font-bold
              "
            >
              FEEDBACK
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* SUCCESS MESSAGE */}
        {subscribed && (
          <div className="mt-3 text-xs text-[#00838f] dark:text-[#00f5ff] font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />

            <span>
              Transceiver calibrated. Stand by for drop coordinates.
            </span>
          </div>
        )}

        {/* COPYRIGHT */}
        <div
          className="mt-12 pt-5 text-center"
          style={{ borderTop: '2px solid var(--footer-border)' }}
        >
          <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--footer-text-muted)' }}>
            © 2026 ITSA Committee | Made with{' '}
            <span className="text-[#ff007f]">♥</span> by ITSA-SJCEM Students
          </p>
        </div>
      </div>
    </footer>
  );
};
