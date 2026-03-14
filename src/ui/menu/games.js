import { markRaw }  from 'vue'
import { useGame }   from '../../composables/useGame.js'
import { useMemory } from '../../composables/useMemory.js'
import { useExam }   from '../../composables/useExam.js'

import BattleLevelPicker from './BattleLevelPicker.vue'
import MemoryLevelPicker from './MemoryLevelPicker.vue'
import ExamLevelPicker   from './ExamLevelPicker.vue'

export function useGames() {
  const { startGame }   = useGame()
  const { startMemory } = useMemory()
  const { startExam }   = useExam()

  return [
    {
      id:          'memory',
      name:        'Finde das Paar',
      description: 'Wähle selbst: Aufgabe und Antwort',
      emoji:       '🃏',
      LevelPicker: markRaw(MemoryLevelPicker),
      start:       (level) => startMemory(level),
    },

    {
      id:          'battle',
      name:        'Rückwärts',
      description: 'Sieh die Antwort – finde die Aufgabe! (Reverse)',
      emoji:       '👾',
      LevelPicker: markRaw(BattleLevelPicker),
      start:       (level) => startGame(level),
    },

    {
      id:          'exam',
      name:        'Schnelltest',
      description: 'Beantworte alle Aufgaben schnell hintereinander!',
      emoji:       '⚡',
      LevelPicker: markRaw(ExamLevelPicker),
      start:       (level) => startExam(level),
    },
  ]
}
