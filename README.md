# 🎂 Bestie's Magical Birthday Surprise Website ✨

A premium, magical, cute, and fully interactive Birthday Surprise Website built with **React.js**, **Framer Motion**, **Canvas Confetti**, **Lucide Icons**, and the **Web Audio API**.

---

## 🌟 Key Features

1. **Magical Welcome Screen**:
   - Animated 3D-style gift box that unties and opens with confetti and light beams.
   - Smooth reveal into the surprise experience.

2. **Interactive 3D Cake Cutting Experience (Top Priority)**:
   - Realistic multi-layered birthday cake on a golden pedestal with frosting, berry drips, whipped cream swirls, and glazed strawberries.
   - Lit candles with animated flickering flames.
   - **"Make a Wish ✨"** button: Blows out candles with realistic curling smoke wisps and breath sound effect.
   - **"Cut the Cake 🎂"** button: A gleaming silver chef's knife swoops down and cleanly slices through the center.
   - **Visible Split**: The cake splits into two distinct pieces, with one piece moving outward on the plate.
   - **Cross-Section Revealed**: Shows delicious sponge layers, strawberry cream filling, and raspberry jam!
   - Grand confetti explosion, celebratory fanfare sound, and toast: *"Yayyy! We finally cut your birthday cake! ❤️"*.

3. **Polaroid Scrapbook Memories Gallery**:
   - Realistic tilted Polaroid cards with washi tape, textured paper, and heart stickers.
   - Handwritten cursive captions.
   - Smooth 3D tilt and glowing lift on hover.
   - Interactive Lightbox modal for high-res view.
   - Built-in **"Add Another Photo 📷"** button for instant live testing.

4. **Wax-Sealed Animated Birthday Letter**:
   - 3D envelope with crimson heart wax seal.
   - Unseals and reveals a letter with smooth paper slide animation.
   - Realistic antique typewriter animation with gentle audio taps.
   - **"Edit Letter ✏️"** toggle to customize the message directly on the screen!

5. **Friendship Messages & Bestie Vouchers**:
   - Dedicated glass cards for your four special messages:
     - *"You are one of the most special people in my life."*
     - *"Thank you for always being there."*
     - *"May your smile never fade."*
     - *"I hope all your dreams come true."*
   - Interactive redeemable **Bestie Vouchers** (Unlimited Hugs, Late Night Rants, Ice Cream, etc.) with mini confetti bursts!

6. **Grand Finale Full-Screen Celebration**:
   - Mysterious cosmic gift box.
   - Unlocks full-screen celebration with a **real-time HTML5 Canvas Fireworks Engine**!
   - Tap anywhere on the screen to launch custom fireworks.
   - Confetti rain, virtual hug counter, and *"Happy Birthday Once Again, Bestie! You Deserve All the Happiness in the World. ❤️"*.

7. **Sound & Music Engine (Zero-Dependency Web Audio API)**:
   - Built-in music-box synthesis of the Happy Birthday tune (plays reliably on any device without broken links!).
   - Sound effects for: balloon pops, candle blowing, knife slicing, celebration fanfare, envelope opening, typewriter keys, and firework booms.
   - Optional support for your own MP3 in `public/audio/birthday.mp3`.

---

## 🚀 How to Run the Website

In the project folder, run:

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start the development server
npm run dev
```

Then open the local URL in your browser (usually `http://localhost:5173`).

---

## 🎨 How to Personalize for Your Best Friend

All text, photos, letters, and settings are organized in one clean file:
👉 **`src/config/birthdayData.js`**

### 1. Change Friend's Name:
```javascript
friendName: "Sarah", // 👈 Enter your best friend's name here
nickname: "My Favorite Human",
```

### 2. Add Your Photos:
- Place your pictures inside the `public/images/` folder (e.g. `photo1.jpg`).
- In `src/config/birthdayData.js`, update the `memories` array:
```javascript
{
  id: 1,
  image: "/images/photo1.jpg",
  caption: "Best day ever with you! 🏖️",
  date: "Summer 2024",
  location: "Goa Trip",
  rotation: -3,
  tag: "Cherished",
}
```

### 3. Change Birthday Letter:
Edit `letter.paragraphs` in `src/config/birthdayData.js` or click the **"Edit Letter ✏️"** button directly on the website!

### 4. Custom Music:
- Place your favorite song in `public/audio/birthday.mp3`.
- Set `customAudioPath: "/audio/birthday.mp3"` in `src/config/birthdayData.js`.

---

## 📁 Component Structure

```
src/
├── components/
│   ├── WelcomeScreen.jsx        # Full-screen welcome with 3D gift box
│   ├── BirthdayCelebration.jsx  # Hero header, celebration atmosphere
│   ├── BirthdayCake.jsx         # Realistic 3D cake model & layers
│   ├── CakeCutting.jsx          # Interactive wish, knife slice & split
│   ├── MemoryGallery.jsx        # Polaroid scrapbook & lightbox
│   ├── PhotoLightbox.jsx        # Full-screen photo view modal
│   ├── BirthdayLetter.jsx       # Animated wax-sealed envelope & typewriter
│   ├── FriendshipMessages.jsx   # 4 core friendship truths & vouchers
│   ├── FinalSurprise.jsx        # Mystery gift & grand celebration modal
│   ├── FireworksCanvas.jsx      # Canvas fireworks engine
│   ├── FloatingElements.jsx     # Pop-able balloons & stars
│   ├── AudioPlayer.jsx          # Music visualizer & volume controls
│   └── NavigationBar.jsx        # Floating glass navigation bar
├── config/
│   └── birthdayData.js          # Master personalization configuration
├── utils/
│   └── audioEffects.js          # Web Audio API music & SFX synthesis
├── App.jsx                      # Main app orchestrator & journey
└── index.css                    # Design system, glassmorphism, animations
```
