import React from 'react';
import { 
  Puzzle, 
  X, 
  Target, 
  GitFork, 
  ArrowUpToLine, 
  Pin, 
  Lightbulb, 
  Trophy 
} from 'lucide-react';
import { audioService } from '../../services/audioService';
import { PUZZLE_CATEGORIES, getRandomPuzzleForCategory } from '../../services/puzzleService';

export interface PuzzleItem {
  id: string;
  title: string;
  description: string;
  fen: string;
  categoryId?: string;
  solution?: string;
}

interface PuzzleModalProps {
  onSelectPuzzle: (puzzle: PuzzleItem) => void;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  mate_in_1: <Target size={22} color="var(--accent)" />,
  fork: <GitFork size={22} color="var(--accent)" />,
  back_rank: <ArrowUpToLine size={22} color="var(--accent)" />,
  pin_skewer: <Pin size={22} color="var(--accent)" />,
  discovered: <Lightbulb size={22} color="var(--accent)" />,
  endgame: <Trophy size={22} color="var(--accent)" />,
};

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
          maxWidth: '480px',
          padding: '1.8rem 1.4rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
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

        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Puzzle size={24} /> Chess Puzzles
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Choose a tactic category — each click loads a fresh unique puzzle position.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%' }}>
          {PUZZLE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bunny-card puzzle-category-card"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {CATEGORY_ICONS[cat.id] || <Puzzle size={22} color="var(--accent)" />}
              </div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                  {cat.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {cat.description}
                </div>
              </div>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--accent)',
                background: 'var(--accent-light)',
                borderRadius: '20px',
                padding: '2px 8px',
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}>
                {cat.puzzles.length} puzzles
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
