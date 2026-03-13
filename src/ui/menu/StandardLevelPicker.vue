<script setup>
import { ref } from 'vue'
import { LEVELS } from '../../game/data/levels.js'

const emit = defineEmits(['select'])
const selected = ref(null)

function pick(lvl) {
  selected.value = lvl
  emit('select', lvl)
}
</script>

<template>
  <div class="grid grid-cols-4 sm:grid-cols-5 gap-2 w-full">
    <button
      v-for="lvl in LEVELS" :key="lvl"
      class="rounded-xl py-3 px-2 font-fredoka text-xl text-white text-center cursor-pointer transition-all duration-200 border-2"
      :class="selected === lvl
        ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(255,107,53,0.5)]'
        : 'bg-surface2 border-transparent hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,53,0.25)]'"
      @click="pick(lvl)"
    >
      ×{{ lvl }}
      <small class="block font-nunito text-[0.6rem] font-semibold opacity-70 mt-0.5">{{ lvl }}er</small>
    </button>
  </div>
</template>
