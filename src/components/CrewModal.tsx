import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { playClickSound } from '../utils/audio';
import {
  X,
  Users,
  Plus,
  Key,
  Copy,
  Check,
  LogOut,
  Upload,
  Crown,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCompetitionId?: string;
}

export const CrewModal: React.FC<CrewModalProps> = ({
  isOpen,
  onClose,
  defaultCompetitionId
}) => {
  const { currentUser } = useAuth();
  const {
    teams,
    competitions,
    createTeam,
    joinTeamByCode,
    leaveTeam,
    updateTeamProject
  } = useApp();

  const [activeTab, setActiveTab] = useState<'my-crews' | 'create' | 'join'>('my-crews');
  const [teamName, setTeamName] = useState('');
  const [selectedCompId, setSelectedCompId] = useState(
    defaultCompetitionId || competitions[0]?.id || ''
  );
  const [joinCode, setJoinCode] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState('');

  // Project payload submission
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectRepo, setProjectRepo] = useState('');

  if (!isOpen) return null;

  const myTeams = currentUser
    ? teams.filter(t => t.members.some(m => m.uid === currentUser.uid))
    : [];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!teamName.trim()) return;

    createTeam(
      selectedCompId,
      teamName.trim(),
      currentUser.uid,
      currentUser.displayName,
      currentUser.email,
      currentUser.college
    );
    setTeamName('');
    setActiveTab('my-crews');
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!joinCode.trim()) {
      setJoinError('Please enter a 6-character Syndicate code.');
      return;
    }

    setJoinError('');
    setJoinSuccess('');
    const res = joinTeamByCode(
      joinCode.trim(),
      currentUser.uid,
      currentUser.displayName,
      currentUser.email,
      currentUser.college
    );

    if (res.success) {
      setJoinSuccess(res.message);
      setJoinCode('');
      setTimeout(() => {
        setActiveTab('my-crews');
        setJoinSuccess('');
      }, 1200);
    } else {
      setJoinError(res.message);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSaveProject = (teamId: string) => {
    if (!projectTitle.trim() || !projectRepo.trim()) return;
    updateTeamProject(teamId, projectTitle.trim(), projectRepo.trim());
    setEditingTeamId(null);
    setProjectTitle('');
    setProjectRepo('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div
        id="crew-modal-container"
        className="bg-[#FFF5F0] comic-border-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-black text-white px-3.5 sm:px-5 py-2.5 sm:py-3 border-b-4 border-black flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E5FF] shrink-0" />
            <h3 className="font-headline text-lg sm:text-3xl tracking-wider text-white truncate">
              CREW HQ & SQUAD COMMAND
            </h3>
          </div>
          <button
            id="close-crew-modal-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-white hover:text-[#00E5FF] p-1 cursor-pointer shrink-0"
            aria-label="Close crew hub"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b-2 border-black bg-white">
          <button
            id="crew-tab-my"
            onClick={() => {
              playClickSound();
              setActiveTab('my-crews');
            }}
            className={`flex-1 py-1.5 sm:py-2 font-headline text-xs xs:text-sm sm:text-lg text-center cursor-pointer border-r-2 border-black truncate px-1 ${
              activeTab === 'my-crews'
                ? 'bg-[#00E5FF] text-black font-black'
                : 'text-black hover:bg-zinc-100'
            }`}
          >
            MY SQUADS ({myTeams.length})
          </button>
          <button
            id="crew-tab-create"
            onClick={() => {
              playClickSound();
              setActiveTab('create');
            }}
            className={`flex-1 py-1.5 sm:py-2 font-headline text-xs xs:text-sm sm:text-lg text-center cursor-pointer border-r-2 border-black flex items-center justify-center gap-1 truncate px-1 ${
              activeTab === 'create'
                ? 'bg-[#FF6FB5] text-white font-black'
                : 'text-black hover:bg-zinc-100'
            }`}
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>CREATE</span>
          </button>
          <button
            id="crew-tab-join"
            onClick={() => {
              playClickSound();
              setActiveTab('join');
            }}
            className={`flex-1 py-1.5 sm:py-2 font-headline text-xs xs:text-sm sm:text-lg text-center cursor-pointer flex items-center justify-center gap-1 truncate px-1 ${
              activeTab === 'join'
                ? 'bg-[#FFD54F] text-black font-black'
                : 'text-black hover:bg-zinc-100'
            }`}
          >
            <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>JOIN CODE</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'my-crews' && (
            <div>
              {myTeams.length === 0 ? (
                <div className="text-center py-8 bg-white border-2 border-black p-6">
                  <div className="w-16 h-16 bg-[#FFF5F0] comic-border-sm mx-auto flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 text-[#FF6FB5]" />
                  </div>
                  <h4 className="font-headline text-2xl text-black">NO ACTIVE CREWS REGISTERED</h4>
                  <p className="text-xs text-zinc-600 max-w-md mx-auto mt-1 mb-4">
                    You haven't formed or joined a heist crew yet. Assemble your squad or enter an invite code to begin the hackathon gauntlet.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      id="empty-create-crew-btn"
                      onClick={() => setActiveTab('create')}
                      className="bg-[#FF6FB5] text-white font-headline text-lg px-4 py-1.5 comic-border-sm hover:bg-[#FFD54F] hover:text-black cursor-pointer"
                    >
                      CREATE SQUAD
                    </button>
                    <button
                      id="empty-join-crew-btn"
                      onClick={() => setActiveTab('join')}
                      className="bg-[#00E5FF] text-black font-headline text-lg px-4 py-1.5 comic-border-sm hover:bg-[#FFD54F] cursor-pointer"
                    >
                      ENTER CODE
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {myTeams.map(team => {
                    const isCaptain = team.captainId === currentUser?.uid;
                    const comp = competitions.find(c => c.id === team.competitionId);

                    return (
                      <div
                        key={team.id}
                        id={`team-card-${team.id}`}
                        className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000000] relative"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b-2 border-black pb-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-headline text-2xl sm:text-3xl text-black">
                                {team.name}
                              </h4>
                              {isCaptain && (
                                <span className="bg-[#FF6FB5] text-white text-[10px] font-bold px-2 py-0.5 border border-black flex items-center gap-1">
                                  <Crown className="w-3 h-3" /> CAPTAIN
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-bold text-zinc-600">
                              Target Track:{' '}
                              <span className="text-[#FF6FB5] uppercase font-headline text-sm">
                                {comp?.title || team.competitionTitle}
                              </span>
                            </p>
                          </div>

                          {/* Invite Code Badge */}
                          <div className="flex items-center gap-2 bg-[#FFF5F0] border-2 border-black px-2.5 py-1">
                            <div>
                              <span className="block text-[9px] font-bold text-zinc-500 uppercase">
                                Syndicate Code
                              </span>
                              <span className="font-mono font-black text-base tracking-widest text-black">
                                {team.code}
                              </span>
                            </div>
                            <button
                              id={`copy-code-btn-${team.id}`}
                              onClick={() => handleCopyCode(team.code)}
                              className="bg-black text-[#00E5FF] p-1.5 hover:bg-[#00E5FF] hover:text-black transition-colors cursor-pointer border border-black"
                              title="Copy code to clipboard"
                            >
                              {copiedCode === team.code ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Members Roster */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs font-bold uppercase text-zinc-600 mb-1.5">
                            <span>
                              Crew Roster ({team.members.length}/{team.maxMembers})
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 font-bold uppercase border border-black ${
                                team.members.length >= team.maxMembers
                                  ? 'bg-emerald-300 text-black'
                                  : 'bg-[#FFD54F] text-black'
                              }`}
                            >
                              {team.members.length >= team.maxMembers ? 'FULL SQUAD' : 'RECRUITING'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {team.members.map((member, idx) => (
                              <div
                                key={member.uid || idx}
                                className="bg-[#FFF5F0] border border-black p-2 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <div className="font-bold text-black flex items-center gap-1">
                                    {member.displayName}
                                    {member.role === 'captain' && (
                                      <Crown className="w-3 h-3 text-[#FF6FB5]" />
                                    )}
                                  </div>
                                  <div className="text-[10px] text-zinc-500">{member.college}</div>
                                </div>
                                <span className="text-[9px] bg-black text-white px-1.5 py-0.5 uppercase">
                                  {member.role}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Project Submission Link (Payload) */}
                        <div className="bg-amber-50 border-2 border-black p-3 mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-headline text-base text-black flex items-center gap-1">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              MISSION PAYLOAD (SUBMISSION)
                            </span>
                            {team.projectRepo && (
                              <a
                                href={team.projectRepo}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                              >
                                Repo <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          {editingTeamId === team.id ? (
                            <div className="space-y-2 mt-2">
                              <input
                                type="text"
                                placeholder="Project Title (e.g. Vice Payday Vault)"
                                value={projectTitle}
                                onChange={e => setProjectTitle(e.target.value)}
                                className="w-full bg-white border border-black p-1.5 text-xs font-medium"
                              />
                              <input
                                type="url"
                                placeholder="GitHub / Deployment URL"
                                value={projectRepo}
                                onChange={e => setProjectRepo(e.target.value)}
                                className="w-full bg-white border border-black p-1.5 text-xs font-medium"
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setEditingTeamId(null)}
                                  className="text-xs bg-zinc-200 px-2 py-1 border border-black"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveProject(team.id)}
                                  className="text-xs bg-[#FF6FB5] text-white font-bold px-3 py-1 border border-black hover:bg-black"
                                >
                                  Save Payload
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="text-xs">
                                {team.projectTitle ? (
                                  <div>
                                    <span className="font-bold text-black">{team.projectTitle}</span>
                                    <span className="text-[10px] text-zinc-500 block truncate max-w-xs">
                                      {team.projectRepo}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-zinc-500 italic">No repo submitted yet</span>
                                )}
                              </div>
                              <button
                                id={`edit-payload-btn-${team.id}`}
                                onClick={() => {
                                  setEditingTeamId(team.id);
                                  setProjectTitle(team.projectTitle || '');
                                  setProjectRepo(team.projectRepo || '');
                                }}
                                className="bg-[#FFD54F] text-black text-xs font-bold px-2.5 py-1 border border-black hover:bg-black hover:text-white flex items-center gap-1 cursor-pointer"
                              >
                                <Upload className="w-3 h-3" />
                                {team.projectRepo ? 'Update' : 'Submit Payload'}
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Leave Crew button */}
                        <div className="flex justify-end">
                          <button
                            id={`leave-team-btn-${team.id}`}
                            onClick={() => currentUser && leaveTeam(team.id, currentUser.uid)}
                            className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Leave Squad
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'create' && (
            <form onSubmit={handleCreate} className="space-y-4 bg-white border-2 border-black p-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Syndicate Squad Name *
                </label>
                <input
                  id="create-team-name-input"
                  type="text"
                  required
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  placeholder="e.g. Starfish Hackers, Vice Neon Cyber"
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-sm focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_#000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Select Competition Track *
                </label>
                <select
                  id="create-team-comp-select"
                  value={selectedCompId}
                  onChange={e => setSelectedCompId(e.target.value)}
                  className="w-full bg-[#FFF5F0] border-2 border-black p-2 text-sm focus:outline-none"
                >
                  {competitions.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} — ({c.track} | Max {c.teamSize} Runners)
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-amber-50 border border-black p-2.5 text-xs text-zinc-700">
                <p className="font-bold text-black mb-0.5">Captain Mandate:</p>
                As the founding captain, you will be assigned an exclusive 6-character syndicate code to recruit other college runners.
              </div>

              <button
                id="submit-create-team-btn"
                type="submit"
                className="w-full bg-[#FF6FB5] hover:bg-[#FFD54F] text-white hover:text-black font-headline text-2xl py-2.5 comic-border-sm comic-interactive flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>COMMISSION SQUAD</span>
              </button>
            </form>
          )}

          {activeTab === 'join' && (
            <form onSubmit={handleJoin} className="space-y-4 bg-white border-2 border-black p-4">
              {joinError && (
                <div className="bg-red-100 border-2 border-red-600 text-red-700 px-3 py-2 text-xs font-bold">
                  {joinError}
                </div>
              )}
              {joinSuccess && (
                <div className="bg-emerald-100 border-2 border-emerald-600 text-emerald-800 px-3 py-2 text-xs font-bold">
                  {joinSuccess}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Enter 6-Character Syndicate Invite Code *
                </label>
                <input
                  id="join-team-code-input"
                  type="text"
                  required
                  maxLength={10}
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="e.g. VICE99 or CORTEZ"
                  className="w-full bg-[#FFF5F0] border-2 border-black p-3 text-center font-mono font-black text-2xl tracking-widest uppercase focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#000]"
                />
              </div>

              <p className="text-xs text-zinc-600">
                Obtain this code from your squad captain. Once verified, you will immediately gain clearance to the squad roster and project submission terminal.
              </p>

              <button
                id="submit-join-team-btn"
                type="submit"
                className="w-full bg-[#00E5FF] hover:bg-[#FFD54F] text-black font-headline text-2xl py-2.5 comic-border-sm comic-interactive flex items-center justify-center gap-2 cursor-pointer"
              >
                <Key className="w-5 h-5" />
                <span>INFILTRATE & JOIN</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
