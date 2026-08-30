import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { playClickSound, playMissionPassedSound } from '../utils/audio';
import {
  Menu,
  X,
  Shield,
  Users,
  User as UserIcon,
  Flame,
  Award,
  Calendar,
  HelpCircle,
  Briefcase,
  LogOut,
  ChevronDown,
  Compass,
  Lock,
  Sparkles,
  AlertOctagon,
  Volume2,
  VolumeX
} from 'lucide-react';

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
  openCityMapModal,
  openAdminLoginModal
}) => {
  const { currentUser, isAdmin, logout, exitAdminMode, switchUserPersona, publicPersonas } = useAuth();
  const { teams, soundEnabled, toggleSound } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);

  // Triple-Tap detector state for Tech Fest Logo
  const [tapCount, setTapCount] = useState<number>(0);
  const [lastTapTime, setLastTapTime] = useState<number>(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const userTeams = currentUser
    ? teams.filter(t => t.members.some(m => m.uid === currentUser.uid))
    : [];

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  // 3-Tap Logo Handler
  const handleLogoTap = () => {
    const now = Date.now();
    const diff = now - lastTapTime;

    let newCount = 1;
    if (diff < 1600 && lastTapTime > 0) {
      newCount = tapCount + 1;
    }

    setLastTapTime(now);
    setTapCount(newCount);

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    if (newCount >= 3) {
      playMissionPassedSound();
      setTapCount(0);
      openAdminLoginModal();
    } else {
      playClickSound();
      tapTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 1600);
      handleNavClick('home');
    }
  };

  // Only include Admin if isAdmin is active
  const navItems = [
    { id: 'home', label: 'HOME', icon: Flame },
    { id: 'competitions', label: 'COMPETITIONS', icon: Briefcase },
    { id: 'timeline', label: 'TIMELINE', icon: Calendar },
    { id: 'prizes', label: 'THE PAYDAY', icon: Award, badge: '$500K' },
    { id: 'faq', label: 'BRIEFING & FAQ', icon: HelpCircle },
    ...(isAdmin
      ? [{ id: 'admin', label: 'MISSION CONTROL', icon: Shield, adminOnly: true }]
      : [])
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0518]/90 border-b border-[#ff007f]/30 backdrop-blur-md text-white select-none shadow-[0_0_15px_rgba(255,0,127,0.15)]">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
        {/* Brand Logo with Triple-Tap Admin Gateway */}
        <button
          id="nav-logo-btn"
          onClick={handleLogoTap}
          className="flex items-center gap-2 group text-left cursor-pointer transition-transform active:scale-95"
          title="Tech Fest 2025"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#ff007f] border border-black flex items-center justify-center font-headline text-2xl sm:text-3xl text-white transform -rotate-3 group-hover:rotate-0 transition-transform shadow-[0_0_8px_#ff007f]">
            TF
          </div>
          <div>
            <span className="block font-headline text-2xl sm:text-3xl tracking-wider leading-none text-white drop-shadow-[2px_2px_0px_#ff007f]">
              TECH FEST <span className="text-[#ff007f]">2025</span>
            </span>
            <span className="block font-marker text-[10px] sm:text-xs text-[#00f5ff] -mt-0.5 tracking-wider">
              VICE TECH NOIR
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`font-headline text-lg xl:text-xl tracking-wide px-3 py-1 border-2 transition-all flex items-center gap-1.5 cursor-pointer rounded ${
                  isActive
                    ? 'bg-[#ff007f] text-white border-[#ff007f] shadow-[0_0_12px_rgba(255,0,127,0.6)] -translate-y-0.5'
                    : item.adminOnly
                    ? 'bg-red-600/20 text-red-500 border-red-500/50 hover:bg-red-600 hover:text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.5)] shadow-[0_0_8px_rgba(239,68,68,0.15)]'
                    : 'bg-black/40 text-slate-300 border-slate-700/60 hover:text-[#00f5ff] hover:border-[#00f5ff] hover:shadow-[0_0_10px_rgba(0,245,255,0.4)]'
                }`}
              >
                {item.adminOnly && <Shield className="w-4 h-4 text-white animate-pulse" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="font-sans font-black text-[10px] bg-black text-[#00f5ff] px-1 py-0.2 rounded-none border border-[#00f5ff]">
                    {item.badge}
                  </span>
                )}
                {item.adminOnly && (
                  <span className="font-sans text-[9px] bg-black text-red-400 px-1 font-bold">
                    ROOT
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* If Admin is active, show Root Banner & Exit Toggle */}
          {isAdmin && (
            <div className="hidden sm:flex items-center gap-1.5 bg-red-600 text-white px-2 py-0.5 comic-border-sm border-black">
              <Shield className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="font-headline text-xs tracking-wider">ROOT ADMIN</span>
              <button
                id="exit-admin-top-btn"
                onClick={exitAdminMode}
                className="bg-black hover:bg-white hover:text-black text-white text-[10px] font-bold px-1.5 py-0.2 ml-1 cursor-pointer transition-colors"
                title="Exit Admin Mode and return to standard runner persona"
              >
                EXIT
              </button>
            </div>
          )}

          {/* Persona Switcher Menu for regular participants */}
          <div className="relative">
            <button
              id="persona-dropdown-trigger"
              onClick={() => {
                setPersonaMenuOpen(!personaMenuOpen);
              }}
              className="hidden sm:flex items-center gap-1.5 bg-black/40 text-slate-300 border border-slate-700/60 px-2.5 py-1 text-xs font-bold hover:text-[#00f5ff] hover:border-[#00f5ff] transition-all cursor-pointer rounded"
              title="Switch user demo runner"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isAdmin ? 'bg-red-500 animate-ping' : currentUser ? 'bg-emerald-500' : 'bg-zinc-400'
                }`}
              />
              <span className="truncate max-w-[100px] text-white">
                {currentUser ? currentUser.displayName : 'Guest'}
              </span>
              <span className={`px-1 py-0.2 text-[9px] uppercase font-bold ${
                isAdmin ? 'bg-red-600 text-white' : 'bg-black text-white'
              }`}>
                {currentUser?.role === 'admin' ? 'ADMIN' : 'RUNNER'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {personaMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#120a2a]/95 text-white border-2 border-[#b967ff]/60 p-2 z-50 shadow-[0_0_20px_rgba(185,103,255,0.3)] backdrop-blur-md rounded-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 py-1 border-b border-zinc-800">
                  Select Runner Operative:
                </div>
                {publicPersonas.map(user => (
                  <button
                    key={user.uid}
                    id={`persona-switch-${user.uid}`}
                    onClick={() => {
                      switchUserPersona(user.uid);
                      setPersonaMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-xs flex items-center justify-between hover:bg-[#00f5ff]/20 hover:text-[#00f5ff] border-b border-zinc-800/50 last:border-0 transition-colors cursor-pointer ${
                      currentUser?.uid === user.uid && !isAdmin ? 'bg-[#ff007f]/10 text-[#ff007f] font-black' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-[10px] text-zinc-400">{user.college}</div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 border border-black font-bold uppercase bg-emerald-300 text-black">
                      RUNNER
                    </span>
                  </button>
                ))}

                {isAdmin && (
                  <div className="mt-1 p-2 bg-red-50 border border-red-300 text-xs">
                    <div className="font-bold text-red-700 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> Root Admin Active
                    </div>
                    <button
                      onClick={() => {
                        exitAdminMode();
                        setPersonaMenuOpen(false);
                      }}
                      className="mt-1.5 w-full bg-red-600 hover:bg-black text-white text-[11px] font-bold py-1 px-2 border border-black cursor-pointer"
                    >
                      Exit to Standard Runner
                    </button>
                  </div>
                )}

                <div className="pt-1.5 mt-1 border-t border-black flex items-center justify-between">
                  {currentUser ? (
                    <button
                      id="logout-persona-btn"
                      onClick={() => {
                        logout();
                        setPersonaMenuOpen(false);
                      }}
                      className="text-[11px] text-red-600 font-bold hover:underline flex items-center gap-1 px-2 py-1 cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      Sign Out
                    </button>
                  ) : (
                    <button
                      id="signin-persona-btn"
                      onClick={() => {
                        openAuthModal();
                        setPersonaMenuOpen(false);
                      }}
                      className="text-[11px] text-[#FF6FB5] font-bold hover:underline flex items-center gap-1 px-2 py-1 cursor-pointer"
                    >
                      <UserIcon className="w-3 h-3" />
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sound Toggle Button */}
          <button
            id="navbar-sound-toggle-btn"
            onClick={toggleSound}
            className={`font-headline text-base sm:text-lg px-2.5 py-1 border border-black flex items-center justify-center cursor-pointer transition-all rounded ${
              soundEnabled
                ? 'bg-[#ff007f] hover:bg-[#ffe600] text-white hover:text-black hover:shadow-[0_0_12px_rgba(255,230,0,0.6)] shadow-[0_0_10px_rgba(255,0,127,0.4)]'
                : 'bg-black/40 text-slate-400 border-slate-700/60 hover:text-slate-200 hover:border-slate-500'
            }`}
            title={soundEnabled ? 'Mute Background Audio' : 'Unmute Background Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline ml-1.5">{soundEnabled ? 'MUTE' : 'UNMUTE'}</span>
          </button>

          {/* Interactive City Map Trigger Button */}
          {openCityMapModal && (
            <button
              id="navbar-city-map-btn"
              onClick={openCityMapModal}
              className="bg-[#ffe600] hover:bg-[#00f5ff] hover:shadow-[0_0_12px_rgba(0,245,255,0.6)] text-black font-headline text-base sm:text-lg px-2.5 sm:px-3 py-1 border border-black flex items-center gap-1.5 cursor-pointer transition-all rounded"
              title="Open GTA Satellite City Map"
            >
              <Compass className="w-4 h-4 text-black animate-spin [animation-duration:10s]" />
              <span className="hidden sm:inline">CITY MAP</span>
              <span className="sm:hidden">MAP</span>
            </button>
          )}

          {/* Crew / Register Button */}
          {currentUser ? (
            <button
              id="my-crew-btn"
              onClick={() => {
                openCrewModal();
              }}
              className="bg-[#00f5ff] hover:bg-[#ffe600] text-black font-headline text-base sm:text-lg px-3 py-1 border border-black flex items-center gap-1.5 cursor-pointer transition-all rounded"
            >
              <Users className="w-4 h-4 text-black" />
              <span>MY CREW</span>
              {userTeams.length > 0 && (
                <span className="bg-black text-white text-xs px-1.5 font-bold font-sans">
                  {userTeams.length}
                </span>
              )}
            </button>
          ) : (
            <button
              id="register-crew-btn"
              onClick={() => {
                openAuthModal();
              }}
              className="bg-[#ff007f] hover:bg-[#00f5ff] hover:text-black text-white font-headline text-base sm:text-lg px-3.5 py-1 border border-black flex items-center gap-1.5 cursor-pointer transition-all rounded"
            >
              <Users className="w-4 h-4 text-white" />
              <span>CREW ACCESS</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden bg-black/40 text-slate-300 border border-slate-700/60 p-1.5 hover:text-[#00f5ff] hover:border-[#00f5ff] cursor-pointer rounded"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0714] border-t border-[#ff007f]/30 px-4 py-4 space-y-2 text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          {/* Mobile City Map Shortcut */}
          {openCityMapModal && (
            <button
              id="mobile-city-map-btn"
              onClick={() => {
                openCityMapModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left font-headline text-2xl px-4 py-2 border-2 bg-[#ffe600] text-black border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-between cursor-pointer rounded"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-black animate-spin [animation-duration:10s]" />
                <span>VICE SATELLITE CITY MAP</span>
              </div>
              <span className="font-mono text-xs bg-black text-[#00f5ff] px-2 py-0.5 font-bold">
                RADAR
              </span>
            </button>
          )}

          {navItems.map(item => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left font-headline text-2xl px-4 py-2 border-2 flex items-center justify-between rounded ${
                  isActive
                    ? 'bg-[#ff007f] text-white border-[#ff007f] shadow-[0_0_12px_#ff007f]'
                    : item.adminOnly
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-black/50 text-slate-300 border-slate-700/60 hover:text-[#00f5ff]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="font-sans font-black text-xs bg-black text-[#00f5ff] px-2 py-0.5 border border-[#00f5ff]">
                    {item.badge}
                  </span>
                )}
                {item.adminOnly && (
                  <span className="font-sans text-xs bg-black text-white px-2 py-0.5 font-bold">
                    ROOT
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t-2 border-black flex flex-col gap-2">
            <button
              id="mobile-crew-hub-btn"
              onClick={() => {
                openCrewModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#00E5FF] text-black font-headline text-xl py-2 comic-border-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>MANAGE CREW ROSTER</span>
            </button>

            {isAdmin && (
              <button
                id="mobile-exit-admin-btn"
                onClick={() => {
                  exitAdminMode();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-red-600 text-white font-headline text-lg py-1.5 comic-border-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>EXIT ROOT ADMIN MODE</span>
              </button>
            )}

            {currentUser ? (
              <div className="bg-white p-2.5 border-2 border-black flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-black flex items-center gap-1.5">
                    <span>{currentUser.displayName}</span>
                    <span className="text-[9px] bg-black text-white px-1 py-0.2 font-bold uppercase">
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-500">{currentUser.email}</div>
                </div>
                <button
                  id="mobile-logout-btn"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-bold bg-red-50 border border-red-300 px-2 py-1 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                id="mobile-auth-btn"
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#FF6FB5] text-white font-headline text-xl py-2 comic-border-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserIcon className="w-5 h-5" />
                <span>SIGN IN / REGISTER</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

