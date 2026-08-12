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
  timerEnabled?: boolean;
  onToggleTimer?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  whiteTime,
  blackTime,
  activeTurn,
  moveCount,
  evalScore,
  capturedWhite,
  capturedBlack,
  whiteName = 'White Bunny',
  blackName = 'Black Bunny',
  timerEnabled = false,
  onToggleTimer
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
    <div className="bunny-card status-bar-card">
      
      {/* Top Row: Players & Move Counter */}
      <div className="status-bar-top-row">
        
        {/* Black Player Card */}
        <div
          className={`status-player-card black-player ${activeTurn === 'b' ? 'active-turn' : ''}`}
        >
          <div className="status-king-icon">
            <PieceSVG type="k" color="b" />
          </div>
          <div className="status-player-info">
            <div className="status-player-name">{blackName}</div>
            {/* Desktop: full piece icons */}
            <div className="status-captured-row desktop-only">
              {capturedBlack.slice(0, 10).map((p, i) => (
                <div key={i} className="status-captured-piece">
                  <PieceSVG type={p as any} color="w" />
                </div>
              ))}
              {capturedBlack.length > 10 && <span className="status-diff-text">+{capturedBlack.length - 10}</span>}
              {diff < 0 && <span className="status-diff-text">+{Math.abs(diff)}</span>}
            </div>
            {/* Mobile: compact material badge only */}
            {(capturedBlack.length > 0 || diff < 0) && (
              <div className="status-material-badge mobile-only">
                {capturedBlack.length > 0 && <span className="status-material-count">{capturedBlack.length} cap.</span>}
                {diff < 0 && <span className="status-material-advantage">+{Math.abs(diff)}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Move Counter */}
        <div className="status-move-counter">
          <div className="status-move-number">
            Move #{Math.ceil(moveCount / 2)}
          </div>
          <div className="status-turn-text">
            {activeTurn === 'w' ? "White's Turn" : "Black's Turn"}
          </div>
        </div>

        {/* White Player Card */}
        <div
          className={`status-player-card white-player ${activeTurn === 'w' ? 'active-turn' : ''}`}
        >
          <div className="status-player-info" style={{ alignItems: 'flex-end' }}>
            <div className="status-player-name text-right">{whiteName}</div>
            {/* Desktop: full piece icons */}
            <div className="status-captured-row justify-end desktop-only">
              {capturedWhite.slice(0, 10).map((p, i) => (
                <div key={i} className="status-captured-piece">
                  <PieceSVG type={p as any} color="b" />
                </div>
              ))}
              {capturedWhite.length > 10 && <span className="status-diff-text">+{capturedWhite.length - 10}</span>}
              {diff > 0 && <span className="status-diff-text">+{diff}</span>}
            </div>
            {/* Mobile: compact material badge only */}
            {(capturedWhite.length > 0 || diff > 0) && (
              <div className="status-material-badge mobile-only" style={{ justifyContent: 'flex-end' }}>
                {capturedWhite.length > 0 && <span className="status-material-count">{capturedWhite.length} cap.</span>}
                {diff > 0 && <span className="status-material-advantage">+{diff}</span>}
              </div>
            )}
          </div>
          <div className="status-king-icon">
            <PieceSVG type="k" color="w" />
          </div>
        </div>

      </div>

      {/* Middle Row: Timers & Extended Eval Bar */}
      <div className="status-bar-middle-row">

        {/* Black Clock */}
        {timerEnabled && (
          <div className={`status-clock-badge ${activeTurn === 'b' ? 'active' : ''}`}>
            <Clock size={14} /> {formatTime(blackTime)}
          </div>
        )}

        {/* Extended Eval bar + Timer toggle button */}
        <div className="status-eval-container">
          <div className="status-eval-labels">
            <span>Eval</span>
            <span>{evalScore > 0 ? `+${evalScore}` : evalScore}</span>
          </div>
          <div className="status-eval-track">
            {/* Pink portion = Black's relative advantage (fills from left) */}
            <div
              className="status-eval-fill"
              style={{ width: `${evalPercent}%` }}
            />
          </div>

          {/* Timer toggle pill */}
          <button
            id="timer-toggle-btn"
            onClick={onToggleTimer}
            title={timerEnabled ? 'Disable timer' : 'Enable timer'}
            className={`status-timer-btn ${timerEnabled ? 'enabled' : ''}`}
          >
            <Clock size={11} />
            {timerEnabled ? '⏱ Timer ON' : '⏱ Timer OFF'}
          </button>
        </div>

        {/* White Clock */}
        {timerEnabled && (
          <div className={`status-clock-badge ${activeTurn === 'w' ? 'active' : ''}`}>
            <Clock size={14} /> {formatTime(whiteTime)}
          </div>
        )}
      </div>

    </div>
  );
};
