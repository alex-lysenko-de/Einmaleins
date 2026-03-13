<script setup>
defineProps({
  cards: { type: Array, required: true },
})
defineEmits(['selectCard'])
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="card in cards" :key="card.id"
      class="bg-surface2 border-2 rounded-xl py-3 sm:py-4 px-1.5 text-center cursor-pointer transition-all duration-200 relative overflow-hidden"
      :class="{
        'border-[rgba(255,255,255,0.06)] hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,53,0.2)]': !card.solved && card.state !== 'correct' && card.state !== 'wrong',
        'border-green bg-[rgba(6,214,160,0.1)] animate-correct-pulse': card.state === 'correct',
        'border-red bg-[rgba(239,71,111,0.1)] animate-wrong-shake': card.state === 'wrong',
        'opacity-20 pointer-events-none': card.solved,
      }"
      @click="$emit('selectCard', card)"
    >
      <span class="font-fredoka text-xl sm:text-2xl text-white">{{ card.a }} × {{ card.b }}</span>
    </button>
  </div>
</template>
