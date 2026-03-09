import { reactive, computed, ref } from 'vue'
import { GameEngine }      from '../game/engine/GameEngine.js'
import { createGameState } from '../game/state/gameState.js'
import { monsterForLevel } from '../game/data/monsters.js'
import { playSuccess, playError, playVictory } from '../game/audio/audioEngine.js'
import { useConfetti }     from './useConfetti.js'
import { useAppleAnimation, spawnApple } from './useAppleAnimation.js'
import { router }          from '../router/index.js'

// ── Singleton — created once at module level ──────────────────────────────────
const engine = new GameEngine()

const state = reactive(createGameState(2))
engine.init(state)

const currentMonster = computed(() => monsterForLevel(state.level))
const starShow       = ref([false, false, false])

const { monsterShaking, playerShaking, flyingApples, splatFragments } = useAppleAnimation()

// ── Wire engine callbacks once ────────────────────────────────────────────────
engine.onDamage(({ toMonster }) => {
  toMonster ? playSuccess() : playError()
  spawnApple(toMonster)
})

const { launchConfetti } = useConfetti()

engine.onVictory(() => {
  playVictory()
  launchConfetti()
  starShow.value = [false, false, false]
  setTimeout(() => { starShow.value[0] = true }, 300)
  setTimeout(() => { starShow.value[1] = true }, 600)
  setTimeout(() => { starShow.value[2] = true }, 900)
  router.push({ name: 'victory' })
})

// ── Public composable ─────────────────────────────────────────────────────────
export function useGame() {
  function startGame(level) {
    engine.startLevel(level)
    router.push({ name: 'game' })
  }

  function selectCard(card)        { engine.selectCard(card) }
  function switchVisualMode(mode)  { engine.switchVisualMode(mode) }

  function nextLevel() {
    engine.startLevel(Math.min(9, state.level + 1))
    router.push({ name: 'game' })
  }

  function goMenu() {
    router.push({ name: 'menu' })
  }

  return {
    state,
    currentMonster,
    monsterShaking,
    playerShaking,
    flyingApples,
    splatFragments,
    starShow,
    startGame,
    selectCard,
    switchVisualMode,
    nextLevel,
    goMenu,
  }
}
