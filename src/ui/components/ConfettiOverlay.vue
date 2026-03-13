<script setup>
import { useConfetti } from '../../composables/useConfetti.js'
const { showConfetti, confettiPieces } = useConfetti()
</script>

<template>
  <div v-if="showConfetti" class="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
    <div
      v-for="p in confettiPieces" :key="p.id"
      class="absolute top-[-20px] rounded-sm"
      :style="{
        left:                    p.x + '%',
        width:                   p.size + 'px',
        height:                  p.size + 'px',
        background:              p.color,
        animationName:           'confettiFall',
        animationDuration:       p.duration + 's',
        animationDelay:          p.delay + 's',
        animationTimingFunction: 'linear',
        animationFillMode:       'forwards',
      }"
    />
  </div>
</template>
