<script setup>
import ConfettiOverlay     from './ui/components/ConfettiOverlay.vue'
import FlyingApplesOverlay from './ui/components/FlyingApplesOverlay.vue'
</script>

<template>
  <div class="min-h-screen bg-bg text-white font-nunito overflow-x-hidden">
    <div class="w-full max-w-lg mx-auto min-h-screen px-3 relative">
      <RouterView />
    </div>
    <ConfettiOverlay />
    <FlyingApplesOverlay />
  </div>
</template>
