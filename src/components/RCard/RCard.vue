<template>
  <div class="w-full p-1 sm:p-2">
    <div
      :class="[
        'w-full px-2 py-1 focus:outline-none font-thin bg-white text-black',
        roundRef,
        shadowRef,
      ]">
      <div class="w-full flex flex-col justify-center">
        <slot name="title">
          <span
            v-if="title"
            class="w-full focus:outline-none uppercase font-semibold pb-0.5">
            {{ title }}
          </span>
        </slot>
        <div class="w-full flex flex-col justify-center">
          <slot name="description" />
        </div>
        <div class="r-card--activities">
          <slot name="activities"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import RIcon from '../RIcon/RIcon.vue'
import { RCardInstance, RCardProps } from './types'

export default defineComponent({
  name: 'RCard',
  components: {
    RIcon,
  },
  props: {
    title: { type: String, default: '' },
    iconName: { type: String, default: '' },
    rounded: {
      type: Boolean,
      default: true,
    },
    flat: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: RCardProps): RCardInstance {
    const roundRef = computed(() => (props.rounded ? `rounded-md` : ''))
    const shadowRef = computed(() =>
      props.flat ? '' : `shadow shadow-gray-300 border border-gray-100`
    )
    return { roundRef, shadowRef }
  },
})
</script>
