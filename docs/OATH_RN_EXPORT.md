# Oath — React Native Export Context
## Design → Cursor handoff reference

---

## 1. Fonts

### Headings / Display — Cinzel
Used for: player name, class name (WARRIOR), section labels (ATTRIBUTES, QUESTS), stat names (Strength, Discipline).
- Google Fonts: `@expo-google-fonts/cinzel` (or load via `expo-font` + CDN URL)
- Weights in use: 400 (regular), 600 (semibold), 700 (bold), 900 (black)
- Letter spacing: 0.06em–0.3em depending on context (wider for labels, tighter for names)
- Install:
  ```bash
  npx expo install @expo-google-fonts/cinzel expo-font
  ```
  ```tsx
  import { useFonts, Cinzel_700Bold, Cinzel_400Regular } from '@expo-google-fonts/cinzel'
  ```

### Data / Mono — Space Mono
Used for: stat abbreviations (STR, DIS), grade ranks (B+, A-), XP values (+80 XP), quest type labels (DAILY, TRIAL, OATH), subclass name (FIGHTER), XP numbers (3,240 / 5,000).
- Google Fonts: `@expo-google-fonts/space-mono`
- Weights in use: 400, 700
  ```bash
  npx expo install @expo-google-fonts/space-mono
  ```
  ```tsx
  import { useFonts, SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono'
  ```

### Font size scale used in this design (web px → RN equivalent)
| Role                  | Web px | RN approx |
|-----------------------|--------|-----------|
| Player name (h1)      | 22px   | 22        |
| WARRIOR (class)       | 23px   | 23        |
| Stat grade (B+, A-)   | 22px   | 22        |
| Stat full name        | 14px   | 14        |
| Section label         | 10px   | 10        |
| Subclass (FIGHTER)    | 11px   | 11        |
| Quest name            | 13px   | 13        |
| Quest XP tag          | 10px   | 10        |
| XP numbers            | 11px   | 11        |
| Stat abbreviation     | 10px   | 10        |

---

## 2. Color Tokens

```ts
// theme/colors.ts
export const COLORS = {
  // Backgrounds
  bg:           '#07080f',   // screen background
  surface:      '#0f1118',   // card / panel surface
  surface2:     '#161820',   // elevated surface (pressed states)
  border:       '#1e2030',   // all dividers and card borders

  // Gold — primary accent
  gold:         '#c8980a',
  goldDim:      '#7a5c06',
  goldGlow:     'rgba(200,152,10,0.15)',
  goldText:     '#e8c84a',   // lighter gold for small text on dark

  // Text
  textPrimary:  '#e8e4d8',   // main readable text
  textDim:      '#6e6c64',   // labels, secondary info
  textMuted:    '#3a3a3a',   // placeholders, disabled

  // Tier medals
  tierSilver:   '#9ba8b4',
  tierBronze:   '#a0622a',
  tierGold:     '#c8980a',

  // Stats — each has full + dim version
  str:          '#e05030',
  strDim:       'rgba(224,80,48,0.15)',
  dis:          '#2a70e0',
  disDim:       'rgba(42,112,224,0.15)',
  mind:         '#d08020',
  mindDim:      'rgba(208,128,32,0.15)',
  vit:          '#28a060',
  vitDim:       'rgba(40,160,96,0.15)',
}
```

---

## 3. Spacing & Layout

The design uses a mobile-first phone layout with consistent horizontal padding.

```ts
export const SPACING = {
  screenPadding: 20,   // px — all sections use this horizontal padding
  cardGap:        8,   // gap between stat cards in the 2x2 grid
  sectionGap:    16,   // vertical gap between major sections
  cardPadding:   12,   // internal card padding
}
```

---

## 4. Stat Card Design (key component)

Each card uses a **cut top-right corner** (clip-path in web = custom polygon View in RN).

In React Native, `clip-path` is not directly available. Use one of:
- `react-native-svg` to draw a polygon background
- A custom `View` with an absolutely-positioned triangle covering the corner in the bg color

```tsx
// Recommended: SVG polygon background approach
import Svg, { Polygon } from 'react-native-svg'

// Card dimensions approx: width = (screenWidth - 20*2 - 8) / 2, height = 88
// Cut corner = top-right, 14px inset
const w = cardWidth
const h = 88
const cut = 14
// polygon points: "0,0  w-cut,0  w,cut  w,h  0,h"
```

