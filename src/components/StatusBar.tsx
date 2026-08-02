import React from 'react';
import { PieceSVG } from './pieces/PieceSVG';
import { Clock } from 'lucide-react';

interface StatusBarProps {
  whiteTime: number;
  blackTime: number;
  activeTurn: 'w' | 'b';
  moveCount: number;
  evalScore: number;
  capturedWhite: string[];
  capturedBlack: string[];
  whiteName?: string;
  blackName?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  whiteTime,
  blackTime,
  activeTurn,
  moveCount,
  evalScore,
  capturedWhite,
  capturedBlack,
  whiteName = 'White Bunny 🐰',
  blackName = 'Black Bunny 🌸'
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const pieceVals: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };
  const whiteMat = capturedWhite.reduce((acc, p) => acc + (pieceVals[p] || 0), 0);
  const blackMat = capturedBlack.reduce((acc, p) => acc + (pieceVals[p] || 0), 0);
  const diff = whiteMat - blackMat;

  // Bar fills LEFT (toward Black) when Black is winning (negative eval)
  // Bar fills RIGHT (toward White) when White is winning (positive eval)
  const clampedEval = Math.max(-10, Math.min(10, evalScore));
  const evalPercent = 50 - (clampedEval / 10) * 45;

  return (
    <div className="bunny-card" style={{ width: '100%', maxWidth: '580px', padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      
      {/* Top Row: Players & Timers */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
        
        {/* Black Player Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '12px',
            background: activeTurn === 'b' ? 'var(--accent-light)' : 'transparent',
            border: activeTurn === 'b' ? '1px solid var(--accent)' : '1px solid transparent',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ width: '22px', height: '22px' }}>
            <PieceSVG type="k" color="b" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{blackName}</div>
            <div style={{ display: 'flex', gap: '2px', height: '14px', alignItems: 'center' }}>
              {capturedBlack.map((p, i) => (
                <div key={i} style={{ width: '12px', height: '12px' }}>
                  <PieceSVG type={p as any} color="w" />
                </div>
              ))}
              {diff < 0 && <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent)', marginLeft: '4px' }}>+{Math.abs(diff)}</span>}
            </div>
          </div>
        </div>

        {/* Move Counter */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            Move #{Math.ceil(moveCount / 2)}
          </div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
            {activeTurn === 'w' ? "White's Turn" : "Black's Turn"}
          </div>
        </div>

        {/* White Player Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '12px',
            background: activeTurn === 'w' ? 'var(--accent-light)' : 'transparent',
            border: activeTurn === 'w' ? '1px solid var(--accent)' : '1px solid transparent',
            transition: 'all 0.25s ease'
          }}
        >
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-heading)', textAlign: 'right' }}>{whiteName}</div>
            <div style={{ display: 'flex', gap: '2px', height: '14px', alignItems: 'center', justifyContent: 'flex-end' }}>
              {capturedWhite.map((p, i) => (
                <div key={i} style={{ width: '12px', height: '12px' }}>
                  <PieceSVG type={p as any} color="b" />
                </div>
              ))}
              {diff > 0 && <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent)', marginLeft: '4px' }}>+{diff}</span>}
            </div>
          </div>
          <div style={{ width: '22px', height: '22px' }}>
            <PieceSVG type="k" color="w" />
          </div>
        </div>

      </div>

      {/* Middle Row: Timers & Eval */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--bg-secondary)',
            padding: '0.35rem 0.75rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            color: activeTurn === 'b' ? 'var(--accent)' : 'var(--text-muted)'
          }}
        >
          <Clock size={14} /> {formatTime(blackTime)}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            <span>Eval</span>
            <span>{evalScore > 0 ? `+${evalScore}` : evalScore}</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '99px',
              background: '#FFFFFF',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid var(--border-glass)'
            }}
          >
            {/* Pink portion = Black's relative advantage (fills from left) */}
            <div
              style={{
                height: '100%',
                width: `${evalPercent}%`,
                background: 'linear-gradient(90deg, #FF7AC1, #FF4FA3)',
                borderRadius: '99px',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--bg-secondary)',
            padding: '0.35rem 0.75rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            color: activeTurn === 'w' ? 'var(--accent)' : 'var(--text-muted)'
          }}
        >
          <Clock size={14} /> {formatTime(whiteTime)}
        </div>
      </div>

    </div>
  );
};
