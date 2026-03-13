<script setup>
defineProps({
  rows: { type: Number, required: true },
  cols: { type: Number, required: true },
})
</script>

<template>
  <div class="flex flex-col gap-1 items-center">
    <div class="flex gap-0.5" v-for="r in rows" :key="r">
      <span class="text-xl sm:text-2xl leading-none" v-for="c in cols" :key="c">🍎</span>
    </div>
  </div>
</template>
