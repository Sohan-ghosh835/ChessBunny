import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chess, Square } from 'chess.js';
import { PieceSVG } from './pieces/PieceSVG';
import { audioService } from '../services/audioService';

interface ChessBoardProps {
  chess: Chess;
  isFlipped: boolean;
  onMakeMove: (from: Square, to: Square) => void;
  highlightLegalMoves?: boolean;
  showCoordinates?: boolean;
  lastMove?: { from: Square; to: Square } | null;
  isThinking?: boolean;
  hintSquare?: Square | null;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  chess,
  isFlipped,
  onMakeMove,
  highlightLegalMoves = true,
  showCoordinates = true,
  lastMove,
  isThinking = false,
  hintSquare = null
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);

  // Find King in check square if applicable
  const getCheckSquare = (): Square | null => {
    if (!chess.inCheck()) return null;
    const turn = chess.turn();
    const board = chess.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === 'k' && piece.color === turn) {
          const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          return `${files[c]}${8 - r}` as Square;
        }
      }
    }
    return null;
  };

  const checkSquare = getCheckSquare();

  const handleSquareClick = (square: Square) => {
    if (isThinking) return;

    if (selectedSquare === square) {
      setSelectedSquare(null);
      setLegalTargets([]);
      return;
    }

    if (selectedSquare && legalTargets.includes(square)) {
      audioService.playMove();
      onMakeMove(selectedSquare, square);
      setSelectedSquare(null);
      setLegalTargets([]);
      return;
    }

    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      audioService.playClick();
      setSelectedSquare(square);
      if (highlightLegalMoves) {
        const moves = chess.moves({ square, verbose: true });
        setLegalTargets(moves.map((m) => m.to as Square));
      }
    } else {
      setSelectedSquare(null);
      setLegalTargets([]);
    }
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = isFlipped ? [...files].reverse() : files;
  const displayRanks = isFlipped ? [...ranks].reverse() : ranks;

  const squaresToRender = displayRanks.flatMap((rank, rIdx) =>
    displayFiles.map((file, fIdx) => {
      const square = `${file}${rank}` as Square;
      const piece = chess.get(square);
      
      const isLight = (rIdx + fIdx) % 2 === 0;
      const isSelected = selectedSquare === square;
      const isLegal = legalTargets.includes(square);
      const isLastMove = lastMove?.from === square || lastMove?.to === square;
      const isCheck = checkSquare === square;

      const isHint = hintSquare === square;

      return (
        <div
          key={square}
          onClick={() => handleSquareClick(square)}
          className={`${isCheck ? 'king-in-check' : ''} ${isHint ? 'hint-square' : ''}`}
          style={{
            position: 'relative',
            backgroundColor: isLight ? 'var(--board-light)' : 'var(--board-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'backgroundColor 0.2s ease'
          }}
        >
          {isSelected && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'var(--board-selected)',
                boxShadow: 'inset 0 0 0 3px var(--accent)',
                borderRadius: '6px',
                zIndex: 2
              }}
            />
          )}

          {isLastMove && !isSelected && (
            <div
              style={{
                position: 'absolute',
                inset: '2px',
                backgroundColor: 'rgba(255, 79, 163, 0.14)',
                boxShadow: 'inset 0 0 0 2px rgba(255, 79, 163, 0.6)',
                borderRadius: '6px',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />
          )}

          {isLegal && (
            <div
              style={{
                position: 'absolute',
                width: piece ? '80%' : '24%',
                height: piece ? '80%' : '24%',
                borderRadius: '50%',
                border: piece ? '4px solid var(--accent)' : 'none',
                backgroundColor: piece ? 'transparent' : 'var(--board-move-dot)',
                zIndex: 5,
                pointerEvents: 'none',
                boxShadow: piece ? '0 0 10px var(--accent)' : 'none'
              }}
            />
          )}

          <AnimatePresence mode="wait">
            {piece && (
              <motion.div
                key={`${square}-${piece.color}${piece.type}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                whileHover={{ scale: 1.12, y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                style={{
                  width: '82%',
                  height: '82%',
                  zIndex: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <PieceSVG type={piece.type as any} color={piece.color as any} />
              </motion.div>
            )}
          </AnimatePresence>

          {showCoordinates && (
            <>
              {fIdx === 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '3px',
                    left: '4px',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: isLight ? 'var(--board-dark)' : 'var(--board-light)',
                    zIndex: 6,
                    pointerEvents: 'none',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {rank}
                </span>
              )}

              {rIdx === 7 && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '4px',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: isLight ? 'var(--board-dark)' : 'var(--board-light)',
                    zIndex: 6,
                    pointerEvents: 'none',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {file}
                </span>
              )}
            </>
          )}
        </div>
      );
    })
  );

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '580px', aspectRatio: '1/1' }}>
      <div
        className="bunny-card"
        style={{
          width: '100%',
          height: '100%',
          padding: '8px',
          borderRadius: '24px',
          border: '3px solid var(--board-border)',
          boxShadow: 'var(--shadow-glow), var(--shadow-lg)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isThinking && (
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              zIndex: 30,
              background: 'var(--accent)',
              color: 'white',
              padding: '0.35rem 0.85rem',
              borderRadius: '99px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 15px rgba(255, 79, 163, 0.4)'
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            >
              🌸
            </motion.span>
            Bunny is thinking...
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {squaresToRender}
        </div>
      </div>
    </div>
  );
};
