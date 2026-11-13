import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Realistic 3D Bakery Birthday Cake
 * Features:
 * - Proper isometric perspective sitting firmly on the ornate golden platter
 * - Piped pearl/cream base border where cake meets the plate
 * - Smooth cylindrical velvet strawberry-vanilla frosting with realistic lighting
 * - Glossy chocolate/vanilla ganache drips cascading from the top rim
 * - Beautiful piped whipped cream rosettes with star-piping texture
 * - Plump glazed strawberries with leafy tops and shiny specular highlights
 * - Edible gold pearls & colorful sugar sprinkles
 * - Striped candles with multi-stage realistic flickering flames and smoke
 * - Seamless appearance when whole, splitting into 2 pieces upon slicing
 * - Visible authentic sponge cake crumb & berry filling in the cut cross-section
 * - Smooth chef knife animation
 */
export default function BirthdayCake({
  candlesLit,
  isCutting,
  isCut,
  onKnifeComplete,
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        height: '420px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {/* Warm Ambient Glow from Candles */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          width: '360px',
          height: '240px',
          borderRadius: '50%',
          background: candlesLit
            ? 'radial-gradient(ellipse at center, rgba(255, 190, 40, 0.45) 0%, rgba(255, 110, 150, 0.25) 45%, transparent 75%)'
            : 'radial-gradient(ellipse at center, rgba(210, 140, 255, 0.18) 0%, transparent 65%)',
          filter: 'blur(30px)',
          transition: 'all 0.8s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ============================================================== */}
      {/* 1. LUXURIOUS GOLDEN PEDESTAL CAKE STAND */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '420px',
          height: '110px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Platter Rim & Surface */}
        <div
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #fff3c4 0%, #ffd166 25%, #d49724 60%, #8c5b05 100%)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner Crystal Dish / Mirror Finish */}
          <div
            style={{
              width: '94%',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(180deg, #ffffff 0%, #fff6db 30%, #f7d277 85%, #d49724 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.8)',
              boxShadow: 'inset 0 4px 12px rgba(180, 120, 20, 0.3)',
              position: 'relative',
            }}
          >
            {/* Scalloped Lace / Bead Border on plate rim */}
            <div
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                border: '2px dashed rgba(255, 215, 0, 0.5)',
                pointerEvents: 'none',
              }}
            />

            {/* Deep Contact Shadow cast by the cake onto the plate */}
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '320px',
                height: '34px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(40, 10, 20, 0.65) 0%, rgba(60, 15, 30, 0.35) 60%, transparent 80%)',
              }}
            />
          </div>
        </div>

        {/* Pedestal Stem */}
        <div
          style={{
            width: '120px',
            height: '28px',
            margin: '-12px auto 0',
            background: 'linear-gradient(90deg, #8c5b05 0%, #ffd166 40%, #ffe999 55%, #8c5b05 100%)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            zIndex: 1,
          }}
        />

        {/* Pedestal Foot / Base */}
        <div
          style={{
            width: '200px',
            height: '24px',
            margin: '-6px auto 0',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #ffd166 0%, #b88118 60%, #613e00 100%)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.7), inset 0 2px 3px rgba(255, 255, 255, 0.6)',
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 2. REALISTIC 3D CAKE (Splitable into Left Half and Right Slice) */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'relative',
          width: '320px',
          height: '270px',
          bottom: '48px', // Sits firmly ON the platter
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* ------------------------------------------------------------ */}
        {/* LEFT CAKE HALF */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          animate={
            isCut
              ? { x: -35, rotate: -2 }
              : { x: 0, rotate: 0 }
          }
          transition={{ type: 'spring', stiffness: 130, damping: 15 }}
          style={{
            position: 'relative',
            width: '160px',
            height: '270px',
            overflow: 'visible',
          }}
        >
          {/* Left Cake Half SVG Model */}
          <svg
            width="160"
            height="270"
            viewBox="0 0 160 270"
            style={{ overflow: 'visible', position: 'absolute', top: 0, right: 0 }}
          >
            <defs>
              {/* Velvet Strawberry Frosting Gradient */}
              <linearGradient id="leftFrostingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff9ebb" />
                <stop offset="25%" stopColor="#ff7096" />
                <stop offset="70%" stopColor="#e8487f" />
                <stop offset="100%" stopColor="#b82156" />
              </linearGradient>

              {/* Top Surface Cream Gradient */}
              <radialGradient id="leftTopGrad" cx="30%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#fff5f8" />
                <stop offset="45%" stopColor="#ffc0d3" />
                <stop offset="85%" stopColor="#ff85a8" />
                <stop offset="100%" stopColor="#e8487f" />
              </radialGradient>

              {/* Vanilla White Chocolate Drip Glaze */}
              <linearGradient id="whiteDripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#fff0f5" />
                <stop offset="100%" stopColor="#ffd3e2" />
              </linearGradient>

              {/* Bottom Bead Highlight */}
              <linearGradient id="pearlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#ffe0ea" />
                <stop offset="100%" stopColor="#ff9ebb" />
              </linearGradient>
            </defs>

            {/* Left Cylindrical Body */}
            {/* Wall connects top curve (y=80) down to bottom curve (y=220) */}
            <path
              d="M 0 80 
                 A 160 55 0 0 0 160 135 
                 L 160 255 
                 A 160 55 0 0 1 0 200 
                 Z"
              fill="url(#leftFrostingGrad)"
            />

            {/* Frosting Cylindrical Shadow & Depth */}
            <path
              d="M 0 80 
                 A 160 55 0 0 0 80 120 
                 L 80 240 
                 A 160 55 0 0 1 0 200 
                 Z"
              fill="rgba(0, 0, 0, 0.08)"
            />

            {/* Left Top Surface Half-Ellipse */}
            <path
              d="M 0 80 
                 A 160 55 0 0 1 160 25 
                 L 160 135 
                 A 160 55 0 0 1 0 80 
                 Z"
              fill="url(#leftTopGrad)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.5"
            />

            {/* Thick Vanilla Ganache Drips Cascading Down Left Side */}
            <path
              d="M 0 80 
                 C 20 95, 30 140, 36 140
                 C 42 140, 48 95, 60 98
                 C 70 100, 75 155, 84 155
                 C 92 155, 96 105, 110 108
                 C 120 110, 126 135, 134 135
                 C 142 135, 148 118, 160 120
                 L 160 135
                 A 160 55 0 0 1 0 80
                 Z"
              fill="url(#whiteDripGrad)"
              filter="drop-shadow(0 3px 4px rgba(120, 20, 50, 0.25))"
            />

            {/* Specular Highlight Glints on Drips */}
            <circle cx="36" cy="136" r="3" fill="#ffffff" opacity="0.85" />
            <circle cx="84" cy="150" r="3.5" fill="#ffffff" opacity="0.85" />
            <circle cx="134" cy="131" r="2.5" fill="#ffffff" opacity="0.85" />

            {/* Bottom Piped Pearl Border (Left Half) */}
            {[
              { cx: 8, cy: 196, r: 6.5 },
              { cx: 24, cy: 206, r: 7 },
              { cx: 42, cy: 216, r: 7 },
              { cx: 62, cy: 226, r: 7.5 },
              { cx: 84, cy: 235, r: 7.5 },
              { cx: 108, cy: 243, r: 8 },
              { cx: 134, cy: 250, r: 8 },
              { cx: 156, cy: 254, r: 8 },
            ].map((p, idx) => (
              <g key={`left-bead-${idx}`}>
                <circle cx={p.cx} cy={p.cy} r={p.r} fill="url(#pearlGrad)" />
                <circle cx={p.cx - 1.5} cy={p.cy - 1.5} r={p.r * 0.35} fill="#ffffff" opacity="0.9" />
              </g>
            ))}
          </svg>

          {/* Whipped Cream Rosettes & Strawberries along Left Rim */}
          <div style={{ position: 'absolute', top: '68px', left: '12px', zIndex: 12 }}>
            <CreamRosette scale={0.9} />
          </div>
          <div style={{ position: 'absolute', top: '85px', left: '46px', zIndex: 14 }}>
            <CreamRosette scale={1.0} />
          </div>
          <div style={{ position: 'absolute', top: '105px', left: '92px', zIndex: 16 }}>
            <CreamRosette scale={1.05} />
          </div>
          <div style={{ position: 'absolute', top: '118px', left: '138px', zIndex: 18 }}>
            <CreamRosette scale={1.1} />
          </div>

          {/* Fresh Glazed Strawberries on Left Half */}
          <div style={{ position: 'absolute', top: '56px', left: '32px', zIndex: 20, transform: 'rotate(-12deg)' }}>
            <FreshStrawberry scale={0.95} />
          </div>
          <div style={{ position: 'absolute', top: '86px', left: '76px', zIndex: 22, transform: 'rotate(8deg)' }}>
            <FreshStrawberry scale={1.05} />
          </div>

          {/* Left Candle (Pastel Striped Candle) */}
          <RealisticCandle
            lit={candlesLit}
            x={100}
            y={24}
            bodyColor="#fff0f5"
            stripeColor="#ff4d8d"
            flameGlow={candlesLit}
          />
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT CAKE HALF (Splits and slides away upon cutting) */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          animate={
            isCut
              ? { x: 55, y: 8, rotate: 5 }
              : { x: 0, y: 0, rotate: 0 }
          }
          transition={{ type: 'spring', stiffness: 130, damping: 15 }}
          style={{
            position: 'relative',
            width: '160px',
            height: '270px',
            overflow: 'visible',
          }}
        >
          {/* Sliced Layer Cross-Section (Visibly reveals bakery sponge layers when cut!) */}
          {isCut && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '25px',
                left: '-2px',
                width: '42px',
                height: '230px',
                zIndex: 30,
                transform: 'skewY(-15deg)',
                transformOrigin: 'top left',
                background: 'linear-gradient(90deg, #fff7eb 0%, #fbe8d0 100%)',
                boxShadow: 'inset 5px 0 10px rgba(0,0,0,0.2), 4px 6px 15px rgba(0,0,0,0.35)',
                borderRight: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '8px 4px',
                borderRadius: '2px',
              }}
            >
              {/* Bakery Layer 1: Vanilla Cream Frosting Top */}
              <div style={{ height: '8px', background: '#ffffff', borderRadius: '2px' }} />
              {/* Bakery Layer 2: Golden Fluffy Sponge */}
              <div style={{ height: '36px', background: 'repeating-linear-gradient(45deg, #fce4b8, #fce4b8 3px, #f7d599 3px, #f7d599 6px)', borderRadius: '2px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }} />
              {/* Bakery Layer 3: Ruby Strawberry Jam Ribbon */}
              <div style={{ height: '8px', background: '#c9184a', margin: '2px 0', boxShadow: '0 0 4px #ff4d6d' }} />
              {/* Bakery Layer 4: Sweet Vanilla Chantilly Cream */}
              <div style={{ height: '14px', background: '#fff', borderRadius: '1px' }} />
              {/* Bakery Layer 5: Golden Moist Sponge Cake */}
              <div style={{ height: '38px', background: 'repeating-linear-gradient(45deg, #fce4b8, #fce4b8 3px, #f7d599 3px, #f7d599 6px)', borderRadius: '2px' }} />
              {/* Bakery Layer 6: Ruby Strawberry Jam Ribbon */}
              <div style={{ height: '8px', background: '#c9184a', margin: '2px 0' }} />
              {/* Bakery Layer 7: Whipped Cream */}
              <div style={{ height: '14px', background: '#fff' }} />
              {/* Bakery Layer 8: Base Sponge Cake */}
              <div style={{ height: '38px', background: 'repeating-linear-gradient(45deg, #f5d49a, #f5d49a 3px, #eec780 3px, #eec780 6px)', borderRadius: '2px' }} />
            </motion.div>
          )}

          {/* Right Cake Half SVG Model */}
          <svg
            width="160"
            height="270"
            viewBox="0 0 160 270"
            style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}
          >
            <defs>
              {/* Right Frosting Gradient (Lighting from left makes right richer) */}
              <linearGradient id="rightFrostingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7096" />
                <stop offset="35%" stopColor="#e8487f" />
                <stop offset="80%" stopColor="#b82156" />
                <stop offset="100%" stopColor="#7a0e35" />
              </linearGradient>

              {/* Right Top Surface Cream Gradient */}
              <radialGradient id="rightTopGrad" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#fff5f8" />
                <stop offset="50%" stopColor="#ffb5cb" />
                <stop offset="90%" stopColor="#ff7096" />
                <stop offset="100%" stopColor="#d43b6e" />
              </radialGradient>
            </defs>

            {/* Right Cylindrical Body */}
            <path
              d="M 0 135 
                 A 160 55 0 0 0 160 80 
                 L 160 200 
                 A 160 55 0 0 1 0 255 
                 Z"
              fill="url(#rightFrostingGrad)"
            />

            {/* Deep Shade on Far Right Rim for 3D Roundness */}
            <path
              d="M 120 95 
                 A 160 55 0 0 1 160 80 
                 L 160 200 
                 A 160 55 0 0 1 120 218 
                 Z"
              fill="rgba(0, 0, 0, 0.15)"
            />

            {/* Right Top Surface Half-Ellipse */}
            <path
              d="M 0 25 
                 A 160 55 0 0 1 160 80 
                 L 0 135 
                 Z"
              fill="url(#rightTopGrad)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.5"
            />

            {/* Thick Vanilla Ganache Drips Cascading Down Right Side */}
            <path
              d="M 0 135 
                 C 14 135, 18 110, 28 110
                 C 38 110, 44 148, 55 148
                 C 66 148, 72 104, 85 106
                 C 98 108, 104 150, 116 150
                 C 126 150, 134 116, 146 114
                 C 152 112, 156 90, 160 80
                 L 0 135
                 Z"
              fill="url(#whiteDripGrad)"
              filter="drop-shadow(0 3px 4px rgba(120, 20, 50, 0.25))"
            />

            {/* Specular Glints on Right Drips */}
            <circle cx="55" cy="144" r="3.5" fill="#ffffff" opacity="0.85" />
            <circle cx="116" cy="145" r="3.5" fill="#ffffff" opacity="0.85" />

            {/* Bottom Piped Pearl Border (Right Half) */}
            {[
              { cx: 4, cy: 254, r: 8 },
              { cx: 26, cy: 250, r: 8 },
              { cx: 52, cy: 243, r: 8 },
              { cx: 76, cy: 235, r: 7.5 },
              { cx: 98, cy: 226, r: 7.5 },
              { cx: 118, cy: 216, r: 7 },
              { cx: 136, cy: 206, r: 7 },
              { cx: 152, cy: 196, r: 6.5 },
            ].map((p, idx) => (
              <g key={`right-bead-${idx}`}>
                <circle cx={p.cx} cy={p.cy} r={p.r} fill="url(#pearlGrad)" />
                <circle cx={p.cx - 1.5} cy={p.cy - 1.5} r={p.r * 0.35} fill="#ffffff" opacity="0.9" />
              </g>
            ))}
          </svg>

          {/* Whipped Cream Rosettes & Strawberries along Right Rim */}
          <div style={{ position: 'absolute', top: '118px', left: '-14px', zIndex: 18 }}>
            <CreamRosette scale={1.1} />
          </div>
          <div style={{ position: 'absolute', top: '105px', left: '32px', zIndex: 16 }}>
            <CreamRosette scale={1.05} />
          </div>
          <div style={{ position: 'absolute', top: '85px', left: '76px', zIndex: 14 }}>
            <CreamRosette scale={1.0} />
          </div>
          <div style={{ position: 'absolute', top: '68px', left: '116px', zIndex: 12 }}>
            <CreamRosette scale={0.9} />
          </div>

          {/* Fresh Glazed Strawberries on Right Half */}
          <div style={{ position: 'absolute', top: '88px', left: '46px', zIndex: 22, transform: 'rotate(-8deg)' }}>
            <FreshStrawberry scale={1.05} />
          </div>
          <div style={{ position: 'absolute', top: '60px', left: '96px', zIndex: 20, transform: 'rotate(14deg)' }}>
            <FreshStrawberry scale={0.95} />
          </div>

          {/* Center Candle & Right Candle */}
          <RealisticCandle
            lit={candlesLit}
            x={18}
            y={12}
            bodyColor="#e0aaff"
            stripeColor="#7b2cbf"
            flameGlow={candlesLit}
          />
          <RealisticCandle
            lit={candlesLit}
            x={64}
            y={32}
            bodyColor="#fff7d6"
            stripeColor="#f4a261"
            flameGlow={candlesLit}
          />
        </motion.div>
      </div>

      {/* Cutting Line Glow Sparkle (Flash during cutting) */}
      <AnimatePresence>
        {isCutting && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: [0, 1, 0.9, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3.5px',
              height: '240px',
              background: 'linear-gradient(to bottom, #ffffff, #ffd166, #ff7597)',
              boxShadow: '0 0 16px #ffffff, 0 0 28px #ffd166',
              zIndex: 40,
              borderRadius: '2px',
            }}
          />
        )}
      </AnimatePresence>

      {/* Animated Realistic Chef's Cake Knife */}
      <AnimatePresence>
        {isCutting && (
          <motion.div
            initial={{
              x: 160,
              y: -160,
              rotate: -45,
              opacity: 0,
            }}
            animate={{
              x: [160, 20, 0, 0, 140],
              y: [-160, -20, 80, 110, -90],
              rotate: [-45, -15, 0, 5, -25],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.25, 0.65, 0.85, 1],
              ease: 'easeInOut',
            }}
            onAnimationComplete={onKnifeComplete}
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              zIndex: 50,
              pointerEvents: 'none',
              transformOrigin: 'top center',
            }}
          >
            {/* High-Resolution Realistic Chef Knife SVG */}
            <svg
              width="90"
              height="260"
              viewBox="0 0 90 260"
              style={{
                filter: 'drop-shadow(6px 12px 16px rgba(0,0,0,0.65))',
              }}
            >
              <defs>
                <linearGradient id="knifeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#e2e8f0" />
                  <stop offset="65%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="knifeHandleWood" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3d1e11" />
                  <stop offset="40%" stopColor="#63321d" />
                  <stop offset="70%" stopColor="#7a3e24" />
                  <stop offset="100%" stopColor="#2b140b" />
                </linearGradient>
                <linearGradient id="knifeBolster" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffd166" />
                  <stop offset="50%" stopColor="#ffeaa7" />
                  <stop offset="100%" stopColor="#d49724" />
                </linearGradient>
                <linearGradient id="bladeBevel" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Wooden Ergonomic Handle with Golden Brass Rivets */}
              <rect x="36" y="0" width="18" height="74" rx="7" fill="url(#knifeHandleWood)" stroke="#2b140b" strokeWidth="1" />
              <circle cx="45" cy="18" r="2.8" fill="#ffd166" stroke="#b88118" strokeWidth="0.8" />
              <circle cx="45" cy="40" r="2.8" fill="#ffd166" stroke="#b88118" strokeWidth="0.8" />
              <circle cx="45" cy="60" r="2.8" fill="#ffd166" stroke="#b88118" strokeWidth="0.8" />

              {/* Brass Bolster Finger Guard */}
              <path
                d="M 32 74 L 58 74 L 56 84 L 34 84 Z"
                fill="url(#knifeBolster)"
                stroke="#b88118"
                strokeWidth="1"
              />

              {/* Gleaming Steel Blade */}
              <path
                d="M 37 84 
                   L 53 84 
                   L 52 215 
                   C 48 245, 42 255, 38 258 
                   L 37 258 
                   Z"
                fill="url(#knifeSteel)"
                stroke="#64748b"
                strokeWidth="1"
              />

              {/* Razor-sharp Beveled Cutting Edge */}
              <path
                d="M 37 84 L 37 258 C 40 252, 42 235, 43 215 L 43 84 Z"
                fill="url(#bladeBevel)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Piped Whipped Cream Rosette with 3D star-tip ridges
 */
