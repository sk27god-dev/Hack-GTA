import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

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


/* ============================================================
   FORCE CURRENT EVENT DETAILS
   ============================================================ */

const CURRENT_COMPETITIONS: Competition[] =
  INITIAL_COMPETITIONS.map(
    competition => {

      if (
        competition.id ===
        'technova-hackathon'
      ) {

        return {
          ...competition,

          schedule: {
            ...competition.schedule,
            date: '28 September 2026',
            time: '8:00 AM – 8:00 PM'
          },

          tags: [
            '₹30,000 PRIZE POOL',
            '12 HOURS',
            '28 SEPTEMBER 2026',
            '8:00 AM – 8:00 PM',
            'IT LABS',
            'MEALS PROVIDED',
            'TEAM 2–4'
          ]
        };

      }


      if (
        competition.id ===
        'efootball'
      ) {

        return {
          ...competition,

          schedule: {
            ...competition.schedule,
            date: '25 September 2026',
            time: '2:00 PM – 5:00 PM'
          },

          tags: [
            '₹2,500 PRIZE POOL',
            '25 SEPTEMBER 2026',
            '2:00 PM – 5:00 PM',
            'SOLO COMPETITION',
            'TECHNOVA 4.0'
          ]
        };

      }


      if (
        competition.id ===
        'bgmi'
      ) {

        return {
          ...competition,

          schedule: {
            ...competition.schedule,
            date: '25 September 2026',
            time: '2:00 PM – 5:00 PM'
          },

          tags: [
            '₹2,500 PRIZE POOL',
            '25 SEPTEMBER 2026',
            '2:00 PM – 5:00 PM',
            'TEAM OF 4 (SQUAD)',
            'MODE: CLASSIC',
            '₹200 / TEAM',
            'TECHNOVA 4.0'
          ]
        };

      }


      return competition;

    }
  );


const CURRENT_TIMELINE: TimelineEvent[] =
  INITIAL_TIMELINE.map(
    event => {

      if (
        event.id ===
        'timeline-efootball'
      ) {

        return {
          ...event,

          time: '02:00 PM – 05:00 PM',

          date:
            '25 September 2026'
        };

      }


      if (
        event.id ===
        'timeline-bgmi'
      ) {

        return {
          ...event,

          time: '02:00 PM – 05:00 PM',

          date:
            '25 September 2026'
        };

      }


      if (
        event.id ===
        'timeline-hackathon-start'
      ) {

        return {
          ...event,

          time:
            '08:00 AM',

          date:
            '28 September 2026'
        };

      }


      if (
        event.id ===
        'timeline-hackathon-end'
      ) {

        return {
          ...event,

          time:
            '08:00 PM',

          date:
            '28 September 2026'
        };

      }


      return event;

    }
  );


const CURRENT_FAQS: FAQItem[] =
  INITIAL_FAQS.map(
    faq => {

      if (
        faq.id ===
        'faq-hackathon-date'
      ) {

        return {
          ...faq,

          answer:
            'The TECHNOVA Hackathon will take place on 28 September 2026 from 8:00 AM to 8:00 PM.'
        };

      }


      if (
        faq.id ===
        'faq-hackathon-duration'
      ) {

        return {
          ...faq,

          answer:
            'TECHNOVA Hackathon is a 12-hour event running from 8:00 AM to 8:00 PM on 28 September 2026.'
        };

      }


      if (
        faq.id ===
        'faq-gaming-date'
      ) {

        return {
          ...faq,

          answer:
            'The E-Football and BGMI gaming events will take place on 25 September 2026 from 2:00 PM to 5:00 PM.'
        };

      }


      return faq;

    }
  );


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

  triggerMissionPassed: (
    title?: string,
    subtitle?: string
  ) => void;

  closeMissionBanner: () => void;


  addCompetition: (
    comp: Omit<Competition, 'id'>
  ) => void;

  updateCompetition: (
    id: string,
    comp: Partial<Competition>
  ) => void;

  deleteCompetition: (
    id: string
  ) => void;


  addTimelineEvent: (
    event: Omit<TimelineEvent, 'id'>
  ) => void;

  updateTimelineEvent: (
    id: string,
    event: Partial<TimelineEvent>
  ) => void;

  deleteTimelineEvent: (
    id: string
  ) => void;


  addFAQ: (
    faq: Omit<FAQItem, 'id'>
  ) => void;

  updateFAQ: (
    id: string,
    faq: Partial<FAQItem>
  ) => void;

  deleteFAQ: (
    id: string
  ) => void;


  updatePrizeCategory: (
    id: string,
    prize: Partial<PrizeCategory>
  ) => void;

  addPrizeCategory: (
    prize: Omit<PrizeCategory, 'id'>
  ) => void;

  deletePrizeCategory: (
    id: string
  ) => void;


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
  ) => {
    success: boolean;
    message: string;
    team?: Team;
  };


  leaveTeam: (
    teamId: string,
    uid: string
  ) => void;


  updateTeamProject: (
    teamId: string,
    title: string,
    repo: string
  ) => void;


  sendContactMessage: (
    msg: Omit<
      ContactMessage,
      'id' | 'createdAt' | 'status'
    >
  ) => void;


  resolveMessage: (
    id: string
  ) => void;


  resetToDefaults: () => void;
}


