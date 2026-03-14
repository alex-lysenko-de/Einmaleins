import { createRouter, createWebHashHistory } from 'vue-router'
import { isPlayerSetup } from '../services/playerStore.js'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/setup',       name: 'setup',          component: () => import('../ui/screens/PlayerSetupScreen.vue') },
    { path: '/',            name: 'menu',            component: () => import('../ui/screens/MenuScreen.vue') },
    { path: '/game',        name: 'game',            component: () => import('../ui/screens/GameScreen.vue') },
    { path: '/victory',         name: 'victory',         component: () => import('../ui/screens/VictoryScreen.vue') },
    { path: '/memory',          name: 'memory',          component: () => import('../ui/screens/MemoryScreen.vue') },
    { path: '/memory-victory',  name: 'memory-victory',  component: () => import('../ui/screens/MemoryVictoryScreen.vue') },
    { path: '/memory-gameover', name: 'memory-gameover', component: () => import('../ui/screens/MemoryGameOverScreen.vue') },
    { path: '/exam',        name: 'exam',        component: () => import('../ui/screens/ExamScreen.vue') },
    { path: '/exam-result', name: 'exam-result', component: () => import('../ui/screens/ExamResultScreen.vue') },
    { path: '/leaderboard', name: 'leaderboard', component: () => import('../ui/screens/LeaderboardScreen.vue') },
  ],
})

// Guard: redirect to setup if player name is not set
router.beforeEach((to) => {
  if (to.name !== 'setup' && !isPlayerSetup()) {
    return { name: 'setup' }
  }
})
