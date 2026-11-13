/**
 * ============================================================================
 * 🎂 BIRTHDAY SURPRISE CONFIGURATION FILE
 * ============================================================================
 * 
 * You can personalize EVERYTHING in this file for your Best Friend!
 * Change the name, photos, birthday letter, friendship messages, audio, etc.
 * 
 * ----------------------------------------------------------------------------
 * 📌 HOW TO CUSTOMIZE:
 * 1. Best Friend's Name: Change `friendName` below (e.g., "Sarah", "Emily", etc.)
 * 2. Photos: Place your pictures in `public/images/` and update `memories` array.
 * 3. Birthday Letter: Edit `letter` title, body paragraphs, and sign-off.
 * 4. Music: By default, a sweet Web Audio music-box melody plays automatically!
 *    If you want your own MP3, put your song in `public/audio/birthday.mp3`
 *    and set `customAudioPath: "/audio/birthday.mp3"`.
 * ============================================================================
 */

export const birthdayData = {
  // ==========================================================================
  // 1. BEST FRIEND BASIC DETAILS
  // ==========================================================================
  /** The name displayed on headings, banners, and letters */
  friendName: "Moon", // 👈 Best friend's name
  
  /** Cute nickname or affectionate title */
  nickname: "My Moon 🌙",

  /** The date/age or birthday subtitle */
  birthdaySubtitle: "Wishing you a day filled with infinite magic, laughter & love!",

  // ==========================================================================
  // 2. WELCOME SCREEN
  // ==========================================================================
  welcome: {
    badge: "✨ Top Secret Surprise ✨",
    greeting: "Hey Moon! 🌙",
    message: "Someone who loves you dearly has prepared a special surprise for your special day...",
    buttonText: "Open Your Surprise 🎁",
  },

  // ==========================================================================
  // 3. BIRTHDAY CELEBRATION HEADER
  // ==========================================================================
  celebration: {
    titlePrefix: "Happy Birthday,",
    tagline: "Today is all about YOU! Let's celebrate the sweetest, funniest, and most amazing soul on earth.",
    cakeInstruction: "Blow out the candles & make a heartfelt wish! ✨",
  },

  // ==========================================================================
  // 4. MEMORIES GALLERY (Polaroid Scrapbook)
  // ==========================================================================
  /**
   * Add your own photos!
   * Put your images in the `public/images/` folder:
   * e.g., `image: "/images/photo1.jpg"`
   * Or use external image URLs directly!
   */
  memories: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      caption: "Unstoppable duo since day one! 👯‍♀️",
      date: "Forever Memory",
      location: "Everywhere Together",
      rotation: -3,
      tag: "Best Day Ever",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
      caption: "Late night talks, snacks & endless laughter ✨",
      date: "Midnight Chats",
      location: "Our Cozy Corner",
      rotation: 2.5,
      tag: "Pure Joy",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      caption: "That spontaneous road trip we promised never to forget 🚗💨",
      date: "Sunny Days",
      location: "Adventures Ahead",
      rotation: -2,
      tag: "Wild & Free",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      caption: "The goofy selfies we swore to never delete 😂",
      date: "Silly Moments",
      location: "Camera Roll",
      rotation: 3.5,
      tag: "Candid Vibes",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      caption: "Celebrating every milestone with you by my side 🥂",
      date: "Golden Times",
      location: "Sweet Memories",
      rotation: -2.5,
      tag: "Cheers!",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      caption: "To another year of crazy adventures and warm hugs ❤️",
      date: "Today & Always",
      location: "In My Heart",
      rotation: 1.8,
      tag: "Soul Besties",
    },
  ],

  // ==========================================================================
  // 5. HEARTFELT BIRTHDAY LETTER (Inside the Animated Envelope)
  // ==========================================================================
  letter: {
    envelopePrompt: "A Letter from the Heart 💌 (Click to Open)",
    salutation: "Dear Moon, ❤️",
    paragraphs: [
      "First of all, Happiest Birthday to you! 🎂💕",
      "I don't know where to start because sometimes words are not enough to express how special someone is. But today, I just want to tell you how much you mean to me.",
      "You are not just my best friend; you are someone who makes my life a little more beautiful. I'm so lucky to have you in my life. Thank you for being there, for making me smile, for listening to me, and for creating so many beautiful memories with me.",
      "I may not say it every day, but you genuinely mean a lot to me. I hope you never forget how special, beautiful, and important you are. I wish I could give you all the happiness in the world because you truly deserve it.",
      "May all your dreams come true. May you always keep smiling, achieve everything you wish for, and never lose the beautiful person you are.",
      "And remember, no matter how far life takes us or how busy we become, you'll always have a special place in my heart.",
      "One more thing...",
      "If I could choose my best friend a thousand times, I would still choose you every single time. 🥹❤️",
      "Once again, Happy Birthday, Moon! 🌙",
    ],
    closing: "With lots of love,",
    signature: "Your Best Friend ❤️",
  },

  // ==========================================================================
  // 6. FRIENDSHIP SECTION (Sweet Messages & Bestie Vows)
  // ==========================================================================
  friendshipMessages: [
    {
      icon: "Sparkles",
      title: "One in a Billion",
      message: "You are one of the most special people in my life. The world is so much brighter with you in it.",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: "HeartHandshake",
      title: "My Safe Haven",
      message: "Thank you for always being there—through every high, every low, and every goofy midnight crisis.",
      color: "from-purple-400 to-indigo-500",
    },
    {
      icon: "Smile",
      title: "Infinite Joy",
      message: "May your smile never fade. It has the magic power to heal any bad day in an instant.",
      color: "from-fuchsia-400 to-pink-500",
    },
    {
      icon: "Stars",
      title: "Dream Big",
      message: "I hope all your dreams come true this year. You deserve every ounce of magic the universe has to offer.",
      color: "from-violet-400 to-purple-600",
    },
  ],

  // Fun interactive bestie promises / vouchers
  bestiePerks: [
    { title: "Unlimited Hugs", desc: "Redeemable anytime, no expiration date! 🤗" },
    { title: "Late Night Rants", desc: "24/7 listening service with zero judgment 🌙" },
    { title: "Ice Cream On Me", desc: "Whenever you feel even 1% sad 🍦" },
    { title: "Partner in Crime", desc: "Ready for any crazy idea in 5 seconds flat 🚀" },
  ],

  // ==========================================================================
  // 7. FINAL SURPRISE & GRAND CELEBRATION
  // ==========================================================================
  finalSurprise: {
    mysteryPrompt: "Wait... there's one final mystery gift waiting just for you! ✨",
    boxLabel: "Final Grand Surprise 🎁",
    headline: "Happy Birthday Once Again, Bestie!",
    subheadline: "You Deserve All the Happiness in the World. ❤️",
    wishes: [
      "✨ May your year be filled with unforgettable adventures",
      "🌸 May your heart always be as full and glowing as today",
      "💫 Keep shining bright and never stop being your authentic wonderful self!",
    ],
    replayButton: "Replay the Journey 🔄",
    shareMessage: "Made with all my love for my best friend! 💖",
  },

  // ==========================================================================
  // 8. MUSIC & AUDIO SETTINGS
  // ==========================================================================
  audio: {
    autoPlayHint: "Tap anywhere to enable music! 🎵",
    // If you want a custom MP3, place it at public/audio/birthday.mp3
    // and provide the path here. If null or empty, our built-in Web Audio
    // music-box synthesizer plays automatically with zero external dependencies!
    customAudioPath: null, 
    songTitle: "Happy Birthday Music-Box Melody 🎶",
  },
};
