import React, { useState } from 'react';
import { BookOpen, Sparkles, MessageSquare, Send, Award, Puzzle } from 'lucide-react';
import { getOpeningName } from '../utils/openingBook';
import { bunnyCoachService } from '../services/bunnyCoachService';
import { audioService } from '../services/audioService';

interface RightSidebarProps {
  history: string[];
  currentMoveIndex: number;
  onSelectMove: (index: number) => void;
  evalScore: number;
  isOnlineMode: boolean;
  isBotMatch: boolean;
  isPuzzleMode?: boolean;
  currentPuzzleTitle?: string;
  onNewPuzzle?: () => void;
  onOpenPuzzleMenu?: () => void;
  fen: string;
  pgn: string;
  chatMessages?: Array<{ sender: string; text: string; time: string }>;
  onSendChat?: (text: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  history,
  currentMoveIndex,
  onSelectMove,
  evalScore,
  isOnlineMode,
  isBotMatch,
  isPuzzleMode = false,
  currentPuzzleTitle,
  onNewPuzzle,
  onOpenPuzzleMenu,
  fen,
  pgn,
  chatMessages = [],
  onSendChat
}) => {
  const [chatInput, setChatInput] = useState('');
  const [coachAdvice, setCoachAdvice] = useState<string | null>(null);
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  const openingName = getOpeningName(history);

  const pairedMoves: Array<{ moveNum: number; white: string; black?: string; whiteIdx: number; blackIdx?: number }> = [];
  for (let i = 0; i < history.length; i += 2) {
    pairedMoves.push({
      moveNum: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1],
      whiteIdx: i,
      blackIdx: i + 1 < history.length ? i + 1 : undefined
    });
  }

  const handleAskCoach = async () => {
    audioService.playClick();
    setIsCoachLoading(true);
    const lastMove = history[history.length - 1] || '';
    const advice = await bunnyCoachService.askCoachAdvice(fen, pgn, lastMove, isBotMatch);
    setCoachAdvice(advice);
    setIsCoachLoading(false);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() && onSendChat) {
      audioService.playClick();
      onSendChat(chatInput.trim());
      setChatInput('');
    }
  };

  return (
    <aside className="side-column">
      
      {/* Top Card: Puzzle Mode info OR Current Opening */}
      {isPuzzleMode ? (
        <div className="bunny-card" style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Puzzle size={20} color="var(--accent)" />
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Puzzle Mode</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                {currentPuzzleTitle || 'Select a puzzle'}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="bunny-btn"
              style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
              onClick={() => { audioService.playClick(); onNewPuzzle?.(); }}
            >
              New Puzzle
            </button>
            <button
              className="bunny-btn bunny-btn-secondary"
              style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
              onClick={() => { audioService.playClick(); onOpenPuzzleMenu?.(); }}
            >
              Change Type
            </button>
          </div>
        </div>
      ) : (
        <div className="bunny-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BookOpen size={20} color="var(--accent)" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Current Opening
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {openingName}
            </div>
          </div>
        </div>
      )}

      {/* Bunny AI Coach Card */}
      {isBotMatch && (
        <div className="bunny-card" style={{ padding: '0.9rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', border: '1px solid var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)' }}>
              <Sparkles size={18} /> Bunny AI Coach
            </div>
            <button
              className="bunny-btn"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              disabled={isCoachLoading}
              onClick={handleAskCoach}
            >
              {isCoachLoading ? 'Thinking...' : 'Ask Coach'}
            </button>
          </div>

          {coachAdvice && (
            <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '12px', fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--text-main)' }}>
              {coachAdvice}
            </div>
          )}
        </div>
      )}

      {/* Move History Card */}
      <div className="bunny-card" style={{ padding: '0.9rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, minHeight: '220px', maxHeight: '350px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={18} color="var(--accent)" /> Move History
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {history.length} moves
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.2rem' }}>
          {pairedMoves.length === 0 ? (
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
              No moves played yet.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'left' }}>
                  <th style={{ padding: '0.3rem' }}>#</th>
                  <th style={{ padding: '0.3rem' }}>White</th>
                  <th style={{ padding: '0.3rem' }}>Black</th>
                </tr>
              </thead>
              <tbody>
                {pairedMoves.map((row) => (
                  <tr key={row.moveNum} style={{ borderBottom: '1px dashed var(--border-glass)' }}>
                    <td style={{ padding: '0.35rem 0.3rem', color: 'var(--text-muted)', fontWeight: 700, width: '28px' }}>
                      {row.moveNum}.
                    </td>

                    <td style={{ padding: '0.35rem 0.3rem' }}>
                      <span
                        onClick={() => { audioService.playClick(); onSelectMove(row.whiteIdx); }}
                        style={{
                          cursor: 'pointer',
                          padding: '0.2rem 0.45rem',
                          borderRadius: '6px',
                          fontWeight: currentMoveIndex === row.whiteIdx ? 800 : 600,
                          background: currentMoveIndex === row.whiteIdx ? 'var(--accent)' : 'transparent',
                          color: currentMoveIndex === row.whiteIdx ? 'white' : 'var(--text-main)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {row.white}
                      </span>
                    </td>

                    <td style={{ padding: '0.35rem 0.3rem' }}>
                      {row.black && (
                        <span
                          onClick={() => { if (row.blackIdx !== undefined) { audioService.playClick(); onSelectMove(row.blackIdx); } }}
                          style={{
                            cursor: 'pointer',
                            padding: '0.2rem 0.45rem',
                            borderRadius: '6px',
                            fontWeight: currentMoveIndex === row.blackIdx ? 800 : 600,
                            background: currentMoveIndex === row.blackIdx ? 'var(--accent)' : 'transparent',
                            color: currentMoveIndex === row.blackIdx ? 'white' : 'var(--text-main)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {row.black}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Live Chat Panel */}
      {isOnlineMode && (
        <div className="bunny-card" style={{ padding: '0.9rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '220px' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MessageSquare size={16} /> Live Chat
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {chatMessages.length === 0 ? (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1.5rem' }}>
                Say hi to your opponent!
              </div>
            ) : (
              chatMessages.map((msg, i) => (
                <div key={i} style={{ fontSize: '0.8rem', background: 'var(--bg-secondary)', padding: '0.35rem 0.6rem', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--accent)' }}>{msg.sender}: </span>
                  <span>{msg.text}</span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '0.4rem' }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.4rem 0.65rem',
                borderRadius: '10px',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="bunny-btn" style={{ padding: '0.4rem 0.65rem' }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

    </aside>
  );
};
