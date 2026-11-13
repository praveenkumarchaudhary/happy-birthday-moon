import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Plus, Heart } from 'lucide-react';
import PhotoLightbox from './PhotoLightbox';

export default function MemoryGallery({ memories: initialMemories, friendName }) {
  const [memories, setMemories] = useState(initialMemories || []);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  // New photo state for in-browser testing/preview
  const [newImage, setNewImage] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % memories.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleAddCustomPhoto = (e) => {
    e.preventDefault();
    if (!newImage) return;

    const newEntry = {
      id: Date.now(),
      image: newImage,
      caption: newCaption || 'Unforgettable memory! ✨',
      date: newDate || 'Special Day',
      location: 'Together',
      rotation: (Math.random() * 8 - 4).toFixed(1),
      tag: 'New Memory',
    };

    setMemories([newEntry, ...memories]);
    setNewImage('');
    setNewCaption('');
    setNewDate('');
    setIsAddingPhoto(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="memories-section"
      className="section-wrapper"
      style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '60px',
        paddingBottom: '80px',
      }}
    >
      <div className="container">
        {/* Section Heading */}
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
              color: '#ffa8cb',
              marginBottom: '14px',
            }}
          >
            <Camera size={16} />
            <span>Cherished Moments</span>
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
            <span className="text-gradient-magic">Our Scrapbook of Memories</span>
          </motion.h2>

          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Every photograph is a chapter of laughter, chaos, and true friendship with you, {friendName}.
          </p>

          {/* Quick "Add Your Photo" button */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setIsAddingPhoto(!isAddingPhoto)}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 20px' }}
            >
              <Plus size={16} />
              <span>{isAddingPhoto ? 'Close Photo Uploader' : 'Add Another Photo 📷'}</span>
            </button>
          </div>
        </div>

        {/* In-Browser Photo Add / Test Panel */}
        {isAddingPhoto && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{
              maxWidth: '540px',
              margin: '0 auto 40px',
              padding: '24px',
              border: '1px solid rgba(255, 117, 151, 0.4)',
            }}
          >
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: '#ffd166' }}>
              Add a Photo to the Scrapbook ✨
            </h4>
            <form onSubmit={handleAddCustomPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#e0aaff', display: 'block', marginBottom: '4px' }}>
                  Upload from Device:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{
                    color: '#fff',
                    fontSize: '0.85rem',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '8px',
                    borderRadius: '8px',
                    width: '100%',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: '#e0aaff', display: 'block', marginBottom: '4px' }}>
                  Or Paste an Image URL:
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/bestie-photo.jpg"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Photo Caption (e.g. Best day at the beach!)"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  style={{
                    flex: 2,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
                <input
                  type="text"
                  placeholder="Date / Tag"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '8px', padding: '10px 20px' }}>
                Add to Scrapbook 📌
              </button>
            </form>
          </motion.div>
        )}

        {/* Polaroid Scrapbook Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {memories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
              onClick={() => openLightbox(index)}
              style={{
                transform: `rotate(${item.rotation || 0}deg)`,
                position: 'relative',
              }}
            >
              <div className="polaroid-card">
                {/* Washi Tape Accent */}
                <div className="polaroid-tape" />

                {/* Photo frame */}
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#fafafa',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                    onError={(e) => {
                      // Fallback placeholder if custom image path has issue
                      e.target.src =
                        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Corner Heart Sticker */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(255, 255, 255, 0.85)',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Heart size={14} color="#ff4d8d" fill="#ff4d8d" />
                  </div>
                </div>

                {/* Handwritten Caption */}
                <div style={{ marginTop: '14px', textAlign: 'center' }}>
                  <p
                    className="font-handwriting"
                    style={{
                      fontSize: '1.55rem',
                      lineHeight: 1.2,
                      color: '#222222',
                      marginBottom: '4px',
                    }}
                  >
                    {item.caption}
                  </p>
                  {item.date && (
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: '#777777',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.date}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <PhotoLightbox
          photo={memories[activePhotoIndex]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