const AppContext =
  createContext<AppContextType | undefined>(
    undefined
  );


export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {


  /* ============================================================
     COMPETITIONS
     ============================================================ */

  const [competitions, setCompetitions] =
    useState<Competition[]>(() => {

      const saved =
        localStorage.getItem(
          'vice_competitions'
        );


      if (saved) {

        try {

          const parsed =
            JSON.parse(saved) as Competition[];


          const hackathon =
            parsed.find(
              c =>
                c.id ===
                'technova-hackathon'
            );


          const efootball =
            parsed.find(
              c =>
                c.id ===
                'efootball'
            );


          const bgmi =
            parsed.find(
              c =>
                c.id ===
                'bgmi'
            );


          const hasHackathon =
            !!hackathon;


          const hasEfootball =
            !!efootball;


          const hasBgmi =
            !!bgmi;


          const hasCorrectHackathonDetails =
            hackathon?.schedule?.date ===
              '28 September 2026' &&

            hackathon?.schedule?.time ===
              '8:00 AM – 8:00 PM';


          const hasCorrectEfootballDetails =
            efootball?.schedule?.date ===
              '25 September 2026' &&

            efootball?.schedule?.time ===
              '2:00 PM – 5:00 PM';


          const hasCorrectBgmiDetails =
            bgmi?.schedule?.date ===
              '25 September 2026' &&

            bgmi?.schedule?.time ===
              '2:00 PM – 5:00 PM';


          const hasCorrectBgmiLink =
            bgmi?.registrationUrl ===
            'https://forms.gle/tcBTQ3WBHXXAhjPQA';


          if (
            !hasHackathon ||
            !hasEfootball ||
            !hasBgmi ||
            !hasCorrectHackathonDetails ||
            !hasCorrectEfootballDetails ||
            !hasCorrectBgmiDetails ||
            !hasCorrectBgmiLink ||
            parsed.length !== 3
          ) {

            localStorage.setItem(
              'vice_competitions',
              JSON.stringify(
                CURRENT_COMPETITIONS
              )
            );

            return CURRENT_COMPETITIONS;

          }


          return parsed;

        } catch {

          return CURRENT_COMPETITIONS;

        }

      }


      return CURRENT_COMPETITIONS;

    });


  /* ============================================================
     TIMELINE
     ============================================================ */

  const [timeline, setTimeline] =
    useState<TimelineEvent[]>(() => {

      const saved =
        localStorage.getItem(
          'vice_timeline'
        );


      /*
       * Forces Hackathon End to use
       * the exact same image as Hackathon Start
       */

      const fixHackathonEndImage = (
        events: TimelineEvent[]
      ): TimelineEvent[] => {

        const hackathonStart =
          events.find(
            event =>
              event.id ===
              'timeline-hackathon-start'
          );


        if (!hackathonStart) {

          return events;

        }


        return events.map(
          event =>

            event.id ===
            'timeline-hackathon-end'

              ? {
                  ...event,

                  image:
                    hackathonStart.image
                }

              : event
        );

      };


      if (saved) {

        try {

          const parsed =
            JSON.parse(
              saved
            ) as TimelineEvent[];


          const hasEfootballTimeline =
            parsed.some(
              t =>
                t.id ===
                  'timeline-efootball' &&

                t.date ===
                  '25 September 2026' &&

                t.time ===
                  '02:00 PM – 05:00 PM'
            );


          const hasBgmiTimeline =
            parsed.some(
              t =>
                t.id ===
                  'timeline-bgmi' &&

                t.date ===
                  '25 September 2026' &&

                t.time ===
                  '02:00 PM – 05:00 PM'
            );


          const hasHackathonStart =
            parsed.some(
              t =>
                t.id ===
                  'timeline-hackathon-start' &&

                t.date ===
                  '28 September 2026' &&

                t.time ===
                  '08:00 AM'
            );


          const hasHackathonEnd =
            parsed.some(
              t =>
                t.id ===
                  'timeline-hackathon-end' &&

                t.date ===
                  '28 September 2026' &&

                t.time ===
                  '08:00 PM'
            );


          const hasOldDate =
            parsed.some(
              t =>
                t.date !==
                  '25 September 2026' &&

                t.date !==
                  '28 September 2026'
            );


          const isLatestTimeline =
            hasEfootballTimeline &&
            hasBgmiTimeline &&
            hasHackathonStart &&
            hasHackathonEnd &&
            !hasOldDate &&
            parsed.length === 4;


          if (!isLatestTimeline) {

            const fixedTimeline =
              fixHackathonEndImage(
                CURRENT_TIMELINE
              );


            localStorage.setItem(
              'vice_timeline',
              JSON.stringify(
                fixedTimeline
              )
            );


            return fixedTimeline;

          }


          const fixedTimeline =
            fixHackathonEndImage(
              parsed
            );


          localStorage.setItem(
            'vice_timeline',
            JSON.stringify(
              fixedTimeline
            )
          );


          return fixedTimeline;

        } catch {

          const fixedTimeline =
            fixHackathonEndImage(
              CURRENT_TIMELINE
            );


          return fixedTimeline;

        }

      }


      return fixHackathonEndImage(
        CURRENT_TIMELINE
      );

    });


  /* ============================================================
     FAQ
     ============================================================ */

  const [faqs, setFaqs] =
    useState<FAQItem[]>(() => {

      const saved =
        localStorage.getItem(
          'vice_faqs'
        );


      if (saved) {

        try {

          const parsed =
            JSON.parse(
              saved
            ) as FAQItem[];


          const hasOldFaq =
            parsed.some(
              f =>
                f.id ===
                'faq-battlezone'
            );


          const hasCorrectGamingFaq =
            parsed.some(
              f =>
                f.id ===
                  'faq-gaming-date' &&

                f.answer.includes(
                  '2:00 PM to 5:00 PM'
                )
            );


          const hasCorrectHackathonFaq =
            parsed.some(
              f =>
                f.id ===
                  'faq-hackathon-date' &&

                f.answer.includes(
                  '28 September 2026'
                ) &&

                f.answer.includes(
                  '8:00 AM to 8:00 PM'
                )
            );


          if (
            hasOldFaq ||
            !hasCorrectGamingFaq ||
            !hasCorrectHackathonFaq
          ) {

            localStorage.setItem(
              'vice_faqs',
              JSON.stringify(
                CURRENT_FAQS
              )
            );

            return CURRENT_FAQS;

          }


          return parsed;

        } catch {

          return CURRENT_FAQS;

        }

      }


      return CURRENT_FAQS;

    });


  /* ============================================================
     PRIZES
     ============================================================ */

  const [prizes, setPrizes] =
    useState<PrizeCategory[]>(() => {

      const saved =
        localStorage.getItem(
          'vice_prizes'
        );


      if (!saved) {

        return INITIAL_PRIZES;

      }


      try {

        const parsed =
          JSON.parse(
            saved
          ) as PrizeCategory[];


        const hasHackathon =
          parsed.some(
            prize =>
              prize.title
                ?.toLowerCase()
                .includes(
                  'hackathon'
                )
          );


        const hasBGMI =
          parsed.some(
            prize =>
              prize.title
                ?.toLowerCase()
                .includes(
                  'bgmi'
                )
          );


        const hasEFootball =
          parsed.some(
            prize =>
              prize.title
                ?.toLowerCase()
                .includes(
                  'football'
                )
          );


        if (
          !hasHackathon ||
          !hasBGMI ||
          !hasEFootball
        ) {

          return INITIAL_PRIZES;

        }


        return parsed.map(
          prize => {

            const title =
              prize.title
                ?.toLowerCase() ||
              '';


            if (
              title.includes(
                'bgmi'
              )
            ) {

              return {
                ...prize,
                amount: '₹2,500',
                numericalAmount: 2500
              };

            }


            if (
              title.includes(
                'football'
              )
            ) {

              return {
                ...prize,
                title: 'E-FOOTBALL',
                amount: '₹2,500',
                numericalAmount: 2500
              };

            }


            if (
              title.includes(
                'hackathon'
              )
            ) {

              return {
                ...prize,
                amount: '₹30,000',
                numericalAmount: 30000
              };

            }


            return prize;

          }
        );


      } catch {

        return INITIAL_PRIZES;

      }

    });


  /* ============================================================
     TEAMS
     ============================================================ */

  const [teams, setTeams] =
    useState<Team[]>(() => {

      const saved =
        localStorage.getItem(
          'vice_teams'
        );


      if (saved) {

        try {

          return JSON.parse(
            saved
          );

        } catch {

          return SAMPLE_TEAMS;

        }

      }


      return SAMPLE_TEAMS;

    });


  /* ============================================================
     CONTACT MESSAGES
     ============================================================ */

  const [messages, setMessages] =
    useState<ContactMessage[]>(() => {

      const saved =
        localStorage.getItem(
          'vice_messages'
        );


      if (saved) {

        try {

          return JSON.parse(
            saved
          );

        } catch {

          return [];

        }

      }


      return [

        {
          id: 'msg-1',

          name:
            'Ken Rosenberg',

          codename:
            'The Fixer',

          email:
            'rosenberg@vice.law',

          topic:
            'Hardware Tap Clearance',

          message:
            'Tommy, I secured the 10Gbps dedicated switch for the Data Vault. Keep the cops off the frequency!',

          createdAt:
            '2025-05-10',

          status:
            'unread'
        }

      ];

    });


  /* ============================================================
     SOUND
     ============================================================ */

  const [
    soundEnabled,
    setSoundState
  ] =
    useState<boolean>(() =>
      getSoundEnabled()
    );


  const [
    missionBanner,
    setMissionBanner
  ] =
    useState<
      MissionPassedBanner |
      null
    >(null);


  /* ============================================================
     LOCAL STORAGE SYNC
     ============================================================ */

  useEffect(() => {

    localStorage.setItem(
      'vice_competitions',
      JSON.stringify(
        competitions
      )
    );

  }, [competitions]);


  useEffect(() => {

    localStorage.setItem(
      'vice_timeline',
      JSON.stringify(
        timeline
      )
    );

  }, [timeline]);


  useEffect(() => {

    localStorage.setItem(
      'vice_faqs',
      JSON.stringify(
        faqs
      )
    );

  }, [faqs]);


  useEffect(() => {

    localStorage.setItem(
      'vice_prizes',
      JSON.stringify(
        prizes
      )
    );

  }, [prizes]);


  useEffect(() => {

    localStorage.setItem(
      'vice_teams',
      JSON.stringify(
        teams
      )
    );

  }, [teams]);


  useEffect(() => {

    localStorage.setItem(
      'vice_messages',
      JSON.stringify(
        messages
      )
    );

  }, [messages]);


  /* ============================================================
     SOUND TOGGLE
     ============================================================ */

  const toggleSound = () => {

    const next =
      !soundEnabled;


    setSoundState(
      next
    );


    setAudioSetting(
      next
    );


    if (next) {

      playClickSound();

    }

  };


  /* ============================================================
     MISSION PASSED
     ============================================================ */

  const triggerMissionPassed = (

    title =
      'MISSION PASSED!',

    subtitle =
      'DIRECTIVE SECURED • RESPECT +'

  ) => {

    playMissionPassedSound();


    setMissionBanner({

      show: true,

      title,

      subtitle

    });


    try {

      confetti({

        particleCount:
          80,

        spread:
          90,

        origin:
          { y: 0.6 },

        colors: [

          '#FF6FB5',

          '#00E5FF',

          '#FFD54F',

          '#000000',

          '#FFFFFF'

        ]

      });

    } catch (e) {

      console.warn(
        'Confetti trigger error',
        e
      );

    }


    setTimeout(() => {

      setMissionBanner(
        null
      );

    }, 4500);

  };


  const closeMissionBanner =
    () => {

      setMissionBanner(
        null
      );

    };


  /* ============================================================
     COMPETITION CRUD
     ============================================================ */

  const addCompetition = (
    comp:
      Omit<
        Competition,
        'id'
      >
  ) => {

    const newComp:
      Competition = {

      ...comp,

      id:
        `comp-${Date.now()}`

    };


    setCompetitions(
      prev => [

        newComp,

        ...prev

      ]
    );


    triggerMissionPassed(

      'COMPETITION CREATED!',

      'NEW SECTOR CONTRACT UNLOCKED'

    );

  };


  const updateCompetition = (

    id: string,

    updated:
      Partial<
        Competition
      >

  ) => {

    setCompetitions(
      prev =>

        prev.map(
          c =>

            c.id === id
              ? {
                  ...c,
                  ...updated
                }
              : c
        )
    );


    playClickSound();

  };


  const deleteCompetition = (
    id: string
  ) => {

    setCompetitions(
      prev =>

        prev.filter(
          c =>
            c.id !== id
        )
    );


    playClickSound();

  };


  /* ============================================================
     TIMELINE CRUD
     ============================================================ */

  const addTimelineEvent = (

    event:
      Omit<
        TimelineEvent,
        'id'
      >

  ) => {

    const newEvent:
      TimelineEvent = {

      ...event,

      id:
        `event-${Date.now()}`

    };


    setTimeline(
      prev => [

        ...prev,

        newEvent

      ]
    );


    triggerMissionPassed(

      'TIMELINE UPDATED!',

      'MISSION LOG REGISTERED'

    );

  };


  const updateTimelineEvent = (

    id: string,

    updated:
      Partial<
        TimelineEvent
      >

  ) => {

    setTimeline(
      prev =>

        prev.map(
          t =>

            t.id === id
              ? {
                  ...t,
                  ...updated
                }
              : t
        )
    );


    playClickSound();

  };


  const deleteTimelineEvent = (
    id: string
  ) => {

    setTimeline(
      prev =>

        prev.filter(
          t =>
            t.id !== id
        )
    );


    playClickSound();

  };


  /* ============================================================
     FAQ CRUD
     ============================================================ */

  const addFAQ = (

    faq:
      Omit<
        FAQItem,
        'id'
      >

  ) => {

    const newFaq:
      FAQItem = {

      ...faq,

      id:
        `faq-${Date.now()}`

    };


    setFaqs(
      prev => [

        ...prev,

        newFaq

      ]
    );


    playClickSound();

  };


  const updateFAQ = (

    id: string,

    updated:
      Partial<
        FAQItem
      >

  ) => {

    setFaqs(
      prev =>

        prev.map(
          f =>

            f.id === id
              ? {
                  ...f,
                  ...updated
                }
              : f
        )
    );


    playClickSound();

  };


  const deleteFAQ = (
    id: string
  ) => {

    setFaqs(
      prev =>

        prev.filter(
          f =>
            f.id !== id
        )
    );


    playClickSound();

  };


  /* ============================================================
     PRIZE CRUD
     ============================================================ */

  const updatePrizeCategory = (

    id: string,

    prize:
      Partial<
        PrizeCategory
      >

  ) => {

    setPrizes(
      prev =>

        prev.map(
          p =>

            p.id === id
              ? {
                  ...p,
                  ...prize
                }
              : p
        )
    );


    playClickSound();

  };


  const addPrizeCategory = (

    prize:
      Omit<
        PrizeCategory,
        'id'
      >

  ) => {

    const newPrize:
      PrizeCategory = {

      ...prize,

      id:
        `prize-${Date.now()}`

    };


    setPrizes(
      prev => [

        ...prev,

        newPrize

      ]
    );


    triggerMissionPassed(

      'BOUNTY POSTED!',

      'PRIZE POOL EXPANDED'

    );

  };


  const deletePrizeCategory = (
    id: string
  ) => {

    setPrizes(
      prev =>

        prev.filter(
          p =>
            p.id !== id
        )
    );


    playClickSound();

  };


  /* ============================================================
     TEAM MANAGEMENT
     ============================================================ */

  const createTeam = (

    competitionId:
      string,

    teamName:
      string,

    captainUid:
      string,

    captainName:
      string,

    captainEmail:
      string,

    college:
      string

  ): Team => {


    const comp =
      competitions.find(
        c =>
          c.id ===
          competitionId
      );


    const code =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();


    const newTeam:
      Team = {

      id:
        `team-${Date.now()}`,

      code,

      name:
        teamName,

      competitionId,

      competitionTitle:
        comp?.title ||
        'Unknown Competition',

      captainId:
        captainUid,

      captainName,

      captainEmail,

      members: [

        {

          uid:
            captainUid,

          displayName:
            captainName,

          email:
            captainEmail,

          college,

          role:
            'captain',

          joinedAt:
            new Date()
              .toISOString()
              .split('T')[0]

        }

      ],

      maxMembers:
        comp?.teamSize ||
        4,

      status:
        'recruiting',

      createdAt:
        new Date()
          .toISOString()
          .split('T')[0]

    };


    setTeams(
      prev => [

        newTeam,

        ...prev

      ]
    );


    triggerMissionPassed(

      'CREW ASSEMBLED!',

      `SYNDICATE CODE: ${code}`

    );


    return newTeam;

  };


  const joinTeamByCode = (

    code:
      string,

    uid:
      string,

    displayName:
      string,

    email:
      string,

    college:
      string

  ) => {


    const team =
      teams.find(
        t =>
          t.code
            .toUpperCase() ===

          code
            .trim()
            .toUpperCase()
      );


    if (!team) {

      return {

        success:
          false,

        message:
          'Invalid Crew Syndicate Code! Check with your captain.'

      };

    }


    if (
      team.members.some(
        m =>
          m.uid === uid
      )
    ) {

      return {

        success:
          false,

        message:
          'You are already an operative in this crew.'

      };

    }


    if (
      team.members.length >=
      team.maxMembers
    ) {

      return {

        success:
          false,

        message:
          'Crew roster is already at maximum capacity.'

      };

    }


    const updatedMembers = [

      ...team.members,

      {

        uid,

        displayName,

        email,

        college,

        role:
          'member' as const,

        joinedAt:
          new Date()
            .toISOString()
            .split('T')[0]

      }

    ];


    const isFull =
      updatedMembers.length >=
      team.maxMembers;


    const updatedTeam:
      Team = {

      ...team,

      members:
        updatedMembers,

      status:
        isFull
          ? 'ready'
          : 'recruiting'

    };


    setTeams(
      prev =>

        prev.map(
          t =>
            t.id === team.id
              ? updatedTeam
              : t
        )
    );


    triggerMissionPassed(

      'JOINED CREW!',

      `INFILTRATED ${team.name.toUpperCase()}`

    );


    return {

      success:
        true,

      message:
        `Successfully joined ${team.name}!`,

      team:
        updatedTeam

    };

  };


  const leaveTeam = (

    teamId:
      string,

    uid:
      string

  ) => {


    playClickSound();


    setTeams(
      prev =>

        prev
          .map(
            t => {


              if (
                t.id !== teamId
              ) {

                return t;

              }


              const filtered =
                t.members.filter(
                  m =>
                    m.uid !== uid
                );


              if (
                filtered.length === 0
              ) {

                return null;

              }


              if (

                t.captainId === uid &&

                filtered.length > 0

              ) {

                filtered[0].role =
                  'captain';


                return {

                  ...t,

                  captainId:
                    filtered[0].uid,

                  captainName:
                    filtered[0].displayName,

                  captainEmail:
                    filtered[0].email,

                  members:
                    filtered,

                  status:
                    'recruiting' as const

                };

              }


              return {

                ...t,

                members:
                  filtered,

                status:
                  'recruiting' as const

              };

            }
          )

          .filter(
            (
              t
            ):
              t is Team =>

              t !== null
          )
    );

  };


  const updateTeamProject = (

    teamId:
      string,

    title:
      string,

    repo:
      string

  ) => {


    setTeams(
      prev =>

        prev.map(
          t =>

            t.id === teamId

              ? {

                  ...t,

                  projectTitle:
                    title,

                  projectRepo:
                    repo,

                  status:
                    'submitted'

                }

              : t
        )
    );


    triggerMissionPassed(

      'PAYLOAD UPLOADED!',

      'FINAL SUBMISSION RECORDED'

    );

  };


  /* ============================================================
     CONTACT
     ============================================================ */

  const sendContactMessage = (

    msg:
      Omit<
        ContactMessage,

        'id' |
        'createdAt' |
        'status'
      >

  ) => {


    const newMsg:
      ContactMessage = {

      ...msg,

      id:
        `msg-${Date.now()}`,

      createdAt:
        new Date()
          .toISOString()
          .split('T')[0],

      status:
        'unread'

    };


    setMessages(
      prev => [

        newMsg,

        ...prev

      ]
    );


    triggerMissionPassed(

      'DISPATCH TRANSMITTED!',

      'OUR FIXERS HAVE RECEIVED YOUR FREQUENCY'

    );

  };


  const resolveMessage = (
    id: string
  ) => {


    setMessages(
      prev =>

        prev.map(
          m =>

            m.id === id

              ? {

                  ...m,

                  status:
                    'resolved'

                }

              : m
        )
    );


    playClickSound();

  };


  /* ============================================================
     MASTER RESET
     ============================================================ */

  const resetToDefaults =
    () => {


      setCompetitions(
        CURRENT_COMPETITIONS
      );


      setFaqs(
        CURRENT_FAQS
      );


      setPrizes(
        INITIAL_PRIZES
      );


      setTeams(
        SAMPLE_TEAMS
      );


      localStorage.setItem(
        'vice_competitions',
        JSON.stringify(
          CURRENT_COMPETITIONS
        )
      );


      /*
       * FIX:
       * Reset timeline while making sure
       * Hackathon End gets Hackathon Start image
       */

      const hackathonStart =
        CURRENT_TIMELINE.find(
          event =>
            event.id ===
            'timeline-hackathon-start'
        );


      const fixedTimeline =
        CURRENT_TIMELINE.map(
          event =>

            event.id ===
              'timeline-hackathon-end' &&
            hackathonStart

              ? {
                  ...event,
                  image:
                    hackathonStart.image
                }

              : event
        );


      setTimeline(
        fixedTimeline
      );


      localStorage.setItem(
        'vice_timeline',
        JSON.stringify(
          fixedTimeline
        )
      );


      localStorage.setItem(
        'vice_faqs',
        JSON.stringify(
          CURRENT_FAQS
        )
      );


      localStorage.setItem(
        'vice_prizes',
        JSON.stringify(
          INITIAL_PRIZES
        )
      );


      localStorage.setItem(
        'vice_teams',
        JSON.stringify(
          SAMPLE_TEAMS
        )
      );


      triggerMissionPassed(

        'SYSTEM PURGED!',

        'RESET TO FACTORY DIRECTIVES'

      );

    };


  /* ============================================================
     PROVIDER
     ============================================================ */

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

  const context =
    useContext(
      AppContext
    );


  if (!context) {

    throw new Error(
      'useApp must be used within an AppProvider'
    );

  }


  return context;

};