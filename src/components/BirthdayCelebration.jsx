import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import CakeCutting from './CakeCutting';

export default function BirthdayCelebration({
  data,
  onContinueToNext,
}) {
  const friendName = data.friendName || 'Bestie';

  return (
    <section
      id="celebration-section"
      className="section-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        paddingTop: '40px',
        paddingBottom: '60px',
      }}
    >
      <div className="container">
        {/* Subtitle / Nickname Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '6px 20px',
            borderRadius: '999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#ffd166',
            marginBottom: '16px',
            boxShadow: '0 4px 15px rgba(255, 209, 102, 0.2)',
          }}
        >
          <Sparkles size={16} />
          <span>{data.nickname || 'Forever Bestie'}</span>
          <Sparkles size={16} />
        </motion.div>

        {/* Large Animated Heading: "Happy Birthday, [BEST FRIEND NAME]! ❤️" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            lineHeight: 1.15,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span className="text-gradient-magic">
            {data.celebration?.titlePrefix || 'Happy Birthday,'} {friendName}!
          </span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ display: 'inline-flex', verticalAlign: 'middle' }}
          >
            <Heart size={44} color="#ff4d8d" fill="#ff4d8d" />
          </motion.span>
        </motion.h1>

        {/* Celebratory Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          {data.celebration?.tagline ||
            "Today is all about YOU! Let's celebrate the sweetest, funniest, and most amazing soul on earth."}
        </motion.p>

        {/* Interactive 3D Cake & Cake Cutting Experience */}
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <CakeCutting
            friendName={friendName}
            onContinueToNext={onContinueToNext}
          />
        </div>
      </div>
    </section>
  );
}

