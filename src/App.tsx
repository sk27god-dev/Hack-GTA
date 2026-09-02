import React, {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react';

import {
  AuthProvider,
  useAuth
} from './context/AuthContext';

import {
  AppProvider,
  useApp
} from './context/AppContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MissionBanner } from './components/MissionBanner';

import {
  GtaTransitionOverlay,
  GtaTransitionRef
} from './components/GtaTransitionOverlay';

import LoadingScreen from './components/LoadingScreen';

import { AuthModal } from './components/AuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CrewModal } from './components/CrewModal';
import {
  CompetitionDetailModal
} from './components/CompetitionDetailModal';

import {
  FixerContactModal
} from './components/FixerContactModal';

import {
  CityMapModal
} from './components/CityMapModal';

import { GtaAmbientFX } from './components/GtaAmbientFX';

import { HomePage } from './pages/HomePage';
import {
  CompetitionsPage
} from './pages/CompetitionsPage';

import { TimelinePage } from './pages/TimelinePage';
import { PrizesPage } from './pages/PrizesPage';
import { FAQPage } from './pages/FAQPage';
import {
  AdminDashboard
} from './pages/AdminDashboard';

import { Competition } from './types';

import {
  Lock
} from 'lucide-react';

import GlobalMusic from './components/GlobalMusic';


const MainApp: React.FC = () => {

  const { competitions } = useApp();
  const { isAdmin } = useAuth();


  /*
  ============================================================
  THEME STATE
  ============================================================
  */

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('techfest-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('techfest-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);


  /*
  ============================================================
  PAGE STATE
  ============================================================
  */

  const [activeTab, setActiveTab] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [crewModalOpen, setCrewModalOpen] = useState(false);
  const [crewModalCompId, setCrewModalCompId] = useState<string | undefined>(undefined);
  const [selectedCompForDetail, setSelectedCompForDetail] = useState<Competition | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [cityMapModalOpen, setCityMapModalOpen] = useState(false);


  /*
  ============================================================
  PAGE TRANSITION
  ============================================================
  */

  const transitionRef = useRef<GtaTransitionRef>(null);


  /*
  ============================================================
  NAVIGATION
  ============================================================
  */

  const handleTabChange = useCallback(
    (newTab: string) => {
      if (newTab === activeTab) return;

      if (transitionRef.current) {
        transitionRef.current.triggerTransition(newTab, () => {
          setActiveTab(newTab);
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
      } else {
        setActiveTab(newTab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [activeTab]
  );


  /*
  ============================================================
  CREW MODAL
  ============================================================
  */

  const handleOpenCrewModal = (compId?: string) => {
    setCrewModalCompId(compId);
    setCrewModalOpen(true);
  };


  /*
  ============================================================
  REGISTER
  ============================================================
  */

  const handleRegisterFromDetail = (compId: string) => {
    setCrewModalCompId(compId);
    setCrewModalOpen(true);
  };


  /*
  ============================================================
  RENDER
  ============================================================
  */

  return (

    <div
      className="
        min-h-screen
        flex
        flex-col
        selection:bg-[#FF6FB5]
        selection:text-white
        relative
        transition-colors
        duration-300
      "
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >

      {/* ======================================================
          GLOBAL MUSIC
          ====================================================== */}

      <GlobalMusic />


      {/* ======================================================
          AMBIENT EFFECTS
          ====================================================== */}

      <GtaAmbientFX />


      {/* ======================================================
          FILM GRAIN
          ====================================================== */}

      <div className="film-grain pointer-events-none" />


      {/* ======================================================
          MISSION BANNER
          ====================================================== */}

      <MissionBanner />


      {/* ======================================================
          PAGE TRANSITION
          ====================================================== */}

      <GtaTransitionOverlay ref={transitionRef} />


      {/* ======================================================
          NAVBAR (Now receives theme + toggleTheme props)
          ====================================================== */}

      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        openAuthModal={() => setAuthModalOpen(true)}
        openAdminLoginModal={() => setAdminLoginModalOpen(true)}
        openCrewModal={() => handleOpenCrewModal()}
        openCityMapModal={() => setCityMapModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />


      {/* ======================================================
          PAGE CONTENT
          ====================================================== */}

      <main className="flex-1">

        {/* HOME */}
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={handleTabChange}
            openCompetitionModal={comp => setSelectedCompForDetail(comp)}
            openAuthModal={() => setAuthModalOpen(true)}
            openCrewModal={() => handleOpenCrewModal()}
            openCityMapModal={() => setCityMapModalOpen(true)}
          />
        )}

        {/* COMPETITIONS */}
        {activeTab === 'competitions' && (
          <CompetitionsPage
            openCompetitionModal={comp => setSelectedCompForDetail(comp)}
            openCrewModal={compId => handleOpenCrewModal(compId)}
            openCityMapModal={() => setCityMapModalOpen(true)}
          />
        )}

        {/* TIMELINE */}
        {activeTab === 'timeline' && <TimelinePage />}

        {/* PRIZES */}
        {activeTab === 'prizes' && <PrizesPage />}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <FAQPage
            openContactModal={() => setContactModalOpen(true)}
          />
        )}

        {/* ADMIN */}
        {activeTab === 'admin' && (
          isAdmin ? (
            <AdminDashboard />
          ) : (
            <div className="py-20 px-4 max-w-lg mx-auto text-center">
              <div
                className="p-8 comic-border-xl space-y-4"
                style={{
                  backgroundColor: 'var(--card-bg-solid)',
                  color: 'var(--text-primary)',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
                }}
              >
                <div className="w-16 h-16 mx-auto bg-red-600 comic-border-sm flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white animate-pulse" />
                </div>

                <h2 className="font-headline text-3xl text-red-500 tracking-wider">
                  MISSION CONTROL RESTRICTED
                </h2>

                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Admin authorization is required.
                  Tap the
                  <strong> Tech Fest Logo 3 times </strong>
                  in the navigation bar to trigger root clearance.
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setAdminLoginModalOpen(true)}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-headline text-lg py-2 comic-border-sm cursor-pointer"
                  >
                    ENTER ADMIN ID
                  </button>

                  <button
                    onClick={() => handleTabChange('home')}
                    className="flex-1 font-headline text-lg py-2 comic-border-sm cursor-pointer transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    RETURN HOME
                  </button>
                </div>
              </div>
            </div>
          )
        )}

      </main>


      {/* ======================================================
          MODALS
          ====================================================== */}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={() => handleTabChange('admin')}
      />
      <CrewModal
        isOpen={crewModalOpen}
        onClose={() => {
          setCrewModalOpen(false);
          setCrewModalCompId(undefined);
        }}
        defaultCompetitionId={crewModalCompId}
      />
      <CompetitionDetailModal
        competition={selectedCompForDetail}
        onClose={() => setSelectedCompForDetail(null)}
        onRegister={handleRegisterFromDetail}
      />
      <FixerContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
      <CityMapModal
        isOpen={cityMapModalOpen}
        onClose={() => setCityMapModalOpen(false)}
        onSelectCompetition={comp => setSelectedCompForDetail(comp)}
        onDeployCrew={compId => handleOpenCrewModal(compId)}
        competitions={competitions}
      />


      {/* ======================================================
          FOOTER
          ====================================================== */}

      <Footer
        setActiveTab={handleTabChange}
        openContactModal={() => setContactModalOpen(true)}
        openCityMapModal={() => setCityMapModalOpen(true)}
      />

    </div>

  );
};


export default function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  return (
    <>
      {showLoadingScreen && (
        <LoadingScreen
          onComplete={() => setShowLoadingScreen(false)}
        />
      )}

      <AuthProvider>
        <AppProvider>
          <MainApp />
        </AppProvider>
      </AuthProvider>
    </>
  );
}