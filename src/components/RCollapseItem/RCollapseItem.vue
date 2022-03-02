<template>
  <div :class="['block', activeRef]">
    <div
      :class="[
        'block px-1 text-xs bg-white text-black cursor-pointer hover:text-primary',
        activeRef,
      ]"
      @click="toggleOpen">
      <r-icon
        :color="isOpen ? '#4338ca' : 'black'"
        :class-name="'pr-2 w-5'"
        :name="isOpen ? 'fas fa-angle-down' : 'fas fa-angle-right'"></r-icon>
      {{ title }}
    </div>
  </div>
  <div
    :class="[
      'pl-5 h-0 overflow-hidden opacity-0 transition ease-linear',
      activeTextRef,
    ]">
    <slot name="text">{{ text }}</slot>
  </div>
</template>

<script lang="ts">
import '../../theme/index.css'
import { computed, defineComponent, ref } from 'vue'
import { RCollapseItemInstance, RCollapseItemProps } from './types'
import RIcon from '../RIcon/RIcon.vue'

export default defineComponent({
  name: 'RCollapseItem',
  components: {
    RIcon,
  },
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' },
  },
  setup(props: RCollapseItemProps): RCollapseItemInstance {
    const isOpen = ref(false)
    function toggleOpen() {
      isOpen.value = !isOpen.value
    }
    const activeRef = computed(() => (isOpen.value ? 'text-primary' : ''))
    const activeTextRef = computed(() =>
      isOpen.value ? 'h-auto pl-8 py-2 opacity-100' : ''
    )

    return { activeRef, activeTextRef, isOpen, toggleOpen }
  },
})
</script>
