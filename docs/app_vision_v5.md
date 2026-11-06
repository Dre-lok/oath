# APP VISION DOCUMENT v5
## Oath — RPG Life Tracker
### Phase: Screens in progress | Sprint 1

---

## CHANGELOG FROM v4

- **No Unranked tier.** Player starts at Bronze. Full tier list: Bronze →
  Iron → Steel → Gold → Platinum → Diamond → Obsidian (7 tiers).
- **Leniency ramp redefined as 3 stages, not 2:**
  Bronze = fully lenient · Iron = partially lenient · Steel+ = full difficulty.
- **Rank titles rewritten to remove all collisions** — no two classes share
  a title at any tier anymore (previous draft had Sage/Kaizen sharing
  "Novice" at the start and "Adept" mid-tier).
- Warrior Bronze title changed to **Rookie**.
- Warrior's Obsidian title changed from Legend → **Titan** (Kaizen keeps Legend).
- Kaizen's Bronze/Steel titles changed to remove overlap with Sage.

## CHANGELOG FROM v3 (carried forward)

- Recruit removed as a standalone class. Its "no pressure" behavior is now
  baked into the low-rank leniency ramp — applies to ALL classes.
- Sage added as 3rd launch class (Mind-focused). Was previously post-MVP (B2).
- Rank system restructured: Metal Tier (universal) + Class Title (per-class
  flavor name at that tier). Replaces the old flat "Rank 1–7" numbering.
- Screens status: 5 of 6 MVP screens built. Onboarding remaining.

---

## SECTION A — MVP VISION

### A1 — CORE CONCEPT (unchanged)

A life RPG where you ARE the character. Real actions earn XP, build stat
ranks, and advance a rank you actually earned.

**One-line pitch:** Log your real life. Earn your rank. Build yourself.

---

### A2 — STAT CATEGORIES (unchanged — 4 stats)

| Stat | Color | Hex | Tracks |
|---|---|---|---|
| **Strength** | 🔴 Red | `#e05030` | Physical training, workouts, movement |
| **Discipline** | 🔵 Blue | `#2a70e0` | Habits, consistency, work output, grind |
| **Mind** | 🟡 Amber | `#d08020` | Learning, reading, study, focus |
| **Vitals** | 🟢 Green | `#28a060` | Sleep, nutrition, hygiene, recovery |

(Note: v3 called the Mind color "Yellow," project instructions call it
"All → Amber" — treat Mind = Amber `#d08020` going forward, confirm this
is intentional or a leftover typo before onboarding copy is finalized.)

---

### A3 — XP AND CHALLENGE STRUCTURE (unchanged from v3)

- 4–5 regular challenges/day (10 XP + 10 stat XP each)
- 1 class daily challenge (20 XP + 15 stat XP) — behavior of this challenge
  now depends on rank tier, see A6a
- Completion bonus: +10 XP
- Base daily total: 80 XP
- Streak multiplier: 1.0x → 1.1x (day 3) → 1.25x (day 7) → 1.5x (day 14)
  → 1.75x (day 30) → 2.0x (day 60+)

---

### A4 — GLOBAL RANK SYSTEM (restructured)

Rank is now two parallel labels on the same XP scale:

1. **Metal Tier** — universal, same for every class, same XP thresholds.
2. **Class Title** — flavor name for that tier, unique per class, no
   overlap between classes at any tier.

Same underlying progress, different skin. A Steel Fighter... no — a Steel
Veteran (Warrior) and a Steel Scholar (Sage) are at the same XP milestone,
different titles.

No Unranked tier. Player starts at Bronze.

| Metal Tier | XP required | Difficulty mode |
|---|---|---|
| Bronze *(start)* | 0 | Fully lenient |
| Iron | 600 XP | Partially lenient |
| Steel | 1,800 XP | **Full class difficulty begins** |
| Gold | 5,000 XP | Full |
| Platinum | 13,000 XP | Full |
| Diamond | 32,000 XP | Full |
| Obsidian | 75,000 XP | Full |

