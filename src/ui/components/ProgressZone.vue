<script setup>
defineProps({
  progress: { type: Number, required: true },
})
</script>

<template>
  <div class="bg-surface rounded-xl px-4 py-3 border border-surface2 flex items-center gap-3">
    <span class="font-fredoka text-sm text-muted whitespace-nowrap">Fortschritt:</span>
    <div class="flex gap-1.5 flex-1 justify-center">
      <div
        v-for="i in 9" :key="i"
        class="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
        :class="i <= progress
          ? 'bg-green border-green shadow-[0_0_8px_rgba(6,214,160,0.6)]'
          : 'bg-surface2 border-surface2'"
      />
    </div>
    <span class="font-fredoka text-base text-accent2 whitespace-nowrap">{{ progress }} / 9</span>
  </div>
</template>
