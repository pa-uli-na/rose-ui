<template>
  <img
    :src="src"
    :alt="alt"
    class="relative hover:transition duration-500 hover:scale-105"
    @click="handleClick" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'RImage',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: 'image' },
  },
  emits: ['click'],
  setup(props, { emit }) {
    function handleClick() {
      emit('click')
    }
    return { handleClick }
  },
})
</script>
