<script setup>
import { useTheme } from '../../composables/useTheme.js'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :title="theme === 'dark' ? 'Helles Design' : 'Dunkles Design'"
    :aria-label="theme === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'"
  >
    <span class="theme-icon" :class="theme">
      {{ theme === 'dark' ? '☀️' : '🌙' }}
    </span>
  </button>
</template>
