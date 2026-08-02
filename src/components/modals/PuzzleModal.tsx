import React from 'react';
import { Puzzle, X } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { PUZZLE_CATEGORIES, getRandomPuzzleForCategory } from '../../services/puzzleService';

export interface PuzzleItem {
  id: string;
  title: string;
  description: string;
  fen: string;
  categoryId?: string;
}

interface PuzzleModalProps {
  onSelectPuzzle: (puzzle: PuzzleItem) => void;
  onClose: () => void;
}

export const PuzzleModal: React.FC<PuzzleModalProps> = ({ onSelectPuzzle, onClose }) => {
  const handleCategoryClick = (catId: string) => {
    audioService.playClick();
    const puzzle = getRandomPuzzleForCategory(catId);
    onSelectPuzzle(puzzle);
  };

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card"
        style={{
          width: '90%',
          maxWidth: '440px',
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
          <Puzzle size={24} /> Chess Puzzle Modes 🧩
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Select a tactic category. Each click deals a fresh board position.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
          {PUZZLE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bunny-card"
              style={{
                padding: '0.9rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: 'var(--bg-secondary)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                  {cat.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {cat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
