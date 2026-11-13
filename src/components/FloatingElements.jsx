import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playBalloonPopSound } from '../utils/audioEffects';

const BALLOON_COLORS = [
  { main: '#ff7597', highlight: '#ffb5d5', glow: 'rgba(255, 117, 151, 0.4)' },
  { main: '#c77dff', highlight: '#e0aaff', glow: 'rgba(199, 125, 255, 0.4)' },
  { main: '#9d4edd', highlight: '#d09eff', glow: 'rgba(157, 78, 221, 0.4)' },
  { main: '#ff9ebb', highlight: '#ffd6e7', glow: 'rgba(255, 158, 187, 0.4)' },
  { main: '#ffd166', highlight: '#ffe8a3', glow: 'rgba(255, 209, 102, 0.4)' },
  { main: '#70d6ff', highlight: '#b8eeff', glow: 'rgba(112, 214, 255, 0.4)' },
];

export default function FloatingElements() {
  const [balloons, setBalloons] = useState(() =>
    Array.from({ length: 9 }).map((_, idx) => ({
      id: `balloon-${idx}-${Date.now()}`,
      color: BALLOON_COLORS[idx % BALLOON_COLORS.length],
      left: 4 + idx * 11.5 + (Math.random() * 4 - 2),
      size: 46 + Math.random() * 22,
      duration: 16 + Math.random() * 10,
      delay: -(Math.random() * 20),
      swingDuration: 3 + Math.random() * 2.5,
    }))
  );

  const [sparkles] = useState(() =>
    Array.from({ length: 24 }).map((_, idx) => ({
      id: `star-${idx}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
      type: Math.random() > 0.4 ? 'star' : 'heart',
    }))
  );

  const popBalloon = (e, id) => {
    e.stopPropagation();
    playBalloonPopSound();

    // Trigger mini confetti at balloon click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 22,
      spread: 60,
      startVelocity: 25,
      origin: { x, y },
      colors: ['#ff7597', '#c77dff', '#ffd166', '#ffffff'],
      disableForReducedMotion: true,
    });

    // Remove popped balloon and respawn another from bottom after delay
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setTimeout(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: `balloon-respawn-${Date.now()}-${Math.random()}`,
          color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          left: Math.random() * 90 + 5,
          size: 46 + Math.random() * 22,
          duration: 18 + Math.random() * 8,
          delay: 0,
          swingDuration: 3 + Math.random() * 2,
        },
      ]);
    }, 1500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      {/* Background Star & Heart Dust */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            fontSize: `${s.size * 2}px`,
            color: s.type === 'heart' ? '#ff7597' : '#ffd166',
            opacity: 0.35,
            animation: `twinkle ${s.duration}s infinite ease-in-out ${s.delay}s`,
            textShadow: s.type === 'heart' ? '0 0 10px #ff6584' : '0 0 10px #ffd166',
          }}
        >
          {s.type === 'heart' ? '♥' : '✦'}
        </div>
      ))}

      {/* Interactive Floating Balloons */}
      {balloons.map((b) => (
        <div
          key={b.id}
          onClick={(e) => popBalloon(e, b.id)}
          title="Click to pop me! 🎈"
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            bottom: '-120px',
            width: `${b.size}px`,
            height: `${b.size * 1.25}px`,
            pointerEvents: 'auto',
            cursor: 'pointer',
            animation: `balloonFloat ${b.duration}s linear infinite ${b.delay}s`,
            filter: `drop-shadow(0 8px 16px ${b.color.glow})`,
            transition: 'transform 0.2s ease',
          }}
          className="balloon-hover"
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              animation: `balloonSway ${b.swingDuration}s ease-in-out infinite alternate`,
              position: 'relative',
            }}
          >
            {/* Balloon Body */}
            <div
              style={{
                width: '100%',
                height: '88%',
                borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
                background: `radial-gradient(circle at 35% 30%, ${b.color.highlight} 0%, ${b.color.main} 70%)`,
                position: 'relative',
                boxShadow: `inset -4px -4px 10px rgba(0,0,0,0.18), inset 4px 4px 10px rgba(255,255,255,0.4)`,
              }}
            >
              {/* Highlight Glint */}
              <div
                style={{
                  position: 'absolute',
                  top: '14%',
                  left: '20%',
                  width: '26%',
                  height: '35%',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.45)',
                  transform: 'rotate(-25deg)',
                  filter: 'blur(1px)',
                }}
              />
            </div>

            {/* Balloon Knot */}
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
                height: '6px',
                backgroundColor: b.color.main,
                borderRadius: '3px',
              }}
            />

            {/* Balloon String */}
            <svg
              style={{
                position: 'absolute',
                top: '90%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '18px',
                height: '55px',
                overflow: 'visible',
              }}
            >
              <path
                d="M 9 0 Q 3 20 9 35 T 9 55"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes balloonFloat {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-135vh);
          }
        }
        @keyframes balloonSway {
          0% {
            transform: rotate(-6deg);
          }
          100% {
            transform: rotate(6deg);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.3);
          }
        }
        .balloon-hover:hover {
          transform: scale(1.18);
        }
      `}</style>
    </div>
  );
}
