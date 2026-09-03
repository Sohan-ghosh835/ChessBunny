import React, { useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Sparkles, X, Heart } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { getMatchQuotes } from '../../services/quoteService';

interface GameOverModalProps {
  winner: 'w' | 'b' | 'draw' | null;
  reason: string;
  mode?: string;
  playerColor?: 'w' | 'b';
  onNewGame: () => void;
  onReview: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  reason,
  mode = 'ai',
  playerColor = 'w',
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

  // Memoize quotes so they remain stable while modal is displayed
  const quotes = useMemo(() => {
    return getMatchQuotes(mode, winner, playerColor);
  }, [mode, winner, playerColor]);

  const getTitle = () => {
    if (winner === 'draw') return 'Stalemate / Draw';
    return winner === 'w' ? 'White Bunny Wins!' : 'Black Bunny Wins!';
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
          maxWidth: '460px',
          padding: '2rem 1.6rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.1rem',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
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
            boxShadow: 'var(--shadow-glow)',
            flexShrink: 0
          }}
        >
          <Trophy size={34} />
        </div>

        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            {getTitle()}
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {reason || 'Game over! What a match'}
          </div>
        </div>

        {/* --- Post-Game Quote Section --- */}

        {/* Case 1: AI / Puzzle Mode (Single Living Player) */}
        {(mode === 'ai' || mode === 'puzzle') && quotes.userQuote && (
          <div
            style={{
              width: '100%',
              background: quotes.userStatus === 'win'
                ? 'linear-gradient(135deg, rgba(255, 79, 163, 0.14), rgba(255, 199, 226, 0.25))'
                : 'linear-gradient(135deg, rgba(142, 122, 149, 0.12), rgba(245, 169, 208, 0.18))',
              border: quotes.userStatus === 'win' ? '1.5px solid var(--accent)' : '1.5px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1rem 1.1rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 15px rgba(255, 79, 163, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Heart size={14} fill="var(--accent)" />
              {quotes.userStatus === 'win' ? 'Victory Quote' : 'Head Up, Star'}
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.45 }}>
              {quotes.userQuote}
            </div>
          </div>
        )}

        {/* Case 2: Local Mode (Pass & Play - Two Living Players) */}
        {mode === 'local' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {quotes.whiteQuote && (
              <div
                style={{
                  width: '100%',
                  background: quotes.whiteStatus === 'win'
                    ? 'linear-gradient(135deg, rgba(255, 79, 163, 0.14), rgba(255, 245, 250, 0.6))'
                    : 'var(--bg-secondary)',
                  border: quotes.whiteStatus === 'win' ? '1.5px solid var(--accent)' : '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '0.85rem 1rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: quotes.whiteStatus === 'win' ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>⬜ White Bunny</span>
                  <span style={{ fontSize: '0.65rem', padding: '1px 7px', borderRadius: '10px', background: quotes.whiteStatus === 'win' ? 'var(--accent)' : 'var(--bg-primary)', color: quotes.whiteStatus === 'win' ? 'white' : 'var(--text-muted)', fontWeight: 700 }}>
                    {quotes.whiteStatus === 'win' ? 'Winner' : quotes.whiteStatus === 'draw' ? 'Draw' : 'Runner-up'}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.4 }}>
                  {quotes.whiteQuote}
                </div>
              </div>
            )}

            {quotes.blackQuote && (
              <div
                style={{
                  width: '100%',
                  background: quotes.blackStatus === 'win'
                    ? 'linear-gradient(135deg, rgba(255, 79, 163, 0.14), rgba(42, 32, 53, 0.15))'
                    : 'var(--bg-secondary)',
                  border: quotes.blackStatus === 'win' ? '1.5px solid var(--accent)' : '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '0.85rem 1rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: quotes.blackStatus === 'win' ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>⬛ Black Bunny</span>
                  <span style={{ fontSize: '0.65rem', padding: '1px 7px', borderRadius: '10px', background: quotes.blackStatus === 'win' ? 'var(--accent)' : 'var(--bg-primary)', color: quotes.blackStatus === 'win' ? 'white' : 'var(--text-muted)', fontWeight: 700 }}>
                    {quotes.blackStatus === 'win' ? 'Winner' : quotes.blackStatus === 'draw' ? 'Draw' : 'Runner-up'}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.4 }}>
                  {quotes.blackQuote}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Case 3: Online Mode (Two Living Players) */}
        {mode === 'online' && quotes.userQuote && (
          <div
            style={{
              width: '100%',
              background: quotes.userStatus === 'win'
                ? 'linear-gradient(135deg, rgba(255, 79, 163, 0.14), rgba(255, 199, 226, 0.25))'
                : 'linear-gradient(135deg, rgba(142, 122, 149, 0.12), rgba(245, 169, 208, 0.18))',
              border: quotes.userStatus === 'win' ? '1.5px solid var(--accent)' : '1.5px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1rem 1.1rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 15px rgba(255, 79, 163, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Heart size={14} fill="var(--accent)" />
              {quotes.userStatus === 'win' ? 'Your Victory Quote' : 'Your Match Quote'}
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.45 }}>
              {quotes.userQuote}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', width: '100%', marginTop: '0.3rem' }}>
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
