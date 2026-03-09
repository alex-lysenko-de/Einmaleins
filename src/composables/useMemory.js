import { reactive } from 'vue'
import { createMemoryCards }        from '../game/modes/memoryMode.js'
import { playSuccess, playError }   from '../game/audio/audioEngine.js'
import { router }                   from '../router/index.js'

// ── Singleton ─────────────────────────────────────────────────────────────────
const state = reactive({
  level:         2,
  questions:     [],
  answers:       [],
  activeQuestion: null,
  lives:         3,
  pairsFound:    0,
  locked:        false,
})

// ── Public composable ─────────────────────────────────────────────────────────
export function useMemory() {

  function startMemory(level) {
    const { questions, answers } = createMemoryCards(level)
    Object.assign(state, {
      level,
      questions,
      answers,
      activeQuestion: null,
      lives:          3,
      pairsFound:     0,
      locked:         false,
    })
    router.push({ name: 'memory' })
  }

  function selectQuestion(card) {
    if (state.locked || card.state === 'matched') return
    // Toggle off if same card clicked again
    if (state.activeQuestion?.id === card.id) {
      card.state = 'hidden'
      state.activeQuestion = null
      return
    }
    // Deselect previous
    if (state.activeQuestion) state.activeQuestion.state = 'hidden'
    card.state = 'active'
    state.activeQuestion = card
  }

  function selectAnswer(card) {
    if (state.locked || card.state === 'matched') return
    if (!state.activeQuestion) return

    const q = state.activeQuestion
    const a = card
    state.locked = true
    a.state = 'active'

    if (q.pairId === a.pairId) {
      // Correct pair
      playSuccess()
      setTimeout(() => {
        q.state = 'matched'
        a.state = 'matched'
        state.activeQuestion = null
        state.pairsFound++
        state.locked = false
        if (state.pairsFound === 9) {
          router.push({ name: 'memory-victory' })
        }
      }, 500)
    } else {
      // Wrong — flip answer card to reveal its true equation
      playError()
      a.state = 'revealed'
      setTimeout(() => {
        a.state = 'hidden'
        q.state = 'hidden'
        state.activeQuestion = null
        state.lives--
        state.locked = false
        if (state.lives <= 0) {
          router.push({ name: 'memory-gameover' })
        }
      }, 1300)
    }
  }

  function goMenu() {
    router.push({ name: 'menu' })
  }

  function retry() {
    startMemory(state.level)
  }

  return { state, startMemory, selectQuestion, selectAnswer, goMenu, retry }
}
