<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ game: Object })
const emit  = defineEmits(['back', 'start'])

const selectedLevel = ref(null)

// selectedLevel can be a number, an array, or null
const hasSelection = computed(() => {
  if (selectedLevel.value === null) return false
  if (Array.isArray(selectedLevel.value)) return selectedLevel.value.length > 0
  return true
})
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <button
      class="self-start text-accent font-nunito text-sm font-bold py-2 mb-4 transition-colors hover:text-accent2"
      @click="emit('back')"
    >← Zurück</button>

    <h2 class="font-fredoka text-sm text-muted text-center mb-2 tracking-widest uppercase">{{ game.name }}</h2>
    <p class="font-nunito text-sm text-muted text-center mb-3">Wähle dein Level:</p>

    <component :is="game.LevelPicker" @select="selectedLevel = $event" />

    <button
      class="w-full mt-4 border-none rounded-2xl py-4 sm:py-5 px-8 font-fredoka text-2xl text-white cursor-pointer transition-all duration-200 tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
      :class="hasSelection
        ? 'bg-gradient-to-br from-accent to-orange-600 shadow-[0_8px_30px_rgba(255,107,53,0.4)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,107,53,0.55)] active:translate-y-0 active:scale-[0.98]'
        : 'bg-surface2'"
      :disabled="!hasSelection"
      @click="emit('start', selectedLevel)"
    >
      START
    </button>
  </div>
</template>
