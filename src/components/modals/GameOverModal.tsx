import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Sparkles, X } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface GameOverModalProps {
  winner: 'w' | 'b' | 'draw' | null;
  reason: string;
  onNewGame: () => void;
  onReview: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  reason,
  onNewGame,
  onReview,
  onClose
}) => {
  useEffect(() => {
    if (winner === 'w' || winner === 'b') {
      audioService.playCheckmate();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF4FA3', '#FFC7E2', '#FFFFFF', '#FF7AC1']
        });
      } catch (e) {
        // ignore
      }
    }
  }, [winner]);

  const getTitle = () => {
    if (winner === 'draw') return 'Stalemate / Draw 🌸';
    return winner === 'w' ? 'White Bunny Wins! 👑' : 'Black Bunny Wins! 👑';
  };

  const handlePlayAgain = () => {
    audioService.playClick();
    onNewGame();
  };

  const handleReviewClick = () => {
    audioService.playClick();
    onReview();
  };

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card"
        style={{
          width: '90%',
          maxWidth: '400px',
          padding: '2rem 1.6rem',
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

        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <Trophy size={34} />
        </div>

        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
          {getTitle()}
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {reason || 'Game over! What a cute match 🌸'}
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', width: '100%', marginTop: '0.5rem' }}>
          <button
            className="bunny-btn"
            style={{ flex: 1 }}
            onClick={handlePlayAgain}
          >
            <RotateCcw size={16} /> Play Again
          </button>

          <button
            className="bunny-btn bunny-btn-secondary"
            style={{ flex: 1 }}
            onClick={handleReviewClick}
          >
            <Sparkles size={16} /> Game Review
          </button>
        </div>
      </div>
    </div>
  );
};
