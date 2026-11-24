# SHERU BHAI: BILLION TRILLION WORLD TOUR 🌍💸
2.5D comedy shopping game (Vite + vanilla JS + Canvas). Installable PWA, saves to localStorage.

## Run
```
npm install
npm run dev      # local
npm run build    # production build in dist/
```
## Controls
WASD/Arrows move · E shop · ESC pause/settings · Mobile: joystick + E button.

## GitHub
1. Unzip. In the folder: `git init && git add . && git commit -m "Sheru Bhai"`
2. Create an empty repo on github.com, then `git remote add origin <url> && git push -u origin main` (or use "Upload files" on GitHub).

## Vercel
vercel.com → Add New Project → Import the GitHub repo → Framework "Vite" (auto) → Deploy.

## Your audio
Put MP3s in `public/assets/audio/` with these exact names (all optional, missing ones are skipped silently):
`purchase.mp3` (every purchase; falls back to `tadban.mp3`), `tadban.mp3` (included — your upload),
`billion-trillion.mp3` (plays after purchases ≥ $100M), `shopping.mp3` (on arrival), `victory.mp3` (big buys, achievements), `background-music.mp3` (loop).
To rename or remap, edit the `AUDIO` table in `src/main.js`.

## Install on Android
Open the Vercel URL in Chrome → ⋮ menu → "Install app" / "Add to Home screen".
