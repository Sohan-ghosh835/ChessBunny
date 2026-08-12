import React, { useMemo } from 'react';
import { Sparkles, Award, AlertTriangle, AlertCircle, CheckCircle2, Zap, X, TrendingUp } from 'lucide-react';
import { stockfishService } from '../../services/stockfishService';

interface GameReviewModalProps {
  history: string[];
  playerColor?: 'w' | 'b';
  gameOverResult?: { winner: 'w' | 'b' | 'draw' | null; reason: string };
  startingFen?: string;
  onClose: () => void;
}

const CLASSIFICATION_META: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  brilliant:  { label: 'Brilliant !!',  color: '#00C853', bg: '#00C85322', icon: <Sparkles size={12} /> },
  great:      { label: 'Great !',       color: '#29B6F6', bg: '#29B6F622', icon: <Award size={12} /> },
  good:       { label: 'Good',          color: '#7E91A5', bg: '#7E91A511', icon: <CheckCircle2 size={12} /> },
  inaccuracy: { label: 'Inaccuracy ?',  color: '#AB47BC', bg: '#AB47BC22', icon: <AlertCircle size={12} /> },
  mistake:    { label: 'Mistake ??',    color: '#FFA000', bg: '#FFA00022', icon: <AlertTriangle size={12} /> },
  blunder:    { label: 'Blunder ???',   color: '#FF355E', bg: '#FF355E22', icon: <Zap size={12} /> },
};

function AccuracyBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700 }}>
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

export const GameReviewModal: React.FC<GameReviewModalProps> = ({
  history,
  playerColor = 'w',
  gameOverResult,
  startingFen,
  onClose
}) => {
  const review = useMemo(() => {
    try {
      return stockfishService.analyzeGame(history, playerColor, gameOverResult, startingFen);
    } catch (e) {
      return null;
    }
  }, [history, playerColor, gameOverResult, startingFen]);

  if (!review) {
    return (
      <div className="modal-overlay">
        <div
          className="bunny-card modal-content"
          style={{
            width: '92%',
            maxWidth: '480px',
            padding: '1.6rem 1.3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            position: 'relative'
          }}
        >
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={22} /> Game Analysis
          </div>
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <Sparkles size={36} color="var(--accent)" />
            </div>
            <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Analysis unavailable</div>
            <div>Play some moves first, then open Game Review to see your analysis!</div>
          </div>
        </div>
      </div>
    );
  }

  const statItems = [
    { key: 'brilliant',  label: 'Brilliant',   count: review.brilliantCount,  color: '#00C853' },
    { key: 'great',      label: 'Great',        count: review.greatCount,      color: '#29B6F6' },
    { key: 'good',       label: 'Good',         count: review.goodCount,       color: '#7E91A5' },
    { key: 'inaccuracy', label: 'Inaccuracy',   count: review.inaccuracyCount, color: '#AB47BC' },
    { key: 'mistake',    label: 'Mistake',      count: review.mistakeCount,    color: '#FFA000' },
    { key: 'blunder',    label: 'Blunder',      count: review.blunderCount,    color: '#FF355E' },
  ];

  // Accuracy gradient colour — green → yellow → red
  const accColor = review.accuracy >= 80 ? '#00C853' : review.accuracy >= 60 ? '#FFA000' : '#FF355E';

  const isPuzzle = !!startingFen || (!history || history.length <= 6);

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card modal-content"
        style={{
          width: '92%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.6rem 1.3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative'
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={22} /> {isPuzzle ? 'Puzzle Review' : 'Game Review & Analysis'}
        </div>

        {/* Empty state — no moves yet */}
        {(!history || history.length === 0) && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <Sparkles size={36} color="var(--accent)" />
            </div>
            <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>No moves to review yet</div>
            <div>Play some moves first, then open Game Review to see your analysis!</div>
          </div>
        )}

        {history && history.length > 0 && (
          <>
            {/* Accuracy Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #FF4FA3, #FF7AC1)',
                color: 'white',
                borderRadius: '16px',
                padding: '1.1rem 1.3rem',
                width: '100%',
                boxShadow: 'var(--shadow-glow)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                  {review.accuracy}%
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.9, fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>
                  Your Accuracy
                </div>
              </div>
              <div style={{ flex: 1, fontSize: '0.82rem', opacity: 0.95, fontWeight: 600, lineHeight: 1.45 }}>
                {review.summaryText}
              </div>
            </div>

            {/* Both-player accuracy bars */}
            {!isPuzzle && (
              <div style={{ width: '100%', display: 'flex', gap: '0.8rem', alignItems: 'flex-end' }}>
                <TrendingUp size={15} style={{ color: 'var(--text-muted)', flexShrink: 0, marginBottom: '1px' }} />
                <AccuracyBar label="⬜ White" pct={review.whiteAccuracy} color="#888" />
                <AccuracyBar label="⬛ Black" pct={review.blackAccuracy} color="#444" />
              </div>
            )}

            {/* Move Classification Stats — all 6 types */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', width: '100%' }}>
              {statItems.map(({ key, label, count, color }) => (
                <div
                  key={key}
                  className="bunny-card"
                  style={{
                    padding: '0.6rem 0.4rem',
                    background: count > 0 ? `${color}14` : 'var(--bg-secondary)',
                    border: count > 0 ? `1.5px solid ${color}44` : '1.5px solid transparent',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: count > 0 ? color : 'var(--text-muted)' }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '1px' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Move-by-move breakdown */}
            <div style={{ width: '100%', fontSize: '0.78rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                Move Breakdown
              </div>
              <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {review.moves.map((item, idx) => {
                  const moveNum = Math.floor(idx / 2) + 1;
                  const prefix = item.player === 'w' ? `${moveNum}.` : `${moveNum}...`;
                  const meta = CLASSIFICATION_META[item.classification];
                  const isUser = item.player === playerColor;

                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.38rem 0.65rem',
                        background: isUser ? meta.bg : 'var(--bg-secondary)',
                        borderRadius: '8px',
                        border: isUser && item.classification !== 'good'
                          ? `1px solid ${meta.color}33`
                          : '1px solid transparent',
                        opacity: isUser ? 1 : 0.65
                      }}
                    >
                      <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', minWidth: '30px' }}>{prefix}</span>
                        {item.move}
                        {!isUser && (
                          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '2px' }}>
                            ({item.player === 'w' ? '⬜' : '⬛'})
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontWeight: 800,
                          fontSize: '0.65rem',
                          padding: '0.12rem 0.4rem',
                          borderRadius: '5px',
                          background: meta.color,
                          color: 'white',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {meta.icon}
                        {meta.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
