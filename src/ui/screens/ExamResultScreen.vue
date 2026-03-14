<script setup>
import { ref, onMounted } from 'vue'
import { useExam } from '../../composables/useExam.js'
import { fetchLeaderboard } from '../../services/leaderboard.js'
import { getOrCreateGuid } from '../../services/playerStore.js'
import { router } from '../../router/index.js'

const { state, retry, goMenu } = useExam()
const userId = getOrCreateGuid()

const loading  = ref(true)
const top10    = ref([])
const myRank   = ref(null)

onMounted(async () => {
  const result  = await fetchLeaderboard(userId)
  top10.value   = result.top10
  myRank.value  = result.myRank
  loading.value = false
})

function medalFor(rank) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return rank
}


</script>

<template>
  <div class="flex flex-col items-center pb-8 pt-6 min-h-screen gap-4 px-1">

    <!-- Celebration -->
    <div class="text-8xl leading-none animate-bounce-in">🎉</div>
    <div class="font-fredoka text-4xl sm:text-5xl text-accent2 drop-shadow-[0_0_30px_rgba(255,209,102,0.5)]">
      Geschafft!
    </div>
    <div class="text-sm text-muted">
      {{ state.levels.map(l => `×${l}`).join(' · ') }} — alle Fragen beantwortet
    </div>

    <!-- Score highlight -->
    <div class="bg-surface border border-accent/40 rounded-2xl px-8 py-4 text-center">
      <div class="font-fredoka text-5xl text-accent2">{{ state.totalScore }}</div>
      <div class="font-nunito text-xs font-bold text-muted uppercase tracking-widest mt-1">Punkte</div>
      <div v-if="state.submitting" class="text-xs text-muted mt-1 animate-pulse">Wird übermittelt…</div>
      <div v-else-if="myRank" class="text-xs text-accent mt-1">Platz {{ myRank }} weltweit 🌍</div>
    </div>

    <!-- Stats row -->
    <div class="flex justify-center gap-3 w-full">
      <div class="bg-surface border border-surface2 rounded-2xl p-3 sm:p-4 flex-1 text-center">
        <div class="font-fredoka text-2xl sm:text-3xl text-accent2">{{ state.correct }}</div>
        <div class="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Richtig</div>
      </div>
      <div class="bg-surface border border-surface2 rounded-2xl p-3 sm:p-4 flex-1 text-center">
        <div class="font-fredoka text-2xl sm:text-3xl text-accent2">{{ state.queue.length - state.correct }}</div>
        <div class="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Fehler</div>
      </div>
      <div class="bg-surface border border-surface2 rounded-2xl p-3 sm:p-4 flex-1 text-center">
        <div class="font-fredoka text-2xl sm:text-3xl text-accent2">
          {{ state.queue.length ? Math.round(state.correct / state.queue.length * 100) : 0 }}%
        </div>
        <div class="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Ergebnis</div>
      </div>
    </div>

    <!-- Mini leaderboard -->
    <div class="w-full bg-surface border border-surface2 rounded-2xl p-4 flex flex-col gap-2">
      <h3 class="font-fredoka text-base text-white mb-1">🏆 Top 5 weltweit</h3>

      <div v-if="loading" class="flex justify-center py-3">
        <div class="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>

      <template v-else>
        <div
          v-for="(entry, i) in top10.slice(0, 5)" :key="entry.userId"
          class="flex items-center gap-2 rounded-xl px-3 py-1.5"
          :class="entry.userId === userId ? 'bg-accent/20 border border-accent/40' : 'bg-surface2'"
        >
          <div class="w-6 text-center font-fredoka text-base flex-shrink-0">{{ medalFor(i + 1) }}</div>
          <div class="flex-1 font-nunito text-sm text-white truncate">
            {{ entry.name }}
            <span v-if="entry.userId === userId" class="text-accent text-xs">(du)</span>
          </div>
          <div class="font-fredoka text-lg text-accent2">{{ entry.bestScore }}</div>
        </div>

        <button
          class="w-full mt-1 rounded-xl py-2 font-nunito text-sm font-bold text-muted border border-surface2 hover:border-accent hover:text-white transition-all"
          @click="router.push({ name: 'leaderboard' })"
        >Vollständige Tabelle →</button>
      </template>
    </div>

    <!-- Actions -->
    <div class="flex flex-col gap-2.5 w-full">
      <button
        class="bg-gradient-to-br from-green to-[#04a87d] border-none rounded-2xl py-4 px-6 font-fredoka text-2xl text-white cursor-pointer transition-all shadow-[0_6px_24px_rgba(6,214,160,0.4)] hover:-translate-y-0.5 hover:scale-[1.02]"
        @click="retry"
      >↺ Nochmal</button>
      <button
        class="bg-transparent border-2 border-surface2 rounded-xl py-3 px-5 font-nunito text-base font-bold text-muted cursor-pointer transition-all hover:border-accent hover:text-white"
        @click="goMenu"
      >← Menü</button>
    </div>

  </div>
</template>
