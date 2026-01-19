# Papal Schism

A dark, choice-driven narrative game set in medieval Europe during a period of escalating war. Players take on the role of the Pope, navigating corruption, hypocrisy, war, bribery, famine, propaganda, and schism.

## Overview

- **Genre**: Choice-driven narrative game
- **Theme**: Dark, scandalous political drama
- **Setting**: Medieval Europe, 1378
- **Mechanics**: Tap-to-advance dialogue, decision-based choices, timed decisions

## Game Features

- 9 story nodes with branching narratives
- 5 core stats: Legitimacy, Gold, Piety, Stability, Curia
- 4 relationship tracks: France, England, Holy Roman Empire, Castile
- 2 timed decisions with 10-second countdowns
- Autosave to local storage
- Multiple endings based on choices and stats

## Technical Stack

- **Framework**: React Native / Expo
- **State Management**: React hooks with AsyncStorage
- **Styling**: StyleSheet with custom theme
- **Navigation**: React Navigation (stack-based)

## Project Structure

```
client/
├── App.tsx                    # Main app entry
├── data/
│   ├── gameTypes.ts          # TypeScript types for game state
│   └── storyNodes.ts         # Story content and ending calculator
├── hooks/
│   └── useGameState.ts       # Game state management hook
├── screens/
│   ├── TitleScreen.tsx       # Start/continue game screen
│   ├── GameScreen.tsx        # Main gameplay screen
│   └── EndingScreen.tsx      # Final judgment screen
├── components/
│   ├── ChoiceButton.tsx      # Decision button component
│   ├── StatsOverlay.tsx      # Stats modal overlay
│   ├── TimerBar.tsx          # Countdown timer for timed decisions
│   └── ConsequenceOverlay.tsx # "Rome will remember this" overlay
└── constants/
    └── theme.ts              # Colors, spacing, typography
```

## Running the App

The app runs on port 5000:
- Server: Express backend serving landing page and API
- Scan QR code to test on physical device via Expo Go

### Development
```bash
npm run server:dev
```

### Production
```bash
npm run server:build && npm run server:prod
```

## Database

- PostgreSQL with Drizzle ORM
- Schema in `shared/schema.ts`
- Push schema changes: `npm run db:push`

## Recent Changes

- Initial implementation of Papal Schism game
- Complete story with 9 nodes and multiple endings
- Timed decisions with automatic fallback
- Visual scene backgrounds based on story context
- Stats overlay with relationship tracking
- Configured for Replit with PostgreSQL database
