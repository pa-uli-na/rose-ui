<template>
  <div
    class="overflow-hidden h-1.5 mb-1 text-xs flex rounded bg-secondary-light">
    <div
      v-for="(width, index) in widths" :key="index"
      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
      :style="{
        backgroundColor: width.color,
        width: width.width + '%',
      }"></div>
  </div>
</template>

<script lang="ts">
import '../../theme/index.css'
import { defineComponent } from 'vue'
import { RBarProps, RBarInstance } from './types'
import { useRBarProps, useRBar } from './rbar'

export default defineComponent({
  name: 'RBar',
  props: {
    ...useRBarProps
  },
  inheritAttrs: false,
  setup(props: RBarProps): RBarInstance {
    const { widths } = useRBar(props)
    return { widths }
  },
})
</script>
