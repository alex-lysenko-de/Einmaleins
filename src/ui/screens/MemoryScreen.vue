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
  <div class="game-screen">
    <div class="game-header">
      <button class="menu-back-btn" @click="goMenu">← Menü</button>
      <div class="level-badge">Memory ×{{ state.level }}</div>
    </div>

    <MonsterZone
      :monster="currentMonster"
      :monsterHP="state.monsterHP"
      :playerHP="state.playerHP"
      :monsterShaking="monsterShaking"
      :playerShaking="playerShaking"
    />

    <!-- Answer cards (shuffled numbers) -->
    <div class="cards-zone memory-answers">
      <button
        v-for="card in state.answers" :key="card.id"
        class="card-btn memory-answer-card"
        :class="{
          active:   card.state === 'active',
          revealed: card.state === 'revealed',
          matched:  card.state === 'matched',
        }"
        @click="selectAnswer(card)"
      >
        <div class="memory-card-inner">
          <span class="memory-card-front card-eq">{{ card.value }}</span>
          <span class="memory-card-back  card-eq">{{ card.matchValue }}</span>
        </div>
      </button>
    </div>

    <div class="memory-divider"></div>

    <!-- Question cards (fixed equations) -->
    <div class="cards-zone">
      <button
        v-for="card in state.questions" :key="card.id"
        class="card-btn memory-question-card"
        :class="{
          active:  card.state === 'active',
          matched: card.state === 'matched',
        }"
        @click="selectQuestion(card)"
      >
        <span class="card-eq">{{ card.value }}</span>
      </button>
    </div>
  </div>
</template>
