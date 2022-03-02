<template>
  <div class="w-full py-2 text-center justify-center">
    <p class="font-medium text-lg">
      {{ value }}
      <slot name="icon"></slot>
    </p>
    <p class="text-black text-sm">{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RIndicator',
  props: {
    value: { type: [String, Number], default: '' },
    title: { type: String, default: '' },
  },
})
</script>
