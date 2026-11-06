# Oath

A self-improvement tracker that turns real-world habits into measurable progress. Log what you actually do, build four attributes, and advance through a rank ladder you earned.

> **Status:** in development. The screens and navigation are built; persistence and the full progression engine are not wired up yet (see [Roadmap](#roadmap)).

<!-- TODO: add screenshots here, e.g. ![Dashboard](docs/screenshots/dashboard.png) -->

## What's built

- **Dashboard:** character sprite, XP bar, a four-attribute grid with detail views, and the day's quest list
- **Task log:** mark tasks complete and swipe to delete
- **Task editor:** add preset tasks or create custom ones
- **Rank screen:** the seven-tier ladder with the current rank highlighted
- **Share card:** capture your progress as an image, then share it or save it to your photos

## The progression design

**Four attributes**

| Attribute | Tracks |
|---|---|
| Strength | Workouts and physical training |
| Discipline | Habits, consistency, work output |
| Mind | Learning, reading, focus |
| Vitals | Sleep, nutrition, recovery |

**Seven rank tiers** (shared XP scale, with class-specific titles)

| Tier | XP required |
|---|---|
| Bronze | 0 |
| Iron | 600 |
| Steel | 1,800 |
| Gold | 5,000 |
| Platinum | 13,000 |
| Diamond | 32,000 |
| Obsidian | 75,000 |

**Planned (documented in [`docs/app_vision_v5.md`](docs/app_vision_v5.md), not yet implemented)**

- Three classes (Warrior, Sage, Kaizen), each with its own rank titles and attribute weighting
- Streak multipliers from 1.0x up to 2.0x
- A difficulty ramp: Bronze is fully lenient, Iron is partly lenient, and full difficulty begins at Steel

## Tech stack

- React Native 0.86 and React 19 with TypeScript
- Expo (SDK 57) and Expo Router for file-based navigation
- `react-native-svg` for custom icons and rank badges
- `react-native-view-shot`, `expo-sharing`, and `expo-media-library` for share cards
- Cinzel and Space Mono via Expo Google Fonts
- React Context for task state; an AsyncStorage-backed storage adapter is included but not connected yet

## Getting started

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS, or `w` for web, or scan the QR code with Expo Go.

## Project structure

```
app/          Screens (dashboard, log, rank, share, task editor)
components/   UI, dashboard, rank, share, and task editor components
constants/    Colors, rank progression, preset tasks, stat metadata
hooks/        Task store (React Context)
services/     Storage adapter
types/        Shared TypeScript types
docs/         Design documents
```

## Roadmap

- [ ] Persist tasks and progress with the storage adapter
- [ ] Build the XP engine and rank progression from real logged data
- [ ] Onboarding and class selection
- [ ] Streaks, multipliers, and the difficulty ramp
- [ ] Wire the Sage and Kaizen rank ladders into the UI

## License

**TODO: choose a license.**

## Author

DeAndre Vega · [LinkedIn](https://www.linkedin.com/in/deandre-vega-367968207/) · [GitHub](https://github.com/Dre-lok)
