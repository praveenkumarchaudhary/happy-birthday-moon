import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playGiftOpenSound, startBirthdayMusic } from '../utils/audioEffects';

export default function WelcomeScreen({ data, onOpenSurprise }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    playGiftOpenSound();

    // Trigger birthday music synthesis on first user interaction
    try {
      startBirthdayMusic();
    } catch (e) {
      console.log('Music start on interaction', e);
    }

    // Festive confetti blast
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff7597', '#c77dff', '#ffd166', '#ffffff', '#e0aaff'],
    });

    setTimeout(() => {
      onOpenSurprise();
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        zIndex: 10,
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199, 125, 255, 0.22) 0%, rgba(255, 101, 132, 0.1) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          padding: '8px 20px',
          borderRadius: '999px',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#e0aaff',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(157, 78, 221, 0.25)',
        }}
      >
        <Sparkles size={16} color="#ffd166" className="animate-twinkle" />
        <span>{data.welcome?.badge || '✨ Top Secret Surprise ✨'}</span>
        <Sparkles size={16} color="#ffd166" className="animate-twinkle" />
      </motion.div>

      {/* Main Greeting Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          lineHeight: 1.15,
        }}
      >
        <span className="text-gradient-magic">
          {data.welcome?.greeting || `Hey Moon`}
        </span>
      </motion.h1>

      {/* Sweet Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{
          fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
          maxWidth: '560px',
          color: 'rgba(255, 255, 255, 0.85)',
          marginBottom: '40px',
          fontWeight: 400,
        }}
      >
        {data.welcome?.message || 'Someone has prepared a special surprise for you...'}
      </motion.p>

      {/* 3D Animated Gift Box */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
        style={{
          position: 'relative',
          cursor: isOpening ? 'default' : 'pointer',
          marginBottom: '48px',
          perspective: 1000,
        }}
        onClick={handleOpen}
        whileHover={!isOpening ? { scale: 1.08, rotate: [0, -3, 3, 0] } : {}}
      >
        {/* Glow halo behind gift */}
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(circle, rgba(255, 117, 151, 0.5) 0%, rgba(199, 125, 255, 0.3) 50%, transparent 70%)',
            filter: 'blur(20px)',
            borderRadius: '50%',
            animation: 'pulseGlow 2.5s infinite',
          }}
        />

        {/* Gift Box Container */}
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {/* Animated Ribbon Bow on Top */}
          <motion.div
            animate={
              isOpening
                ? { y: -120, opacity: 0, scale: 1.3, rotate: 20 }
                : { y: [0, -4, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.7, ease: 'easeOut' }
                : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
            }
            style={{
              position: 'relative',
              zIndex: 3,
              marginBottom: '-6px',
            }}
          >
            {/* Bow loops */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div
                style={{
                  width: '32px',
                  height: '24px',
                  borderRadius: '50% 50% 10% 50%',
                  background: 'linear-gradient(135deg, #ffd166, #f4a261)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  transform: 'rotate(-25deg)',
                }}
              />
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#ffe382',
                  boxShadow: '0 0 10px #ffd166',
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  width: '32px',
                  height: '24px',
                  borderRadius: '50% 50% 50% 10%',
                  background: 'linear-gradient(135deg, #f4a261, #ffd166)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  transform: 'rotate(25deg)',
                }}
              />
            </div>
          </motion.div>

          {/* Gift Box Lid */}
          <motion.div
            animate={
              isOpening
                ? { y: -80, rotate: -25, opacity: 0 }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              width: '186px',
              height: '38px',
              background: 'linear-gradient(135deg, #ff4d8d 0%, #d81159 100%)',
              borderRadius: '8px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Vertical Golden Ribbon on Lid */}
            <div
              style={{
                width: '32px',
                height: '100%',
                background: 'linear-gradient(to right, #ffd166, #fff3b0, #f4a261)',
                boxShadow: '0 0 8px rgba(255, 209, 102, 0.6)',
              }}
            />
          </motion.div>

          {/* Gift Box Base */}
          <motion.div
            animate={
              isOpening
                ? { scaleY: 0.9, scaleX: 1.05 }
                : { scale: 1 }
            }
            transition={{ duration: 0.4 }}
            style={{
              width: '160px',
              height: '120px',
              background: 'linear-gradient(135deg, #ff6584 0%, #9d4edd 100%)',
              borderRadius: '0 0 16px 16px',
              boxShadow: '0 16px 35px rgba(0, 0, 0, 0.45)',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Vertical Golden Ribbon on Body */}
            <div
              style={{
                width: '32px',
                height: '100%',
                background: 'linear-gradient(to right, #ffd166, #fff3b0, #f4a261)',
                boxShadow: '0 0 10px rgba(255, 209, 102, 0.4)',
              }}
            />

            {/* Horizontal Golden Ribbon on Body */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: 0,
                width: '100%',
                height: '24px',
                background: 'linear-gradient(to bottom, #ffd166, #f4a261)',
              }}
            />

            {/* Light beam burst inside when opening */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(ellipse at top, #fff, #ffd166, transparent)',
                    mixBlendMode: 'screen',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Button: "Open Your Surprise 🎁" */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        disabled={isOpening}
        className="btn-primary"
        style={{
          fontSize: '1.2rem',
          padding: '16px 42px',
        }}
      >
        <Gift size={22} />
        <span>{isOpening ? 'Unwrapping Magic... ✨' : data.welcome?.buttonText || 'Open Your Surprise 🎁'}</span>
      </motion.button>
    </div>
  );
}
