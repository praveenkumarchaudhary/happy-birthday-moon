import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, Heart, RotateCcw, ArrowRight, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import BirthdayCake from './BirthdayCake';
import {
  playCandleBlowSound,
  playKnifeSliceSound,
  playCelebrationSound,
} from '../utils/audioEffects';

export default function CakeCutting({ friendName, onContinueToNext }) {
  // Stages: 'LIT' -> 'WISHED' -> 'CUTTING' -> 'CUT'
  const [stage, setStage] = useState('LIT');
  const [wishText, setWishText] = useState('');

  // Handle "Make a Wish"
  const handleMakeWish = () => {
    if (stage !== 'LIT') return;

    playCandleBlowSound();

    // Trigger subtle sparkle dust around the cake
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#ffd166', '#ffffff', '#e0aaff'],
      scalar: 0.8,
    });

    setStage('WISHED');
    setWishText('Your wish has ascended to the stars! ✨ Now slice the birthday cake!');
  };

  // Handle "Cut the Cake"
  const handleStartCutting = () => {
    if (stage !== 'WISHED') return;

    setStage('CUTTING');

    // Trigger knife slice sound right at the middle of slicing action
    setTimeout(() => {
      playKnifeSliceSound();
    }, 600);
  };

  // Called when knife animation finishes slicing down
  const handleKnifeComplete = () => {
    setStage('CUT');
    playCelebrationSound();

    // Full celebratory confetti explosion!
    const count = 120;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#ff7597', '#c77dff', '#ffd166', '#ffffff', '#ff4d8d', '#70d6ff'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  // Reset to cut again
  const handleReset = () => {
    setStage('LIT');
    setWishText('');
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '20px 10px',
      }}
    >
      {/* Interactive Helper Banner / Step Instruction */}
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '8px 22px',
          borderRadius: '999px',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#ffffff',
          marginBottom: '20px',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
        }}
      >
        {stage === 'LIT' && (
          <>
            <Sparkles size={16} color="#ffd166" className="animate-twinkle" />
            <span>Step 1: Close your eyes & Make a Wish ✨</span>
          </>
        )}
        {stage === 'WISHED' && (
          <>
            <Utensils size={16} color="#ff7597" />
            <span>Step 2: Grab the knife & cut your cake! 🎂</span>
          </>
        )}
        {stage === 'CUTTING' && (
          <>
            <Sparkles size={16} color="#ffffff" className="animate-twinkle" />
            <span>Making the sweetest cut... 🍰</span>
          </>
        )}
        {stage === 'CUT' && (
          <>
            <PartyPopper size={16} color="#ffd166" />
            <span>Cake is ready to be shared with love! ❤️</span>
          </>
        )}
      </motion.div>

      {/* 3D Realistic Birthday Cake Component */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <BirthdayCake
          candlesLit={stage === 'LIT'}
          isCutting={stage === 'CUTTING'}
          isCut={stage === 'CUT'}
          onKnifeComplete={handleKnifeComplete}
        />
      </div>

      {/* Action Buttons & Status Messages */}
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          zIndex: 20,
        }}
      >
        {/* Step 1: Make a Wish Button */}
        {stage === 'LIT' && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMakeWish}
            className="btn-primary"
            style={{
              fontSize: '1.15rem',
              padding: '14px 38px',
              background: 'linear-gradient(135deg, #ffd166 0%, #ff7597 100%)',
              color: '#240046',
              fontWeight: 800,
              boxShadow: '0 8px 25px rgba(255, 209, 102, 0.4), 0 0 15px rgba(255, 117, 151, 0.4)',
            }}
          >
            <Sparkles size={20} />
            <span>Make a Wish ✨</span>
          </motion.button>
        )}

        {/* Step 2: Cut the Cake Button */}
        {stage === 'WISHED' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
            transition={{
              scale: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
              opacity: { duration: 0.4 },
            }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartCutting}
              className="btn-primary"
              style={{
                fontSize: '1.25rem',
                padding: '16px 44px',
                background: 'linear-gradient(135deg, #ff4d8d 0%, #9d4edd 100%)',
                boxShadow: '0 10px 30px rgba(255, 77, 141, 0.5), 0 0 25px rgba(157, 78, 221, 0.6)',
              }}
            >
              <Utensils size={22} />
              <span>Cut the Cake 🎂</span>
            </motion.button>

            {wishText && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontSize: '0.95rem',
                  color: '#ffd166',
                  fontStyle: 'italic',
                }}
              >
                {wishText}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Cutting in progress spinner/indicator */}
        {stage === 'CUTTING' && (
          <div
            style={{
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Sparkles size={20} className="animate-twinkle" color="#ffd166" />
            <span>Slicing with extra love...</span>
          </div>
        )}

        {/* Step 3: Celebration Message after cutting */}
        {stage === 'CUT' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px',
            }}
          >
            {/* Required user message */}
            <div
              className="glass-panel"
              style={{
                padding: '16px 28px',
                border: '2px solid rgba(255, 117, 151, 0.5)',
                background: 'rgba(255, 255, 255, 0.12)',
                boxShadow: '0 12px 35px rgba(255, 77, 141, 0.35)',
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 3.5vw, 1.7rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Yayyy! We finally cut your birthday cake!</span>
                <Heart size={24} color="#ff4d8d" fill="#ff4d8d" />
              </h3>
              <p style={{ color: '#e0aaff', fontSize: '0.95rem', marginTop: '6px' }}>
                First sweet slice is reserved exclusively for you, {friendName}! 🍰✨
              </p>
            </div>

            {/* Buttons: Replay Cut or Continue */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={handleReset}
                className="btn-secondary"
                style={{ fontSize: '0.9rem' }}
                title="Cut the cake again"
              >
                <RotateCcw size={16} />
                <span>Cut Again ↺</span>
              </button>

              {onContinueToNext && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onContinueToNext}
                  className="btn-primary"
                  style={{
                    fontSize: '1.05rem',
                    padding: '12px 28px',
                  }}
                >
                  <span>Special Letter 💌</span>
                  <ArrowRight size={18} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
