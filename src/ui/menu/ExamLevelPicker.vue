<script setup>
import { ref, computed } from 'vue'
import { LEVELS } from '../../game/data/levels.js'

const emit = defineEmits(['select'])

const selected = ref(new Set())

const allSelected = computed(() => LEVELS.every(l => selected.value.has(l)))
const noneSelected = computed(() => selected.value.size === 0)

function toggle(lvl) {
  const next = new Set(selected.value)
  if (next.has(lvl)) {
    next.delete(lvl)
  } else {
    next.add(lvl)
  }
  selected.value = next
  emit('select', next.size > 0 ? [...next].sort((a, b) => a - b) : null)
}

function selectAll() {
  selected.value = new Set(LEVELS)
  emit('select', [...LEVELS])
}

function deselectAll() {
  selected.value = new Set()
  emit('select', null)
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <!-- Select all / Deselect all links -->
    <div class="flex justify-center gap-4 font-nunito text-sm font-bold">
      <button
        class="text-accent transition-colors hover:text-accent2 disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="allSelected"
        @click="selectAll"
      >Alle auswählen</button>
      <span class="text-muted">·</span>
      <button
        class="text-muted transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="noneSelected"
        @click="deselectAll"
      >Auswahl aufheben</button>
    </div>

    <!-- Level grid -->
    <div class="grid grid-cols-4 sm:grid-cols-5 gap-2 w-full">
      <button
        v-for="lvl in LEVELS" :key="lvl"
        class="relative rounded-xl py-3 px-2 font-fredoka text-xl text-white text-center cursor-pointer transition-all duration-200 border-2"
        :class="selected.has(lvl)
          ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(255,107,53,0.5)]'
          : 'bg-surface2 border-transparent hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,53,0.25)]'"
        @click="toggle(lvl)"
      >
        ×{{ lvl }}
        <small class="block font-nunito text-[0.6rem] font-semibold opacity-70 mt-0.5">{{ lvl }}er</small>
        <!-- Checkmark badge -->
        <span
          v-if="selected.has(lvl)"
          class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green rounded-full flex items-center justify-center text-[0.6rem] font-bold shadow"
        >✓</span>
      </button>
    </div>

    <!-- Selection summary -->
    <div class="font-nunito text-xs text-center text-muted min-h-[1.25rem]">
      <span v-if="selected.size === 0">Bitte mindestens eine Reihe wählen</span>
      <span v-else-if="selected.size === LEVELS.length" class="text-accent2 font-bold">Alle Reihen ausgewählt ✦</span>
      <span v-else>
        Ausgewählt:
        <span class="text-white font-bold">
          {{ [...selected].sort((a,b) => a-b).map(l => `×${l}`).join(', ') }}
        </span>
      </span>
    </div>
  </div>
</template>
