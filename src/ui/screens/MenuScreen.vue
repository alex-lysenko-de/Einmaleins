<script setup>
import { ref } from 'vue'
import { useGames }   from '../menu/games.js'
import GameSelection  from '../menu/GameSelection.vue'
import LevelSelection from '../menu/LevelSelection.vue'

const games        = useGames()
const selectedGame = ref(null)

function onGameSelected(game) { selectedGame.value = game }
function onBack()             { selectedGame.value = null }
function onStart(level)       { selectedGame.value.start(level) }
</script>

<template>
  <div class="flex flex-col items-center pt-6 pb-8 min-h-screen">

    <!-- Characters -->
    <div class="flex justify-between items-end w-full mb-2 px-2">
      <div class="text-7xl leading-none animate-float-ud drop-shadow-[0_0_20px_rgba(255,107,53,0.5)]">👾</div>
      <div class="text-6xl leading-none animate-float-ud-rev drop-shadow-[0_0_16px_rgba(6,214,160,0.4)]">🧒</div>
    </div>

    <!-- Logo -->
    <div class="text-center mb-7">
      <h1 class="font-fredoka text-3xl sm:text-4xl text-accent2 drop-shadow-[0_0_30px_rgba(255,209,102,0.5)] leading-tight">
        EinMalEins mit Spaß
      </h1>
      <p class="text-sm text-muted mt-1">Einfach. Schnell. Gelernt.</p>
    </div>

    <GameSelection
      v-if="!selectedGame"
      :games="games"
      @select="onGameSelected"
    />
    <LevelSelection
      v-else
      :game="selectedGame"
      @back="onBack"
      @start="onStart"
    />
  </div>
</template>
