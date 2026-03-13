<script setup>
import { useAppleAnimation } from '../../composables/useAppleAnimation.js'
const { flyingApples, splatFragments } = useAppleAnimation()
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div
      v-for="fa in flyingApples" :key="fa.id"
      class="absolute text-3xl leading-none pointer-events-none animate-fly-arc"
      :style="{
        left:    fa.x + 'px',
        top:     fa.y + 'px',
        '--dx':  fa.dx + 'px',
        '--dy':  fa.dy + 'px',
        '--rot': fa.rot + 'deg',
        '--dur': '0.48s',
      }"
    >🍎</div>
    <div
      v-for="sf in splatFragments" :key="sf.id"
      class="absolute pointer-events-none text-sm leading-none animate-splat-fly"
      :style="{
        left:   sf.x + 'px',
        top:    sf.y + 'px',
        '--fx': sf.fx + 'px',
        '--fy': sf.fy + 'px',
        '--sd': sf.dur + 's',
      }"
    >{{ sf.emoji }}</div>
  </div>
</template>
