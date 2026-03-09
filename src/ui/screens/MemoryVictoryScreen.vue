<script setup>
import { useMemory } from '../../composables/useMemory.js'

const { state, startMemory, goMenu } = useMemory()
</script>

<template>
  <div class="victory-screen">
    <div class="victory-skull">🏆</div>
    <div class="victory-title">Alle Paare gefunden!</div>
    <div class="victory-subtitle">Level ×{{ state.level }} gemeistert! 🎉</div>
    <div class="victory-btns">
      <button class="next-level-btn" @click="startMemory(state.level)">↺ Nochmal</button>
      <button v-if="state.level < 9" class="next-level-btn" @click="startMemory(state.level + 1)">
        Nächstes Level →
      </button>
      <button class="back-menu-btn" @click="goMenu">← Zurück zum Menü</button>
    </div>
  </div>
</template>
