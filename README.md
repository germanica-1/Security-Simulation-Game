# Access Control Challenge

A browser-based security checkpoint game built for a school expo. Players act as a security officer: compare each visitor with their ID card, then **Approve** or **Deny** entry before time runs out. The game is inspired by *Papers, Please*, and its UI was first made with Figma Make.

**Play it here:** https://germanica-1.github.io/Security-Simulation-Game/

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [How to Play](#how-to-play)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Architecture & Game Flow](#architecture--game-flow)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Credits](#credits)

---

## Overview

**Access Control Challenge** (subtitled *Security & Network Training System — SeNTs* in the game) is a single-page React app. It needs no backend and keeps no saved data. Each session generates a random list of visitors. Some have IDs that don't match what they say. The player must spot the mismatches under time pressure.

## Key Features

- **Random scenarios every session**: 20 visitors are generated per game, using random names, ages, purposes of visit and ID numbers.
- **Five verification checks**: name, age, purpose, ID number and ID expiry.
- **Weighted, layered errors**: each visitor has a 40% chance of being fully valid. Otherwise they get 1–3 errors, weighted toward harder-to-spot ones (one changed digit in the ID number, ±3 years on the age).
- **Time pressure**: a 90-second countdown. A looping warning sound starts at 30 seconds and the timer pulses red.
- **Audio feedback**: each visitor speaks a random voice line, and button clicks, correct answers and wrong answers have their own sound effects.
- **Instant feedback**: a popup after each decision explains what went wrong (for example, "You approved a visitor with a mismatched name"). Wrong answers also shake the screen.
- **End-of-game summary**: score, accuracy, mistakes and a performance rating, with a restart button.

## How to Play

1. Look at the **Visitor Checkpoint** panel (left) and the **ID Verification** panel (right).
2. Compare **name, age, purpose and ID number** between the two panels.
3. Check the card's **Expires** date against today's date. The card does not say whether it is valid or expired, so you have to read the date.
4. Click **APPROVE** if everything matches and the ID is not expired. Otherwise click **DENY**.

| Rule | Value |
|---|---|
| Time limit | 90 seconds |
| Win condition | 10 correct decisions |
| Lose condition | 3 mistakes, or the timer reaches 0 |
| Visitors per session | 20 |

End-screen ratings: **≥ 90%** accuracy → "Excellent Performance!", **≥ 70%** → "Good Work!", below that → "Keep Training!". Accuracy is your score divided by the target of 10.

## Technology Stack

| Area | Technology |
|---|---|
| UI framework | [React 18](https://react.dev/) + TypeScript (`.tsx`) |
| Build tool / dev server | [Vite 6](https://vitejs.dev/) with `@vitejs/plugin-react` |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite`, plus custom CSS keyframes |
| Icons | [lucide-react](https://lucide.dev/) |
| Audio | Browser `HTMLAudioElement` API (no audio library) |
| Deployment | [gh-pages](https://github.com/tschaub/gh-pages) → GitHub Pages |

> **Note:** `package.json` also lists many packages from the Figma Make template (MUI, Radix UI, Recharts, react-dnd, etc.), and `src/app/components/ui/` holds the template's shadcn/ui components. The game itself doesn't import them. It only uses React, lucide-react and Tailwind.

## Project Structure

```
Security-Simulation-Game/
├── index.html                  # HTML entry; mounts #root and loads src/main.tsx
├── package.json                # Scripts and dependencies
├── vite.config.ts              # Vite config: base path, React + Tailwind plugins, "@" alias
├── tsconfig.json               # TypeScript settings ("@/*" → "src/*")
├── postcss.config.mjs          # Empty PostCSS config (Tailwind runs through the Vite plugin)
├── ATTRIBUTIONS.md             # Third-party credits (shadcn/ui, Unsplash)
└── src/
    ├── main.tsx                # React entry point
    ├── types.d.ts              # Module declarations for .mp3, .m4a, .jfif, .png, .jpg imports
    ├── app/
    │   ├── App.tsx             # Game state, timer, scoring, audio, game-over screen
    │   └── components/
    │       ├── GameData.ts     # Types + random scenario generator (names, purposes, errors)
    │       ├── VisitorPanel.tsx    # Left panel: visitor photo and stated details
    │       ├── IDCardPanel.tsx     # Right panel: the visitor's ID card
    │       ├── ControlPanel.tsx    # Timer, score, mistakes, APPROVE / DENY buttons
    │       ├── FeedbackPopup.tsx   # Correct / wrong result popup
    │       ├── figma/ImageWithFallback.tsx  # Figma Make helper (unused)
    │       └── ui/             # shadcn/ui components from the template (unused)
    ├── assets/
    │   ├── images/profiles/    # profile_1–6.jfif visitor photos
    │   ├── sounds/             # click, correct, wrong and 30-second warning SFX (.mp3)
    │   └── voicelines/male_voicelines/  # voice_1–8.m4a visitor voice lines
    └── styles/
        ├── index.css           # Imports the files below + screen-shake animation
        ├── tailwind.css
        ├── theme.css
        └── fonts.css
```

## Prerequisites

- **Node.js** 18 or newer (Vite 6 needs `^18`, `^20` or `>=22`)
- **npm** (the repo ships a `package-lock.json`)
- **Git**, plus push access to the repo if you want to deploy

Check your versions:

```bash
node -v
npm -v
```

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/germanica-1/Security-Simulation-Game.git
cd Security-Simulation-Game

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Vite prints a local URL. The app is served under the `/Security-Simulation-Game/` base path, so open:

```
http://localhost:5173/Security-Simulation-Game/
```

No environment variables or extra configuration are needed.

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Builds the production bundle into `dist/` |
| `npm run preview` | Serves the built `dist/` locally to check the production build |
| `npm run deploy` | Publishes `dist/` to the `gh-pages` branch with `gh-pages -d dist` |

There are no test, lint or type-check scripts in this project.

## Deployment (GitHub Pages)

`npm run deploy` does **not** build first, so always build before deploying:

```bash
npm run build
npm run deploy
```

This pushes `dist/` to the `gh-pages` branch. GitHub Pages then serves it at the `homepage` URL in `package.json`.

These two values must match the repository name:

- `base: '/Security-Simulation-Game/'` in `vite.config.ts`
- `"homepage"` in `package.json`

## Architecture & Game Flow

All game logic runs in the browser. `App.tsx` owns the state and passes data down to presentational components.

```
generateScenarios()  ──►  App.tsx (state: index, timer, score, mistakes, feedback)
   (GameData.ts)            │
                            ├──► VisitorPanel   (visitor's stated details)
                            ├──► IDCardPanel    (ID card details)
                            ├──► ControlPanel   (timer / score / buttons) ──► onApprove / onDeny
                            └──► FeedbackPopup  (result + mistake reason)
```

### 1. Scenario generation (`GameData.ts`)

`generateScenarios()` runs once when the app loads and builds 20 scenarios. Each one has:

- a **visitor**: name, age, purpose, ID number, photo and voice line
- an **ID card**: a copy of the visitor's details, possibly with errors, plus status, issue date and expiry date

Errors are picked from a weighted pool: `id` ×3, `purpose` ×2, `age` ×2, `name` ×1, `expired` ×1. An expired card gets an expiry date in the past. A valid card gets one 30–395 days in the future. Photos and voice lines are shuffled and handed out in turn, so they repeat less often.

### 2. Decision check (`App.tsx` → `handleDecision`)

The visitor counts as valid only if **all** of these are true:

```ts
visitor.name     === idCard.name
visitor.age      === idCard.age
visitor.purpose  === idCard.purpose
visitor.idNumber === idCard.idNumber
idCard.status    === "Valid"
```

A decision is correct when the player approves a valid visitor or denies an invalid one. A correct answer adds 1 to the score. A wrong answer adds 1 mistake, plays the wrong-answer sound and shakes the screen. After 2.5 seconds the game moves on to the next visitor.

### 3. Game loop

- A `setInterval` effect counts the timer down once per second.
- The game ends when the **score reaches 10**, **mistakes reach 3**, the **timer hits 0**, or all 20 visitors have been seen.
- **Start New Training Session** resets the timer, score and mistakes. It keeps the same 20 scenarios, which are only regenerated on a page reload.

## Customization

| What to change | Where |
|---|---|
| Time limit (90 s) | `useState(90)` and `setTimeRemaining(90)` in `src/app/App.tsx` |
| Target score / max mistakes | `TARGET_SCORE` and `MAX_MISTAKES` in `src/app/App.tsx` |
| Number of visitors (20) | loop in `generateScenarios()` in `src/app/components/GameData.ts` |
| Valid-visitor chance and error weights | `errorCount` and `errorTypes` in `GameData.ts` |
| Names and purposes of visit | `firstNames`, `lastNames` and `purposes` arrays in `GameData.ts` |
| Visitor photos | add files in `src/assets/images/profiles/`, then import them and add them to `profiles` in `GameData.ts` |
| Voice lines | add files in `src/assets/voicelines/male_voicelines/`, then import them and add them to `maleVoices` in `GameData.ts` |

When you add an asset with a new file extension, add a matching `declare module` entry to `src/types.d.ts` so TypeScript accepts the import.

## Troubleshooting

**Blank page or 404s on `npm run dev` / `npm run preview`**
Open the URL with the base path: `http://localhost:5173/Security-Simulation-Game/`. The site root (`/`) won't load the app.

**No voice line for the first visitor**
Browsers block audio until the user interacts with the page. The first voice line may be silent. Sounds work normally after the first click.

**Deployed site shows an old version**
`npm run deploy` publishes whatever is in `dist/`. Run `npm run build` first.

**Deployed site loads but assets 404 (fork or renamed repo)**
Update `base` in `vite.config.ts` and `homepage` in `package.json` to the new repository name, then rebuild and redeploy.

**Layout looks cramped or broken on a phone**
The game uses a fixed two-column layout made for desktop or expo-kiosk screens. It isn't responsive yet.

**`npm install` is slow or very large**
Many template dependencies are installed even though the game doesn't use them (see the [Technology Stack](#technology-stack) note).

## Future Improvements

- Remove the unused Figma Make template packages and `ui/` components to cut install size.
- Regenerate scenarios on restart, not only on page reload.
- Make the layout responsive for tablets and phones.
- Add a start screen with instructions, plus difficulty levels.
- Add female voice lines and more visitor photos.
- Add a type-check script (`tsc --noEmit`) and unit tests for `generateScenarios()` and the decision logic.
- Save high scores with `localStorage` for expo leaderboards.

## Credits

- Developed as a school expo project, with UI scaffolding from Figma Make.
- UI components from [shadcn/ui](https://ui.shadcn.com/) under the [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md). See [`ATTRIBUTIONS.md`](ATTRIBUTIONS.md).
- Gameplay inspired by *Papers, Please* by Lucas Pope.