Card structure per stat:
```
[ left color bar (3px wide, full height, stat color) ]
[ top row: abbrev (STR) ........... grade (B+)       ]
[ thin rule                                           ]
[ full stat name (Strength)                           ]
[ progress bar (stat color, ~65% filled)              ]
```

---

## 5. Character Sprite Panel

The sprite sits in a full-width container, shifted ~8% left of center.
The bottom of the sprite fades out — in RN, use `expo-linear-gradient` as an
overlay positioned at the bottom of the image container:

```tsx
import { LinearGradient } from 'expo-linear-gradient'

// Over the bottom 35% of the sprite container
<LinearGradient
  colors={['transparent', '#07080f']}
  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: imageHeight * 0.35 }}
  pointerEvents="none"
/>
```

Image itself uses `resizeMode="contain"`, no border radius.
Apply a drop shadow via `shadowColor: '#000'`, `shadowOpacity: 0.85`, `shadowRadius: 20`, `elevation: 12`.

---

## 6. Section Dividers

Centered section labels with ruled lines on each side:

```tsx
// Pattern used for ATTRIBUTES, QUESTS labels
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
  <View style={{ flex: 1, height: 1, backgroundColor: '#1e2030' }} />
  <Text style={{ fontFamily: 'SpaceMono_400Regular', fontSize: 10,
                 letterSpacing: 3, color: '#6e6c64' }}>
    ATTRIBUTES
  </Text>
  <View style={{ flex: 1, height: 1, backgroundColor: '#1e2030' }} />
</View>
```

Diamond divider between sections (small SVG):
```tsx
// 10x10 SVG diamond, stroke gold at 25% opacity
```

---

## 7. XP Progress Bar

```tsx
// Track: height 3, backgroundColor '#1e2030', borderRadius 2
// Fill: width = `${(xpCurrent / xpMax) * 100}%`, backgroundColor '#c8980a'
// Glow: shadowColor '#c8980a', shadowOpacity 0.5, shadowRadius 4
```

---

## 8. Quest Row Structure

```
[ checkbox (18x18, cut-corner or rounded 2px) ]
[ quest type label pill (DAILY/TRIAL/OATH) ]
[ quest name — Cinzel 13px, textPrimary ]
[ stat tag pill (STR/DIS/MND/VIT in stat color) ]
[ XP value (+80 XP — SpaceMono, gold) ]
```
Completed quests: `textDecorationLine: 'line-through'`, text color dimmed to `#3a3a3a`.
Checkbox checked state: background `rgba(200,152,10,0.12)`, border `rgba(200,152,10,0.4)`.

---

## 9. Streak Bar

7 weekly squares (Mon–Sun), ~32x32 each, gap 6.
- Completed day: border 1px `#c8980a`, background `rgba(200,152,10,0.15)`, day letter gold
- Today (incomplete): border 1px `#3a3a4a`, background transparent, dot pulse indicator
- Future: border 1px `#1e2030`, background transparent, letter `#3a3a3a`

Flame icon + streak count left-aligned, `font-mono`, gold.
```

---

## 10. Architecture Notes (from vision doc)

Per the app vision (Section E), the data layer uses:
- `StorageAdapter` → `AsyncStorage` (MVP), swap for Supabase later
- Pure util functions: `calcStatRank`, `calcGlobalRank`, `calcStreakMultiplier`
- Hooks: `usePlayer`, `useStats`, `useQuests`, `useStreak`
- Storage keys follow `player:profile`, `player:stats`, `quests:{date}` pattern

Screen map (6 screens, Section A12):
1. Onboarding
2. **Home / Dashboard** ← this is what we've been building
3. Log Action
4. Stat Detail
5. Rank Screen
6. Share Card

Classes at MVP: **Recruit** (easy), **Warrior** (medium-hard), **Kaizen** (hard).
Each class has 7 rank titles. Current design shows: Warrior → Fighter (rank 2 of 7).

---

## 11. Recommended RN Libraries

| Need | Library |
|---|---|
| Fonts | `@expo-google-fonts/cinzel`, `@expo-google-fonts/space-mono` |
| SVG (cards, dividers, icons) | `react-native-svg` |
| Bottom fade / gradients | `expo-linear-gradient` |
| Animations (idle sprite, XP fill) | `react-native-reanimated` |
| Storage (MVP) | `@react-native-async-storage/async-storage` |
| Navigation | `expo-router` (file-based, recommended) |
| Haptics (quest completion) | `expo-haptics` |
| Notifications | `expo-notifications` |
