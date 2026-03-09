import { reactive, computed } from 'vue'
import { createMemoryCards }              from '../game/modes/memoryMode.js'
import { monsterForLevel }                from '../game/data/monsters.js'
import { playSuccess, playError, playVictory } from '../game/audio/audioEngine.js'
import { useAppleAnimation, spawnApple }  from './useAppleAnimation.js'
import { useConfetti }                    from './useConfetti.js'
import { router }                         from '../router/index.js'

const MAX_HP = 9

// ── Singleton ─────────────────────────────────────────────────────────────────
const state = reactive({
  level:          2,
  questions:      [],
  answers:        [],
  activeQuestion: null,
  monsterHP:      MAX_HP,
  playerHP:       MAX_HP,
  locked:         false,
})

const currentMonster = computed(() => monsterForLevel(state.level))
const { monsterShaking, playerShaking } = useAppleAnimation()
const { launchConfetti } = useConfetti()

// ── Public composable ─────────────────────────────────────────────────────────
export function useMemory() {

  function startMemory(level) {
    const { questions, answers } = createMemoryCards(level)
    Object.assign(state, {
      level,
      questions,
      answers,
      activeQuestion: null,
      monsterHP:      MAX_HP,
      playerHP:       MAX_HP,
      locked:         false,
    })
    router.push({ name: 'memory' })
  }

  function selectQuestion(card) {
    if (state.locked || card.state === 'matched') return
    if (state.activeQuestion?.id === card.id) {
      card.state = 'hidden'
      state.activeQuestion = null
      return
    }
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
      // Correct pair — apple flies to monster
      playSuccess()
      spawnApple(true)
      setTimeout(() => {
        q.state = 'matched'
        a.state = 'matched'
        state.activeQuestion = null
        state.monsterHP--
        state.locked = false
        if (state.monsterHP <= 0) {
          playVictory()
          launchConfetti()
          router.push({ name: 'memory-victory' })
        }
      }, 500)
    } else {
      // Wrong — apple flies to player, reveal answer card
      playError()
      spawnApple(false)
      a.state = 'revealed'
      setTimeout(() => {
        a.state = 'hidden'
        q.state = 'hidden'
        state.activeQuestion = null
        state.playerHP--
        state.locked = false
        if (state.playerHP <= 0) {
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

  return {
    state,
    currentMonster,
    monsterShaking,
    playerShaking,
    startMemory,
    selectQuestion,
    selectAnswer,
    goMenu,
    retry,
  }
}
