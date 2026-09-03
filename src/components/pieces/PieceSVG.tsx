import React from 'react';

interface PieceProps {
  type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  color: 'w' | 'b';
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
}

const TYPE_NAME_MAP: Record<string, string> = {
  p: 'pawn',
  n: 'knight',
  b: 'bishop',
  r: 'rook',
  q: 'queen',
  k: 'king',
};

export const PieceSVG: React.FC<PieceProps> = ({
  type,
  color,
  className = '',
  size = '100%',
  style = {}
}) => {
  const isWhite = color === 'w';
  const prefix = isWhite ? 'white' : 'pink';
  const pieceName = TYPE_NAME_MAP[type] || 'pawn';
  const src = `/pieces/${prefix}_${pieceName}.png`;

  return (
    <img
      src={src}
      alt={`${isWhite ? 'White' : 'Pink'} ${pieceName}`}
      className={`bunny-piece-img ${className}`}
      draggable={false}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        objectFit: 'contain',
        imageRendering: 'pixelated',
        filter: isWhite
          ? 'drop-shadow(0 2px 4px rgba(255, 79, 163, 0.35))'
          : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45))',
        userSelect: 'none',
        pointerEvents: 'none',
        ...style
      } as React.CSSProperties}
    />
  );
};

