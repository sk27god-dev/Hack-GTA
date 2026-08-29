import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { playClickSound } from '../utils/audio';
import { X, Send, Radio, MessageSquare, Terminal } from 'lucide-react';

interface FixerContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FixerContactModal: React.FC<FixerContactModalProps> = ({ isOpen, onClose }) => {
  const { sendContactMessage } = useApp();
  const { currentUser } = useAuth();

  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [codename, setCodename] = useState('');
  const [topic, setTopic] = useState('General Mission Query');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    sendContactMessage({
      name,
      email,
      codename: codename || 'Ghost Runner',
      topic,
      message
    });
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div
        id="fixer-modal-container"
        className="bg-[#FFF5F0] comic-border-xl w-full max-w-lg max-h-[92vh] flex flex-col relative overflow-hidden"
      >
        <div className="bg-black text-white px-3.5 sm:px-5 py-2.5 sm:py-3 border-b-4 border-black flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6FB5] animate-pulse shrink-0" />
            <h3 className="font-headline text-lg sm:text-2xl tracking-wider text-white truncate">
              DISPATCH FREQUENCY • ENCRYPTED
            </h3>
          </div>
          <button
            id="close-fixer-modal-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-white hover:text-[#FF6FB5] p-1 cursor-pointer shrink-0"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1">
          <div className="bg-amber-50 border-2 border-black p-2.5 sm:p-3 text-xs flex items-center gap-2">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />
            <span className="font-medium text-zinc-800 text-[11px] sm:text-xs">
              Direct line to Syndicate Fixers & Head Organizers. Expect radio response within 60 minutes.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Tommy Vercetti"
                className="w-full bg-white border-2 border-black p-2 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Codename / Handle
              </label>
              <input
                type="text"
                value={codename}
                onChange={e => setCodename(e.target.value)}
                placeholder="The Fixer"
                className="w-full bg-white border-2 border-black p-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Syndicate Comms Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tommy@vice.city"
              className="w-full bg-white border-2 border-black p-2 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Dispatch Channel / Topic
            </label>
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full bg-white border-2 border-black p-2 text-xs focus:outline-none"
            >
              <option value="General Mission Query">General Mission Query</option>
              <option value="Track Rules & Submissions">Track Rules & Submissions</option>
              <option value="Hardware / Network Drop Request">Hardware / Network Drop Request</option>
              <option value="Sponsorship & VIP Access">Sponsorship & VIP Access</option>
              <option value="Dispute & Appeal">Dispute & Appeal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
              Encrypted Transmission *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="State your operational inquiry or request with exact terminal details..."
              className="w-full bg-white border-2 border-black p-2 text-xs focus:outline-none focus:bg-amber-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6FB5] hover:bg-[#00E5FF] hover:text-black text-white font-headline text-xl sm:text-2xl py-2.5 comic-border-sm comic-interactive flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>TRANSMIT DISPATCH</span>
          </button>
        </form>
      </div>
    </div>
  );
};
