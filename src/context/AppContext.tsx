import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Competition,
  TimelineEvent,
  FAQItem,
  PrizeCategory,
  Team,
  ContactMessage
} from '../types';
import {
  INITIAL_COMPETITIONS,
  INITIAL_TIMELINE,
  INITIAL_FAQS,
  INITIAL_PRIZES,
  SAMPLE_TEAMS
} from '../data/initialData';
import {
  getSoundEnabled,
  setSoundEnabled as setAudioSetting,
  playMissionPassedSound,
  playClickSound
} from '../utils/audio';

interface MissionPassedBanner {
  show: boolean;
  title: string;
  subtitle: string;
}

interface AppContextType {
  competitions: Competition[];
  timeline: TimelineEvent[];
  faqs: FAQItem[];
  prizes: PrizeCategory[];
  teams: Team[];
  messages: ContactMessage[];
  soundEnabled: boolean;
  toggleSound: () => void;
  missionBanner: MissionPassedBanner | null;
  triggerMissionPassed: (title?: string, subtitle?: string) => void;
  closeMissionBanner: () => void;

  // Competition CRUD
  addCompetition: (comp: Omit<Competition, 'id'>) => void;
  updateCompetition: (id: string, comp: Partial<Competition>) => void;
  deleteCompetition: (id: string) => void;

