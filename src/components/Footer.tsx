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
    <footer className="relative overflow-hidden bg-[#020611] text-white select-none">
      {/* Top Neon Line */}
      <div className="h-1 bg-gradient-to-r from-[#ff007f] via-[#ffe600] to-[#00f5ff]" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(#00f5ff_1px,transparent_1px)]
            [background-size:28px_28px]
          "
        />
      </div>

      <div className="absolute -left-32 bottom-0 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-32 top-0 w-96 h-96 bg-[#ff007f]/5 rounded-full blur-3xl pointer-events-none" />

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
              text-[#00f5ff]
              drop-shadow-[4px_4px_0px_#ff007f]
            "
          >
            TECHNOVA
            <span className="text-[#ffe600]"> 4.0</span>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[2px] w-12 sm:w-20 bg-[#ff007f]" />

            <span
              className="
                font-marker
                text-xs
                sm:text-sm
                md:text-base
                tracking-[0.25em]
                text-[#00f5ff]
              "
            >
              ITSA • VICE CITY NETWORK
            </span>

            <div className="h-[2px] w-12 sm:w-20 bg-[#ff007f]" />
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
                  text-white
                "
              >
                WHERE CONVERSATIONS TURN
                <br />
                INTO COLLABORATIONS, AND
                <br />
                IDEAS INTO REALITY
                <span className="text-[#00f5ff]"> — BY ITSA.</span>
              </h3>

              <div className="flex items-center gap-3 mt-7">
                <div className="w-12 h-[2px] bg-[#ff007f]" />

                <span
                  className="
                    font-marker
                    text-xs
                    sm:text-sm
                    tracking-widest
                    text-zinc-400
                  "
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
                text-[#00f5ff]
                tracking-wide
              "
            >
              CONTACT US •
            </h3>

            <p className="mt-2 text-sm sm:text-base">
              <span className="text-white">Email: </span>

              <a
                href="mailto:itsa@sjcem.edu.in"
                className="text-[#00f5ff] hover:text-[#ff007f] transition-colors"
              >
                itsa@sjcem.edu.in
              </a>
            </p>

            <div className="h-px bg-zinc-600 my-5" />

            <div className="space-y-1 text-sm sm:text-base">
              <p className="text-[#00f5ff] font-bold">Palghar</p>
              <p>SJCEM</p>
              <p>Vevor, Manor Road</p>
              <p>Palghar (E)</p>
              <p>Dist. Palghar - 401404</p>
            </div>

            <div className="h-px bg-zinc-600 my-5" />

            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-[#00f5ff] font-bold">Stalk Us</p>

              <a
                href="https://www.instagram.com/itsa_sjcem?igsi=dXR5YXpqb2xiaXp0"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#00f5ff] hover:text-[#ff007f] transition-colors"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/in/itsa-sjcem-57782b251?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#00f5ff] hover:text-[#ff007f] transition-colors"
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
              text-base sm:text-lg py-3 px-4 border border-black
              flex items-center justify-center gap-2
              cursor-pointer transition-all duration-300
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
                py-3 px-4 border border-black
                flex items-center justify-center gap-2
                cursor-pointer transition-all duration-300
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
                min-w-0 flex-1 bg-black/70 border border-zinc-700
                px-3 text-xs sm:text-sm text-white
                placeholder-zinc-500 focus:outline-none
                focus:border-[#00f5ff]
              "
            />

            <button
              type="submit"
              className="
                bg-[#00f5ff] hover:bg-[#ffe600]
                text-black font-headline px-4 text-sm
                flex items-center justify-center gap-1
                cursor-pointer transition-all duration-300
                whitespace-nowrap
              "
            >
              FEEDBACK
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* SUCCESS MESSAGE */}
        {subscribed && (
          <div className="mt-3 text-xs text-[#00f5ff] font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />

            <span>
              Transceiver calibrated. Stand by for drop coordinates.
            </span>
          </div>
        )}

        {/* COPYRIGHT */}
        <div className="mt-12 pt-5 border-t border-zinc-800 text-center">
          <p className="text-xs sm:text-sm text-[#00f5ff]">
            © 2026 ITSA Committee | Made with{' '}
            <span className="text-pink-500">♥</span> by ITSA-SJCEM Students
          </p>
        </div>
      </div>
    </footer>
  );
};
