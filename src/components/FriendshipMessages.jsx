import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  HeartHandshake,
  Smile,
  Stars,
  Award,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Sparkles: Sparkles,
  HeartHandshake: HeartHandshake,
  Smile: Smile,
  Stars: Stars,
};

export default function FriendshipMessages({ data }) {
  const messages = data.friendshipMessages || [];
  const perks = data.bestiePerks || [];
  const [redeemedVouchers, setRedeemedVouchers] = useState({});

  const handleRedeemVoucher = (idx) => {
    if (redeemedVouchers[idx]) return;

    setRedeemedVouchers((prev) => ({ ...prev, [idx]: true }));

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff7597', '#c77dff', '#ffd166'],
    });
  };

  return (
    <section
      id="friendship-section"
      className="section-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '60px',
        paddingBottom: '80px',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
              color: '#c77dff',
              marginBottom: '14px',
            }}
          >
            <Heart size={16} color="#ff4d8d" fill="#ff4d8d" />
            <span>Why You Mean The World To Me</span>
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
            <span className="text-gradient-purple">Four Truths About Our Bond</span>
          </motion.h2>

          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
            Friendships like ours happen once in a lifetime, and I celebrate you every single day.
          </p>
        </div>

        {/* 4 Core Required Friendship Message Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '60px',
          }}
        >
          {messages.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || Sparkles;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card"
                style={{
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Glow accent bubble */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background:
                      idx === 0
                        ? 'rgba(255, 105, 180, 0.25)'
                        : idx === 1
                        ? 'rgba(157, 78, 221, 0.25)'
                        : idx === 2
                        ? 'rgba(255, 209, 102, 0.25)'
                        : 'rgba(112, 214, 255, 0.25)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Icon Badge */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <IconComponent size={26} color="#ffd166" />
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '10px',
                  }}
                >
                  {item.title}
                </h3>

                {/* Card Message */}
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.82)',
                    flex: 1,
                  }}
                >
                  {item.message}
                </p>

                {/* Decorative bottom bar */}
                <div
                  style={{
                    width: '40px',
                    height: '3px',
                    borderRadius: '2px',
                    background: 'linear-gradient(to right, #ff4d8d, #9d4edd)',
                    marginTop: '20px',
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE BESTIE VOUCHERS / PERKS */}
        {/* ============================================================== */}
        {perks.length > 0 && (
          <div
            className="glass-panel"
            style={{
              padding: '36px 30px',
              border: '1px solid rgba(199, 125, 255, 0.3)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ffd166',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px',
                }}
              >
                <Award size={18} />
                <span>Special Best Friend Vouchers</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                Tap Any Voucher to Redeem Instantly! 🎟️
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
              }}
            >
              {perks.map((p, idx) => {
                const isRedeemed = redeemedVouchers[idx];

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRedeemVoucher(idx)}
                    style={{
                      background: isRedeemed
                        ? 'linear-gradient(135deg, rgba(56, 176, 0, 0.25), rgba(255, 255, 255, 0.08))'
                        : 'rgba(255, 255, 255, 0.06)',
                      border: isRedeemed
                        ? '1px solid #70e000'
                        : '1px dashed rgba(255, 255, 255, 0.3)',
                      borderRadius: '16px',
                      padding: '18px 16px',
                      cursor: isRedeemed ? 'default' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '8px',
                        }}
                      >
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                          {p.title}
                        </h4>
                        {isRedeemed ? (
                          <CheckCircle2 size={18} color="#70e000" />
                        ) : (
                          <Gift size={18} color="#ff7597" />
                        )}
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                        {p.desc}
                      </p>
                    </div>

                    <div style={{ marginTop: '14px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: isRedeemed ? '#70e000' : 'rgba(255, 255, 255, 0.15)',
                          color: isRedeemed ? '#000' : '#ffd166',
                          display: 'inline-block',
                        }}
                      >
                        {isRedeemed ? 'REDEEMED! ❤️' : 'TAP TO CLAIM 🎟️'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
