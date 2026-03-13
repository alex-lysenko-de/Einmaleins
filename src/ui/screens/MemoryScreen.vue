<script setup>
import { useMemory }  from '../../composables/useMemory.js'
import MonsterZone    from '../components/MonsterZone.vue'

const {
  state,
  currentMonster,
  monsterShaking,
  playerShaking,
  selectQuestion,
  selectAnswer,
  goMenu,
} = useMemory()
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
        Memory ×{{ state.level }}
      </div>
    </div>

    <MonsterZone
      :monster="currentMonster"
      :monsterHP="state.monsterHP"
      :playerHP="state.playerHP"
      :monsterShaking="monsterShaking"
      :playerShaking="playerShaking"
    />

    <!-- Answer cards (shuffled numbers) -->
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="card in state.answers" :key="card.id"
        class="bg-surface2 border-2 rounded-xl py-3 sm:py-4 px-1.5 text-center cursor-pointer transition-all duration-200 relative overflow-hidden"
        :class="{
          'border-[rgba(255,255,255,0.06)] hover:border-accent hover:-translate-y-0.5': card.state === 'idle',
          'border-accent shadow-[0_0_14px_rgba(255,107,53,0.4)] -translate-y-0.5 scale-[1.04]': card.state === 'active',
          'border-green bg-[rgba(6,214,160,0.1)] animate-correct-pulse': card.state === 'revealed',
          'opacity-0 pointer-events-none scale-90 transition-all duration-300': card.state === 'matched',
        }"
        @click="selectAnswer(card)"
      >
        <!-- Flip inner -->
        <div class="relative flex items-center justify-center"
             :style="{ perspective: '600px' }">
          <span
            class="font-fredoka text-xl sm:text-2xl text-accent2 block"
            :style="{ backfaceVisibility: 'hidden' }"
          >{{ card.value }}</span>
        </div>
      </button>
    </div>

    <!-- Divider -->
    <div class="h-0.5 bg-surface2 rounded my-0.5"></div>

    <!-- Question cards (fixed equations) -->
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="card in state.questions" :key="card.id"
        class="bg-surface2 border-2 rounded-xl py-3 sm:py-4 px-1.5 text-center cursor-pointer transition-all duration-200"
        :class="{
          'border-[rgba(255,255,255,0.06)] hover:border-accent hover:-translate-y-0.5': card.state === 'idle',
          'border-accent shadow-[0_0_14px_rgba(255,107,53,0.4)] -translate-y-0.5 scale-[1.04]': card.state === 'active',
          'opacity-0 pointer-events-none scale-90 transition-all duration-300': card.state === 'matched',
        }"
        @click="selectQuestion(card)"
      >
        <span class="font-fredoka text-xl sm:text-2xl text-white">{{ card.value }}</span>
      </button>
    </div>

  </div>
</template>
