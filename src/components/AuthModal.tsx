import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { playClickSound } from '../utils/audio';
import { X, Shield, Lock, Mail, User as UserIcon, Building, Phone, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, signup, switchUserPersona, publicPersonas } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'quick'>('signin');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [college, setCollege] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your Syndicate Email.');
      return;
    }
    setError('');
    const success = await login(email, 'user');
    if (success) {
      onClose();
      if (onSuccess) onSuccess();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !displayName) {
      setError('Email and Codename are mandatory.');
      return;
    }
    setError('');
    const success = await signup({
      email,
      displayName,
      college: college || 'Vice City Tech',
      phone: phone || '+1 (305) 555-0100',
      role: 'user'
    });
    if (success) {
      onClose();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div
        id="auth-modal-container"
        className="bg-[#FFF5F0] comic-border-xl w-full max-w-md max-h-[92vh] flex flex-col relative overflow-hidden"
      >
        {/* Header Ribbon */}
        <div className="bg-black text-white px-3.5 sm:px-5 py-2.5 sm:py-3 border-b-4 border-black flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6FB5] shrink-0" />
            <h3 className="font-headline text-lg sm:text-2xl tracking-wider text-white truncate">
              {mode === 'signin'
                ? 'SYNDICATE CLEARANCE'
                : mode === 'signup'
                ? 'ENLIST NEW RUNNER'
                : 'SELECT RUNNER'}
            </h3>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-white hover:text-[#FF6FB5] p-1 cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b-2 border-black bg-white shrink-0">
          <button
            id="tab-signin-btn"
            onClick={() => {
              playClickSound();
              setMode('signin');
            }}
            className={`flex-1 py-2 sm:py-2.5 font-headline text-sm sm:text-lg text-center cursor-pointer ${
              mode === 'signin'
                ? 'bg-[#FF6FB5] text-white border-r-2 border-black font-black'
                : 'text-black hover:bg-zinc-100 border-r-2 border-black'
            }`}
          >
            SIGN IN
          </button>
          <button
            id="tab-signup-btn"
            onClick={() => {
              playClickSound();
              setMode('signup');
            }}
            className={`flex-1 py-2 sm:py-2.5 font-headline text-sm sm:text-lg text-center cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#FF6FB5] text-white border-r-2 border-black font-black'
                : 'text-black hover:bg-zinc-100 border-r-2 border-black'
            }`}
          >
            REGISTER ID
          </button>
          <button
            id="tab-quick-btn"
            onClick={() => {
              playClickSound();
              setMode('quick');
            }}
            className={`flex-1 py-2 sm:py-2.5 font-headline text-sm sm:text-lg text-center cursor-pointer ${
              mode === 'quick'
                ? 'bg-[#FF6FB5] text-white font-black'
                : 'text-black hover:bg-zinc-100'
            }`}
          >
            RUNNERS
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 bg-red-100 border-2 border-red-600 text-red-700 px-3 py-2 text-xs font-bold">
              {error}
            </div>
          )}

          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Syndicate Email or Handle
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    id="signin-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g., runner@vice.city"
                    className="w-full bg-white border-2 border-black pl-9 sm:pl-10 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:bg-amber-50 focus:shadow-[3px_3px_0px_0px_#000]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Security Passcode
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    id="signin-password-input"
                    type="password"
                    placeholder="••••••••••••"
                    defaultValue="vicecity2025"
                    className="w-full bg-white border-2 border-black pl-9 sm:pl-10 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:bg-amber-50 focus:shadow-[3px_3px_0px_0px_#000]"
                  />
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 font-semibold">
                  * Participant authentication enabled. Enter your email to access your squad roster.
                </p>
              </div>

              <button
                id="signin-submit-btn"
                type="submit"
                className="w-full bg-[#00E5FF] hover:bg-[#FFD54F] text-black font-headline text-xl sm:text-2xl py-2.5 comic-border-sm comic-interactive flex items-center justify-center gap-2 cursor-pointer mt-3 sm:mt-4"
              >
                <span>ACCESS GRID</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-2.5 sm:space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-0.5">
                  Codename / Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    id="signup-name-input"
                    type="text"
                    required
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-white border-2 border-black pl-9 pr-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:shadow-[2px_2px_0px_#000]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-0.5">
                  Syndicate Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    id="signup-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@vice.edu"
                    className="w-full bg-white border-2 border-black pl-9 pr-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:shadow-[2px_2px_0px_#000]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-0.5">
                    College / Campus
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-2.5 top-2.5 text-zinc-500" />
                    <input
                      id="signup-college-input"
                      type="text"
                      value={college}
                      onChange={e => setCollege(e.target.value)}
                      placeholder="Vice Polytech"
                      className="w-full bg-white border-2 border-black pl-8 pr-2 py-1.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-0.5">
                    Comms / Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-2.5 top-2.5 text-zinc-500" />
                    <input
                      id="signup-phone-input"
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (305) 555-0199"
                      className="w-full bg-white border-2 border-black pl-8 pr-2 py-1.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-100 p-2 border border-zinc-300 text-[11px] text-zinc-600">
                <span className="font-bold text-black uppercase">Standard Participant Persona:</span> All enlistments receive full participant privileges to deploy squads and submit project builds.
              </div>

              <button
                id="signup-submit-btn"
                type="submit"
                className="w-full bg-[#FF6FB5] hover:bg-[#FFD54F] text-white hover:text-black font-headline text-xl sm:text-2xl py-2 comic-border-sm comic-interactive flex items-center justify-center gap-2 cursor-pointer mt-2 sm:mt-3"
              >
                <span>ESTABLISH ID</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          )}

          {mode === 'quick' && (
            <div className="space-y-2 sm:space-y-2.5">
              <p className="text-xs text-zinc-600 font-semibold mb-2">
                Select a participant runner persona to test squad features:
              </p>
              {publicPersonas.map(user => (
                <button
                  key={user.uid}
                  id={`select-persona-btn-${user.uid}`}
                  onClick={() => {
                    switchUserPersona(user.uid);
                    onClose();
                    if (onSuccess) onSuccess();
                  }}
                  className="w-full text-left p-2 sm:p-2.5 bg-white border-2 border-black hover:bg-[#FFD54F] hover:shadow-[3px_3px_0px_#000] transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-xs sm:text-sm text-black flex items-center gap-1.5 truncate">
                      <span>{user.displayName}</span>
                      <span className="text-[10px] text-zinc-500 truncate hidden xs:inline">({user.email})</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-zinc-600 truncate">{user.college}</div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border border-black font-bold uppercase shrink-0 bg-emerald-300 text-black">
                    RUNNER
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

