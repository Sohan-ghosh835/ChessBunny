import React from 'react';
import { RotateCcw, RotateCw, Lightbulb, Flag, HeartHandshake, Sparkles, PlusCircle } from 'lucide-react';
import { audioService } from '../services/audioService';

interface BottomControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onHint: () => void;
  onResign: () => void;
  onOfferDraw: () => void;
  onAnalysis: () => void;
  onNewGame: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isGameOver: boolean;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  onUndo,
  onRedo,
  onHint,
  onResign,
  onOfferDraw,
  onAnalysis,
  onNewGame,
  canUndo,
  canRedo,
  isGameOver
}) => {
  const handleClick = (action: () => void) => {
    audioService.playClick();
    action();
  };

  return (
    <div
      className="bunny-card"
      style={{
        width: '100%',
        maxWidth: '580px',
        padding: '0.6rem 0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.4rem',
        flexWrap: 'wrap'
      }}
    >
      <button
        className="bunny-btn"
        style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
        onClick={() => handleClick(onNewGame)}
      >
        <PlusCircle size={15} /> New Game
      </button>

      <button
        className="bunny-btn bunny-btn-secondary"
        disabled={!canUndo}
        style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', opacity: canUndo ? 1 : 0.4 }}
        onClick={() => canUndo && handleClick(onUndo)}
      >
        <RotateCcw size={15} /> Undo
      </button>

      <button
        className="bunny-btn bunny-btn-secondary"
        disabled={!canRedo}
        style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', opacity: canRedo ? 1 : 0.4 }}
        onClick={() => canRedo && handleClick(onRedo)}
      >
        <RotateCw size={15} /> Redo
      </button>

      <button
        className="bunny-btn bunny-btn-secondary"
        style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
        onClick={() => handleClick(onHint)}
      >
        <Lightbulb size={15} color="#FF4FA3" /> Hint
      </button>

      <button
        className="bunny-btn bunny-btn-secondary"
        style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
        onClick={() => handleClick(onAnalysis)}
      >
        <Sparkles size={15} color="#FF7AC1" /> Review
      </button>

      <button
        className="bunny-btn bunny-btn-secondary"
        disabled={isGameOver}
        style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', opacity: !isGameOver ? 1 : 0.4 }}
        onClick={() => !isGameOver && handleClick(onOfferDraw)}
      >
        <HeartHandshake size={15} /> Draw
      </button>

      <button
        className="bunny-btn bunny-btn-secondary"
        disabled={isGameOver}
        style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', opacity: !isGameOver ? 1 : 0.4 }}
        onClick={() => !isGameOver && handleClick(onResign)}
      >
        <Flag size={15} /> Resign
      </button>
    </div>
  );
};
