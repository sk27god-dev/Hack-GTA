

import React, { useState, useEffect, useRef } from 'react';

import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Competition } from '../types';

import {
  motion,
  AnimatePresence,
  type Variants
} from 'motion/react';

import technovaBg from '../assets/videos/technova-bg-gta.mp4';
import heroPoster from '../assets/images/hero_poster_optimized.jpg';


import {
  ArrowRight,
  Users,
  Trophy,
  Terminal,
  Zap,
  Sparkles,
  Calendar,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Gamepad2,
  Code2,
  Crosshair,
  Target,
  Shield,
  Swords
} from 'lucide-react';

import {
  playClickSound,
  playMissionPassedSound
} from '../utils/audio';


/* ============================================================
   TYPES
   ============================================================ */

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  openCompetitionModal: (comp: Competition) => void;
  openAuthModal: () => void;
  openCrewModal: () => void;
  openCityMapModal?: () => void;
}


/* ============================================================
   COMPONENT
   ============================================================ */

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  openCompetitionModal,
  openAuthModal,
  openCrewModal,
  openCityMapModal
}) => {

  const {
    competitions,
    timeline,
    faqs,
    prizes,
    triggerMissionPassed
  } = useApp();

  const { currentUser } = useAuth();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);


  /* ============================================================
     MOTION
     ============================================================ */

  const heroContainerVariants: Variants = {
    hidden: {
      opacity: 0
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };


  const heroItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.65,
        ease: 'easeOut'
      }
    }
  };


  /* ============================================================
     FEATURED COMPETITIONS
     ============================================================ */

  const featuredComps = competitions.filter(
    competition => competition.featured
  );


  /* ============================================================
     MISSION DATA
     ============================================================ */

  const missions = [

    {
      id: 'hackathon',
      number: 'MISSION 01',
      tag: 'BUILD',
      title: 'TECHNOVA HACKATHON',
      subtitle: 'WELCOME TO YOUR NEXT MISSION.',
      description:
        'A 12-hour hackathon built for those who are ready to think fast, build smart and compete till the final hour. The problem statement is classified and revealed on the spot.',
      icon: Code2,
      accent: '#00E5FF',
      details: [
        '26 SEPTEMBER 2026',
        '8:00 AM – 8:00 PM',
        'ST. JOHN COLLEGE, PALGHAR',
        'MAX 4 MEMBERS',
        '₹300 / TEAM',
        '₹30,000 PRIZE POOL',
        'SNACKS PROVIDED'
      ],
      missionText:
        'MISSION CLASSIFIED — PROBLEM STATEMENT REVEALED ON THE SPOT'
    },


    {
      id: 'bgmi',
      number: 'MISSION 02',
      tag: 'BATTLE',
      title: 'BGMI SHOWDOWN',
      subtitle: "THE STREETS AREN'T SAFE. • MODE: CLASSIC",
      description:
        'Assemble your squad, enter the battleground, and fight your way to the top in Classic mode. Your squad. Your strategy. Your game.',
      icon: Crosshair,
      accent: '#FF6FB5',
      details: [
        '4 MEMBERS (SQUAD)',
        '₹200 / TEAM',
        'MODE: CLASSIC',
        'SURVIVE & STRATEGIZE',
        '₹2,500 PRIZE POOL',
        'DOMINATE'
      ],
      missionText:
        'YOUR SQUAD. YOUR STRATEGY. YOUR GAME. • MODE: CLASSIC'
    },


    {
      id: 'efootball',
      number: 'MISSION 03',
      tag: 'SPORT',
      title: 'E-FOOTBALL CHALLENGE',
      subtitle: 'FROM THE STREETS TO THE STADIUM.',
      description:
        'Pick your side, step onto the virtual pitch, and take on the competition. Every goal counts. Every match is a new mission.',
      icon: Gamepad2,
      accent: '#FFD54F',
      details: [
        'SOLO COMPETITION',
        '₹30 / PERSON',
        'VIRTUAL PITCH',
        '₹2,500 PRIZE POOL',
        'EVERY GOAL COUNTS',
        'NEW MISSION'
      ],
      missionText:
        'PICK YOUR SIDE. STEP ONTO THE VIRTUAL PITCH.'
    }
  ];


  const [activeMission, setActiveMission] =
    useState(0);


  /* ============================================================
     TIMELINE
     ============================================================ */

  const [selectedTimelineDay, setSelectedTimelineDay] =
    useState<'Day 1'>('Day 1');

  const previewTimelineEvents = timeline
    .filter(event => event.day === selectedTimelineDay)
    .slice(0, 4);


  /* ============================================================
     FAQ
     ============================================================ */

  const [openFaqIds, setOpenFaqIds] =
    useState<Record<string, boolean>>({
      'faq-hackathon-team': true,
      'faq-hackathon-duration': false
    });

  const previewFaqs = faqs.slice(0, 4);


  const toggleHomeFaq = (id: string) => {

    playClickSound();

    setOpenFaqIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

  };



  /* ============================================================
     TOTAL PRIZE
     ============================================================ */

  const totalPrize =
    prizes?.reduce(
      (total, prize) =>
        total + (prize.numericalAmount || 0),
      0
    ) || 35000;


  /* ============================================================
     REGISTER MISSION
     ============================================================ */

  const handleMissionRegister = () => {

    if (currentUser) {

      openCrewModal();

    } else {

      openAuthModal();

    }

  };


  /* ============================================================
     RENDER
     ============================================================ */


  return (

    <div className="space-y-16 sm:space-y-20 pb-16 overflow-x-hidden">


      {/* ========================================================
          1. HERO
          ======================================================== */}

      <section
        className="
          relative
          min-h-[78vh]
          sm:min-h-[82vh]
          lg:min-h-[86vh]

          flex
          items-center
          justify-center

          overflow-hidden

          border-b-[6px]
          border-black

          bg-black
        "
      >


        {/* ====================================================
            VIDEO
            IMPORTANT:
            NO DARK OVERLAY
            NO BLACK OVERLAY
        ==================================================== */}

        <div
          className="absolute inset-0 z-0 bg-black"
          style={{
            backgroundImage: `url(${heroPoster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >

          <video
            ref={videoRef}
            src={technovaBg}
            poster={heroPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideoLoaded(true)}
            onLoadedData={() => setVideoLoaded(true)}
            className={`
              absolute
              inset-0
              w-full
              h-full

              object-cover
              object-center

              transition-opacity
              duration-500
              ${videoLoaded ? 'opacity-100' : 'opacity-95'}

              select-none
            `}
          />

        </div>


        {/* ====================================================
            VERY LIGHT EDGE VIGNETTE
            NOT AN OVERLAY OVER THE VIDEO
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            z-[1]

            bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.35)_100%)]
          "
        />


        {/* ====================================================
            HERO CONTENT
        ==================================================== */}

        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"

          className="
            relative
            z-10

            w-full
            min-h-[78vh]
            sm:min-h-[82vh]
            lg:min-h-[86vh]

            flex
            flex-col
            items-center
            justify-center

            text-center

            px-4
            py-12
            sm:py-14
          "
        >
          <div
            className="
              w-fit
              max-w-[95vw]
              sm:max-w-[92vw]
              px-4
              py-5
              sm:px-8
              sm:py-7
              bg-black/25
              backdrop-blur-[1.5px]
              border
              border-white/10
              shadow-[0_10px_40px_rgba(0,0,0,0.18)]
            "
          >


          {/* ITSA */}

          <motion.div
            variants={heroItemVariants}
            className="
              mb-2
              sm:mb-4
            "
          >

            <div
              className="
                inline-block

                bg-[#FF6FB5]
                text-white

                border-2
                sm:border-[3px]
                border-black

                px-4
                sm:px-7
                py-1.5
                sm:py-2

                font-headline

                text-xs
                xs:text-sm
                sm:text-lg

                tracking-[0.2em]
                sm:tracking-[0.25em]

                shadow-[3px_3px_0px_#000]
                sm:shadow-[5px_5px_0px_#000]

                transform
                -rotate-1
              "
            >
              ITSA PRESENTS
            </div>

          </motion.div>



          {/* TECHNOVA */}

          <motion.div
            variants={heroItemVariants}
            className="relative"
          >

            <h1
              className="
                font-headline

                text-[2.75rem]
                xs:text-[3.5rem]
                sm:text-[5rem]
                md:text-[6rem]
                lg:text-[7rem]

                leading-[0.8]
                sm:leading-[0.75]

                tracking-[-0.03em]

                text-white

                uppercase

                gta-shadow-black

                select-none
              "
              style={{
                fontFamily:
                  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif'
              }}
            >
              TECHNOVA
            </h1>


            {/* 4.0 */}

            <div
              className="
                mt-2
                sm:mt-4

                font-headline

                text-3xl
                xs:text-4xl
                sm:text-5xl
                md:text-6xl

                leading-none

                text-[#FFD54F]

                gta-shadow-black

                tracking-wider
              "
              style={{
                fontFamily:
                  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif'
              }}
            >
              4.0
            </div>

          </motion.div>


          {/* TAGLINE */}

          <motion.div
            variants={heroItemVariants}
            className="
              mt-3
              sm:mt-5
              max-w-3xl
            "
          >

            <p
              className="
                text-white

                text-xs
                xs:text-sm
                sm:text-base
                md:text-lg

                font-black

                tracking-[0.1em]
                sm:tracking-[0.12em]

                uppercase

                gta-shadow-black
              "
            >
              ENTER THE CITY. CHOOSE YOUR MISSION.
            </p>


            <p
              className="
                mt-1

                text-[#FFD54F]

                text-[10px]
                xs:text-xs
                sm:text-sm

                font-bold

                tracking-widest

                uppercase

                gta-shadow-black
              "
            >
              MAKE YOUR MOVE.
            </p>

          </motion.div>


          {/* DATE */}

          <motion.div
            variants={heroItemVariants}
            className="mt-4 sm:mt-6"
          >

            <div
              className="
                inline-flex
                items-center
                gap-1.5
                sm:gap-2

                bg-white
                text-black

                border-2
                sm:border-[3px]
                border-black

                px-4
                sm:px-7
                py-1.5
                sm:py-2

                font-headline

                text-xs
                xs:text-sm
                sm:text-lg

                tracking-wider

                shadow-[4px_4px_0px_#FF6FB5]
                sm:shadow-[5px_5px_0px_#FF6FB5]
              "
            >

              <Calendar className="w-3.5 h-3.5 sm:w-5 sm:h-5" />

              26 SEPTEMBER 2026


            </div>

          </motion.div>


          {/* LOCATION */}

          <motion.div
            variants={heroItemVariants}
            className="
              mt-3
              sm:mt-4

              flex
              items-center
              justify-center
              gap-1.5
              sm:gap-2

              text-white

              font-bold

              text-[10px]
              xs:text-xs
              sm:text-sm

              tracking-wider

              uppercase

              gta-shadow-black
            "
          >

            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00E5FF]" />

            ST. JOHN COLLEGE, PALGHAR

          </motion.div>


          {/* SCROLL INDICATOR */}

          <motion.div
            variants={heroItemVariants}
            className="
              absolute
              bottom-4
              sm:bottom-8
              left-1/2
              -translate-x-1/2

              flex
              flex-col
              items-center

              text-white
            "
          >

            <span
              className="
                text-[8px]
                xs:text-[9px]
                sm:text-xs

                font-black

                tracking-[0.25em]
                sm:tracking-[0.3em]

                uppercase

                gta-shadow-black

                mb-1
                sm:mb-2
              "
            >
              SELECT YOUR MISSION
            </span>


            <ChevronDown
              className="
                w-5
                h-5
                sm:w-6
                sm:h-6

                text-[#FF6FB5]

                animate-bounce

                drop-shadow-[2px_2px_0px_#000]
              "
            />

          </motion.div>

          </div>


        </motion.div>

      </section>


      {/* ========================================================
          2. MISSION SELECT
          ======================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row

            md:items-end
            md:justify-between

            gap-5

            mb-8
            sm:mb-10
          "
        >

          <div>

            <div
              className="
                inline-block

                bg-[#00E5FF]
                text-black

                border-2
                border-black

                px-3
                py-1

                font-headline

                text-sm
                sm:text-base

                tracking-widest

                shadow-[3px_3px_0px_#000]
              "
            >
              MISSION SELECT
            </div>


            <h2
              className="
                mt-3

                font-headline

                text-4xl
                sm:text-6xl
                lg:text-7xl

                leading-none

                tracking-wide
              "
              style={{
                fontFamily:
                  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                color: 'var(--text-primary)'
              }}
            >
              CHOOSE YOUR BATTLEFIELD
            </h2>


            <p
              className="
                mt-3

                text-sm
                sm:text-base

                font-bold

                max-w-2xl
              "
              style={{ color: 'var(--text-secondary)' }}
            >
              Vice City is calling. Pick your mission, assemble your crew
              and make your move.
            </p>

          </div>


          {/* DATE BOX */}

          <div
            className="
              bg-black
              text-white

              border-2
              border-black

              px-5
              py-3

              shadow-[4px_4px_0px_#FF6FB5]

              shrink-0
            "
          >

            <span
              className="
                block

                text-[#00E5FF]

                font-headline

                text-xl
              "
            >
              26 SEP 2026
            </span>

            <span
              className="
                text-[10px]

                text-zinc-400

                font-bold

                tracking-wider
              "
            >
              ONE DAY. THREE MISSIONS.
            </span>

          </div>

        </div>


        {/* MISSION SELECTOR */}

        <div
          className="
            grid

            grid-cols-1
            md:grid-cols-3

            gap-3

            mb-7
          "
        >

          {missions.map((mission, index) => {

            const Icon = mission.icon;

            const selected =
              activeMission === index;

            return (

              <button
                key={mission.id}
                onClick={() => {

                  playClickSound();

                  setActiveMission(index);

                }}
                className={`
                  group

                  text-left

                  border-[3px]
                  border-black

                  p-4

                  transition-all

                  cursor-pointer

                  ${
                    selected
                      ? 'bg-black text-white shadow-[5px_5px_0px_#FF6FB5] -translate-y-1'
                      : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:bg-[#FFD54F]'
                  }
                `}
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className={`
                        w-11
                        h-11

                        flex
                        items-center
                        justify-center

                        border-2
                        border-black

                        shrink-0

                        ${
                          selected
                            ? 'bg-[#FF6FB5] text-white'
                            : 'bg-[#FFF5F0] text-black'
                        }
                      `}
                    >

                      <Icon className="w-6 h-6" />

                    </div>


                    <div>

                      <span
                        className={`
                          block

                          text-[10px]

                          font-black

                          tracking-widest

                          ${
                            selected
                              ? 'text-[#00E5FF]'
                              : 'text-zinc-500'
                          }
                        `}
                      >
                        {mission.number}
                      </span>


                      <span
                        className="
                          block

                          font-headline

                          text-xl

                          leading-none

                          mt-1
                        "
                      >
                        {mission.title}
                      </span>

                    </div>


                  </div>


                  <ArrowRight
                    className={`
                      w-5
                      h-5

                      shrink-0

                      transition-transform

                      ${
                        selected
                          ? 'text-[#FF6FB5] translate-x-1'
                          : 'text-zinc-400'
                      }
                    `}
                  />

                </div>

              </button>

            );

          })}

        </div>


        {/* ACTIVE MISSION */}

        <AnimatePresence mode="wait">

          <motion.div
            key={missions[activeMission].id}

            initial={{
              opacity: 0,
              y: 15
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            exit={{
              opacity: 0,
              y: -15
            }}

            transition={{
              duration: 0.25
            }}

            className="
              bg-[#141419]
              text-white

              border-[4px]
              border-black

              shadow-[7px_7px_0px_#000]

              overflow-hidden
            "
          >

            <div
              className="
                grid

                grid-cols-1
                lg:grid-cols-12
              "
            >


              {/* LEFT */}

              <div
                className="
                  lg:col-span-8

                  p-5
                  sm:p-8
                  md:p-10
                "
              >

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between

                    gap-3

                    border-b-2
                    border-zinc-800

                    pb-4
                    mb-5
                  "
                >

                  <span
                    className="
                      bg-[#FF6FB5]

                      text-white

                      border-2
                      border-black

                      px-3
                      py-1

                      font-headline

                      text-sm

                      tracking-wider
                    "
                  >
                    {missions[activeMission].number}
                  </span>


                  <span
                    className="
                      text-[#00E5FF]

                      font-headline

                      text-sm
                      sm:text-base

                      tracking-wider
                    "
                  >
                    {missions[activeMission].tag}
                  </span>

                </div>


                <h3
                  className="
                    font-headline

                    text-4xl
                    sm:text-5xl
                    md:text-6xl

                    leading-none

                    text-white

                    tracking-wide
                  "
                  style={{
                    fontFamily:
                      'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif'
                  }}
                >
                  {missions[activeMission].title}
                </h3>


                <div
                  className="
                    mt-3

                    text-[#FFD54F]

                    font-bold

                    text-sm
                    sm:text-base

                    tracking-wider
                  "
                >
                  {missions[activeMission].subtitle}
                </div>


                <p
                  className="
                    mt-5

                    text-sm
                    sm:text-base

                    text-zinc-300

                    leading-relaxed

                    max-w-3xl
                  "
                >
                  {missions[activeMission].description}
                </p>


                {/* MISSION CLASSIFIED */}

                <div
                  className="
                    mt-6

                    bg-black

                    border-2
                    border-zinc-700

                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-[#FF6FB5]

                      text-xs

                      font-black

                      tracking-widest

                      mb-1
                    "
                  >

                    <Target className="w-4 h-4" />

                    MISSION BRIEF

                  </div>


                  <p
                    className="
                      text-white

                      font-headline

                      text-base
                      sm:text-lg
                    "
                  >
                    {missions[activeMission].missionText}
                  </p>


                </div>


                {/* BUTTONS */}

                <div
                  className="
                    mt-6

                    flex
                    flex-col
                    sm:flex-row

                    gap-3
                  "
                >

                  <button
                    id="mission-register-btn"
                    onClick={() => {
                      if (activeMission === 1) {
                        window.open('https://forms.gle/tcBTQ3WBHXXAhjPQA', '_blank', 'noopener,noreferrer');
                      } else if (activeMission === 2) {
                        window.open('https://docs.google.com/forms/d/e/1FAIpQLSczdPFgRyUKOi2dKMadTet-S6lVHwOcX85lOnfSKoMa0eu3Sg/viewform?usp=header', '_blank', 'noopener,noreferrer');
                      } else {
                        handleMissionRegister();
                      }
                    }}
                    className="
                      bg-[#FF6FB5]
                      hover:bg-[#00E5FF]
                      hover:text-black
                      text-white
                      btn-pink
                      border-[3px]
                      border-black
                      px-6
                      py-3
                      font-headline
                      text-lg
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-[4px_4px_0px_#000]
                      transition-all
                      cursor-pointer
                    "
                  >
                    <Zap className="w-5 h-5" />
                    {activeMission === 1
                      ? 'REGISTER FOR BGMI (CLASSIC)'
                      : activeMission === 2
                      ? 'REGISTER FOR E-FOOTBALL'
                      : currentUser
                      ? 'MANAGE YOUR CREW'
                      : 'REGISTER NOW'}
                  </button>


                  {activeMission === 0 && (
                    <button

                      onClick={() =>
                        setActiveTab('competitions')
                      }
                      className="
                        bg-white

                        hover:bg-[#FFD54F]

                        text-black

                        border-[3px]
                        border-black

                        px-6
                        py-3

                        font-headline

                        text-lg

                        flex
                        items-center
                        justify-center
                        gap-2

                        shadow-[4px_4px_0px_#000]

                        transition-all

                        cursor-pointer
                      "

                    >

                      <Terminal className="w-5 h-5" />

                      VIEW DETAILS

                    </button>

                  )}

                </div>

              </div>


              {/* RIGHT INFO */}

              <div
                className="
                  lg:col-span-4

                  bg-[#0d0d11]

                  border-t-[3px]
                  lg:border-t-0

                  lg:border-l-[3px]

                  border-zinc-800

                  p-5
                  sm:p-7
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2

                    mb-5
                  "

                >

                  <Shield
                    className="
                      w-5
                      h-5

                      text-[#00E5FF]
                    "
                  />

                  <span
                    className="
                      font-headline

                      text-lg

                      tracking-wider
                    "
                  >
                    MISSION DATA
                  </span>

                </div>


                <div className="space-y-2">

                  {missions[activeMission].details.map(
                    (detail, index) => (

                      <div
                        key={detail}
                        className="
                          flex
                          items-center
                          gap-3

                          bg-black

                          border
                          border-zinc-800

                          px-3
                          py-3
                        "
                      >

                        <span
                          className="
                            text-[#FF6FB5]

                            font-mono

                            text-xs

                            font-black

                            w-5
                          "
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>


                        <span
                          className="
                            text-zinc-200

                            text-xs
                            sm:text-sm

                            font-bold

                            tracking-wide
                          "
                        >
                          {detail}
                        </span>

                      </div>

                    )
                  )}

                </div>


                {/* HACKATHON EXTRA */}

                {activeMission === 0 && (

                  <div
                    className="
                      mt-5

                      bg-[#FF6FB5]

                      text-black

                      border-2
                      border-black

                      p-4
                    "
                  >

                    <div
                      className="
                        font-headline

                        text-xl

                        leading-none

                        mb-1
                      "
                    >
                      FUEL YOUR CREW
                    </div>

                    <p
                      className="
                        text-xs

                        font-bold

                        leading-relaxed
                      "
                    >
                      Snacks will be provided throughout
                      the 12-hour hackathon to keep your
                      crew running.
                    </p>

                  </div>

                )}


                {/* OTHER MISSIONS */}

                {activeMission === 1 && (

                  <div
                    className="
                      mt-5

                      bg-[#00E5FF]

                      text-black

                      border-2
                      border-black

                      p-4
                    "
                  >

                    <div
                      className="
                        font-headline

                        text-xl

                        leading-none

                        mb-1
                      "
                    >
                      SQUAD UP
                    </div>

                    <p
                      className="
                        text-xs

                        font-bold

                        leading-relaxed
                      "
                    >
                      Your squad. Your strategy.
                      Your game. Survive, strategize
                      and dominate.
                    </p>

                  </div>

                )}


                {activeMission === 2 && (

                  <div
                    className="
                      mt-5

                      bg-[#FFD54F]

                      text-black

                      border-2
                      border-black

                      p-4
                    "
                  >

                    <div
                      className="
                        font-headline

                        text-xl

                        leading-none

                        mb-1
                      "
                    >
                      EVERY GOAL COUNTS
                    </div>

                    <p
                      className="
                        text-xs

                        font-bold

                        leading-relaxed
                      "
                    >
                      Step onto the virtual pitch
                      and make every match count.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </motion.div>

        </AnimatePresence>

      </section>



      {/* ========================================================
          3. FEATURED EVENTS
          ======================================================== */}

      {featuredComps.length > 0 && (

        <section
          className="
            max-w-7xl
            mx-auto

            px-4
            sm:px-6
          "
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row

              sm:items-end
              sm:justify-between

              gap-3

              mb-7
            "
          >

            <div>

              <div
                className="
                  inline-block

                  bg-[#FFD54F]

                  text-black

                  px-3
                  py-1

                  border-2
                  border-black

                  font-headline

                  text-sm
                  sm:text-base

                  tracking-wider
                "
              >
                TECHNOVA EVENTS
              </div>


              <h2
                className="
                  mt-2

                  font-headline

                  text-4xl
                  sm:text-6xl

                  leading-none
                "
                style={{
                  fontFamily:
                    'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                  color: 'var(--text-primary)'
                }}
              >
                MAIN EVENTS

              </h2>

            </div>



            <button
              onClick={() =>
                setActiveTab('competitions')
              }
              className="
                bg-[#00E5FF]
                hover:bg-[#FFD54F]
                text-black
                font-headline
                text-lg
                px-4
                py-2
                border-2
                border-black
                shadow-[3px_3px_0px_#000]
                flex
                items-center
                justify-center
                gap-2

                cursor-pointer
              "
            >

              VIEW ALL EVENTS

              <ArrowRight className="w-4 h-4" />

            </button>


          </div>


          <div
            className="
              grid

              grid-cols-1
              md:grid-cols-2

              gap-5
              sm:gap-6
            "
          >

            {featuredComps.map((comp, idx) => {
              const isThirdCard = idx === 2 && featuredComps.length === 3;

              return (
                <div
                  key={comp.id}
                  className={`
                    bg-white
                    border-[3px]
                    border-black
                    p-4
                    flex
                    flex-col
                    justify-between
                    shadow-[5px_5px_0px_#000]
                    group
                    hover:-translate-y-1
                    transition-all
                    ${isThirdCard ? 'md:col-span-2 md:w-[calc(50%-0.75rem)] md:mx-auto w-full' : 'w-full'}
                  `}
                >

                <div>

                  <div
                    className="
                      relative

                      border-2
                      border-black

                      overflow-hidden

                      mb-4
                    "
                  >

                    <img
                      src={comp.image}
                      alt={comp.title}
                      className="
                        w-full
                        h-48
                        sm:h-56

                        object-cover
                        object-top

                        group-hover:scale-105

                        transition-transform
                        duration-300
                      "
                    />


                    <div
                      className="
                        absolute
                        top-2
                        left-2

                        bg-black

                        text-[#00E5FF]

                        text-[10px]

                        font-bold

                        px-2
                        py-1

                        border
                        border-black

                        uppercase

                        font-headline
                      "
                    >
                      {comp.track}
                    </div>


                    <div
                      className="
                        absolute
                        bottom-2
                        right-2

                        bg-[#FFD54F]

                        text-black

                        text-xs

                        font-bold

                        px-2
                        py-1

                        border
                        border-black

                        font-headline
                      "
                    >
                      {comp.prize}
                    </div>

                  </div>


                  <span
                    className="
                      font-bold

                      text-xs

                      text-[#FF6FB5]

                      block

                      mb-1
                    "
                  >
                    {comp.subtitle}
                  </span>


                  <h3
                    className="
                      font-headline

                      text-3xl

                      text-black

                      leading-none

                      mb-2
                    "
                  >
                    {comp.title}
                  </h3>


                  <p
                    className="
                      text-xs

                      text-zinc-600

                      line-clamp-3

                      mb-4

                      leading-relaxed
                    "
                  >
                    {comp.description}
                  </p>

                </div>


                <div
                  className="
                    pt-3

                    border-t-2
                    border-black

                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div
                    className="
                      text-xs

                      text-zinc-700

                      font-bold

                      flex
                      items-center
                      gap-1
                    "
                  >

                    <Users className="w-3.5 h-3.5" />

                    {comp.teamSizeMin ===
                    comp.teamSizeMax
                      ? 'Solo'
                      : `${comp.teamSizeMin}–${comp.teamSizeMax} Members`
                    }

                  </div>


                  <button
                    onClick={() =>
                      openCompetitionModal(comp)
                    }
                    className="
                      bg-[#00E5FF]

                      hover:bg-black
                      hover:text-white

                      text-black

                      font-headline

                      text-base

                      px-3
                      py-1.5

                      border-2
                      border-black

                      transition-all

                      flex
                      items-center
                      gap-1

                      cursor-pointer
                    "
                  >

                    INSPECT

                    <ArrowRight className="w-3.5 h-3.5" />

                  </button>

                </div>

              </div>
            );
          })}

          </div>

        </section>

      )}


      {/* ========================================================
          4. TIMELINE
          ======================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
        "
      >

        <div
          className="
            bg-[#18181F]

            text-white

            border-[3px]
            border-black

            shadow-[6px_6px_0px_#000]

            p-5
            sm:p-8
            md:p-10
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row

              md:items-center
              md:justify-between

              gap-4

              pb-6

              border-b-2
              border-zinc-800
            "
          >

            <div>

              <div
                className="
                  inline-block

                  bg-[#FF6FB5]

                  text-white

                  px-3
                  py-1

                  border-2
                  border-black

                  font-headline

                  text-sm

                  tracking-wider
                "
              >
                EVENT SCHEDULE
              </div>


              <h2
                className="
                  mt-2

                  font-headline

                  text-4xl
                  sm:text-6xl

                  leading-none
                "
                style={{
                  fontFamily:
                    'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                  color: 'var(--text-primary)'
                }}
              >
                TECHNOVA TIMELINE
              </h2>

            </div>


            <div
              className="
                bg-black

                border-2
                border-zinc-700

                px-4
                py-2
              "
            >

              <span
                className="
                  block

                  text-[#00E5FF]

                  font-headline

                  text-xl
                "
              >
                26 SEP
              </span>

              <span
                className="
                  text-[9px]

                  text-zinc-400

                  uppercase

                  font-bold
                "
              >
                2026
              </span>

            </div>

          </div>


          <div
            className="
              pt-6

              grid

              grid-cols-1
              md:grid-cols-2

              gap-4
            "
          >

            {previewTimelineEvents.map(event => (

              <div
                key={event.id}


                className="
                  bg-black/70

                  border-2
                  border-zinc-700

                  p-4

                  hover:border-[#00E5FF]

                  transition-colors
                "

              >

                <div
                  className="
                    flex
                    items-start
                    justify-between

                    gap-2
                  "
                >

                  <div>


                    <div
                      className="
                        flex
                        items-center
                        gap-2

                        text-xs

                        text-[#00E5FF]

                        font-mono

                        font-bold
                      "
                    >


                      <Clock className="w-3.5 h-3.5" />

                      {event.time}

                    </div>


                    <h3
                      className="
                        font-headline

                        text-xl
                        sm:text-2xl

                        mt-1

                        leading-tight
                      "
                    >
                      {event.title}
                    </h3>

                  </div>


                  <span
                    className={`
                      text-[10px]

                      px-2
                      py-1

                      font-bold

                      uppercase

                      shrink-0

                      ${
                        event.status === 'past'
                          ? 'stamp-passed'
                          : event.status === 'ongoing'
                          ? 'stamp-progress animate-pulse'
                          : 'stamp-upcoming'
                      }
                    `}
                  >
                    {event.statusLabel ||
                      (
                        event.status === 'past'
                          ? 'PASSED'
                          : event.status === 'ongoing'
                          ? 'ACTIVE'
                          : 'UPCOMING'
                      )
                    }
                  </span>

                </div>


                <p
                  className="
                    text-xs

                    text-zinc-300

                    mt-3

                    line-clamp-2
                  "
                >
                  {event.description}
                </p>



                <div
                  className="
                    flex
                    items-center
                    justify-between

                    text-[11px]

                    text-zinc-400

                    pt-3
                    mt-3

                    border-t
                    border-zinc-800
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-1

                      font-bold
                    "
                  >

                    <MapPin
                      className="
                        w-3
                        h-3

                        text-[#FFD54F]
                      "
                    />

                    {event.location}

                  </div>


                  <span
                    className="
                      bg-zinc-800

                      text-[#FF6FB5]

                      px-1.5
                      py-0.5

                      font-mono

                      font-bold

                      uppercase

                      text-[10px]
                    "
                  >
                    {event.track || 'GENERAL'}

                  </span>

                </div>

              </div>

            ))}

          </div>



          <div
            className="
              pt-6
              mt-5

              border-t
              border-zinc-800

              flex
              flex-col
              sm:flex-row

              items-center
              justify-between

              gap-3
            "
          >

            <span
              className="
                text-xs

                text-zinc-400

                font-medium

                text-center
                sm:text-left
              "
            >
              All major TECHNOVA 4.0 activities take place on
              26 September 2026.

            </span>


            <button

              onClick={() =>
                setActiveTab('timeline')
              }
              className="
                w-full
                sm:w-auto

                bg-[#00E5FF]

                hover:bg-[#FFD54F]

                text-black

                font-headline

                text-lg

                px-5
                py-2

                border-2
                border-black

                flex
                items-center
                justify-center
                gap-2

                cursor-pointer
              "

            >

              <Calendar className="w-4 h-4" />

              FULL TIMELINE

              <ArrowRight className="w-4 h-4" />

            </button>

          </div>

        </div>

      </section>



      {/* ========================================================
          5. PRIZE POOL
          ======================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
        "
      >

        <div
          className="
            border-[3px]
            border-black
            shadow-[6px_6px_0px_#000]
            p-5
            sm:p-8
            md:p-10
            transition-colors
          "
          style={{
            backgroundColor: 'var(--card-bg-solid)',
            color: 'var(--text-primary)'
          }}
        >

          <div
            className="
              flex
              flex-col
              md:flex-row

              md:items-end
              md:justify-between

              gap-4

              pb-5

              border-b-2
              border-black
            "
          >

            <div>

              <div
                className="
                  inline-block

                  bg-[#FF6FB5]

                  text-white

                  px-3
                  py-1

                  border-2
                  border-black

                  font-headline

                  text-base

                  tracking-wider
                "
              >
                PRIZE VAULT
              </div>


              <h2
                className="
                  mt-2

                  font-headline

                  text-4xl
                  sm:text-6xl

                  leading-none
                "
                style={{ color: 'var(--text-primary)' }}
              >
                ₹{totalPrize.toLocaleString()}+

              </h2>


              <p
                className="
                  text-xs

                  font-bold

                  mt-2
                "
                style={{ color: 'var(--text-secondary)' }}
              >
                Total prize value across TECHNOVA 4.0 competitions.
              </p>

            </div>


            <button

              onClick={() =>
                setActiveTab('prizes')
              }
              className="
                bg-black

                hover:bg-[#00E5FF]
                hover:text-black

                text-white

                font-headline

                text-lg

                px-4
                py-2

                border-2
                border-black

                flex
                items-center
                justify-center
                gap-2

                cursor-pointer
              "
            >

              <Trophy className="w-4 h-4 text-[#FFD54F]" />

              PRIZE BREAKDOWN


              <ArrowRight className="w-4 h-4" />

            </button>

          </div>



          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4

              gap-4

              mt-6
            "
          >

            {prizes.map((prize, index) => (

              <div
                key={prize.id}

                className="
                  border-2
                  border-black

                  p-5

                  shadow-[4px_4px_0px_#000]

                  hover:-translate-y-1

                  transition-all
                "
                style={{
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    border-b-2
                    border-black

                    pb-2
                    mb-3
                  "
                >

                  <span
                    className="
                      font-headline

                      text-sm

                      px-2
                      py-1

                      border
                      border-black

                      uppercase
                    "
                    style={{
                      backgroundColor:
                        prize.badgeBg,

                      color:
                        prize.badgeText
                    }}
                  >
                    {prize.title}
                  </span>


                  <span className="text-xl">
                    {prize.icon}
                  </span>

                </div>


                <div
                  className="
                    font-headline

                    text-3xl
                    sm:text-4xl

                    leading-none
                  "
                  style={{ color: 'var(--text-primary)' }}
                >
                  {prize.amount}
                </div>


                <span
                  className="
                    text-[10px]

                    font-bold

                    uppercase

                    block

                    mt-1
                    mb-3
                  "
                  style={{ color: 'var(--text-muted)' }}
                >
                  {prize.subtitle}
                </span>


                <p
                  className="
                    text-xs

                    font-medium

                    leading-relaxed
                  "
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {prize.description}
                </p>

              </div>

            ))}

          </div>


          <div
            className="
              bg-black
              text-white

              p-4

              mt-6

              border-2
              border-black

              flex
              flex-col
              md:flex-row

              items-center
              justify-between

              gap-3
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "

            >

              <Sparkles
                className="
                  w-6
                  h-6

                  text-[#FFD54F]

                  shrink-0
                "
              />


              <div>

                <span
                  className="
                    font-headline

                    text-xl

                    block

                    leading-none
                  "
                >
                  ₹{totalPrize.toLocaleString()} TOTAL PRIZE VALUE
                </span>


                <span
                  className="
                    text-[11px]

                    text-zinc-400
                  "
                >
                  Hackathon ₹30,000 • BGMI • E-Football
                </span>

              </div>

            </div>


            <button
              onClick={() =>
                setActiveTab('prizes')
              }
              className="
                bg-[#FFD54F]

                hover:bg-white

                text-black

                font-headline

                text-base

                px-4
                py-2

                border-2
                border-black

                cursor-pointer

                whitespace-nowrap
              "
            >
              INSPECT PRIZES
            </button>

          </div>

        </div>

      </section>



      {/* ========================================================
          6. FAQ
          ======================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
        "
      >

        <div
          className="
            border-[3px]
            border-black
            shadow-[6px_6px_0px_#000]
            p-5
            sm:p-8
            md:p-10
            transition-colors
          "
          style={{
            backgroundColor: 'var(--card-bg-solid)',
            color: 'var(--text-primary)'
          }}
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row

              sm:items-end
              sm:justify-between

              gap-3

              pb-5

              border-b-2
              border-black
            "
          >

            <div>

              <div
                className="
                  inline-block

                  bg-[#00E5FF]

                  text-black

                  px-3
                  py-1

                  border-2
                  border-black

                  font-headline

                  text-base

                  tracking-wider
                "
              >
                EVENT INTEL
              </div>


              <h2
                className="
                  mt-2

                  font-headline

                  text-3xl
                  sm:text-5xl

                  leading-none
                "
                style={{ color: 'var(--text-primary)' }}
              >
                FREQUENTLY ASKED QUESTIONS

              </h2>

            </div>


            <button

              onClick={() =>
                setActiveTab('faq')
              }
              className="
                bg-[#FF6FB5]

                hover:bg-black

                text-white

                font-headline

                text-lg

                px-4
                py-2

                border-2
                border-black

                flex
                items-center
                justify-center
                gap-2

                cursor-pointer
              "

            >

              <HelpCircle className="w-4 h-4" />

              VIEW ALL FAQS

              <ArrowRight className="w-4 h-4" />

            </button>

          </div>


          <div className="space-y-3 mt-6">

            {previewFaqs.map(faq => {

              const isOpen =
                !!openFaqIds[faq.id];

              return (

                <div
                  key={faq.id}

                  className="
                    border-2
                    border-black

                    overflow-hidden

                    shadow-[2px_2px_0px_#000]
                  "
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text-primary)'
                  }}
                >

                  <button

                    onClick={() =>
                      toggleHomeFaq(faq.id)
                    }
                    className="
                      w-full

                      text-left

                      p-4

                      flex
                      items-center
                      justify-between

                      gap-3

                      cursor-pointer

                      hover:bg-[#FFD54F]/30

                      transition-colors
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3

                        min-w-0
                      "
                    >

                      <HelpCircle
                        className="
                          w-5
                          h-5

                          text-[#FF6FB5]

                          shrink-0
                        "
                      />


                      <span
                        className="
                          font-headline

                          text-lg
                          sm:text-xl
                        "
                        style={{ color: 'var(--text-primary)' }}
                      >

                        {faq.question}
                      </span>

                    </div>



                    <div
                      className="
                        w-7
                        h-7

                        bg-black
                        text-white

                        border
                        border-black

                        flex
                        items-center
                        justify-center

                        shrink-0
                      "
                    >

                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}


                    </div>

                  </button>


                  <AnimatePresence>

                    {isOpen && (

                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0
                        }}

                        animate={{
                          height: 'auto',
                          opacity: 1
                        }}

                        exit={{
                          height: 0,
                          opacity: 0
                        }}

                        transition={{
                          duration: 0.2
                        }}
                        className="overflow-hidden"
                      >


                        <div
                          className="
                            p-4

                            pt-0

                            border-t
                            border-zinc-800/40
                          "
                        >

                          <p
                            className="
                              text-xs
                              sm:text-sm

                              font-medium

                              leading-relaxed
                            "
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {faq.answer}
                          </p>

                        </div>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </div>

              );

            })}

          </div>

        </div>

      </section>



      {/* ========================================================
          7. FINAL CTA
          ======================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
        "
      >

        <div
          className="
            bg-[#FF6FB5]

            border-[4px]
            border-black

            shadow-[7px_7px_0px_#000]

            p-7
            sm:p-10
            md:p-14

            text-center

            text-white

            relative

            overflow-hidden
          "
        >

          <div
            className="
              absolute
              top-5
              left-6

              text-black

              opacity-20

              pointer-events-none
            "
          >
            ★
          </div>


          <div
            className="
              absolute
              bottom-5
              right-8

              text-black

              opacity-20

              text-5xl

              pointer-events-none
            "
          >
            ★
          </div>


          <div
            className="
              max-w-4xl
              mx-auto

              space-y-4
            "
          >

            <div
              className="
                inline-block

                bg-black

                text-[#00E5FF]

                border-2
                border-black

                px-4
                py-1

                font-headline

                text-sm

                tracking-widest
              "
            >
              26 SEPTEMBER 2026
            </div>


            <h2
              className="
                font-headline

                text-4xl
                sm:text-6xl
                md:text-7xl

                text-white

                gta-shadow-black

                leading-none
              "
              style={{
                fontFamily:
                  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif'
              }}
            >
              READY FOR THE CITY?
            </h2>


            <p
              className="
                text-sm
                sm:text-lg

                text-black

                font-bold

                max-w-2xl

                mx-auto
              "
            >
              Your crew is assembled.
              The mission is locked.
              The clock is about to start.
            </p>


            <p
              className="
                text-base
                sm:text-xl

                text-white

                font-black

                tracking-wider

                uppercase

                gta-shadow-black
              "
            >
              ENTER THE CITY. TAKE THE MISSION. OWN THE CODE.
            </p>


            <div
              className="
                pt-3

                flex
                flex-col
                sm:flex-row

                justify-center

                gap-3
              "
            >

              <button
                onClick={handleMissionRegister}
                className="
                  bg-black

                  text-[#00E5FF]

                  hover:bg-white
                  hover:text-black

                  font-headline

                  text-xl
                  sm:text-2xl

                  px-7
                  py-3

                  border-[3px]
                  border-black

                  shadow-[4px_4px_0px_#000]

                  flex
                  items-center
                  justify-center
                  gap-2

                  cursor-pointer

                  transition-all
                "

              >

                <Users className="w-5 h-5" />

                {currentUser
                  ? 'MANAGE YOUR CREW'
                  : 'START YOUR MISSION'}

              </button>


              <button
                onClick={() => {

                  playMissionPassedSound();

                  triggerMissionPassed(
                    'TECHNOVA 4.0 ACTIVATED!',
                    'ALL SYSTEMS ARMED'
                  );

                }}
                className="
                  bg-[#FFD54F]

                  text-black

                  hover:bg-white

                  font-headline

                  text-xl
                  sm:text-2xl

                  px-7
                  py-3

                  border-[3px]
                  border-black

                  shadow-[4px_4px_0px_#000]

                  flex
                  items-center
                  justify-center
                  gap-2

                  cursor-pointer

                  transition-all
                "
              >

                <Sparkles className="w-5 h-5" />

                ACTIVATE TECHNOVA

              </button>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

};