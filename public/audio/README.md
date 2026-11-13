# 🎵 Custom Audio Folder

Place your background birthday song here!

### How to use your own song:
1. Save your MP3 file here as `birthday.mp3`.
2. Open `src/config/birthdayData.js`.
3. In the `audio` section, set:
   ```javascript
   audio: {
     customAudioPath: "/audio/birthday.mp3",
     songTitle: "My Bestie's Favorite Song 🎶",
   }
   ```
4. If you leave `customAudioPath: null`, our built-in Web Audio music-box melody plays automatically with zero external dependencies!

