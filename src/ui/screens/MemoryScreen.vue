<script setup>
import { useMemory } from '../../composables/useMemory.js'

const { state, selectQuestion, selectAnswer, goMenu } = useMemory()
</script>

<template>
  <div class="memory-screen">
    <div class="memory-header">
      <button class="menu-back-btn" @click="goMenu">← Menü</button>
      <div class="level-badge">×{{ state.level }}</div>
      <div class="memory-lives">
        <span v-for="i in 3" :key="i" class="memory-life" :class="{ lost: i > state.lives }">❤️</span>
      </div>
    </div>

    <!-- Answer cards (shuffled) -->
    <div class="memory-grid">
      <div
        v-for="card in state.answers" :key="card.id"
        class="memory-card answer-card"
        :class="[card.state, { flipped: card.state === 'revealed' }]"
        @click="selectAnswer(card)"
      >
        <div class="memory-card-inner">
          <div class="memory-card-front">{{ card.value }}</div>
          <div class="memory-card-back">{{ card.matchValue }}</div>
        </div>
      </div>
    </div>

    <div class="memory-divider"></div>

    <!-- Question cards (fixed order) -->
    <div class="memory-grid">
      <div
        v-for="card in state.questions" :key="card.id"
        class="memory-card question-card"
        :class="card.state"
        @click="selectQuestion(card)"
      >
        {{ card.value }}
      </div>
    </div>
  </div>
</template>
