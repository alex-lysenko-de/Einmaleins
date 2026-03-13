<script setup>
import ConfettiOverlay     from './ui/components/ConfettiOverlay.vue'
import FlyingApplesOverlay from './ui/components/FlyingApplesOverlay.vue'
import ThemeToggle         from './ui/components/ThemeToggle.vue'
</script>

<template>
  <ThemeToggle class="app-theme-toggle" />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <ConfettiOverlay />
  <FlyingApplesOverlay />
</template>
