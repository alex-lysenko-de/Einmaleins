<script setup>
import { useGame }   from '../../composables/useGame.js'
import MonsterZone   from '../components/MonsterZone.vue'
import TaskZone      from '../components/TaskZone.vue'
import CardsZone     from '../components/CardsZone.vue'

const {
  state,
  currentMonster,
  monsterShaking,
  playerShaking,
  goMenu,
  selectCard,
  switchVisualMode,
} = useGame()
</script>

<template>
  <div class="flex flex-col py-3 pb-5 min-h-screen gap-2.5">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <button
        class="bg-surface border border-surface2 rounded-xl px-3.5 py-2 text-muted font-nunito text-sm font-bold transition-all hover:text-white hover:border-accent"
        @click="goMenu"
      >← Menü</button>
      <div class="bg-surface border border-surface2 rounded-xl px-4 py-2 font-fredoka text-base text-accent2">
        Level ×{{ state.level }}
      </div>
    </div>

    <MonsterZone
      :monster="currentMonster"
      :monsterHP="state.monsterHP"
      :playerHP="state.playerHP"
      :monsterShaking="monsterShaking"
      :playerShaking="playerShaking"
    />

    <TaskZone
      :currentTask="state.currentTask"
      :visualMode="state.visualMode"
      :rows="state.rows"
      :cols="state.cols"
      :buckets="state.buckets"
      @switchMode="switchVisualMode"
    />

    <CardsZone :cards="state.cards" @selectCard="selectCard" />
  </div>
</template>
