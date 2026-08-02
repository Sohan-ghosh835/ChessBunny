import React from 'react';

interface PieceProps {
  type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  color: 'w' | 'b';
  className?: string;
  size?: number | string;
}

export const PieceSVG: React.FC<PieceProps> = ({ type, color, className = '', size = '100%' }) => {
  const isWhite = color === 'w';

  // White Ceramic Style: Clean White fill, Vibrant Pink (#FF4FA3) stroke
  // Black Dark Violet Style: Dark Violet (#2D1B36) fill, Bright Pink (#FF7AC1) stroke
  const mainFill = isWhite ? '#FFFFFF' : '#2A1836';
  const strokeColor = isWhite ? '#FF4FA3' : '#FF7AC1';
  const highlightFill = isWhite ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 122, 193, 0.4)';
  const secondaryFill = isWhite ? '#FFEAF4' : '#1F1129';
  const cheekFill = '#FF66B3';

  const renderPiecePath = () => {
    switch (type) {
      case 'p':
        // Pawn: Cute rounded crown head with blushing cheeks
        return (
          <g>
            <ellipse cx="50" cy="84" rx="26" ry="7" fill={secondaryFill} stroke={strokeColor} strokeWidth="3" />
            <path d="M 30 84 Q 33 64 38 52 Q 35 46 35 40 A 15 15 0 1 1 65 40 Q 65 46 62 52 Q 67 64 70 84 Z" fill={mainFill} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="50" cy="32" r="11" fill={mainFill} stroke={strokeColor} strokeWidth="3" />
            <ellipse cx="46" cy="27" rx="3.5" ry="2.5" fill={highlightFill} />
            <path d="M 41 68 Q 50 64 59 68" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="43" cy="34" r="2" fill={cheekFill} opacity="0.75" />
            <circle cx="57" cy="34" r="2" fill={cheekFill} opacity="0.75" />
          </g>
        );

      case 'r':
        // Rook: Castle tower with rounded battlements and cute heart window
        return (
          <g>
            <ellipse cx="50" cy="85" rx="28" ry="7" fill={secondaryFill} stroke={strokeColor} strokeWidth="3" />
            <path d="M 26 85 L 30 42 L 24 42 L 24 25 L 34 25 L 34 32 L 44 32 L 44 25 L 56 25 L 56 32 L 66 32 L 66 25 L 76 25 L 76 42 L 70 42 L 74 85 Z" fill={mainFill} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 50 56 Q 44 50 44 45 Q 44 40 50 44 Q 56 40 56 45 Q 56 50 50 56 Z" fill={strokeColor} />
            <path d="M 33 46 Q 34 65 35 78" stroke={highlightFill} strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'n':
        // Knight: Adorable rounded bunny-horse head with floppy ear
        return (
          <g>
            <ellipse cx="50" cy="85" rx="28" ry="7" fill={secondaryFill} stroke={strokeColor} strokeWidth="3" />
            <path d="M 26 85 Q 26 65 34 50 Q 28 42 26 30 Q 34 26 44 34 Q 56 20 68 28 Q 74 38 66 52 Q 68 66 74 85 Z" fill={mainFill} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 44 34 Q 50 18 56 22 Q 54 32 46 38 Z" fill={secondaryFill} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="48" cy="38" r="3" fill={strokeColor} />
            <circle cx="47" cy="37" r="1" fill="#FFFFFF" />
            <path d="M 64 36 Q 60 48 62 60" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <ellipse cx="36" cy="62" rx="3" ry="7" fill={highlightFill} transform="rotate(-15 36 62)" />
          </g>
        );

      case 'b':
        // Bishop: Cute mitre with cross & pearl top
        return (
          <g>
            <ellipse cx="50" cy="85" rx="26" ry="7" fill={secondaryFill} stroke={strokeColor} strokeWidth="3" />
            <path d="M 28 85 Q 32 60 36 48 Q 30 38 42 22 Q 50 16 58 22 Q 70 38 64 48 Q 68 60 72 85 Z" fill={mainFill} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="50" cy="18" r="5.5" fill={strokeColor} />
            <path d="M 50 34 L 50 44 M 45 39 L 55 39" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 38 56 Q 40 70 41 80" stroke={highlightFill} strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'q':
        // Queen: Elegant crown with 5 tiara pearls and center heart
        return (
          <g>
            <ellipse cx="50" cy="86" rx="30" ry="7" fill={secondaryFill} stroke={strokeColor} strokeWidth="3" />
            <path d="M 24 86 Q 28 58 32 45 L 22 28 L 36 34 L 50 20 L 64 34 L 78 28 L 68 45 Q 72 58 76 86 Z" fill={mainFill} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="22" cy="26" r="4" fill={strokeColor} />
            <circle cx="36" cy="32" r="4" fill={strokeColor} />
            <circle cx="50" cy="18" r="6" fill={strokeColor} />
            <circle cx="64" cy="32" r="4" fill={strokeColor} />
            <circle cx="78" cy="26" r="4" fill={strokeColor} />
            <path d="M 50 50 Q 45 44 45 40 Q 45 36 50 39 Q 55 36 55 40 Q 55 44 50 50 Z" fill={strokeColor} />
            <path d="M 30 58 Q 50 63 70 58" stroke={strokeColor} strokeWidth="2.5" fill="none" />
            <ellipse cx="36" cy="68" rx="3.5" ry="9" fill={highlightFill} transform="rotate(-10 36 68)" />
          </g>
        );

      case 'k':
        // King: Regal cute cross crown
        return (
          <g>
            <ellipse cx="50" cy="86" rx="30" ry="7" fill={secondaryFill} stroke={strokeColor} strokeWidth="3" />
            <path d="M 50 12 L 50 24 M 44 18 L 56 18" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 24 86 Q 28 58 33 46 Q 24 34 35 28 Q 50 24 65 28 Q 76 34 67 46 Q 72 58 76 86 Z" fill={mainFill} stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M 36 29 Q 42 38 50 38 Q 58 38 64 29" stroke={strokeColor} strokeWidth="2.5" fill="none" />
            <path d="M 50 56 Q 44 50 44 45 Q 44 40 50 44 Q 56 40 56 45 Q 56 50 50 56 Z" fill={strokeColor} />
            <ellipse cx="35" cy="66" rx="3.5" ry="10" fill={highlightFill} transform="rotate(-12 35 66)" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`bunny-piece-svg ${className}`}
      style={{
        filter: isWhite
          ? 'drop-shadow(0 3px 5px rgba(255,79,163,0.3))'
          : 'drop-shadow(0 3px 5px rgba(0,0,0,0.5))'
      }}
    >
      {renderPiecePath()}
    </svg>
  );
};
