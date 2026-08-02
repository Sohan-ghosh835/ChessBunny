import React from 'react';
import { 
  Bot, 
  Users, 
  Globe, 
  Puzzle, 
  RotateCcw, 
  Repeat, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Settings
} from 'lucide-react';
import { DifficultyLevel } from '../services/stockfishService';
import { audioService } from '../services/audioService';

export type GameMode = 'ai' | 'local' | 'online' | 'puzzle';

interface TopBarProps {
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (diff: DifficultyLevel) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  soundEnabled: boolean;
  setSoundEnabled: (s: boolean) => void;
  onUndo: () => void;
  onFlipBoard: () => void;
  onOpenSettings: () => void;
  canUndo: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  mode,
  setMode,
  difficulty,
  setDifficulty,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
  onUndo,
  onFlipBoard,
  onOpenSettings,
  canUndo
}) => {
  const handleModeChange = (newMode: GameMode) => {
    audioService.playClick();
    setMode(newMode);
  };

  const handleThemeToggle = () => {
    audioService.playClick();
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleSoundToggle = () => {
    const nextSound = !soundEnabled;
    audioService.setEnabled(nextSound);
    setSoundEnabled(nextSound);
    if (nextSound) audioService.playClick();
  };

  const showUndo = mode === 'ai' || mode === 'local';

  return (
    <header className="bunny-card topbar-card">
      
      {/* Top Header Row: Logo + Action Icons */}
      <div className="topbar-main-row">
        
        {/* Branding Logo */}
        <div className="brand-logo" onClick={() => handleModeChange('ai')}>
          <span>♡</span> ChessBunny
        </div>

        {/* Quick Action Icons — always same count to prevent layout shift */}
        <div className="topbar-actions">
          {/* Undo — always in DOM, hidden when not applicable */}
          <button
            className="bunny-btn-icon"
            title="Undo Move"
            disabled={!showUndo || !canUndo}
            onClick={() => { if (showUndo && canUndo) { audioService.playClick(); onUndo(); } }}
            style={{
              visibility: showUndo ? 'visible' : 'hidden',
              opacity: canUndo ? 1 : 0.4,
              cursor: (showUndo && canUndo) ? 'pointer' : 'not-allowed'
            }}
          >
            <RotateCcw size={16} />
          </button>

          <button className="bunny-btn-icon" title="Flip Board" onClick={() => { audioService.playClick(); onFlipBoard(); }}>
            <Repeat size={16} />
          </button>

          <button className="bunny-btn-icon" title="Toggle Theme" onClick={handleThemeToggle}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button className="bunny-btn-icon" title="Toggle Sound" onClick={handleSoundToggle}>
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button className="bunny-btn-icon" title="Settings" onClick={() => { audioService.playClick(); onOpenSettings(); }}>
            <Settings size={16} />
          </button>
        </div>

      </div>

      {/* Second Row: Scrollable Mode Selector & AI Difficulty */}
      <div className="topbar-secondary-row">
        
        {/* Mode Selector Tabs */}
        <div className="mode-selector-scroll">
          <button
            className={`bunny-btn ${mode === 'ai' ? '' : 'bunny-btn-secondary'}`}
            onClick={() => handleModeChange('ai')}
          >
            <Bot size={14} /> Play vs AI
          </button>

          <button
            className={`bunny-btn ${mode === 'local' ? '' : 'bunny-btn-secondary'}`}
            onClick={() => handleModeChange('local')}
          >
            <Users size={14} /> Local 2P
          </button>

          <button
            className={`bunny-btn ${mode === 'online' ? '' : 'bunny-btn-secondary'}`}
            onClick={() => handleModeChange('online')}
          >
            <Globe size={14} /> Online
          </button>

          <button
            className={`bunny-btn ${mode === 'puzzle' ? '' : 'bunny-btn-secondary'}`}
            onClick={() => handleModeChange('puzzle')}
          >
            <Puzzle size={14} /> Puzzles
          </button>
        </div>

        {/* AI Difficulty Selector */}
        {mode === 'ai' && (
          <select
            value={difficulty}
            onChange={(e) => {
              audioService.playClick();
              setDifficulty(e.target.value as DifficultyLevel);
            }}
            className="difficulty-dropdown"
          >
            <option value="easy">Easy (~800)</option>
            <option value="medium">Medium (~1300)</option>
            <option value="hard">Hard (~1800)</option>
            <option value="expert">Expert (~2300)</option>
          </select>
        )}

      </div>

    </header>
  );
};
