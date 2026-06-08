# BPM Prompter

A simple browser-based live BPM detector for musicians. It uses the device microphone through the Web Audio API, shows a large prompter-style BPM display, and includes a manual tap-tempo fallback.

## Files

- `index.html`
- `styles.css`
- `app.js`
- `README.md`

## Use

Open `index.html` in a browser, then press **Start Listening** and allow microphone access.

For iPhone Safari, microphone access is most reliable when served from `https://` or from a local development server. The app itself has no backend and does not send audio anywhere.

## Features

- Web Audio API microphone input
- Large fullscreen-friendly BPM display
- Beat pulse animation
- Start and Stop controls
- Fullscreen control
- Orientation modes saved in `localStorage`
- Dark stage-friendly interface
- Smoothed BPM updates to reduce wild jumps
- Manual tap-tempo fallback

## Notes

Live room-audio BPM detection is intentionally conservative here. It works best with clear transients such as drums, claps, picked bass, or metronome clicks. If the room is noisy or the tempo is ambiguous, use the Tap Tempo button as a reliable fallback.
