<script setup>
import { useExam } from '../../composables/useExam.js'
const { state, retry, goMenu } = useExam()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8 gap-4">
    <div class="text-8xl leading-none animate-bounce-in">🎉</div>
    <div class="font-fredoka text-4xl sm:text-5xl text-accent2 drop-shadow-[0_0_30px_rgba(255,209,102,0.5)]">
      Geschafft!
    </div>
    <div class="text-sm text-muted">×{{ state.level }} — alle Fragen beantwortet</div>

    <!-- Stats -->
    <div class="flex justify-center gap-4 my-2">
      <div class="bg-surface border border-surface2 rounded-2xl p-4 sm:p-5 min-w-[80px]">
        <div class="font-fredoka text-3xl sm:text-4xl text-accent2">{{ state.correct }}</div>
        <div class="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Richtig</div>
      </div>
      <div class="bg-surface border border-surface2 rounded-2xl p-4 sm:p-5 min-w-[80px]">
        <div class="font-fredoka text-3xl sm:text-4xl text-accent2">{{ state.queue.length - state.correct }}</div>
        <div class="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Fehler</div>
      </div>
      <div class="bg-surface border border-surface2 rounded-2xl p-4 sm:p-5 min-w-[80px]">
        <div class="font-fredoka text-3xl sm:text-4xl text-accent2">
          {{ state.queue.length ? Math.round(state.correct / state.queue.length * 100) : 0 }}%
        </div>
        <div class="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Ergebnis</div>
      </div>
    </div>

    <div class="flex flex-col gap-2.5 w-full max-w-xs sm:max-w-sm">
      <button
        class="bg-gradient-to-br from-green to-[#04a87d] border-none rounded-2xl py-4 px-6 font-fredoka text-2xl text-white cursor-pointer transition-all shadow-[0_6px_24px_rgba(6,214,160,0.4)] hover:-translate-y-0.5 hover:scale-[1.02]"
        @click="retry"
      >↺ Nochmal</button>
      <button
        class="bg-transparent border-2 border-surface2 rounded-xl py-3 px-5 font-nunito text-base font-bold text-muted cursor-pointer transition-all hover:border-accent hover:text-white"
        @click="goMenu"
      >← Menü</button>
    </div>
  </div>
</template>
