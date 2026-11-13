import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  RotateCcw,
  PartyPopper,
  X,
  Share2,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FireworksCanvas from './FireworksCanvas';
import { playGiftOpenSound, playCelebrationSound } from '../utils/audioEffects';

export default function FinalSurprise({ data, onReplayJourney }) {
  const surprise = data.finalSurprise || {};
  const [isOpen, setIsOpen] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleOpenMysteryBox = () => {
    playGiftOpenSound();
    setIsOpen(true);

    // Initial fanfare confetti blast
    setTimeout(() => {
      playCelebrationSound();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d8d', '#c77dff', '#ffd166', '#ffffff', '#70d6ff'],
      });
    }, 400);
  };

  const handleSendHug = () => {
    setHugCount((c) => c + 1);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff7597', '#ffb5d5', '#ffffff'],
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="final-surprise-section"
      className="section-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '60px',
        paddingBottom: '100px',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Section Heading */}
        <div style={{ marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '6px 20px',
              borderRadius: '999px',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#ffd166',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={16} />
            <span>Grand Finale</span>
            <Sparkles size={16} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              marginBottom: '12px',
            }}
          >
            <span className="text-gradient-magic">One Last Magical Surprise</span>
          </motion.h2>

          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.1rem' }}>
            {surprise.mysteryPrompt ||
              "Wait... there's one final mystery gift waiting just for you! ✨"}
          </p>
        </div>

        {/* ============================================================== */}
        {/* MYSTERIOUS FINAL GIFT BOX */}
        {/* ============================================================== */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenMysteryBox}
          style={{
            position: 'relative',
            cursor: 'pointer',
            display: 'inline-block',
            margin: '20px 0 40px',
          }}
        >
          {/* Intense Cosmic Glow Aura */}
          <div
            style={{
              position: 'absolute',
              inset: '-25px',
              background:
                'radial-gradient(circle, rgba(255, 105, 180, 0.5) 0%, rgba(157, 78, 221, 0.4) 50%, transparent 75%)',
              filter: 'blur(28px)',
              borderRadius: '50%',
              animation: 'pulseGlow 2s infinite',
            }}
          />

          {/* Mysterious Box Body */}
          <div
            style={{
              position: 'relative',
              width: '170px',
              height: '170px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #7928ca 0%, #ff0080 100%)',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Glowing ribbons crossing */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '32px',
                background: 'linear-gradient(to right, #ffd166, #fff3b0, #f4a261)',
                boxShadow: '0 0 12px rgba(255, 209, 102, 0.7)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '32px',
                background: 'linear-gradient(to bottom, #ffd166, #f4a261)',
                boxShadow: '0 0 12px rgba(255, 209, 102, 0.7)',
              }}
            />

            {/* Sparkling Heart / Star on Top */}
            <div
              style={{
                zIndex: 5,
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              }}
            >
              <Heart size={30} color="#ff0080" fill="#ff0080" />
            </div>
          </div>

          <p
            style={{
              color: '#ffd166',
              fontWeight: 700,
              fontSize: '1.05rem',
              marginTop: '16px',
            }}
            className="animate-pulse-glow"
          >
            {surprise.boxLabel || 'Tap to Unlock Final Grand Surprise 🎁'}
          </p>
        </motion.div>

        {/* Footer Credit & Love Note */}
        <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem' }}>
          {surprise.shareMessage || `Made with all my love for my best friend! 💖`}
        </p>
      </div>

      {/* ============================================================== */}
      {/* FULL-SCREEN BIRTHDAY CELEBRATION MODAL */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              background: 'rgba(10, 2, 20, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Realtime Canvas Fireworks Engine in Background */}
            <FireworksCanvas />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close celebration"
              style={{
                position: 'fixed',
                top: '24px',
                right: '24px',
                zIndex: 100,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <X size={22} />
            </button>

            {/* Central Celebration Content Card */}
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="glass-panel"
              style={{
                position: 'relative',
                zIndex: 60,
                maxWidth: '680px',
                width: '100%',
                padding: '48px 36px',
                textAlign: 'center',
                border: '2px solid rgba(255, 117, 151, 0.5)',
                background: 'rgba(20, 5, 35, 0.75)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(255, 105, 180, 0.4)',
                borderRadius: '28px',
                pointerEvents: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Party icon */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff4d8d, #ffd166)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 0 25px rgba(255, 77, 141, 0.6)',
                }}
              >
                <PartyPopper size={32} color="#ffffff" />
              </div>

              {/* Required Exact Headline & Subheadline */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 900,
                  marginBottom: '14px',
                  lineHeight: 1.2,
                }}
              >
                <span className="text-gradient-magic">
                  Happy Birthday Once Again, Bestie!
                </span>
              </motion.h2>

              <p
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <span>You Deserve All the Happiness in the World.</span>
                <Heart size={26} color="#ff4d8d" fill="#ff4d8d" />
              </p>

              {/* Sweet Birthday Wishes Bullet Points */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  textAlign: 'left',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '18px 24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  marginBottom: '30px',
                }}
              >
                {(
                  surprise.wishes || [
                    '✨ May your year be filled with unforgettable adventures',
                    '🌸 May your heart always be as full and glowing as today',
                    '💫 Keep shining bright and never stop being your authentic wonderful self!',
                  ]
                ).map((wish, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: '0.98rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: 1.5,
                    }}
                  >
                    {wish}
                  </p>
                ))}
              </div>

              {/* Interactive Celebration Controls */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Virtual Hug Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendHug}
                  className="btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #ff7597, #ff4d8d)',
                    fontSize: '1rem',
                  }}
                >
                  <Heart size={18} fill="#ffffff" />
                  <span>Send a Virtual Hug 🤗 {hugCount > 0 ? `(${hugCount})` : ''}</span>
                </motion.button>

                {/* Replay Entire Journey Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(false);
                    if (onReplayJourney) onReplayJourney();
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '1rem' }}
                >
                  <RotateCcw size={18} />
                  <span>{surprise.replayButton || 'Replay the Journey 🔄'}</span>
                </motion.button>

                {/* Share Link Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyLink}
                  className="btn-secondary"
                  style={{ fontSize: '1rem' }}
                >
                  {copied ? <Check size={18} color="#70e000" /> : <Share2 size={18} />}
                  <span>{copied ? 'Link Copied! 💖' : 'Share Surprise 🔗'}</span>
                </motion.button>
              </div>

              <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#ffd166' }}>
                💡 Tip: Tap anywhere on the background to launch custom fireworks! 🎆
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
