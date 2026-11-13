import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Edit3, Check, ArrowRight } from 'lucide-react';
import {
  playEnvelopeOpenSound,
  playTypewriterSound,
} from '../utils/audioEffects';

export default function BirthdayLetter({ data, onContinueToNext }) {
  const initialLetter = data.letter || {};

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Letter content state
  const [salutation, setSalutation] = useState(
    initialLetter.salutation || 'Dear Moon, ❤️'
  );
  const [paragraphs, setParagraphs] = useState(
    initialLetter.paragraphs || [
      'First of all, Happiest Birthday to you! 🎂💕',
      "I don't know where to start because sometimes words are not enough to express how special someone is. But today, I just want to tell you how much you mean to me.",
      "You are not just my best friend; you are someone who makes my life a little more beautiful. I'm so lucky to have you in my life. Thank you for being there, for making me smile, for listening to me, and for creating so many beautiful memories with me.",
      'I may not say it every day, but you genuinely mean a lot to me. I hope you never forget how special, beautiful, and important you are. I wish I could give you all the happiness in the world because you truly deserve it.',
      'May all your dreams come true. May you always keep smiling, achieve everything you wish for, and never lose the beautiful person you are.',
      "And remember, no matter how far life takes us or how busy we become, you'll always have a special place in my heart.",
      'One more thing...',
      'If I could choose my best friend a thousand times, I would still choose you every single time. 🥹❤️',
      'Once again, Happy Birthday, Moon! 🌙',
    ]
  );
  const [closing, setClosing] = useState(
    initialLetter.closing || 'With lots of love,'
  );
  const [signature, setSignature] = useState(
    initialLetter.signature || 'Your Best Friend ❤️'
  );

  // Typewriter effect state
  const fullText = paragraphs.join('\n\n');
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Open Envelope
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    playEnvelopeOpenSound();
    setDisplayedText('');
    setIsTypingDone(false);
    setIsOpen(true);
  };

  // Run typewriter effect when envelope opens
  useEffect(() => {
    if (!isOpen || isEditing) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));

      // Occasional typewriter tap sound
      if (index % 6 === 0) {
        playTypewriterSound();
      }

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [isOpen, isEditing, fullText]);

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
    setIsTypingDone(true);
  };

  return (
    <section
      id="letter-section"
      className="section-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '60px',
        paddingBottom: '80px',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Section Header */}
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
            <Mail size={16} />
            <span>Special Message</span>
            <Sparkles size={16} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              marginBottom: '10px',
            }}
          >
            <span className="text-gradient-magic">A Letter Written from the Heart</span>
          </motion.h2>

          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.05rem' }}>
            {!isOpen
              ? 'There is a sealed envelope waiting for you. Tap to open it! 💌'
              : 'Every single word was written just for you.'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 3D ENVELOPE / LETTER CONTAINER */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'relative',
            minHeight: isOpen ? 'auto' : '360px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* CLOSED ENVELOPE (Click to Open) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0, y: -40 }}
                whileHover={{ scale: 1.04, rotate: [-1, 1, -1] }}
                onClick={handleOpenEnvelope}
                style={{
                  position: 'relative',
                  width: '320px',
                  height: '220px',
                  cursor: 'pointer',
                  perspective: 1000,
                }}
              >
                {/* Glow behind envelope */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-10px',
                    background: 'radial-gradient(circle, rgba(255, 105, 180, 0.4) 0%, rgba(157, 78, 221, 0.3) 60%, transparent 80%)',
                    filter: 'blur(20px)',
                    borderRadius: '20px',
                    animation: 'pulseGlow 2s infinite',
                  }}
                />

                {/* Envelope Body */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f8edeb 0%, #fae1dd 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {/* Flap Folds (SVG lines) */}
                  <svg
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    viewBox="0 0 320 220"
                  >
                    {/* Bottom triangle fold */}
                    <polygon points="0,220 160,110 320,220" fill="#fcd5ce" opacity="0.7" />
                    {/* Left triangle fold */}
                    <polygon points="0,0 0,220 160,110" fill="#f8edeb" opacity="0.8" />
                    {/* Right triangle fold */}
                    <polygon points="320,0 320,220 160,110" fill="#f8edeb" opacity="0.6" />
                    {/* Top envelope flap closed */}
                    <polygon points="0,0 320,0 160,115" fill="#fec5bb" />
                  </svg>

                  {/* Wax Seal on Center */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '115px',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 30%, #e63946 0%, #9e2a2b 80%)',
                      boxShadow: '0 6px 16px rgba(158, 42, 43, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      border: '2px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    <Heart size={26} color="#ffe5ec" fill="#ffe5ec" />
                  </div>
                </div>

                {/* Tap Prompt Below */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-45px',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    color: '#ffd166',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                  }}
                >
                  <span className="animate-pulse-glow">✨ Tap to open the wax seal ✨</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OPENED LETTER CARD */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: '720px',
                  background: 'linear-gradient(180deg, #fffdfa 0%, #fff9f0 100%)',
                  borderRadius: '20px',
                  padding: '40px 36px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(255, 105, 180, 0.25)',
                  position: 'relative',
                  textAlign: 'left',
                  color: '#2d3142',
                  border: '1px solid rgba(212, 163, 115, 0.4)',
                }}
              >
                {/* Decorative Vintage Stamp & Wax Seal on Opened Letter */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '52px',
                      border: '2px dashed #b5838d',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b5838d',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>BESTIE</span>
                    <Heart size={14} color="#e63946" fill="#e63946" style={{ margin: '2px 0' }} />
                    <span>FOREVER</span>
                  </div>

                  {/* Toggle Edit Button */}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: isEditing ? '#ff4d8d' : 'rgba(0,0,0,0.06)',
                      color: isEditing ? '#ffffff' : '#555555',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    title="Personalize this letter"
                  >
                    {isEditing ? <Check size={14} /> : <Edit3 size={14} />}
                    <span>{isEditing ? 'Done Editing' : 'Edit Letter ✏️'}</span>
                  </button>
                </div>

                {/* Salutation */}
                {isEditing ? (
                  <input
                    type="text"
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    style={{
                      fontSize: '1.8rem',
                      fontFamily: 'var(--font-script)',
                      color: '#d90429',
                      fontWeight: 700,
                      border: '1px dashed #d90429',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      width: '100%',
                      background: 'rgba(255,255,255,0.7)',
                      marginBottom: '20px',
                    }}
                  />
                ) : (
                  <h3
                    className="font-script"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                      color: '#d90429',
                      fontWeight: 700,
                      marginBottom: '20px',
                    }}
                  >
                    {salutation}
                  </h3>
                )}

                {/* Letter Body: Typewriter or Editable Text */}
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <textarea
                      rows={8}
                      value={paragraphs.join('\n\n')}
                      onChange={(e) => setParagraphs(e.target.value.split('\n\n'))}
                      style={{
                        width: '100%',
                        fontSize: '1.05rem',
                        lineHeight: 1.8,
                        color: '#2d3142',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px dashed #9d4edd',
                        background: '#ffffff',
                        fontFamily: 'var(--font-main)',
                      }}
                    />
                    <small style={{ color: '#666', fontStyle: 'italic' }}>
                      Tip: Separate paragraphs with a blank line. You can also edit permanently in
                      src/config/birthdayData.js!
                    </small>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                      lineHeight: 1.85,
                      color: '#3d405b',
                      whiteSpace: 'pre-line',
                      minHeight: '180px',
                    }}
                  >
                    {displayedText}
                    {!isTypingDone && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '1.2em',
                          backgroundColor: '#ff4d8d',
                          verticalAlign: 'text-bottom',
                          marginLeft: '3px',
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Skip Typewriter button (shows if still typing) */}
                {!isEditing && !isTypingDone && (
                  <div style={{ marginTop: '14px', textAlign: 'right' }}>
                    <button
                      onClick={handleSkipTyping}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#9d4edd',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Show Full Letter ⚡
                    </button>
                  </div>
                )}

                {/* Closing and Signature */}
                <div style={{ marginTop: '36px', textAlign: 'right' }}>
                  {isEditing ? (
                    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '6px' }}>
                      <input
                        type="text"
                        value={closing}
                        onChange={(e) => setClosing(e.target.value)}
                        style={{
                          fontSize: '1rem',
                          fontStyle: 'italic',
                          color: '#666',
                          border: '1px dashed #666',
                          borderRadius: '4px',
                          padding: '4px',
                        }}
                      />
                      <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        style={{
                          fontSize: '1.8rem',
                          fontFamily: 'var(--font-script)',
                          color: '#d90429',
                          border: '1px dashed #d90429',
                          borderRadius: '4px',
                          padding: '4px',
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#666' }}>
                        {closing}
                      </p>
                      <h4
                        className="font-script"
                        style={{
                          fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                          color: '#d90429',
                          marginTop: '4px',
                        }}
                      >
                        {signature}
                      </h4>
                    </>
                  )}
                </div>

                {/* Continue to Final Surprise Button */}
                {onContinueToNext && !isEditing && (
                  <div style={{ marginTop: '28px', textAlign: 'center' }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onContinueToNext}
                      className="btn-primary"
                      style={{
                        fontSize: '1rem',
                        padding: '12px 28px',
                      }}
                    >
                      <span>Final Surprise Awaits 🎁</span>
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
