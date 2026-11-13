import React, { useState } from 'react';
import { Cake, Camera, Mail, Heart, Gift, Menu, X, Sparkles } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function NavigationBar({ data, activeSection, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'celebration-section', label: 'Cake & Wish', icon: Cake },
    { id: 'memories-section', label: 'Memories', icon: Camera },
    { id: 'letter-section', label: 'Heart Letter', icon: Mail },
    { id: 'friendship-section', label: 'Friendship', icon: Heart },
    { id: 'final-surprise-section', label: 'Surprise', icon: Gift },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          background: 'rgba(20, 5, 35, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '999px',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35), 0 0 15px rgba(157, 78, 221, 0.15)',
          pointerEvents: 'auto',
        }}
      >
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick('celebration-section')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff4d8d, #9d4edd)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(255, 77, 141, 0.5)',
            }}
          >
            <Sparkles size={16} color="#fff" />
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: '1rem',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {data.friendName}’s Day 🎂
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isActive ? 'rgba(255, 77, 141, 0.25)' : 'transparent',
                  border: isActive
                    ? '1px solid rgba(255, 117, 151, 0.5)'
                    : '1px solid transparent',
                  color: isActive ? '#ffd166' : 'rgba(255, 255, 255, 0.8)',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={14} color={isActive ? '#ffd166' : '#ff7597'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Music Player & Mobile Menu Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AudioPlayer
            customAudioPath={data.audio?.customAudioPath}
            songTitle={data.audio?.songTitle}
          />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '20px',
            right: '20px',
            background: 'rgba(20, 5, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            pointerEvents: 'auto',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <Icon size={18} color="#ff7597" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}

