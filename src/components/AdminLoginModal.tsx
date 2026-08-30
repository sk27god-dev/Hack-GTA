import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { playClickSound } from '../utils/audio';
import { Shield, Lock, User as UserIcon, X, ArrowRight, Eye, EyeOff, AlertTriangle, Key } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { loginAdmin } = useAuth();
  const [adminId, setAdminId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !passcode.trim()) {
      setError('Please enter both Admin ID and Passcode.');
      return;
    }

    setError('');
    setLoading(true);

    const result = await loginAdmin(adminId, passcode);
    setLoading(false);

    if (result.success) {
      onClose();
      if (onSuccess) onSuccess();
    } else {
      setError(result.message || 'Access Denied: Invalid root credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="admin-login-modal-container"
        className="bg-[#18181F] text-white comic-border-xl w-full max-w-md relative overflow-hidden shadow-[0px_0px_35px_rgba(255,0,85,0.4)]"
      >
        {/* Header Ribbon */}
        <div className="bg-red-600 text-white px-4 py-3 border-b-4 border-black flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 animate-pulse" />
            <div>
              <h3 className="font-headline text-lg sm:text-2xl tracking-wider text-white truncate leading-none">
                ADMIN GATEWAY // ROOT ACCESS
              </h3>
              <span className="text-[10px] font-bold text-red-100 uppercase tracking-widest">
                Triple-Tap Security Bypass Activated
              </span>
            </div>
          </div>
          <button
            id="close-admin-login-modal-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-white hover:text-black p-1 cursor-pointer shrink-0 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Warning Banner */}
          <div className="bg-red-950/60 border-2 border-red-500/80 p-3 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300">
              <span className="font-bold text-red-400 uppercase tracking-wider block">
                Restricted Mission Control Area
              </span>
              Authenticate with your administrative credentials to unlock full festival operations, squad audits, and broadcast controls.
            </div>
          </div>

          {error && (
            <div className="bg-red-500 text-white px-3 py-2 text-xs font-bold border-2 border-black flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                Admin Clearance ID
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  id="admin-id-input"
                  type="text"
                  required
                  value={adminId}
                  onChange={e => setAdminId(e.target.value)}
                  placeholder="Enter ID"
                  className="w-full bg-[#242430] text-white border-2 border-zinc-700 pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_10px_rgba(0,229,255,0.4)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                Security Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  placeholder=""
                  className="w-full bg-[#242430] text-white border-2 border-zinc-700 pl-9 pr-10 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#FF6FB5] focus:shadow-[0_0_10px_rgba(255,111,181,0.4)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>



            <button
              id="admin-submit-auth-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-[#00E5FF] hover:text-black text-white font-headline text-xl sm:text-2xl py-2.5 comic-border-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 shadow-[3px_3px_0px_#000]"
            >
              {loading ? (
                <span>DECRYPTING CLEARANCE...</span>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>AUTHORIZE ROOT ADMIN ACCESS</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
