import React from 'react';
import { Settings, X } from 'lucide-react';
import { audioService } from '../../services/audioService';

export interface GameSettings {
  animations: boolean;
  sound: boolean;
  theme: 'light' | 'dark';
  highlightLegalMoves: boolean;
  coordinates: boolean;
  autoQueen: boolean;
  flipAutomatically: boolean;
}

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onUpdateSettings, onClose }) => {
  const toggleSetting = (key: keyof GameSettings) => {
    audioService.playClick();
    onUpdateSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card"
        style={{
          width: '90%',
          maxWidth: '420px',
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
          <Settings size={24} /> Game Settings ⚙️
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
          
          <ToggleRow label="Enable Animations" checked={settings.animations} onChange={() => toggleSetting('animations')} />
          <ToggleRow label="Sound Effects" checked={settings.sound} onChange={() => toggleSetting('sound')} />
          <ToggleRow label="Highlight Legal Moves" checked={settings.highlightLegalMoves} onChange={() => toggleSetting('highlightLegalMoves')} />
          <ToggleRow label="Show Board Coordinates" checked={settings.coordinates} onChange={() => toggleSetting('coordinates')} />
          <ToggleRow label="Auto Queen Promotion" checked={settings.autoQueen} onChange={() => toggleSetting('autoQueen')} />
          <ToggleRow label="Flip Board Automatically" checked={settings.flipAutomatically} onChange={() => toggleSetting('flipAutomatically')} />

        </div>
      </div>
    </div>
  );
};

const ToggleRow: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.8rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ width: '18px', height: '18px', accentColor: 'var(--accent)', cursor: 'pointer' }}
    />
  </div>
);
