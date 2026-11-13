import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Tag } from 'lucide-react';

export default function PhotoLightbox({ photo, onClose, onPrev, onNext }) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 2, 20, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.85, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.85, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="polaroid-card"
          style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '18px 18px 24px 18px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 105, 180, 0.3)',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '-16px',
              right: '-16px',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff4d8d, #9d4edd)',
              color: '#ffffff',
              border: '2px solid #ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>

          {/* Photo Frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '380px',
              borderRadius: '6px',
              overflow: 'hidden',
              backgroundColor: '#f1f1f1',
            }}
          >
            <img
              src={photo.image}
              alt={photo.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Tag Badge */}
            {photo.tag && (
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(255, 77, 141, 0.9)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Tag size={12} />
                {photo.tag}
              </span>
            )}
          </div>

          {/* Handwritten Caption & Metadata */}
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <h4
              className="font-handwriting"
              style={{
                fontSize: '1.9rem',
                color: '#2b2b2b',
                lineHeight: 1.2,
                marginBottom: '8px',
              }}
            >
              {photo.caption}
            </h4>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                fontSize: '0.85rem',
                color: '#666',
                flexWrap: 'wrap',
              }}
            >
              {photo.date && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} color="#ff4d8d" />
                  {photo.date}
                </span>
              )}
              {photo.location && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="#9d4edd" />
                  {photo.location}
                </span>
              )}
            </div>
          </div>

          {/* Prev / Next controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #f0f0f0',
            }}
          >
            <button
              onClick={onPrev}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0,0,0,0.05)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#444',
                fontSize: '0.85rem',
              }}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={onNext}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0,0,0,0.05)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#444',
                fontSize: '0.85rem',
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

