<script setup>
defineProps({ games: Array })
const emit = defineEmits(['select'])
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <h2 class="font-fredoka text-sm text-muted text-center mb-3 tracking-widest uppercase">Spiel wählen</h2>
    <div class="w-full flex flex-col gap-3 mb-6">
      <button
        v-for="game in games" :key="game.id"
        class="w-full bg-surface2 border-2 border-transparent rounded-2xl p-4 sm:p-5 text-left cursor-pointer transition-all duration-200 flex items-center gap-4 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,53,0.25)] active:scale-95"
        @click="emit('select', game)"
      >
        <div class="text-3xl sm:text-4xl leading-none shrink-0">{{ game.emoji }}</div>
        <div class="flex flex-col gap-1">
          <div class="font-fredoka text-lg text-white">{{ game.name }}</div>
          <div class="font-nunito text-sm text-muted">{{ game.description }}</div>
        </div>
      </button>
    </div>
  </div>
</template>
