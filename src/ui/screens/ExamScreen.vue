<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useExam } from '../../composables/useExam.js'

const {
  state,
  currentQ,
  progress,
  press,
  del,
  submit,
  handleKeydown,
  goMenu,
} = useExam()

const showApples = ref(false)
watch(() => state.answered, () => { showApples.value = false })

onMounted(()   => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="flex flex-col py-3 pb-5 min-h-screen gap-3">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <button
        class="bg-surface border border-surface2 rounded-xl px-3.5 py-2 text-muted font-nunito text-sm font-bold transition-all hover:text-white hover:border-accent"
        @click="goMenu"
      >← Menü</button>
      <div class="bg-surface border border-surface2 rounded-xl px-4 py-2 font-fredoka text-base text-accent2">
        Exam ×{{ state.level }}
      </div>
    </div>

    <!-- Progress bar -->
    <div class="bg-surface2 rounded-full h-1.5 overflow-hidden">
      <div
        class="h-full bg-accent rounded-full transition-all duration-500 ease-out"
        :style="{ width: progress + '%' }"
      />
    </div>

    <!-- Question card -->
    <div class="bg-surface rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-surface2 flex flex-col items-center gap-4">
      <div class="text-xs font-bold tracking-[0.2em] uppercase text-muted">
        Frage {{ state.answered + 1 }} / {{ state.queue.length }}
      </div>

      <!-- Equation display -->
      <div class="font-fredoka text-4xl sm:text-5xl text-white flex items-center justify-center gap-3 flex-wrap">
        <span>{{ currentQ.a }} × {{ currentQ.b }} =</span>
        <div
          class="inline-flex items-center justify-center bg-surface2 rounded-xl px-4 py-1 min-w-[76px] font-fredoka text-4xl sm:text-5xl border-2 transition-all duration-200"
          :class="{
            'border-transparent': !state.input.length && state.feedback !== 'correct' && state.feedback !== 'wrong',
            'border-accent': state.input.length > 0 && !state.feedback,
            'bg-[rgba(6,214,160,0.15)] border-green text-green': state.feedback === 'correct',
            'bg-[rgba(239,71,111,0.15)] border-red text-red':   state.feedback === 'wrong',
            'animate-shake': state.shaking,
          }"
        >
          <span v-if="state.input.length">{{ state.input }}</span>
          <span v-else class="text-muted text-2xl">?</span>
        </div>
      </div>

      <!-- Apple hint -->
      <div v-if="showApples" class="flex flex-col items-center gap-1">
        <div v-for="row in currentQ.a" :key="row" class="flex gap-0.5 flex-wrap justify-center">
          <span
            v-for="col in currentQ.b" :key="col"
            class="text-xl sm:text-2xl leading-none"
            style="animation: examApplePop 0.2s ease both"
            :style="{ animationDelay: ((row - 1) * currentQ.b + (col - 1)) * 25 + 'ms' }"
          >🍎</span>
        </div>
      </div>
      <button
        v-else
        class="block mx-auto px-5 py-2 bg-surface2 text-muted border-2 border-dashed border-surface2 rounded-full font-nunito text-sm cursor-pointer transition-colors hover:text-white hover:border-muted"
        @click="showApples = true"
      >🍎 Zeigen</button>
    </div>

    <!-- Numpad -->
    <div class="grid grid-cols-3 gap-2">
      <button v-for="n in [7,8,9,4,5,6,1,2,3]" :key="n"
        class="bg-surface2 border-2 border-transparent rounded-xl h-14 sm:h-16 font-fredoka text-2xl text-white cursor-pointer transition-all hover:border-accent hover:scale-105 active:scale-95 touch-manipulation"
        @click="press(String(n))"
      >{{ n }}</button>
      <button
        class="bg-surface2 border-2 border-transparent rounded-xl h-14 sm:h-16 font-fredoka text-2xl text-red cursor-pointer transition-all hover:border-red hover:scale-105 active:scale-95 touch-manipulation"
        @click="del"
      >⌫</button>
      <button
        class="bg-surface2 border-2 border-transparent rounded-xl h-14 sm:h-16 font-fredoka text-2xl text-white cursor-pointer transition-all hover:border-accent hover:scale-105 active:scale-95 touch-manipulation"
        @click="press('0')"
      >0</button>
      <button
        class="bg-accent border-2 border-transparent rounded-xl h-14 sm:h-16 font-fredoka text-2xl text-white cursor-pointer transition-all shadow-[0_4px_16px_rgba(255,107,53,0.35)] hover:bg-orange-400 hover:scale-105 active:scale-95 touch-manipulation"
        @click="submit"
      >⏎</button>
    </div>

  </div>
</template>
