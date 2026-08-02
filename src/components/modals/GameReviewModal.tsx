import React from 'react';
import { Sparkles, Award, AlertTriangle, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { stockfishService } from '../../services/stockfishService';

interface GameReviewModalProps {
  history: string[];
  onClose: () => void;
}

export const GameReviewModal: React.FC<GameReviewModalProps> = ({ history, onClose }) => {
  const review = stockfishService.analyzeGame(history);

  const brilliantCount = review.moves.filter(m => m.classification === 'brilliant').length;
  const mistakeCount = review.moves.filter(m => m.classification === 'mistake').length;
  const blunderCount = review.moves.filter(m => m.classification === 'blunder').length;

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card"
        style={{
          width: '90%',
          maxWidth: '460px',
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
          <Sparkles size={24} /> Game Review & Analysis ✨
        </div>

        {/* Overall Accuracy Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FF4FA3, #FF7AC1)',
            color: 'white',
            borderRadius: '18px',
            padding: '1.2rem',
            width: '100%',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 700, opacity: 0.9 }}>Overall Move Accuracy</div>
          <div style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', margin: '0.2rem 0' }}>
            {review.accuracy}%
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.95 }}>
            {review.accuracy >= 85 ? 'Outstanding play! Grandmaster level 🌸' : review.accuracy >= 70 ? 'Great strategic vision! 👑' : 'Nice game! Keep practicing ✨'}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', width: '100%' }}>
          
          <div className="bunny-card" style={{ padding: '0.75rem', background: 'var(--bg-secondary)' }}>
            <Sparkles size={18} color="#FF4FA3" style={{ margin: '0 auto' }} />
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.2rem' }}>{brilliantCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Brilliant</div>
          </div>

          <div className="bunny-card" style={{ padding: '0.75rem', background: 'var(--bg-secondary)' }}>
            <AlertCircle size={18} color="#FFA000" style={{ margin: '0 auto' }} />
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.2rem' }}>{mistakeCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Mistakes</div>
          </div>

          <div className="bunny-card" style={{ padding: '0.75rem', background: 'var(--bg-secondary)' }}>
            <AlertTriangle size={18} color="#FF355E" style={{ margin: '0 auto' }} />
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.2rem' }}>{blunderCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Blunders</div>
          </div>

        </div>

        {/* Move Breakdown List */}
        <div style={{ width: '100%', maxHeight: '180px', overflowY: 'auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {review.moves.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.8rem' }}>
              <span style={{ fontWeight: 700 }}>{idx + 1}. {item.move}</span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '6px',
                  background: item.classification === 'brilliant' ? 'var(--accent)' : item.classification === 'blunder' ? '#FF355E' : 'transparent',
                  color: item.classification === 'good' ? 'var(--text-muted)' : 'white'
                }}
              >
                {item.classification}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
