import React from 'react';
import { PieceSVG } from '../pieces/PieceSVG';
import { audioService } from '../../services/audioService';

interface PromotionModalProps {
  color: 'w' | 'b';
  onSelect: (piece: 'q' | 'r' | 'n' | 'b') => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ color, onSelect }) => {
  const pieces: Array<{ type: 'q' | 'r' | 'n' | 'b'; label: string }> = [
    { type: 'q', label: 'Queen' },
    { type: 'r', label: 'Rook' },
    { type: 'n', label: 'Knight' },
    { type: 'b', label: 'Bishop' }
  ];

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card"
        style={{
          width: '90%',
          maxWidth: '380px',
          padding: '1.8rem 1.4rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem'
        }}
      >
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
          Pawn Promotion
        </div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Choose a piece to promote your pawn:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', width: '100%' }}>
          {pieces.map((p) => (
            <button
              key={p.type}
              className="bunny-btn bunny-btn-secondary"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '16px'
              }}
              onClick={() => {
                audioService.playPromotion();
                onSelect(p.type);
              }}
            >
              <div style={{ width: '44px', height: '44px' }}>
                <PieceSVG type={p.type} color={color} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
