import React, { useState } from 'react';
import { Award, X, Edit2 } from 'lucide-react';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('Bunny Master 🐰');
  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    rating: 1250,
    wins: 14,
    losses: 6,
    draws: 2
  };

  const achievements = [
    { title: 'First Mate 👑', desc: 'Delivered your first checkmate' },
    { title: 'AI Slayer 🤖', desc: 'Defeated Hard AI bot' },
    { title: 'Speedy Bunny ⚡', desc: 'Won a blitz duel under 2 mins' },
    { title: 'Tactics Fan 🧩', desc: 'Solved 10 tactical puzzles' }
  ];

  return (
    <div className="modal-overlay">
      <div
        className="bunny-card"
        style={{
          width: '90%',
          maxWidth: '440px',
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

        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF4FA3, #FF7AC1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: 'var(--shadow-glow)',
            fontSize: '2rem'
          }}
        >
          🐰
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                textAlign: 'center',
                borderRadius: '8px',
                border: '1px solid var(--accent)',
                padding: '0.2rem 0.5rem'
              }}
            />
          ) : (
            <span
              style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', cursor: 'pointer' }}
              onClick={() => setIsEditing(true)}
            >
              {username} <Edit2 size={14} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', width: '100%' }}>
          <div className="bunny-card" style={{ padding: '0.6rem', background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' }}>{stats.rating}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>Rating</div>
          </div>

          <div className="bunny-card" style={{ padding: '0.6rem', background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2E7D32' }}>{stats.wins}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>Wins</div>
          </div>

          <div className="bunny-card" style={{ padding: '0.6rem', background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#C62828' }}>{stats.losses}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>Losses</div>
          </div>

          <div className="bunny-card" style={{ padding: '0.6rem', background: 'var(--bg-secondary)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F57C00' }}>{stats.draws}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>Draws</div>
          </div>
        </div>

        <div style={{ width: '100%', textAlign: 'left' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={18} /> Badges & Achievements
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {achievements.map((ach, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '0.55rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{ach.title}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ach.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
