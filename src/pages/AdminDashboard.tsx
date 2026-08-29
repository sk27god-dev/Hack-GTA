import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Competition, TimelineEvent, FAQItem, PrizeCategory, Team } from '../types';
import { playClickSound } from '../utils/audio';
import {
  Shield,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Users,
  Trophy,
  Calendar,
  HelpCircle,
  Radio,
  RefreshCw,
  Download,
  CheckCircle2,
  ExternalLink,
  Layers,
  Star
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    competitions,
    timeline,
    faqs,
    prizes,
    teams,
    messages,
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
    resolveMessage,
    resetToDefaults
  } = useApp();

  const { allUsers, currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'competitions' | 'timeline' | 'prizes' | 'faqs' | 'teams' | 'messages'
  >('overview');

  // Competition Creation Form State
  const [newCompTitle, setNewCompTitle] = useState('');
  const [newCompSubtitle, setNewCompSubtitle] = useState('');
  const [newCompTrack, setNewCompTrack] = useState<Competition['track']>('Cybersecurity');
  const [newCompDesc, setNewCompDesc] = useState('');
  const [newCompPrize, setNewCompPrize] = useState('$80,000 Bounty');
  const [newCompPrizeAmount, setNewCompPrizeAmount] = useState(80000);
  const [newCompTeamSize, setNewCompTeamSize] = useState(4);
  const [newCompImage, setNewCompImage] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA4eXUJVPuHfSES_OlHA6ptMv_EV98aTR9QlO1Lyq4kK6pj5BvQ1AglW96j3GyJIbNKONOcktfFbNOtVPSXDvt9tJH1Qhjbi_LP77IOr8ErfgQPd74aKQURp39fyWN7VhPXfoTni4rW8e8cpqeuCSICGi5iJlX_EuD5lJfX5ng8rG9aX3chXG8RCIg7MrRuzK1_KsVZpx6U_VXVl4D-D6lByUF-HrCC6z7_JyqU-xXzgJkpW7XogvTu'
  );

  // Timeline Creation Form State
  const [newTimeTitle, setNewTimeTitle] = useState('');
  const [newTimeDate, setNewTimeDate] = useState('May 16, 2025');
  const [newTimeTime, setNewTimeTime] = useState('10:00 AM');
  const [newTimeDay, setNewTimeDay] = useState<TimelineEvent['day']>('Day 1');
  const [newTimeLocation, setNewTimeLocation] = useState('The Mainframe Deck');
  const [newTimeDesc, setNewTimeDesc] = useState('');
  const [newTimeStatus, setNewTimeStatus] = useState<TimelineEvent['status']>('upcoming');
  const [newTimeStatusLabel, setNewTimeStatusLabel] = useState<TimelineEvent['statusLabel']>('STANDBY');

  // FAQ Form State
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState<FAQItem['category']>('Registration');

  // Prize Form State
  const [newPrizeTitle, setNewPrizeTitle] = useState('');
  const [newPrizeSubtitle, setNewPrizeSubtitle] = useState('');
  const [newPrizeAmount, setNewPrizeAmount] = useState('$25k');
  const [newPrizeDesc, setNewPrizeDesc] = useState('');

  // Export JSON helper
  const handleExportData = () => {
    const data = {
      competitions,
      timeline,
      faqs,
      prizes,
      teams,
      users: allUsers,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vice-tech-fest-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateComp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompTitle || !newCompDesc) return;
    addCompetition({
      title: newCompTitle.toUpperCase(),
      subtitle: newCompSubtitle,
      track: newCompTrack,
      description: newCompDesc,
      rules: [
        'Teams must follow standard syndicate guidelines.',
        'Submissions must be deployed to public or testnet endpoints.',
        'All work must be authored within the 48-hour event window.'
      ],
      judgingCriteria: [
        { criterion: 'Technical Execution', weight: 40, description: 'Code architecture and robustness.' },
        { criterion: 'Innovation', weight: 30, description: 'Novelty of approach.' },
        { criterion: 'Presentation', weight: 30, description: 'Live stage demonstration.' }
      ],
      schedule: {
        date: 'May 16-17, 2025',
        time: '12:00 PM - 06:00 PM',
        location: 'Sector 02 - Lab B',
        stage: 'Main Hackathon Sprint'
      },
      prize: newCompPrize,
      prizeAmount: Number(newCompPrizeAmount) || 50000,
      teamSize: Number(newCompTeamSize) || 4,
      image: newCompImage,
      featured: false,
      tags: ['Hackathon', 'Vice City', 'Prototype']
    });
    setNewCompTitle('');
    setNewCompSubtitle('');
    setNewCompDesc('');
  };

  const handleCreateTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimeTitle || !newTimeDesc) return;
    addTimelineEvent({
      title: newTimeTitle.toUpperCase(),
      date: newTimeDate,
      time: newTimeTime,
      day: newTimeDay,
      location: newTimeLocation,
      description: newTimeDesc,
      status: newTimeStatus,
      statusLabel: newTimeStatusLabel,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAXx20THYEqOSwBzlQBtSH4mpOcgyFBlNo1NnTCS_3RBOzOBZk12wvuMbL-qPoqocA9MmwfSEe3rpD4me0zxPY9ScDNTFw2UeMHmM9FJSjHKImc3K-5LoEAUzrctpuIaAvSlRO-Oexi-wjQC0W68nlGUQMcbL_zMVgtQbo_x6frIS_HoQUzDRGgxTx9xkixc3tWNl4RRzdIRsMlbaYvgD5OlHLSO6j3IhbkD2v-x9f4QZizyd1dxeHl'
    });
    setNewTimeTitle('');
    setNewTimeDesc('');
  };

  const handleCreateFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion || !newFaqAnswer) return;
    addFAQ({
      question: newFaqQuestion.toUpperCase(),
      answer: newFaqAnswer,
      category: newFaqCategory
    });
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  const handleCreatePrize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrizeTitle || !newPrizeDesc) return;
    addPrizeCategory({
      title: newPrizeTitle.toUpperCase(),
      subtitle: newPrizeSubtitle,
      amount: newPrizeAmount,
      numericalAmount: 25000,
      icon: 'award',
      description: newPrizeDesc,
      badgeBg: '#FF6FB5',
      badgeText: '#000000',
      accentColor: '#FF6FB5'
    });
    setNewPrizeTitle('');
    setNewPrizeSubtitle('');
    setNewPrizeDesc('');
  };

  const totalPrizePool = competitions.reduce((acc, c) => acc + (c.prizeAmount || 0), 0) + 100000;
  const unreadMessages = messages.filter(m => m.status === 'unread');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#141419] text-white comic-border-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-0.5 border border-black text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            ADMINISTRATOR ROOT PRIVILEGES
          </div>
          <h1 className="font-headline text-4xl sm:text-6xl text-white gta-shadow-black leading-none mb-1">
            MISSION CONTROL CENTER
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Real-time management for competition tracks, mission timeline, squad submissions, prizes, and intel broadcasts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            id="admin-export-backup-btn"
            onClick={() => {
              playClickSound();
              handleExportData();
            }}
            className="bg-white text-black font-headline text-lg px-3 py-1.5 comic-border-sm hover:bg-[#00E5FF] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT JSON</span>
          </button>

          <button
            id="admin-reset-defaults-btn"
            onClick={() => {
              if (window.confirm('Reset all festival data back to factory defaults?')) {
                resetToDefaults();
              }
            }}
            className="bg-red-600 text-white font-headline text-lg px-3 py-1.5 comic-border-sm hover:bg-black transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>FACTORY RESET</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-black pb-2">
        {[
          { id: 'overview', label: 'METRICS OVERVIEW', icon: Shield },
          { id: 'competitions', label: `TRACKS (${competitions.length})`, icon: Trophy },
          { id: 'timeline', label: `TIMELINE (${timeline.length})`, icon: Calendar },
          { id: 'teams', label: `SQUADS (${teams.length})`, icon: Users },
          { id: 'prizes', label: `PRIZES (${prizes.length})`, icon: Trophy },
          { id: 'faqs', label: `INTEL FAQS (${faqs.length})`, icon: HelpCircle },
          {
            id: 'messages',
            label: `DISPATCH (${messages.length})`,
            icon: Radio,
            badge: unreadMessages.length > 0 ? unreadMessages.length : undefined
          }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id as any);
              }}
              className={`font-headline text-lg px-4 py-2 border-2 transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#FF6FB5] text-white border-black shadow-[3px_3px_0px_#000] -translate-y-0.5'
                  : 'bg-white text-black border-black hover:bg-[#FFD54F]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="bg-red-600 text-white font-sans text-xs px-1.5 py-0.2 rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white comic-border p-5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Registered Operatives</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-headline text-4xl text-black">{allUsers.length + 420}</span>
                <Users className="w-8 h-8 text-[#FF6FB5]" />
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">● Synchronized live</span>
            </div>

            <div className="bg-white comic-border p-5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Formed Syndicate Crews</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-headline text-4xl text-[#00E5FF]">{teams.length + 84}</span>
                <Trophy className="w-8 h-8 text-[#00E5FF]" />
              </div>
              <span className="text-[10px] text-zinc-600 font-bold">Across 6 Specialized Tracks</span>
            </div>

            <div className="bg-white comic-border p-5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Total Escrow Bounty</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-headline text-4xl text-[#FFD54F]">${totalPrizePool.toLocaleString()}</span>
                <Trophy className="w-8 h-8 text-[#FFD54F]" />
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">Fully Escrow Secured</span>
            </div>

            <div className="bg-white comic-border p-5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Unread Dispatch Inquiries</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-headline text-4xl text-red-600">{unreadMessages.length}</span>
                <Radio className="w-8 h-8 text-red-600" />
              </div>
              <span className="text-[10px] text-zinc-600 font-bold">Requiring Fixer Radio Callback</span>
            </div>
          </div>

          {/* Quick Roster Table */}
          <div className="bg-white comic-border p-6">
            <h3 className="font-headline text-3xl text-black mb-3 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#FF6FB5]" />
              ACTIVE CREW ROSTERS & CODE MATRIX
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-black text-white font-headline text-base">
                    <th className="p-2 border border-black">SQUAD NAME</th>
                    <th className="p-2 border border-black">TRACK</th>
                    <th className="p-2 border border-black">CAPTAIN</th>
                    <th className="p-2 border border-black">CODE</th>
                    <th className="p-2 border border-black">MEMBERS</th>
                    <th className="p-2 border border-black">PAYLOAD</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(team => (
                    <tr key={team.id} className="border-b border-zinc-200 hover:bg-amber-50">
                      <td className="p-2 font-bold text-black border border-zinc-200">{team.name}</td>
                      <td className="p-2 border border-zinc-200">{team.competitionTitle}</td>
                      <td className="p-2 border border-zinc-200">{team.captainName} ({team.captainEmail})</td>
                      <td className="p-2 font-mono font-black text-black bg-zinc-100 border border-zinc-200">{team.code}</td>
                      <td className="p-2 border border-zinc-200">{team.members.length} / {team.maxMembers}</td>
                      <td className="p-2 border border-zinc-200">
                        {team.projectRepo ? (
                          <a href={team.projectRepo} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 font-bold">
                            View <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-zinc-400 italic">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. COMPETITIONS */}
      {activeTab === 'competitions' && (
        <div className="space-y-8">
          {/* Create New Competition Card */}
          <form onSubmit={handleCreateComp} className="bg-white comic-border p-6 space-y-4">
            <div className="border-b-2 border-black pb-2 flex items-center justify-between">
              <h3 className="font-headline text-3xl text-black flex items-center gap-2">
                <Plus className="w-6 h-6 text-[#FF6FB5]" />
                COMMISSION NEW COMPETITION TRACK
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Track Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MAINFRAME ASSAULT"
                  value={newCompTitle}
                  onChange={e => setNewCompTitle(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Zero-Day Hardware Exploits"
                  value={newCompSubtitle}
                  onChange={e => setNewCompSubtitle(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Category Track *</label>
                <select
                  value={newCompTrack}
                  onChange={e => setNewCompTrack(e.target.value as any)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs font-bold"
                >
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Game Dev">Game Dev</option>
                  <option value="Web3 & Decentralization">Web3 & Decentralization</option>
                  <option value="Open Innovation">Open Innovation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Prize Bounty Label</label>
                <input
                  type="text"
                  placeholder="e.g. $80,000 Bounty Pool"
                  value={newCompPrize}
                  onChange={e => setNewCompPrize(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Prize Numerical ($)</label>
                <input
                  type="number"
                  placeholder="80000"
                  value={newCompPrizeAmount}
                  onChange={e => setNewCompPrizeAmount(Number(e.target.value))}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Team Size Cap</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={newCompTeamSize}
                  onChange={e => setNewCompTeamSize(Number(e.target.value))}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Mission Briefing Description *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe the competition challenges, expected deliverables, and sandbox parameters..."
                value={newCompDesc}
                onChange={e => setNewCompDesc(e.target.value)}
                className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="bg-[#FF6FB5] hover:bg-[#00E5FF] hover:text-black text-white font-headline text-2xl px-6 py-2 comic-border-sm comic-interactive flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>PUBLISH TRACK DIRECTIVE</span>
            </button>
          </form>

          {/* List of Existing Tracks with Edit/Delete/Toggle Featured */}
          <div className="space-y-4">
            <h4 className="font-headline text-3xl text-black">ACTIVE COMPETITION DIRECTIVES ({competitions.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competitions.map(comp => (
                <div key={comp.id} className="bg-white comic-border p-4 flex flex-col justify-between space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="bg-black text-[#00E5FF] px-2 py-0.2 text-[10px] font-bold uppercase">
                        {comp.track}
                      </span>
                      <h5 className="font-headline text-2xl text-black mt-1">{comp.title}</h5>
                      <span className="text-xs text-zinc-500 font-medium">{comp.subtitle}</span>
                    </div>

                    <button
                      onClick={() => updateCompetition(comp.id, { featured: !comp.featured })}
                      className={`p-1.5 border-2 border-black cursor-pointer ${
                        comp.featured ? 'bg-[#FFD54F] text-black' : 'bg-zinc-100 text-zinc-400'
                      }`}
                      title={comp.featured ? 'Featured on Homepage' : 'Mark as Featured'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-2">{comp.description}</p>

                  <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                    <span className="font-headline text-xl text-[#FF6FB5]">{comp.prize}</span>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete track "${comp.title}"?`)) {
                          deleteCompetition(comp.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-8">
          {/* Add Timeline Event */}
          <form onSubmit={handleCreateTimeline} className="bg-white comic-border p-6 space-y-4">
            <h3 className="font-headline text-3xl text-black flex items-center gap-2">
              <Plus className="w-6 h-6 text-[#00E5FF]" />
              LOG NEW MISSION MILESTONE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CYBER HEIST QUALIFIERS"
                  value={newTimeTitle}
                  onChange={e => setNewTimeTitle(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Date *</label>
                <input
                  type="text"
                  placeholder="May 16, 2025"
                  value={newTimeDate}
                  onChange={e => setNewTimeDate(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Time *</label>
                <input
                  type="text"
                  placeholder="11:00 AM"
                  value={newTimeTime}
                  onChange={e => setNewTimeTime(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Festival Day</label>
                <select
                  value={newTimeDay}
                  onChange={e => setNewTimeDay(e.target.value as any)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                >
                  <option value="Day 1">Day 1</option>
                  <option value="Day 2">Day 2</option>
                  <option value="Day 3">Day 3</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Sector Venue Location</label>
                <input
                  type="text"
                  placeholder="The Data Vault (Lab B)"
                  value={newTimeLocation}
                  onChange={e => setNewTimeLocation(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Initial Status</label>
                <select
                  value={newTimeStatus}
                  onChange={e => setNewTimeStatus(e.target.value as any)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                >
                  <option value="upcoming">Upcoming (Standby)</option>
                  <option value="ongoing">Ongoing (In Progress)</option>
                  <option value="past">Past (Mission Passed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Stamp Stamp Label</label>
                <select
                  value={newTimeStatusLabel}
                  onChange={e => setNewTimeStatusLabel(e.target.value as any)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                >
                  <option value="STANDBY">STANDBY</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="MISSION PASSED">MISSION PASSED</option>
                  <option value="FINAL DIRECTIVE">FINAL DIRECTIVE</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Milestone Description *</label>
              <textarea
                required
                rows={2}
                placeholder="What occurs during this milestone..."
                value={newTimeDesc}
                onChange={e => setNewTimeDesc(e.target.value)}
                className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="bg-[#00E5FF] hover:bg-black hover:text-white text-black font-headline text-2xl px-6 py-2 comic-border-sm comic-interactive flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>COMMIT MILESTONE TO TIMELINE</span>
            </button>
          </form>

          {/* Existing Milestones List */}
          <div className="space-y-3">
            <h4 className="font-headline text-3xl text-black">TIMELINE RECON LOGS ({timeline.length})</h4>
            {timeline.map(event => (
              <div key={event.id} className="bg-white comic-border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-black text-[#00E5FF] text-[10px] font-bold px-2 py-0.5">{event.time}</span>
                    <span className="text-xs font-bold text-zinc-500">{event.date} ({event.day})</span>
                    <span className="text-xs text-zinc-700 font-bold">• {event.location}</span>
                  </div>
                  <h5 className="font-headline text-2xl text-black">{event.title}</h5>
                  <p className="text-xs text-zinc-600">{event.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Status Toggle Switch */}
                  <select
                    value={event.status}
                    onChange={e => {
                      const newStat = e.target.value as TimelineEvent['status'];
                      const newLabel =
                        newStat === 'past'
                          ? 'MISSION PASSED'
                          : newStat === 'ongoing'
                          ? 'IN PROGRESS'
                          : 'STANDBY';
                      updateTimelineEvent(event.id, { status: newStat, statusLabel: newLabel });
                    }}
                    className="bg-[#FFF5F0] border-2 border-black text-xs font-bold p-1.5 uppercase"
                  >
                    <option value="past">MISSION PASSED</option>
                    <option value="ongoing">IN PROGRESS</option>
                    <option value="upcoming">STANDBY</option>
                  </select>

                  <button
                    onClick={() => deleteTimelineEvent(event.id)}
                    className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                    title="Delete milestone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. SQUADS & TEAMS */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          <div className="bg-white comic-border p-6">
            <h3 className="font-headline text-3xl text-black mb-3">ALL REGISTERED SQUADS ({teams.length})</h3>
            <div className="space-y-4">
              {teams.map(team => (
                <div key={team.id} className="bg-[#FFF5F0] border-2 border-black p-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black pb-2">
                    <div>
                      <h4 className="font-headline text-2xl text-black">{team.name}</h4>
                      <span className="text-xs font-bold text-zinc-600">Track: {team.competitionTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-black text-[#00E5FF] px-2 py-0.5 font-mono text-sm font-black">
                        CODE: {team.code}
                      </span>
                      <span className="bg-white border border-black text-xs font-bold px-2 py-0.5">
                        {team.members.length} / {team.maxMembers} Members
                      </span>
                    </div>
                  </div>

                  {/* Members list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                    {team.members.map((m, idx) => (
                      <div key={idx} className="bg-white border border-black p-2">
                        <div className="font-bold text-black">{m.displayName}</div>
                        <div className="text-[10px] text-zinc-500">{m.email}</div>
                        <span className="text-[9px] bg-black text-white px-1 uppercase">{m.role}</span>
                      </div>
                    ))}
                  </div>

                  {/* Submission link */}
                  {team.projectRepo && (
                    <div className="bg-white border border-black p-2 text-xs flex items-center justify-between">
                      <span className="font-bold text-black">Project: {team.projectTitle}</span>
                      <a href={team.projectRepo} target="_blank" rel="noreferrer" className="text-blue-700 font-bold hover:underline flex items-center gap-1">
                        {team.projectRepo} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. PRIZES */}
      {activeTab === 'prizes' && (
        <div className="space-y-6">
          <form onSubmit={handleCreatePrize} className="bg-white comic-border p-6 space-y-4">
            <h3 className="font-headline text-3xl text-black flex items-center gap-2">
              <Plus className="w-6 h-6 text-[#FFD54F]" />
              POST NEW CATEGORY BOUNTY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Bounty Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ZERO-DAY HUNTER"
                  value={newPrizeTitle}
                  onChange={e => setNewPrizeTitle(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Most Critical Exploit Defense"
                  value={newPrizeSubtitle}
                  onChange={e => setNewPrizeSubtitle(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Payout Amount</label>
                <input
                  type="text"
                  placeholder="e.g. $25k"
                  value={newPrizeAmount}
                  onChange={e => setNewPrizeAmount(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs font-bold text-[#FF6FB5]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Criteria Description *</label>
              <textarea
                required
                rows={2}
                placeholder="Explain the technical evaluation requirements to unlock this bounty..."
                value={newPrizeDesc}
                onChange={e => setNewPrizeDesc(e.target.value)}
                className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
              />
            </div>
            <button
              type="submit"
              className="bg-[#FFD54F] hover:bg-black hover:text-white text-black font-headline text-2xl px-6 py-2 comic-border-sm cursor-pointer"
            >
              POST BOUNTY TO ESCROW
            </button>
          </form>

          {/* List of Category Bounties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prizes.map(p => (
              <div key={p.id} className="bg-white comic-border p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-headline text-2xl text-black">{p.title}</h5>
                    <span className="font-headline text-2xl text-[#00E5FF]">{p.amount}</span>
                  </div>
                  <span className="font-marker text-xs text-[#FF6FB5] block mb-2">{p.subtitle}</span>
                  <p className="text-xs text-zinc-600">{p.description}</p>
                </div>

                <div className="pt-2 mt-3 border-t border-zinc-200 flex justify-end">
                  <button
                    onClick={() => deletePrizeCategory(p.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Bounty
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 6. FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateFAQ} className="bg-white comic-border p-6 space-y-4">
            <h3 className="font-headline text-3xl text-black flex items-center gap-2">
              <Plus className="w-6 h-6 text-[#FF6FB5]" />
              ADD OPERATIONAL PROTOCOL / FAQ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Protocol / Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WHAT ARE THE POWER BANK AND CABLE REQUIREMENTS?"
                  value={newFaqQuestion}
                  onChange={e => setNewFaqQuestion(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Category</label>
                <select
                  value={newFaqCategory}
                  onChange={e => setNewFaqCategory(e.target.value as any)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs font-bold"
                >
                  <option value="Registration">Registration</option>
                  <option value="Rules & Loadout">Rules & Loadout</option>
                  <option value="Accommodations">Accommodations</option>
                  <option value="Prizes & Crypto">Prizes & Crypto</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">Official Protocol Directive / Answer *</label>
              <textarea
                required
                rows={3}
                placeholder="Full answer and directives..."
                value={newFaqAnswer}
                onChange={e => setNewFaqAnswer(e.target.value)}
                className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-xs"
              />
            </div>
            <button
              type="submit"
              className="bg-[#FF6FB5] text-white hover:bg-black font-headline text-2xl px-6 py-2 comic-border-sm cursor-pointer"
            >
              ENCODE PROTOCOL
            </button>
          </form>

          {/* FAQ List */}
          <div className="space-y-3">
            {faqs.map(f => (
              <div key={f.id} className="bg-white comic-border p-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#FF6FB5] uppercase">{f.category}</span>
                  <h5 className="font-headline text-2xl text-black">{f.question}</h5>
                  <p className="text-xs text-zinc-600">{f.answer}</p>
                </div>
                <button
                  onClick={() => deleteFAQ(f.id)}
                  className="text-red-600 hover:text-red-800 p-1 cursor-pointer shrink-0"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 7. DISPATCH MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="bg-white comic-border p-6">
            <h3 className="font-headline text-3xl text-black mb-3 flex items-center gap-2">
              <Radio className="w-6 h-6 text-[#FF6FB5]" />
              INCOMING FIXER DISPATCHES ({messages.length})
            </h3>

            {messages.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No incoming transmissions recorded.</p>
            ) : (
              <div className="space-y-3">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`border-2 border-black p-4 space-y-2 ${
                      msg.status === 'unread' ? 'bg-amber-50' : 'bg-white opacity-80'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-300 pb-1.5">
                      <div>
                        <span className="font-bold text-sm text-black">{msg.name}</span>
                        {msg.codename && (
                          <span className="text-xs text-[#FF6FB5] font-marker ml-2">"{msg.codename}"</span>
                        )}
                        <span className="text-xs text-zinc-500 ml-2">({msg.email})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase font-bold">
                          {msg.topic}
                        </span>
                        <span className="text-[10px] text-zinc-500">{msg.createdAt}</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-800 font-medium leading-relaxed">{msg.message}</p>

                    <div className="flex justify-end pt-1">
                      {msg.status === 'unread' ? (
                        <button
                          onClick={() => resolveMessage(msg.id)}
                          className="bg-[#00E5FF] hover:bg-black hover:text-white text-black text-xs font-bold px-3 py-1 border border-black flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark as Radio Resolved
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
