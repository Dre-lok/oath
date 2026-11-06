import type { PresetTask } from '../types/task';

// Curated catalog browsed in Task Editor's Preset mode. Selecting one mints
// a real Task (id + createdDate) into the player's active set — this list
// itself never changes at runtime. Replace with a StorageAdapter-backed
// catalog later if presets need to be editable/remote.
export const PRESET_TASKS: PresetTask[] = [
  // Strength
  { name: 'Push-Up Ladder', stat: 'strength', xpValue: 30, taskType: 'daily', isCustom: false, recurring: true },
  { name: '5K Run', stat: 'strength', xpValue: 60, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Progressive Overload Set', stat: 'strength', xpValue: 50, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Grip Strength Hang', stat: 'strength', xpValue: 25, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Iron Trial: Max Deadlift Attempt', stat: 'strength', xpValue: 150, taskType: 'trial', isCustom: false, recurring: false },
  { name: "Warrior's Conditioning Circuit", stat: 'strength', xpValue: 90, taskType: 'class', isCustom: false, recurring: true },

  // Discipline
  { name: 'No Snooze Wake-Up', stat: 'discipline', xpValue: 30, taskType: 'daily', isCustom: false, recurring: true },
  { name: '2hr Deep Focus Block', stat: 'discipline', xpValue: 80, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Digital Sunset — No Screens After 9PM', stat: 'discipline', xpValue: 40, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Cold Shower', stat: 'discipline', xpValue: 25, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Discipline Trial: 24hr Fast', stat: 'discipline', xpValue: 140, taskType: 'trial', isCustom: false, recurring: false },
  { name: "Warrior's Code of Conduct Review", stat: 'discipline', xpValue: 70, taskType: 'class', isCustom: false, recurring: true },

  // Mind
  { name: 'Read 20 Pages', stat: 'mind', xpValue: 40, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Journal Reflection', stat: 'mind', xpValue: 30, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Meditate 10 Minutes', stat: 'mind', xpValue: 35, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Learn a New Skill — 30 Min', stat: 'mind', xpValue: 45, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Mind Trial: Memory Challenge', stat: 'mind', xpValue: 120, taskType: 'trial', isCustom: false, recurring: false },
  { name: "Warrior's Tactical Study", stat: 'mind', xpValue: 65, taskType: 'class', isCustom: false, recurring: true },

  // Vitals
  { name: '8 Hours Sleep', stat: 'vitals', xpValue: 35, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Drink 3L Water', stat: 'vitals', xpValue: 20, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Mobility / Stretch Routine', stat: 'vitals', xpValue: 30, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Whole Foods Only Day', stat: 'vitals', xpValue: 40, taskType: 'daily', isCustom: false, recurring: true },
  { name: 'Vitals Trial: Cold Exposure Protocol', stat: 'vitals', xpValue: 130, taskType: 'trial', isCustom: false, recurring: false },
  { name: "Warrior's Recovery Ritual", stat: 'vitals', xpValue: 60, taskType: 'class', isCustom: false, recurring: true },
];
