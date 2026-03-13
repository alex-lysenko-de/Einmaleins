import { reactive, computed } from 'vue'
import { playSuccess, playError, playVictory } from '../game/audio/audioEngine.js'
import { useConfetti } from './useConfetti.js'
import { router } from '../router/index.js'

// ── Singleton state ────────────────────────────────────────────────────────────
const state = reactive({
  level:    2,
  queue:    [],
  answered: 0,
  correct:  0,
  input:    '',
  feedback: '', // 'correct' | 'wrong' | ''
  shaking:  false,
})

let feedbackTimer = null

const currentQ = computed(() => state.queue[state.answered] || { a: 0, b: 0 })
const progress  = computed(() =>
  state.queue.length ? (state.answered / state.queue.length) * 100 : 0
)

const { launchConfetti } = useConfetti()

function buildQueue(level) {
  const list = []
  for (let b = 2; b <= 10; b++) {
    list.push({ a: level, b })
  }
  // Fisher-Yates shuffle
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

// ── Public composable ─────────────────────────────────────────────────────────
export function useExam() {

  function startExam(level) {
    clearTimeout(feedbackTimer)
    Object.assign(state, {
      level,
      queue:    buildQueue(level),
      answered: 0,
      correct:  0,
      input:    '',
      feedback: '',
      shaking:  false,
    })
    router.push({ name: 'exam' })
  }

  function press(digit) {
    if (state.feedback) return
    if (state.input.length >= 3) return
    state.input += digit
  }

  function del() {
    if (state.feedback) return
    state.input = state.input.slice(0, -1)
  }

  function submit() {
    if (state.feedback) return
    if (!state.input) return
    const val = parseInt(state.input)
    const ans = currentQ.value.a * currentQ.value.b
    const isCorrect = val === ans

    if (isCorrect) {
      state.feedback = 'correct'
      state.correct++
      playSuccess()
    } else {
      state.feedback = 'wrong'
      state.shaking  = true
      playError()
      setTimeout(() => { state.shaking = false }, 400)
    }

    clearTimeout(feedbackTimer)
    feedbackTimer = setTimeout(() => {
      state.feedback = ''
      state.input    = ''
      state.answered++
      if (state.answered >= state.queue.length) {
        playVictory()
        launchConfetti()
        router.push({ name: 'exam-result' })
      }
    }, isCorrect ? 600 : 900)
  }

  function handleKeydown(e) {
    if (e.key >= '0' && e.key <= '9') { e.preventDefault(); press(e.key) }
    else if (e.key === 'Backspace')    { e.preventDefault(); del() }
    else if (e.key === 'Enter')        { e.preventDefault(); submit() }
  }

  function goMenu() {
    clearTimeout(feedbackTimer)
    router.push({ name: 'menu' })
  }

  function retry() {
    startExam(state.level)
  }

  return {
    state,
    currentQ,
    progress,
    startExam,
    press,
    del,
    submit,
    handleKeydown,
    goMenu,
    retry,
  }
}