Diamond and Obsidian order is swappable if Diamond reads as "higher status"
than Obsidian in testing — flagged as open, not locked.

XP thresholds are the same 7 numbers from v3's global rank table, just
re-mapped onto 7 tiers instead of 7 ranks-plus-unranked. Revisit after
playtest data.

---

### A6 — CLASSES (MVP — 3 at launch)

**Warrior · Sage · Kaizen.** Recruit is retired as a class; its role is
now handled by A6a below, which applies across all three.

---

### A6a — LOW-RANK LENIENCY RAMP (new, replaces Recruit)

Applies to every class, every player, automatically — not a toggle.
Three stages instead of a flat on/off:

**Bronze — fully lenient (player starts here):**
- No streak decay. Missing a day pauses streak, doesn't reset it.
- No stat decay regardless of absence length.
- Class mandatory daily challenge is **fully optional** — skipping it
  only costs that challenge's bonus XP, no other penalty.
- Purpose: let a new player learn the class's rhythm before anything bites.

**Iron — partially lenient (leniency starts easing off):**
- Streak gets one grace day per week — miss beyond that and streak breaks.
- Stat decay can begin, but only after a long absence (14+ days), and mild.
- Mandatory daily challenge is still skippable, but skipping it now slows
  streak-multiplier growth for that week instead of being penalty-free.
- Purpose: a middle step so Steel isn't a cliff — player feels difficulty
  creeping in before it's real.

**Steel and above — full class difficulty:**
- Full class-specific difficulty rules apply (see each class below):
  streak breaks, decay windows, and mandatory-or-else challenges.
- This is the wall — first real test of whether the player can sustain
  the class identity they picked.

---

**WARRIOR**
- Identity: Hard output. Physical focus. Show up and push.
- Stat bias: Strength 1.5x, Discipline 1.25x, Mind 0.9x, Vitals 1.0x
- Full-difficulty rules (Steel+): streak breaks on 2 consecutive missed
  days; mild stat decay after 7-day absence.
- Mandatory daily challenge (Steel+, required or streak breaks):
  1 mile cardio OR 30 min sustained physical effort.
- Bonus: log a strength session, +15 XP.

**SAGE**
- Identity: Mind-first. Learning, wisdom, focus as the grind.
- Stat bias: Mind 1.75x, Vitals 1.25x, Discipline 1.0x, Strength 0.9x
- Full-difficulty rules (Steel+): streak breaks on 2 consecutive missed
  days; mild decay after 7-day absence on Mind specifically.
- Mandatory daily challenge (Steel+, required or streak breaks):
  1 focused learning block (reading, study, course lesson — min. duration
  TBD) logged with what was learned, not just a checkbox.
- Bonus: log a second learning block or documented idea, +15 XP.

**KAIZEN**
- Identity: 1% better every day. Continuous improvement. Hardest class.
- Stat bias: Discipline 1.75x, Mind 1.5x, Strength 1.0x, Vitals 1.25x
- Full-difficulty rules (Steel+): streak breaks on ANY missed day, no
  grace; multiplier resets fully on break (no partial credit).
- Mandatory daily challenge (Steel+, BOTH required):
  1. Complete every task from the previous day's list — nothing dropped.
  2. Add one new task or measurable improvement, logged with detail
     (not self-reported without specifics).

---

### A6b — RANK TITLES (per class, per Metal Tier)

No shared titles across classes at any tier — each is now unique.

| Metal Tier | Warrior | Sage | Kaizen |
|---|---|---|---|
| Bronze *(start)* | Rookie | Novice | Initiate |
| Iron | Fighter | Apprentice | Disciple |
| Steel | Veteran | Scholar | Practitioner |
| Gold | Champion | Adept | Sensei |
| Platinum | Warlord | Archivist | Shihan |
| Diamond | Conqueror | Luminary | Grandmaster |
| Obsidian | Titan | Grand Sage | Legend |

