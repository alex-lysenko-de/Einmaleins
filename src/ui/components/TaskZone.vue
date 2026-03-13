<script setup>
import { ref, watch, onUnmounted } from 'vue'
import VisualizationRows    from './VisualizationRows.vue'
import VisualizationBuckets from './VisualizationBuckets.vue'

const props = defineProps({
  currentTask: { type: Object,  default: null },
  visualMode:  { type: String,  required: true },
  rows:        { type: Number,  required: true },
  cols:        { type: Number,  required: true },
  buckets:     { type: Array,   required: true },
})
const emit = defineEmits(['switchMode'])

// null = no choice made yet
const chosen = ref(null)

// Reset when task changes (new round)
watch(() => props.currentTask?.result, () => { chosen.value = null })

function pick(mode) {
  chosen.value = mode
  emit('switchMode', mode)
}

// Idle hint: after 10s without a choice, pulse one button softly
const hintActive = ref(false)
let hintTimer = null

function startHintTimer() {
  clearTimeout(hintTimer)
  hintActive.value = false
  hintTimer = setTimeout(() => { hintActive.value = true }, 10000)
}

watch(() => props.currentTask?.result, () => { startHintTimer() }, { immediate: true })
watch(chosen, (val) => { if (val !== null) { clearTimeout(hintTimer); hintActive.value = false } })
onUnmounted(() => clearTimeout(hintTimer))
</script>

<template>
  <div class="bg-surface rounded-2xl p-3 sm:p-4 border border-surface2 flex flex-col items-center gap-2.5">

    <!-- Row: [Rows btn]  [big number]  [Bucket btn] — buttons pushed to edges -->
    <div class="flex items-center w-full">

      <!-- Rows button -->
      <button
        class="border-2 rounded-xl px-3 py-1.5 text-sm font-bold transition-all duration-300 shrink-0"
        :class="[
          chosen === 'rows'
            ? 'bg-[rgba(255,107,53,0.1)] border-accent text-accent'
            : chosen !== null
              ? 'bg-surface2 border-transparent text-muted hover:text-white'
              : hintActive
                ? 'bg-[rgba(255,107,53,0.07)] border-accent/60 text-accent/80 animate-pulse'
                : 'bg-surface2 border-transparent text-muted hover:border-accent/60 hover:text-white'
        ]"
        @click="pick('rows')"
      >🍎 Rows</button>

      <!-- Big number — centered between buttons -->
      <div class="flex-1 flex justify-center">
        <div class="font-fredoka text-5xl sm:text-6xl text-accent2 drop-shadow-[0_0_30px_rgba(255,209,102,0.4)] leading-none select-none">
          {{ currentTask ? currentTask.result : '?' }}
        </div>
      </div>

      <!-- Bucket button -->
      <button
        class="border-2 rounded-xl px-3 py-1.5 text-sm font-bold transition-all duration-300 shrink-0"
        :class="[
          chosen === 'bucket'
            ? 'bg-[rgba(255,107,53,0.1)] border-accent text-accent'
            : chosen !== null
              ? 'bg-surface2 border-transparent text-muted hover:text-white'
              : hintActive
                ? 'bg-[rgba(255,107,53,0.07)] border-accent/60 text-accent/80 animate-pulse'
                : 'bg-surface2 border-transparent text-muted hover:border-accent/60 hover:text-white'
        ]"
        @click="pick('bucket')"
      >🪣 Bucket</button>
    </div>

    <!-- Visualization area -->
    <div class="w-full flex justify-center transition-all duration-300"
         :class="chosen !== null ? 'min-h-[80px] pt-5 opacity-100' : 'min-h-0 opacity-0 pointer-events-none h-0 overflow-hidden'">
      <VisualizationRows
        v-if="chosen === 'rows' && currentTask"
        :rows="rows" :cols="cols"
      />
      <VisualizationBuckets
        v-if="chosen === 'bucket' && currentTask"
        :buckets="buckets"
      />
    </div>

    <!-- Prompt shown until a choice is made -->
    <div
      v-if="chosen === null"
      class="text-xs text-muted/60 tracking-wide transition-opacity duration-500"
      :class="hintActive ? 'opacity-100' : 'opacity-0'"
    >🡼 klicken Sie hier, um den Hinweis zu sehen 🡽</div>

  </div>
</template>
