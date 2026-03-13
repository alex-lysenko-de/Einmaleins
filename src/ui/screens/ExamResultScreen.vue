<script setup>
import { useExam } from '../../composables/useExam.js'

const { state, retry, goMenu } = useExam()
</script>

<template>
  <div class="exam-result-screen">
    <div class="exam-result-emoji">🎉</div>
    <div class="exam-result-title">Geschafft!</div>
    <div class="exam-result-sub">×{{ state.level }} — alle Fragen beantwortet</div>

    <div class="exam-result-stats">
      <div class="exam-stat-box">
        <div class="exam-stat-val">{{ state.correct }}</div>
        <div class="exam-stat-lbl">Richtig</div>
      </div>
      <div class="exam-stat-box">
        <div class="exam-stat-val">{{ state.queue.length - state.correct }}</div>
        <div class="exam-stat-lbl">Fehler</div>
      </div>
      <div class="exam-stat-box">
        <div class="exam-stat-val">
          {{ state.queue.length ? Math.round(state.correct / state.queue.length * 100) : 0 }}%
        </div>
        <div class="exam-stat-lbl">Ergebnis</div>
      </div>
    </div>

    <div class="victory-btns">
      <button class="next-level-btn" @click="retry">↺ Nochmal</button>
      <button class="back-menu-btn" @click="goMenu">← Menü</button>
    </div>
  </div>
</template>
