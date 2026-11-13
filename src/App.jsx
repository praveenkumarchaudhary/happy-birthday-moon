import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { birthdayData } from './config/birthdayData';
import WelcomeScreen from './components/WelcomeScreen';
import BirthdayCelebration from './components/BirthdayCelebration';
import BirthdayLetter from './components/BirthdayLetter';
import FinalSurprise from './components/FinalSurprise';
import FloatingElements from './components/FloatingElements';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  // Journey state: false = Welcome Screen, true = Birthday Experience
  const [hasStarted, setHasStarted] = useState(false);

  // Handle opening surprise from welcome screen
  const handleOpenSurprise = () => {
    setHasStarted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle replaying journey from beginning
  const handleReplayJourney = () => {
    setHasStarted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to a specific section
  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Floating Interactive Background Elements (Balloons, Twinkling Stars) */}
      <FloatingElements />

      {/* Floating Music Controller (Non-intrusive, top-right) */}
      {hasStarted && (
        <div
          style={{
            position: 'fixed',
            top: '18px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          <AudioPlayer
            customAudioPath={birthdayData.audio?.customAudioPath}
            songTitle={birthdayData.audio?.songTitle}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          /* ============================================================== */
          /* 1. FULL-SCREEN WELCOME PAGE WITH ANIMATED GIFT BOX */
          /* ============================================================== */
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <WelcomeScreen
              data={birthdayData}
              onOpenSurprise={handleOpenSurprise}
            />
          </motion.div>
        ) : (
          /* ============================================================== */
          /* 2. MAIN SURPRISE EXPERIENCE (Clean, Immersive, No Navbar) */
          /* ============================================================== */
          <motion.div
            key="main-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            {/* Section 1: Birthday Celebration & 3D Interactive Cake Cutting */}
            <BirthdayCelebration
              data={birthdayData}
              onContinueToNext={() => handleScrollTo('letter-section')}
            />

            {/* Section 2: Wax-Sealed Animated Birthday Letter */}
            <BirthdayLetter
              data={birthdayData}
              onContinueToNext={() => handleScrollTo('final-surprise-section')}
            />

            {/* Section 3: Mysterious Final Surprise & Grand Celebration */}
            <FinalSurprise
              data={birthdayData}
              onReplayJourney={handleReplayJourney}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
