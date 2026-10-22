# Shreeya — The 23rd Case, Version 4

## Installation (VS Code)

1. Unzip the folder and open `shreeya-23rd-case-v4` in VS Code.
2. Open **Terminal > New Terminal**.
3. Run `npm install` and then `npm run dev`.
4. Open the localhost URL shown by Vite (usually http://localhost:5173).
5. Put your media in the folders described below. The folders currently contain instructions, not the actual media.

## Media paths

- `public/images/shreeya-01.jpg` to `shreeya-06.jpg`
- `public/audio/track-01.mp3` to `track-04.mp3`
- `public/video/shreeya-23.mp4`

You can copy these folders from your earlier working website. **Do not overwrite your actual photos, audio or video with the empty placeholder folders.**

Edit `src/content.ts` to change the paths, photo captions, surprise messages, track names and birthday letter. The cover photo uses `shreeya-01.jpg` and the newspaper uses `shreeya-03.jpg`.

## Game guide

Detective puzzle 1: Click the brass key. Puzzle 2: Enter 1023. Puzzle 3: Decode `M P O E P O` to `LONDON`. Solving all three unlocks the finale. Progress is stored locally in the browser; it is not synchronized between devices.

The memory wall flips on click; photo #4 contains an extra hidden note. The passport has four collectible stamps. The 23 cards reveal editable notes. The finale includes a countdown, letter, and video.

## Notes

- These are playful starter messages and puzzles. Personalize them in `src/content.ts` before sharing.
- Media is not bundled in this ZIP. Add files with the exact names or edit the paths.
- For deployment, a static host needs an SPA fallback for direct navigation to routes like `/final`.
- Run `npm run build` to verify production build before publishing.
# 23rdCase
