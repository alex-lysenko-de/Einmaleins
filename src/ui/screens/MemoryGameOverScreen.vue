<script setup>
import { useMemory } from '../../composables/useMemory.js'
const { state, retry, goMenu } = useMemory()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8 gap-5">
    <div class="text-8xl leading-none animate-bounce-in">💔</div>
    <div class="font-fredoka text-4xl sm:text-5xl text-red drop-shadow-[0_0_30px_rgba(239,71,111,0.5)]">Game Over</div>
    <div class="text-lg font-bold text-muted">Level ×{{ state.level }} — keine Leben mehr</div>
    <div class="flex flex-col gap-2.5 w-full max-w-xs sm:max-w-sm">
      <button
        class="bg-gradient-to-br from-green to-[#04a87d] border-none rounded-2xl py-4 px-6 font-fredoka text-2xl text-white cursor-pointer transition-all shadow-[0_6px_24px_rgba(6,214,160,0.4)] hover:-translate-y-0.5 hover:scale-[1.02]"
        @click="retry"
      >↺ Nochmal versuchen</button>
      <button
        class="bg-transparent border-2 border-surface2 rounded-xl py-3 px-5 font-nunito text-base font-bold text-muted cursor-pointer transition-all hover:border-accent hover:text-white"
        @click="goMenu"
      >← Zurück zum Menü</button>
    </div>
  </div>
</template>
