<script setup>
import { ref } from 'vue'
import { savePlayerName, getOrCreateGuid } from '../../services/playerStore.js'
import { router } from '../../router/index.js'

const name      = ref('')
const error     = ref('')
const submitted = ref(false)

function submit() {
  const trimmed = name.value.trim()
  if (!trimmed) { error.value = 'Bitte gib deinen Namen ein.'; return }
  if (trimmed.length < 2) { error.value = 'Mindestens 2 Zeichen.'; return }
  if (trimmed.length > 20) { error.value = 'Maximal 20 Zeichen.'; return }
  error.value = ''
  getOrCreateGuid()
  savePlayerName(trimmed)
  submitted.value = true
  setTimeout(() => router.push({ name: 'menu' }), 400)
}

function onKey(e) {
  if (e.key === 'Enter') submit()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4 gap-6">
    <!-- Logo area -->
    <div class="text-center">
      <div class="text-7xl leading-none mb-3 animate-bounce-in">🧒</div>
      <h1 class="font-fredoka text-3xl sm:text-4xl text-accent2 drop-shadow-[0_0_30px_rgba(255,209,102,0.5)]">
        EinMalEins mit Spaß
      </h1>
      <p class="text-sm text-muted mt-1">Willkommen! Wie heißt du?</p>
    </div>

    <!-- Input card -->
    <div class="w-full max-w-sm bg-surface border border-surface2 rounded-2xl p-6 flex flex-col gap-4">
      <label class="font-nunito text-sm font-bold text-muted uppercase tracking-widest">
        Dein Name
      </label>
      <input
        v-model="name"
        type="text"
        maxlength="20"
        placeholder="z.B. Alex"
        autofocus
        class="w-full bg-surface2 border-2 border-transparent rounded-xl px-4 py-3 font-fredoka text-2xl text-white placeholder-muted outline-none transition-all focus:border-accent"
        :class="{ 'border-red': error }"
        @keydown="onKey"
      />
      <p v-if="error" class="font-nunito text-xs text-red -mt-2">{{ error }}</p>

      <button
        class="w-full rounded-2xl py-4 font-fredoka text-2xl text-white border-none cursor-pointer transition-all duration-200"
        :class="submitted
          ? 'bg-green shadow-[0_6px_24px_rgba(6,214,160,0.4)]'
          : 'bg-gradient-to-br from-accent to-orange-600 shadow-[0_8px_30px_rgba(255,107,53,0.4)] hover:-translate-y-1 hover:scale-[1.02]'"
        @click="submit"
      >
        {{ submitted ? '✓ Los geht\'s!' : 'Spielen →' }}
      </button>
    </div>

    <p class="font-nunito text-xs text-muted text-center max-w-xs">
      Dein Name erscheint in der globalen Bestenliste. Er kann nicht geändert werden.
    </p>
  </div>
</template>
