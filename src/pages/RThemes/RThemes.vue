<template>
  <div>
    <div class="theme-red"></div>
    <div class="theme-blue"></div>
    <div class="theme-green"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// Bez tego komponentu przy buildzie nie generują się themes,
// bo pobierane są tylko klasy używane w projekcie
export default defineComponent({
  name: 'RTheme',
})
</script>