function CreamRosette({ scale = 1 }) {
  return (
    <div
      style={{
        width: `${26 * scale}px`,
        height: `${24 * scale}px`,
        position: 'relative',
        filter: 'drop-shadow(0 3px 5px rgba(120, 20, 50, 0.25))',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 32 30">
        <defs>
          <linearGradient id="creamShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fff5f8" />
            <stop offset="90%" stopColor="#ffd8e5" />
            <stop offset="100%" stopColor="#fcaec5" />
          </linearGradient>
        </defs>

        {/* Base Rosette Petals */}
        <path d="M 6 24 C 2 18, 8 12, 16 12 C 24 12, 30 18, 26 24 C 22 28, 10 28, 6 24 Z" fill="url(#creamShade)" />
        <path d="M 4 20 C 0 14, 8 8, 16 10 C 24 8, 32 14, 28 20 Z" fill="#ffffff" opacity="0.9" />

        {/* Swirl Ridges */}
        <path d="M 8 22 C 12 16, 16 14, 18 10" stroke="#fcaec5" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M 14 26 C 18 20, 20 16, 22 12" stroke="#fcaec5" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* Piped Tip Peak */}
        <path d="M 16 2 C 13 6, 13 10, 16 12 C 19 10, 19 6, 16 2 Z" fill="#ffffff" />
      </svg>
    </div>
  );
}

/**
 * Realistic Plump Glazed Strawberry
 */
function FreshStrawberry({ scale = 1 }) {
  return (
    <div
      style={{
        width: `${28 * scale}px`,
        height: `${34 * scale}px`,
        position: 'relative',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 34 40">
        <defs>
          {/* Luscious Red Berry Gradient */}
          <radialGradient id="strawberryGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="35%" stopColor="#e60039" />
            <stop offset="75%" stopColor="#a80026" />
            <stop offset="100%" stopColor="#540010" />
          </radialGradient>

          {/* Leaf Green Gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#70e000" />
            <stop offset="60%" stopColor="#38b000" />
            <stop offset="100%" stopColor="#007200" />
          </linearGradient>
        </defs>

        {/* Strawberry Fruit Body */}
        <path
          d="M 17 8 
             C 6 8, 2 18, 4 28 
             C 6 36, 14 40, 17 40 
             C 20 40, 28 36, 30 28 
             C 32 18, 28 8, 17 8 
             Z"
          fill="url(#strawberryGrad)"
        />

        {/* Glossy Glaze Specular Highlight */}
        <ellipse cx="11" cy="18" rx="4" ry="7" transform="rotate(-25, 11, 18)" fill="#ffffff" opacity="0.65" filter="blur(0.8px)" />
        <circle cx="10" cy="14" r="1.8" fill="#ffffff" opacity="0.9" />

        {/* Golden Seeds */}
        {[
          { cx: 8, cy: 26 },
          { cx: 14, cy: 22 },
          { cx: 20, cy: 20 },
          { cx: 25, cy: 25 },
          { cx: 12, cy: 32 },
          { cx: 18, cy: 30 },
          { cx: 22, cy: 34 },
          { cx: 17, cy: 36 },
        ].map((s, idx) => (
          <g key={`seed-${idx}`}>
            <ellipse cx={s.cx} cy={s.cy} rx="1" ry="1.6" fill="#ffe066" transform={`rotate(15, ${s.cx}, ${s.cy})`} />
            <circle cx={s.cx - 0.4} cy={s.cy - 0.5} r="0.4" fill="#fff" />
          </g>
        ))}

        {/* Leafy Green Calyx Crown */}
        <path
          d="M 17 10 
             C 12 3, 5 6, 4 9 
             C 8 11, 12 11, 17 10 Z"
          fill="url(#leafGrad)"
        />
        <path
          d="M 17 10 
             C 22 3, 29 6, 30 9 
             C 26 11, 22 11, 17 10 Z"
          fill="url(#leafGrad)"
        />
        <path
          d="M 17 10 
             C 14 0, 20 0, 17 10 Z"
          fill="#38b000"
        />
        <path
          d="M 17 10 
             C 10 7, 10 14, 17 12 
             C 24 14, 24 7, 17 10 Z"
          fill="url(#leafGrad)"
        />
      </svg>
    </div>
  );
}

/**
 * Realistic Striped Candle with Natural Multi-Layer Flame & Smoke Wisps
 */
function RealisticCandle({ lit, x, y, bodyColor, stripeColor }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))',
      }}
    >
      {/* Candle Flame / Smoke Area */}
      <div
        style={{
          position: 'relative',
          width: '26px',
          height: '42px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {lit ? (
          <>
            {/* Outer Flame Glow Aura */}
            <div
              className="animate-flicker"
              style={{
                position: 'absolute',
                bottom: '4px',
                width: '32px',
                height: '44px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 180, 0, 0.6) 0%, rgba(255, 90, 0, 0.3) 50%, transparent 75%)',
                filter: 'blur(5px)',
                pointerEvents: 'none',
              }}
            />

            {/* Realistic Multi-Layer Teardrop Flame */}
            <div
              className="animate-flicker"
              style={{
                position: 'absolute',
                bottom: '6px',
                width: '16px',
                height: '28px',
                borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                background: 'radial-gradient(ellipse at bottom, #ffffff 0%, #fff066 30%, #ff8500 70%, #d00000 100%)',
                boxShadow: '0 0 14px #ffd166, 0 0 24px #ff5400',
                transformOrigin: 'bottom center',
              }}
            >
              {/* Inner Blue Flame Core at Base */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #70d6ff 0%, #0077b6 80%, transparent 100%)',
                  opacity: 0.9,
                }}
              />
            </div>
          </>
        ) : (
          /* Smoke wisps rising when extinguished */
          <div
            className="animate-smoke"
            style={{
              position: 'absolute',
              bottom: '6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(200, 200, 200, 0.3) 70%, transparent 100%)',
                filter: 'blur(2px)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '18px',
                background: 'rgba(240, 240, 240, 0.7)',
                borderRadius: '50%',
                filter: 'blur(2px)',
                marginTop: '-5px',
              }}
            />
          </div>
        )}

        {/* Charred Candle Wick */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            width: '2.5px',
            height: '9px',
            backgroundColor: '#1f1f1f',
            borderRadius: '1px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* Candle Wax Body with Spiral Stripe */}
      <div
        style={{
          width: '13px',
          height: '52px',
          borderRadius: '4px 4px 2px 2px',
          background: `repeating-linear-gradient(55deg, ${bodyColor}, ${bodyColor} 6px, ${stripeColor} 6px, ${stripeColor} 12px)`,
          boxShadow: 'inset -2.5px 0 5px rgba(0,0,0,0.35), inset 2px 0 4px rgba(255,255,255,0.7), 0 4px 8px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        {/* Soft Melted Wax Rim Top */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: 0,
            width: '100%',
            height: '4px',
            borderRadius: '50%',
            background: bodyColor,
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8)',
          }}
        />
      </div>
    </div>
  );
}
