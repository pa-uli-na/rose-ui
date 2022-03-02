<template>
  <div
    class="r-toggle"
    tabindex="0"
    :class="roundRef"
    @keyup.left.prevent="selectPrev"
    @keyup.right.prevent="selectNext">
    <label
      v-for="(option, i) in options"
      :key="i"
      :class="[
        'r-toggle-value',
        { 'r-toggle-value--selected': option === modelValue },
      ]"
      @click="selectValue(i)">
      <span class="relative z-10 font-medium" v-if="!icons">{{ option }}</span>
    </label>
    <div
      class="r-toggle-slider"
      :style="{
        width: width + '%',
        transform: `translateX(${sliderPosition}%)`,
        opacity,
      }"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'RToggle',
  props: {
    options: { type: Array as PropType<(string | number)[]>, default: [] },
    rounded: Boolean,
    icons: Boolean,
    modelValue: [String, Number],
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const activeIndex = ref(0)
    const roundRef = computed(() => (props.rounded ? 'r-toggle--round' : ''))

    function selectValue(i: number) {
      activeIndex.value = i
      emit('update:modelValue', props.options[i])
    }

    function selectNext() {
      if (!props.options[activeIndex.value + 1]) {
        selectValue(0)
        return
      }

      selectValue(activeIndex.value + 1)
    }

    function selectPrev() {
      if (!props.options[activeIndex.value - 1]) {
        selectValue(props.options.length - 1)
        // selectNext(0)
        return
      }

      selectValue(activeIndex.value - 1)
    }

    const width = computed(() => (100 / props.options.length).toFixed(2))
    const opacity = computed(() =>
      props.options.includes(props.modelValue!) ? 1 : 0
    )
    const sliderPosition = computed(() => {
      const pos = props.options.findIndex((v) => v === props.modelValue)
      return (pos === -1 ? 0 : pos) * 100
    })

    return {
      selectValue,
      selectNext,
      selectPrev,
      opacity,
      roundRef,
      sliderPosition,
      width,
    }
  },
})
</script>

<style>
.r-toggle {
  transition: all 0.4s ease-out;
  @apply p-1 relative flex text-sm bg-secondary-lighter focus:outline-none rounded-sm;
}

.r-toggle--round {
  @apply rounded-2xl;
}

.r-toggle--round .r-toggle-value::before {
  width: 0 !important;
}

.r-toggle-value {
  @apply relative w-full flex-grow text-center p-2 leading-none cursor-pointer;
}

.r-toggle-value:not(.r-toggle-value--selected) {
  @apply text-secondary;
}

.r-toggle-value--selected + .r-toggle-value::before {
  @apply opacity-0;
}

.r-toggle-value:not(:first-of-type)::before {
  content: '';
  transition: all 0.2s ease-out;
  @apply absolute bg-gray-300 left-2 bottom-1 top-1 w-0.5;
}

.r-toggle-slider {
  border-radius: inherit;
  transition: inherit;
  @apply absolute left-0 bottom-0 top-0 bg-white m-1 shadow shadow-gray-300;
}
</style>
