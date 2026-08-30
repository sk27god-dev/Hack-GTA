import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MissionBanner } from './components/MissionBanner';
import { GtaTransitionOverlay, GtaTransitionRef } from './components/GtaTransitionOverlay';
import { AuthModal } from './components/AuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CrewModal } from './components/CrewModal';
import { CompetitionDetailModal } from './components/CompetitionDetailModal';
import { FixerContactModal } from './components/FixerContactModal';
import { CityMapModal } from './components/CityMapModal';
import { HomePage } from './pages/HomePage';
import { CompetitionsPage } from './pages/CompetitionsPage';
import { TimelinePage } from './pages/TimelinePage';
import { PrizesPage } from './pages/PrizesPage';
import { FAQPage } from './pages/FAQPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Competition } from './types';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { initAudio } from './utils/audio';

const MainApp: React.FC = () => {
  const { competitions } = useApp();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    initAudio();
  }, []);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [crewModalOpen, setCrewModalOpen] = useState(false);
  const [crewModalCompId, setCrewModalCompId] = useState<string | undefined>(undefined);
  const [selectedCompForDetail, setSelectedCompForDetail] = useState<Competition | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [cityMapModalOpen, setCityMapModalOpen] = useState(false);

  const transitionRef = useRef<GtaTransitionRef>(null);

  // GTA-style animated page tab switcher via GSAP
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

  const handleOpenCrewModal = (compId?: string) => {
    setCrewModalCompId(compId);
    setCrewModalOpen(true);
  };

  const handleRegisterFromDetail = (compId: string) => {
    setCrewModalCompId(compId);
    setCrewModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07040e] text-slate-200 selection:bg-[#ff007f] selection:text-white relative">
      {/* Retro Film Grain Effect Overlay */}
      <div className="film-grain" />

      {/* GTA "Mission Passed / Respect +" Banner Drop */}
      <MissionBanner />

      {/* GSAP GTA-style Cinematic Page Shutter Wipe Overlay */}
      <GtaTransitionOverlay ref={transitionRef} />

      {/* Fixed Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        openAuthModal={() => setAuthModalOpen(true)}
        openAdminLoginModal={() => setAdminLoginModalOpen(true)}
        openCrewModal={() => handleOpenCrewModal()}
        openCityMapModal={() => setCityMapModalOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={handleTabChange}
            openCompetitionModal={comp => setSelectedCompForDetail(comp)}
            openAuthModal={() => setAuthModalOpen(true)}
            openCrewModal={() => handleOpenCrewModal()}
            openCityMapModal={() => setCityMapModalOpen(true)}
          />
        )}

        {activeTab === 'competitions' && (
          <CompetitionsPage
            openCompetitionModal={comp => setSelectedCompForDetail(comp)}
            openCrewModal={compId => handleOpenCrewModal(compId)}
            openCityMapModal={() => setCityMapModalOpen(true)}
          />
        )}

        {activeTab === 'timeline' && <TimelinePage />}

        {activeTab === 'prizes' && <PrizesPage />}

        {activeTab === 'faq' && (
          <FAQPage openContactModal={() => setContactModalOpen(true)} />
        )}

        {activeTab === 'admin' && (
          isAdmin ? (
            <AdminDashboard />
          ) : (
            <div className="py-20 px-4 max-w-lg mx-auto text-center">
              <div className="bg-[#18181F] text-white p-8 comic-border-xl shadow-[6px_6px_0px_#000] space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-600 comic-border-sm flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h2 className="font-headline text-3xl text-red-500 tracking-wider">
                  MISSION CONTROL RESTRICTED
                </h2>
                <p className="text-sm text-zinc-400">
                  Admin authorization is required. Tap the <strong>Tech Fest Logo 3 times</strong> in the navigation bar to trigger root clearance.
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
                    className="flex-1 bg-white text-black hover:bg-[#00E5FF] font-headline text-lg py-2 comic-border-sm cursor-pointer"
                  >
                    RETURN HOME
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Root Admin Security Clearance Modal */}
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

      {/* Interactive GTA-style Satellite City Map Modal */}
      <CityMapModal
        isOpen={cityMapModalOpen}
        onClose={() => setCityMapModalOpen(false)}
        onSelectCompetition={comp => setSelectedCompForDetail(comp)}
        onDeployCrew={compId => handleOpenCrewModal(compId)}
        competitions={competitions}
      />

      {/* Vice City Tech Noir Footer */}
      <Footer
        setActiveTab={handleTabChange}
        openContactModal={() => setContactModalOpen(true)}
        openCityMapModal={() => setCityMapModalOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}

