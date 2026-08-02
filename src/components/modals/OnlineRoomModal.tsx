import React, { useState } from 'react';
import { Globe, Copy, Check, X, PlusCircle, LogIn } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface OnlineRoomModalProps {
  onCreateRoom: () => void;
  onJoinRoom: (code: string) => void;
  onClose: () => void;
  roomCode?: string | null;
}

export const OnlineRoomModal: React.FC<OnlineRoomModalProps> = ({
  onCreateRoom,
  onJoinRoom,
  onClose,
  roomCode
}) => {
  const [inputCode, setInputCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card"
        style={{
          width: '90%',
          maxWidth: '420px',
          padding: '1.8rem 1.4rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={24} /> Online Room Duel 🌸
        </div>

        {/* If room code generated */}
        {roomCode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Share this 6-char Room Code with your friend:</div>
            <div
              style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
                color: 'var(--accent)',
                background: 'var(--bg-secondary)',
                padding: '0.8rem',
                borderRadius: '14px',
                fontFamily: 'monospace'
              }}
            >
              {roomCode}
            </div>
            <button className="bunny-btn" onClick={handleCopyCode}>
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Waiting for player 2 to join... ✨
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
            
            {/* Create Room */}
            <button
              className="bunny-btn"
              style={{ width: '100%', padding: '0.85rem' }}
              onClick={() => { audioService.playClick(); onCreateRoom(); }}
            >
              <PlusCircle size={18} /> Create Room Code
            </button>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              — OR JOIN WITH CODE —
            </div>

            {/* Join Room */}
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
              <input
                type="text"
                placeholder="6-char code"
                value={inputCode}
                maxLength={6}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.8rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  textAlign: 'center',
                  letterSpacing: '0.12em',
                  outline: 'none'
                }}
              />
              <button
                className="bunny-btn bunny-btn-secondary"
                disabled={inputCode.length !== 6}
                style={{ opacity: inputCode.length === 6 ? 1 : 0.4 }}
                onClick={() => {
                  if (inputCode.length === 6) {
                    audioService.playClick();
                    onJoinRoom(inputCode);
                  }
                }}
              >
                <LogIn size={16} /> Join
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
