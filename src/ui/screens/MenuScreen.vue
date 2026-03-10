<script setup>
import { ref } from 'vue'
import { useGame }   from '../../composables/useGame.js'
import { useMemory } from '../../composables/useMemory.js'
import { LEVELS }    from '../../game/data/levels.js'

const { startGame }   = useGame()
const { startMemory } = useMemory()
const selectedLevel   = ref(2)
</script>

<template>
  <div class="menu-screen">
    <div class="menu-characters">
      <div class="menu-monster">👾</div>
      <div class="menu-person">🧒</div>
    </div>

    <div class="menu-logo">
      <h1>EinMalEins mit Spaß</h1>
      <div class="subtitle">Einfach. Schnell. Gelernt.</div>
    </div>

    <div class="level-section">
      <h2>LEVEL WÄHLEN</h2>
      <div class="level-grid">
        <button
          v-for="lvl in LEVELS" :key="lvl"
          class="level-btn"
          :class="{ selected: selectedLevel === lvl }"
          @click="selectedLevel = lvl"
        >
          ×{{ lvl }}
          <small>{{ lvl }}er</small>
        </button>
      </div>
    </div>

    <div class="menu-play-btns">
      <button class="play-btn" @click="startGame(selectedLevel)">Spiel 1</button>
      <button class="play-btn memory-btn" @click="startMemory(selectedLevel)">Spiel 2</button>
    </div>
  </div>
</template>
