import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';
import { startBirthdayMusic, stopBirthdayMusic, setMusicVolume } from '../utils/audioEffects';

export default function AudioPlayer({ customAudioPath, songTitle }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioElementRef = useRef(null);

  // Initialize or handle play/pause
  const togglePlay = () => {
    if (customAudioPath && audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElementRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Audio autoplay prevented or error:", err);
          // Fallback to web audio synth
          startBirthdayMusic(volume);
          setIsPlaying(true);
        });
      }
      return;
    }

    if (isPlaying) {
      stopBirthdayMusic();
      setIsPlaying(false);
    } else {
      startBirthdayMusic(isMuted ? 0 : volume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }

    if (customAudioPath && audioElementRef.current) {
      audioElementRef.current.volume = val;
    } else {
      setMusicVolume(val);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (customAudioPath && audioElementRef.current) {
        audioElementRef.current.volume = volume || 0.7;
      } else {
        setMusicVolume(volume || 0.7);
      }
    } else {
      setIsMuted(true);
      if (customAudioPath && audioElementRef.current) {
        audioElementRef.current.volume = 0;
      } else {
        setMusicVolume(0);
      }
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      {/* Fallback audio element for custom MP3 */}
      {customAudioPath && (
        <audio
          ref={audioElementRef}
          src={customAudioPath}
          loop
          preload="auto"
        />
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '8px 16px',
          borderRadius: '999px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        }}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #ff4d8d, #9d4edd)'
              : 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isPlaying ? '0 0 15px rgba(255, 105, 180, 0.6)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {isPlaying ? (
            <Disc3
              size={18}
              style={{
                animation: 'spin 3s linear infinite',
              }}
            />
          ) : (
            <Music size={18} />
          )}
        </button>

        {/* Title and Visualizer */}
        <div
          title={songTitle || 'Happy Birthday Melody'}
          style={{ display: 'flex', flexDirection: 'column', minWidth: '120px' }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{isPlaying ? (songTitle ? 'Playing Music' : 'Playing Birthday Song') : 'Birthday Music'}</span>
            {isPlaying && <Sparkles size={12} color="#ffd166" className="animate-twinkle" />}
          </div>
          
          {/* Animated Sound Wave Bars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '12px', marginTop: '2px' }}>
            {[0.4, 0.8, 0.5, 1.0, 0.6, 0.9, 0.3].map((heightScale, idx) => (
              <span
                key={idx}
                style={{
                  width: '3px',
                  height: isPlaying ? `${heightScale * 12}px` : '3px',
                  background: isPlaying ? 'linear-gradient(to top, #ff6584, #c77dff)' : 'rgba(255,255,255,0.4)',
                  borderRadius: '2px',
                  transition: 'height 0.2s ease',
                  animation: isPlaying ? `wave 0.8s ease-in-out infinite alternate ${idx * 0.12}s` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Volume controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={toggleMute}
            aria-label="Toggle mute"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              opacity: isMuted ? 0.6 : 1,
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {showVolumeSlider && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{
                width: '60px',
                accentColor: '#ff6584',
                cursor: 'pointer',
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave {
          0% { height: 3px; }
          100% { height: 12px; }
        }
      `}</style>
    </div>
  );
}
