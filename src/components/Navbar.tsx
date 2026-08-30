import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  Users,
  User as UserIcon,
  Shield,
  LogOut,

  Calendar,
  Trophy,
  HelpCircle,
  Home,
  Gamepad2

} from 'lucide-react';
import {
  playClickSound,
  playMissionPassedSound
} from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: () => void;
  openCrewModal: () => void;
  openCityMapModal?: () => void;
  openAdminLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuthModal,
  openCrewModal,
  openAdminLoginModal
}) => {

  const {
    currentUser,
    isAdmin,
    logout,
    exitAdminMode
  } = useAuth();


  const { teams } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hidden admin triple-tap
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const userTeams = currentUser
    ? teams.filter(team =>
        team.members.some(member => member.uid === currentUser.uid)
      )
    : [];

  /*
   * ============================================================
   * NAVIGATION
   * ============================================================
   */

  const navItems = [
    {
      id: 'home',
      label: 'HOME',
      icon: Home
    },
    {
      id: 'competitions',
      label: 'EVENTS',
      icon: Gamepad2
    },
    {
      id: 'timeline',
      label: 'TIMELINE',
      icon: Calendar
    },
    {
      id: 'prizes',
      label: 'PRIZES',
      icon: Trophy
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: HelpCircle
    },
    ...(isAdmin
      ? [
          {
            id: 'admin',
            label: 'ADMIN',
            icon: Shield,
            adminOnly: true
          }
        ]
      : [])
  ];

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  /*
   * ============================================================
   * HIDDEN ADMIN ACCESS
   * Triple tap the TECHNOVA 4.0 logo
   * ============================================================
   */

  const handleLogoTap = () => {
    const now = Date.now();
    const difference = now - lastTapTime;

    let newCount = 1;

    if (difference < 1600 && lastTapTime > 0) {
      newCount = tapCount + 1;
    }

    setLastTapTime(now);
    setTapCount(newCount);

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    if (newCount >= 3) {
      setTapCount(0);
      playMissionPassedSound();
      openAdminLoginModal();
      return;
    }

    playClickSound();

    tapTimerRef.current = setTimeout(() => {
      setTapCount(0);
    }, 1600);

    handleNavClick('home');
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (

    <header className="sticky top-0 z-50 bg-[#FFF5F0] border-b-4 border-black select-none">

      {/* ======================================================
          DESKTOP / MAIN NAVBAR
          ====================================================== */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">


        <div className="flex items-center justify-between gap-4">

          {/* ==================================================
              BRAND
              ================================================== */}

          <button
            id="nav-logo-btn"
            onClick={handleLogoTap}
            className="flex items-center gap-3 text-left cursor-pointer active:scale-95 transition-transform"
            title="ITSA Presents TECHNOVA 4.0"
          >

            {/* ITSA BOX */}
            <div
              className="
                w-11 h-11
                sm:w-12 sm:h-12
                bg-[#FF6FB5]
                border-2 border-black
                shadow-[3px_3px_0px_0px_#000]
                flex items-center justify-center
                font-headline
                text-xl
                sm:text-2xl
                text-white
                -rotate-3
              "
            >
              IT
            </div>

            {/* BRAND TEXT */}
            <div>

              <div className="font-marker text-[10px] sm:text-xs tracking-widest text-zinc-700 uppercase">
                ITSA Presents
              </div>

              <div className="font-headline text-2xl sm:text-3xl leading-none tracking-wide text-black">
                TECHNOVA <span className="text-[#FF6FB5]">4.0</span>
              </div>

            </div>

          </button>


          {/* ==================================================
              DESKTOP NAVIGATION
              ================================================== */}

          <nav className="hidden lg:flex items-center gap-2">

            {navItems.map(item => {

              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    font-headline
                    text-base
                    xl:text-lg
                    tracking-wide
                    px-3
                    py-2
                    border-2
                    border-black
                    flex
                    items-center
                    gap-1.5
                    cursor-pointer
                    transition-all

                    ${
                      isActive
                        ? 'bg-[#FF6FB5] text-white shadow-[3px_3px_0px_0px_#000] -translate-y-0.5'
                        : item.adminOnly
                        ? 'bg-red-600 text-white hover:bg-black'
                        : 'bg-white text-black hover:bg-[#FFD54F] hover:shadow-[3px_3px_0px_0px_#000]'
                    }
                  `}
                >

                  <Icon className="w-4 h-4" />

                  <span>{item.label}</span>

                  {item.adminOnly && (
                    <span className="text-[8px] bg-black text-white px-1">
                      ROOT

                    </span>
                  )}

                </button>
              );
            })}

          </nav>


          {/* ==================================================
              RIGHT SIDE
              ================================================== */}

          <div className="flex items-center gap-2">

            {/* ADMIN ACTIVE */}
            {isAdmin && (
              <div className="hidden xl:flex items-center gap-2 bg-red-600 text-white border-2 border-black px-2 py-1">

                <Shield className="w-4 h-4" />

                <span className="font-headline text-sm">
                  ADMIN
                </span>

                <button
                  onClick={exitAdminMode}
                  className="
                    bg-black
                    text-white
                    hover:bg-white
                    hover:text-black
                    text-[10px]
                    font-bold
                    px-2
                    py-1
                    border
                    border-black
                  "
                >
                  EXIT
                </button>

              </div>
            )}


            {/* ==================================================
                REGISTER / MY CREW
                ================================================== */}

            {currentUser ? (

              <button
                id="my-crew-btn"
                onClick={openCrewModal}
                className="
                  bg-[#00E5FF]
                  text-black
                  font-headline
                  text-base
                  sm:text-lg
                  px-3
                  py-2
                  border-2
                  border-black
                  shadow-[3px_3px_0px_0px_#000]
                  flex
                  items-center
                  gap-1.5
                  cursor-pointer
                  hover:bg-[#FFD54F]
                  transition-colors
                "
              >

                <Users className="w-4 h-4" />

                <span className="hidden sm:inline">
                  MY CREW
                </span>

                <span className="sm:hidden">
                  CREW
                </span>

                {userTeams.length > 0 && (
                  <span className="bg-black text-white text-xs px-1.5 font-bold">
                    {userTeams.length}
                  </span>
                )}

              </button>

            ) : (

              <button
                id="register-crew-btn"
                onClick={openAuthModal}
                className="
                  bg-[#FF6FB5]
                  text-white
                  font-headline
                  text-base
                  sm:text-lg
                  px-3
                  sm:px-4
                  py-2
                  border-2
                  border-black
                  shadow-[3px_3px_0px_0px_#000]
                  flex
                  items-center
                  gap-1.5
                  cursor-pointer
                  hover:bg-[#00E5FF]
                  hover:text-black
                  transition-colors
                "
              >

                <Users className="w-4 h-4" />

                <span className="hidden sm:inline">
                  REGISTER
                </span>

                <span className="sm:hidden">
                  JOIN
                </span>

              </button>

            )}


            {/* ==================================================
                MOBILE MENU
                ================================================== */}

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                lg:hidden
                bg-white
                text-black
                p-2
                border-2
                border-black
                shadow-[2px_2px_0px_0px_#000]
                hover:bg-[#FFD54F]
                cursor-pointer
              "
              aria-label="Toggle navigation menu"
            >

              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}

            </button>

          </div>



        </div>

      </div>


      {/* ======================================================
          MOBILE MENU
          ====================================================== */}

      {mobileMenuOpen && (


        <div
          className="
            lg:hidden
            bg-[#FFF5F0]
            border-t-4
            border-black
            px-4
            py-4
            space-y-2
          "
        >

          {/* NAV LINKS */}


          {navItems.map(item => {

            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}

                className={`
                  w-full
                  text-left
                  font-headline
                  text-xl
                  px-4
                  py-3
                  border-2
                  border-black
                  flex
                  items-center
                  justify-between
                  cursor-pointer

                  ${
                    isActive
                      ? 'bg-[#FF6FB5] text-white shadow-[4px_4px_0px_0px_#000]'
                      : item.adminOnly
                      ? 'bg-red-600 text-white shadow-[3px_3px_0px_#000]'
                      : 'bg-white text-black hover:bg-[#FFD54F]'
                  }
                `}

              >

                <div className="flex items-center gap-3">

                  <Icon className="w-5 h-5" />

                  <span>{item.label}</span>

                </div>


                {item.adminOnly && (
                  <span className="text-[9px] bg-black text-white px-2 py-1">
                    ROOT
                  </span>
                )}

              </button>
            );

          })}


          {/* MOBILE ACTIONS */}

          <div className="pt-3 mt-2 border-t-2 border-black space-y-2">

            {currentUser ? (

              <>

                <button
                  onClick={() => {
                    openCrewModal();
                    setMobileMenuOpen(false);
                  }}
                  className="
                    w-full
                    bg-[#00E5FF]
                    text-black
                    font-headline
                    text-lg
                    py-3
                    border-2
                    border-black
                    shadow-[3px_3px_0px_0px_#000]
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  <Users className="w-5 h-5" />

                  MY CREW

                  {userTeams.length > 0 && (
                    <span className="bg-black text-white text-xs px-2">
                      {userTeams.length}
                    </span>
                  )}

                </button>


                <div className="bg-white border-2 border-black p-3 flex items-center justify-between">

                  <div>

                    <div className="font-bold text-sm text-black">
                      {currentUser.displayName}
                    </div>

                    <div className="text-xs text-zinc-500">
                      {currentUser.email}
                    </div>

                  </div>


                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="
                      flex
                      items-center
                      gap-1
                      text-red-600
                      font-bold
                      text-xs
                      border
                      border-red-300
                      bg-red-50
                      px-2
                      py-2
                    "
                  >

                    <LogOut className="w-3 h-3" />

                    SIGN OUT

                  </button>

                </div>

              </>

            ) : (

              <button
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="
                  w-full
                  bg-[#FF6FB5]
                  text-white
                  font-headline
                  text-lg
                  py-3
                  border-2
                  border-black
                  shadow-[3px_3px_0px_0px_#000]
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                <UserIcon className="w-5 h-5" />

                REGISTER NOW

              </button>

            )}


            {/* ADMIN EXIT */}

            {isAdmin && (

              <button
                onClick={() => {
                  exitAdminMode();
                  setMobileMenuOpen(false);
                }}
                className="
                  w-full
                  bg-red-600
                  text-white
                  font-headline
                  text-base
                  py-2
                  border-2
                  border-black
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                <Shield className="w-4 h-4" />

                EXIT ADMIN MODE

              </button>

            )}

          </div>

        </div>

      )}

    </header>
  );
};