  // Timeline CRUD
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  updateTimelineEvent: (id: string, event: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;

  // FAQ CRUD
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Prize CRUD
  updatePrizeCategory: (id: string, prize: Partial<PrizeCategory>) => void;
  addPrizeCategory: (prize: Omit<PrizeCategory, 'id'>) => void;
  deletePrizeCategory: (id: string) => void;

  // Team Management
  createTeam: (
    competitionId: string,
    teamName: string,
    captainUid: string,
    captainName: string,
    captainEmail: string,
    college: string
  ) => Team;
  joinTeamByCode: (
    code: string,
    uid: string,
    displayName: string,
    email: string,
    college: string
  ) => { success: boolean; message: string; team?: Team };
  leaveTeam: (teamId: string, uid: string) => void;
  updateTeamProject: (teamId: string, title: string, repo: string) => void;

  // Contact / Fixer Dispatch
  sendContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  resolveMessage: (id: string) => void;

  // Master Reset
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [competitions, setCompetitions] = useState<Competition[]>(() => {
    const saved = localStorage.getItem('vice_competitions');
    return saved ? JSON.parse(saved) : INITIAL_COMPETITIONS;
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('vice_timeline');
    return saved ? JSON.parse(saved) : INITIAL_TIMELINE;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('vice_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [prizes, setPrizes] = useState<PrizeCategory[]>(() => {
    const saved = localStorage.getItem('vice_prizes');
    return saved ? JSON.parse(saved) : INITIAL_PRIZES;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('vice_teams');
    return saved ? JSON.parse(saved) : SAMPLE_TEAMS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('vice_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-1',
        name: 'Ken Rosenberg',
        codename: 'The Fixer',
        email: 'rosenberg@vice.law',
        topic: 'Hardware Tap Clearance',
        message: 'Tommy, I secured the 10Gbps dedicated switch for the Data Vault. Keep the cops off the frequency!',
        createdAt: '2025-05-10',
        status: 'unread'
      }
    ];
  });

  const [soundEnabled, setSoundState] = useState<boolean>(() => getSoundEnabled());
  const [missionBanner, setMissionBanner] = useState<MissionPassedBanner | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('vice_competitions', JSON.stringify(competitions));
  }, [competitions]);

  useEffect(() => {
    localStorage.setItem('vice_timeline', JSON.stringify(timeline));
  }, [timeline]);

  useEffect(() => {
    localStorage.setItem('vice_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('vice_prizes', JSON.stringify(prizes));
  }, [prizes]);

  useEffect(() => {
    localStorage.setItem('vice_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('vice_messages', JSON.stringify(messages));
  }, [messages]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundState(next);
    setAudioSetting(next);
    if (next) {
      playClickSound();
    }
  };

  const triggerMissionPassed = (title = 'MISSION PASSED!', subtitle = 'DIRECTIVE SECURED • RESPECT +') => {
    playMissionPassedSound();
    setMissionBanner({ show: true, title, subtitle });

    // Blast celebratory GTA neon confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF6FB5', '#00E5FF', '#FFD54F', '#000000', '#FFFFFF']
      });
    } catch (e) {
      console.warn('Confetti trigger error', e);
    }

    setTimeout(() => {
      setMissionBanner(null);
    }, 4500);
  };

  const closeMissionBanner = () => {
    setMissionBanner(null);
  };

  // Competition CRUD
  const addCompetition = (comp: Omit<Competition, 'id'>) => {
    const newComp: Competition = {
      ...comp,
      id: `comp-${Date.now()}`
    };
    setCompetitions(prev => [newComp, ...prev]);
    triggerMissionPassed('COMPETITION CREATED!', 'NEW SECTOR CONTRACT UNLOCKED');
  };

  const updateCompetition = (id: string, updated: Partial<Competition>) => {
    setCompetitions(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updated } : c))
    );
    playClickSound();
  };

  const deleteCompetition = (id: string) => {
    setCompetitions(prev => prev.filter(c => c.id !== id));
    playClickSound();
  };

  // Timeline CRUD
  const addTimelineEvent = (event: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: `event-${Date.now()}`
    };
    setTimeline(prev => [...prev, newEvent]);
    triggerMissionPassed('TIMELINE UPDATED!', 'MISSION LOG REGISTERED');
  };

  const updateTimelineEvent = (id: string, updated: Partial<TimelineEvent>) => {
    setTimeline(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updated } : t))
    );
    playClickSound();
  };

  const deleteTimelineEvent = (id: string) => {
    setTimeline(prev => prev.filter(t => t.id !== id));
    playClickSound();
  };

  // FAQ CRUD
  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    setFaqs(prev => [...prev, newFaq]);
    playClickSound();
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev =>
      prev.map(f => (f.id === id ? { ...f, ...updated } : f))
    );
    playClickSound();
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    playClickSound();
  };

  // Prize CRUD
  const updatePrizeCategory = (id: string, prize: Partial<PrizeCategory>) => {
    setPrizes(prev =>
      prev.map(p => (p.id === id ? { ...p, ...prize } : p))
    );
    playClickSound();
  };

  const addPrizeCategory = (prize: Omit<PrizeCategory, 'id'>) => {
    const newPrize: PrizeCategory = {
      ...prize,
      id: `prize-${Date.now()}`
    };
    setPrizes(prev => [...prev, newPrize]);
    triggerMissionPassed('BOUNTY POSTED!', 'PRIZE POOL EXPANDED');
  };

  const deletePrizeCategory = (id: string) => {
    setPrizes(prev => prev.filter(p => p.id !== id));
    playClickSound();
  };

  // Team Management
  const createTeam = (
    competitionId: string,
    teamName: string,
    captainUid: string,
    captainName: string,
    captainEmail: string,
    college: string
  ): Team => {
    const comp = competitions.find(c => c.id === competitionId);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      code,
      name: teamName,
      competitionId,
      competitionTitle: comp?.title || 'Unknown Competition',
      captainId: captainUid,
      captainName,
      captainEmail,
      members: [
        {
          uid: captainUid,
          displayName: captainName,
          email: captainEmail,
          college,
          role: 'captain',
          joinedAt: new Date().toISOString().split('T')[0]
        }
      ],
      maxMembers: comp?.teamSize || 4,
      status: 'recruiting',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTeams(prev => [newTeam, ...prev]);
    triggerMissionPassed('CREW ASSEMBLED!', `SYNDICATE CODE: ${code}`);
    return newTeam;
  };

  const joinTeamByCode = (
    code: string,
    uid: string,
    displayName: string,
    email: string,
    college: string
  ) => {
    const team = teams.find(t => t.code.toUpperCase() === code.trim().toUpperCase());
    if (!team) {
      return { success: false, message: 'Invalid Crew Syndicate Code! Check with your captain.' };
    }
    if (team.members.some(m => m.uid === uid)) {
      return { success: false, message: 'You are already an operative in this crew.' };
    }
    if (team.members.length >= team.maxMembers) {
      return { success: false, message: 'Crew roster is already at maximum capacity.' };
    }

    const updatedMembers = [
      ...team.members,
      {
        uid,
        displayName,
        email,
        college,
        role: 'member' as const,
        joinedAt: new Date().toISOString().split('T')[0]
      }
    ];

    const isFull = updatedMembers.length >= team.maxMembers;
    const updatedTeam: Team = {
      ...team,
      members: updatedMembers,
      status: isFull ? 'ready' : 'recruiting'
    };

    setTeams(prev => prev.map(t => (t.id === team.id ? updatedTeam : t)));
    triggerMissionPassed('JOINED CREW!', `INFILTRATED ${team.name.toUpperCase()}`);
    return { success: true, message: `Successfully joined ${team.name}!`, team: updatedTeam };
  };

  const leaveTeam = (teamId: string, uid: string) => {
    playClickSound();
    setTeams(prev =>
      prev
        .map(t => {
          if (t.id !== teamId) return t;
          const filtered = t.members.filter(m => m.uid !== uid);
          if (filtered.length === 0) return null; // Team dissolved
          // If captain left, promote next
          if (t.captainId === uid && filtered.length > 0) {
            filtered[0].role = 'captain';
            return {
              ...t,
              captainId: filtered[0].uid,
              captainName: filtered[0].displayName,
              captainEmail: filtered[0].email,
              members: filtered,
              status: 'recruiting' as const
            };
          }
          return {
            ...t,
            members: filtered,
            status: 'recruiting' as const
          };
        })
        .filter((t): t is Team => t !== null)
    );
  };

  const updateTeamProject = (teamId: string, title: string, repo: string) => {
    setTeams(prev =>
      prev.map(t =>
        t.id === teamId ? { ...t, projectTitle: title, projectRepo: repo, status: 'submitted' } : t
      )
    );
    triggerMissionPassed('PAYLOAD UPLOADED!', 'FINAL SUBMISSION RECORDED');
  };

  const sendContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'unread'
    };
    setMessages(prev => [newMsg, ...prev]);
    triggerMissionPassed('DISPATCH TRANSMITTED!', 'OUR FIXERS HAVE RECEIVED YOUR FREQUENCY');
  };

  const resolveMessage = (id: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, status: 'resolved' } : m))
    );
    playClickSound();
  };

  const resetToDefaults = () => {
    setCompetitions(INITIAL_COMPETITIONS);
    setTimeline(INITIAL_TIMELINE);
    setFaqs(INITIAL_FAQS);
    setPrizes(INITIAL_PRIZES);
    setTeams(SAMPLE_TEAMS);
    triggerMissionPassed('SYSTEM PURGED!', 'RESET TO FACTORY DIRECTIVES');
  };

  return (
    <AppContext.Provider
      value={{
        competitions,
        timeline,
        faqs,
        prizes,
        teams,
        messages,
        soundEnabled,
        toggleSound,
        missionBanner,
        triggerMissionPassed,
        closeMissionBanner,
        addCompetition,
        updateCompetition,
        deleteCompetition,
        addTimelineEvent,
        updateTimelineEvent,
        deleteTimelineEvent,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        updatePrizeCategory,
        addPrizeCategory,
        deletePrizeCategory,
        createTeam,
        joinTeamByCode,
        leaveTeam,
        updateTeamProject,
        sendContactMessage,
        resolveMessage,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
