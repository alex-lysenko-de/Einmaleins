<script setup>
import { useGame } from '../../composables/useGame.js'
const { state, starShow, nextLevel, goMenu } = useGame()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8 gap-5">

    <div class="text-8xl sm:text-9xl leading-none animate-bounce-in drop-shadow-[0_0_20px_rgba(255,107,53,0.6)]">💀</div>

    <div class="flex gap-2.5 text-5xl sm:text-6xl">
      <span :class="starShow[0] ? 'star-show' : 'star-hidden'">⭐</span>
      <span :class="starShow[1] ? 'star-show' : 'star-hidden'">⭐</span>
      <span :class="starShow[2] ? 'star-show' : 'star-hidden'">⭐</span>
    </div>

    <div class="font-fredoka text-4xl sm:text-5xl text-accent2 drop-shadow-[0_0_40px_rgba(255,209,102,0.5)]">
      Monster besiegt!
    </div>
    <div class="text-lg font-bold text-muted">Level ×{{ state.level }} geschafft! 🎉</div>

    <div class="flex flex-col gap-2.5 w-full max-w-xs sm:max-w-sm">
      <button
        v-if="state.level < 9"
        class="bg-gradient-to-br from-green to-[#04a87d] border-none rounded-2xl py-4 px-6 font-fredoka text-2xl text-white cursor-pointer transition-all shadow-[0_6px_24px_rgba(6,214,160,0.4)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_10px_32px_rgba(6,214,160,0.5)] active:translate-y-0 active:scale-100"
        @click="nextLevel"
      >Nächstes Level →</button>
      <button
        v-else
        class="bg-gradient-to-br from-green to-[#04a87d] border-none rounded-2xl py-4 px-6 font-fredoka text-2xl text-white cursor-pointer transition-all shadow-[0_6px_24px_rgba(6,214,160,0.4)] hover:-translate-y-0.5 hover:scale-[1.02]"
        @click="goMenu"
      >🏆 Alle Level! Menü</button>
      <button
        class="bg-transparent border-2 border-surface2 rounded-xl py-3 px-5 font-nunito text-base font-bold text-muted cursor-pointer transition-all hover:border-accent hover:text-white"
        @click="goMenu"
      >← Zurück zum Menü</button>
    </div>
  </div>
</template>
