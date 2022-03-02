<template>
  <div
    class="r-divider"
    :class="{
      'r-divider--horizontal': !vertical,
      'r-divider--vertical': vertical,
    }"
    role="separator"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RDivider',
  props: {
    vertical: { type: Boolean },
  },
})
</script>

<style>
.r-divider {
  @apply bg-secondary-light p-0 m-9 box-border;
}

.r-divider--horizontal {
  height: 1px;
  margin: 16px 0;
  @apply block clear-both w-full min-w-full;
}

.r-divider--horizontal {
  top: -0.06em;
  width: 1px;
  height: 0.9em;
  margin: 0 8px;
  @apply relative inline-block align-middle;
}
</style>
