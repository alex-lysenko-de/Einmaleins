import { reactive, computed } from 'vue'
import { playSuccess, playError, playVictory } from '../game/audio/audioEngine.js'
import { useConfetti } from './useConfetti.js'
import { router } from '../router/index.js'
import { calcScore } from '../services/scoreCalc.js'
import { getOrCreateGuid, getPlayerName, addHistoryEntry } from '../services/playerStore.js'
import { submitScore } from '../services/leaderboard.js'

// ── Singleton state ────────────────────────────────────────────────────────────
const state = reactive({
  levels:      [2],
  queue:       [],
  answered:    0,
  correct:     0,
  input:       '',
  feedback:    '',   // 'correct' | 'wrong' | ''
  shaking:     false,
  totalScore:  0,    // accumulated score for the session
  lastScore:   0,    // score earned for the last question
  submitting:  false,
})

// Per-question timer
let questionStart  = 0
let feedbackTimer  = null

const currentQ = computed(() => state.queue[state.answered] || { a: 0, b: 0 })
const progress  = computed(() =>
  state.queue.length ? (state.answered / state.queue.length) * 100 : 0
)

const { launchConfetti } = useConfetti()

/**
 * Build deduplicated, shuffled queue for multiple levels.
 * Commutativity: a×b and b×a → keep only one (the one with smaller a first).
 */
function buildQueue(levels) {
  const seen = new Set()
  const list = []
  for (const a of levels) {
    for (let b = 2; b <= 10; b++) {
      const key = `${Math.min(a, b)}_${Math.max(a, b)}`
      if (seen.has(key)) continue
      seen.add(key)
      list.push({ a, b })
    }
  }
  // Fisher-Yates shuffle
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

function levelLabel(levels) {
  if (levels.length === 8) return '×2–×9'
  return levels.map(l => `×${l}`).join(' ')
}

async function finishExam() {
  playVictory()
  launchConfetti()

  // Save to local history
  addHistoryEntry({
    score:          state.totalScore,
    correctAnswers: state.correct,
    total:          state.queue.length,
    level:          levelLabel(state.levels),
  })

  // Submit to remote leaderboard (non-blocking)
  state.submitting = true
  const userId = getOrCreateGuid()
  const name   = getPlayerName() || 'Anonym'
  submitScore(userId, name, state.totalScore)
    .finally(() => { state.submitting = false })

  router.push({ name: 'exam-result' })
}

// ── Public composable ─────────────────────────────────────────────────────────
export function useExam() {

  function startExam(levels) {
    const levelsArr = Array.isArray(levels) ? levels : [levels]
    clearTimeout(feedbackTimer)
    Object.assign(state, {
      levels:     levelsArr,
      queue:      buildQueue(levelsArr),
      answered:   0,
      correct:    0,
      input:      '',
      feedback:   '',
      shaking:    false,
      totalScore: 0,
      lastScore:  0,
      submitting: false,
    })
    questionStart = Date.now()
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

    const Tanswer = (Date.now() - questionStart) / 1000
    const val     = parseInt(state.input)
    const { a, b } = currentQ.value
    const isCorrect = val === a * b

    if (isCorrect) {
      const pts       = calcScore({ a, b, Tanswer })
      state.lastScore  = pts
      state.totalScore += pts
      state.feedback   = 'correct'
      state.correct++
      playSuccess()

      // Remove commutative twin from remaining queue
      if (a !== b) {
        const twinIdx = state.queue.findIndex(
          (q, i) => i > state.answered && q.a === b && q.b === a
        )
        if (twinIdx !== -1) state.queue.splice(twinIdx, 1)
      }
    } else {
      state.lastScore = 0
      state.feedback  = 'wrong'
      state.shaking   = true
      playError()
      setTimeout(() => { state.shaking = false }, 400)
    }

    clearTimeout(feedbackTimer)
    feedbackTimer = setTimeout(() => {
      state.feedback = ''
      state.input    = ''
      state.answered++
      questionStart  = Date.now()   // reset timer for next question

      if (state.answered >= state.queue.length) {
        finishExam()
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

  function retry() { startExam(state.levels) }

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