**Changes from prior draft:**
- Warrior Bronze: Fighter → **Rookie** (Fighter shifted up to Iron).
- Warrior Obsidian: Legend → **Titan** — Kaizen keeps Legend, no collision.
- Sage keeps Novice at Bronze (unchanged) and Adept at Gold (unchanged).
- Kaizen Bronze: was Novice (collided with Sage) → **Initiate**.
- Kaizen Steel: was Adept (collided with Sage) → **Practitioner**.
- Kaizen Diamond: **Grandmaster** (was Shihan in the old draft — Shihan
  moved down to Platinum to keep a clean shift, Grand Master merged to
  one word for consistency with Sensei/Shihan tone).

**Status: usable, not final.** Every title is distinct now; still open
to swap individual names as you iterate.

---

### A9 — LOGGING (unchanged from v3)

Swipe/tap to complete. Color-coded by stat. Most critical UX surface.

---

### A12 — MVP SCREEN MAP — STATUS

| # | Screen | Status |
|---|---|---|
| 1 | Onboarding | **Not started — next up** |
| 2 | Dashboard | Built |
| 3 | Log Action / Task fullscreen | Built |
| 4 | Add Task | Built |
| 5 | Stat/Skill module (absorbs Stat Detail) | Built |
| 6 | Rank Screen | Built |
| 7 | Share Card | Built |

5 of 6 original MVP screens are done (Stat Detail folded into the
Stat/Skill module rather than being separate — net screen count unchanged).
Onboarding is the last screen standing between here and Sprint 1 win condition.

**Onboarding must now cover, given the class changes:**
1. Goal-area toggle (unchanged from v3)
2. Class pick — Warrior / Sage / Kaizen, one-line identity + difficulty
   note for each. Since all 3 now carry mandatory challenges at Steel+,
   copy should mention the leniency ramp so new users don't feel
   ambushed later ("full class rules unlock at Steel — take your time").
3. Generated task list based on class + goals, user-editable before confirm
4. First log begins immediately

---

## SECTION B — POST-MVP VISION (unchanged from v3 except B2)

### B2 — ADDITIONAL CLASSES

Sage removed from this list (promoted to MVP launch class). Remaining
post-MVP candidates: Ghost, Monk, Architect.

(Rest of Section B — Monetization, Decay System, Advanced Onboarding,
Social Layer, Growth — carries over unchanged from v3.)

---

## SECTION C — OPEN QUESTIONS (updated)

- [x] Classes locked: Warrior, Sage, Kaizen
- [x] Recruit's leniency behavior baked into Bronze/Iron ramp (3-stage now)
- [x] Tier list locked: Bronze, Iron, Steel, Gold, Platinum, Diamond, Obsidian
- [x] All rank-title collisions between classes removed
- [ ] Diamond vs Obsidian order — swappable, not locked
- [ ] Mind color: Yellow (v3) vs Amber (project instructions) — pick one
- [ ] Kaizen rank titles — usable draft, still iterating per your note
- [ ] Sage mandatory challenge exact duration threshold (min. minutes for
      "1 focused learning block")
- [ ] Onboarding copy for explaining the 3-stage leniency ramp to new users
- [ ] Name: Oath locked per project instructions

---

## CURRENT STATUS

Classes: Warrior / Sage / Kaizen — locked.
Tiers: Bronze → Iron → Steel → Gold → Platinum → Diamond → Obsidian, no
Unranked. Leniency ramp is 3 stages: Bronze full lenient, Iron partial,
Steel+ full difficulty.
Rank titles: locked-and-distinct draft in A6b, Kaizen still open to iterate.
Screens: 5/6 built. Onboarding is the last MVP screen.
Next: build Onboarding, incorporating class pick + leniency-ramp messaging.
