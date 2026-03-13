<script setup>
defineProps({
  monster:        { type: Object,  required: true },
  monsterHP:      { type: Number,  required: true },
  playerHP:       { type: Number,  required: true },
  monsterShaking: { type: Boolean, default: false },
  playerShaking:  { type: Boolean, default: false },
})
</script>

<template>
  <div class="bg-surface rounded-2xl p-3 sm:p-4 flex justify-between items-end border border-surface2">

    <!-- Monster side -->
    <div class="flex flex-col items-center gap-1">
      <div class="w-14 flex flex-col items-center gap-0.5">
        <span class="font-fredoka text-[0.6rem] text-muted tracking-widest">HP</span>
        <div class="w-full h-1.5 bg-surface2 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full hp-fill"
            :class="monsterHP <= 3 ? 'bg-red shadow-[0_0_6px_rgba(239,71,111,0.6)]' : 'bg-green'"
            :style="{ width: (monsterHP / 9 * 100) + '%' }"
          />
        </div>
        <span class="font-fredoka text-[0.65rem]" :class="monsterHP <= 3 ? 'text-red' : 'text-green'">
          {{ monsterHP }}/9
        </span>
      </div>
      <div
        id="char-monster"
        class="text-5xl sm:text-6xl leading-none drop-shadow-[0_0_12px_rgba(255,107,53,0.4)] transition-transform"
        :class="{ 'animate-shake': monsterShaking }"
      >{{ monster.emoji }}</div>
      <div class="font-fredoka text-xs text-muted text-center">{{ monster.name }}</div>
    </div>

    <!-- VS -->
    <div class="font-fredoka text-2xl text-accent drop-shadow-[0_0_16px_rgba(255,107,53,0.5)] self-center pb-2">VS</div>

    <!-- Player side -->
    <div class="flex flex-col items-center gap-1">
      <div class="w-14 flex flex-col items-center gap-0.5">
        <span class="font-fredoka text-[0.6rem] text-muted tracking-widest">HP</span>
        <div class="w-full h-1.5 bg-surface2 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full hp-fill"
            :class="playerHP <= 3 ? 'bg-red shadow-[0_0_6px_rgba(239,71,111,0.6)]' : 'bg-green'"
            :style="{ width: (playerHP / 9 * 100) + '%' }"
          />
        </div>
        <span class="font-fredoka text-[0.65rem]" :class="playerHP <= 3 ? 'text-red' : 'text-green'">
          {{ playerHP }}/9
        </span>
      </div>
      <div
        id="char-player"
        class="text-5xl sm:text-6xl leading-none drop-shadow-[0_0_12px_rgba(6,214,160,0.35)] transition-transform"
        :class="{ 'animate-shake': playerShaking }"
      >🧒</div>
      <div class="font-fredoka text-xs text-muted text-center">Spieler</div>
    </div>

  </div>
</template>
