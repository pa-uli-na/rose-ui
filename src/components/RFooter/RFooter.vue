<template>
  <footer
    class="text-sm text-center lg:text-left justify-center w-full flex bottom-0 pt-2">
    <div class="text-secondary p-2 w-11/12 bg-white dark:bg-gray-800 border-t">
      {{ appVersion }}
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RFooterInstance, RFooterProps } from './types'

export default defineComponent({
  name: 'RFooter',
  props: {
    appVersion: { type: String, default: '' },
  },
  setup(props: RFooterProps): RFooterInstance {
    return {}
  },
})
</script>
