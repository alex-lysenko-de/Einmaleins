<script setup>
import { useMemory } from '../../composables/useMemory.js'

const { state, retry, goMenu } = useMemory()
</script>

<template>
  <div class="victory-screen">
    <div class="victory-skull">💔</div>
    <div class="victory-title">Game Over</div>
    <div class="victory-subtitle">Level ×{{ state.level }} — keine Leben mehr</div>
    <div class="victory-btns">
      <button class="next-level-btn" @click="retry">↺ Nochmal versuchen</button>
      <button class="back-menu-btn" @click="goMenu">← Zurück zum Menü</button>
    </div>
  </div>
</template>
