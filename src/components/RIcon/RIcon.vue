<template>
  <i :class="['px-1', className, name]" :style="[colorRef, backgroundRef]">
    <slot
  /></i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { RIconProps, RIconInstance } from './types'

export default defineComponent({
  name: 'RIcon',
  props: {
    name: {
      type: String,
      default: 'info',
    },
    className: { type: String, default: 'fa-sm' },
    color: { type: String, default: '' },
    backgroundColor: { type: String, default: '' },
  },
  setup(props: RIconProps): RIconInstance {
    const colorRef = computed(() => {
      return { color: props.color }
    })
    const backgroundRef = computed(() => {
      if (!props.backgroundColor) return {}
      return {
        backgroundColor: props.backgroundColor,
        padding: '8px',
        borderRadius: '5px',
      }
    })
    return { backgroundRef, colorRef }
  },
})
</script>
