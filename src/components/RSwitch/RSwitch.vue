<template>
  <div class="flex w-full m-1">
    <label
      :for="id"
      :class="[
        'flex items-center',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      v-bind="switchAttributes"
      @keydown.space.prevent
      @keyup.enter="onTrigger()"
      @keyup.space="onTrigger()">
      <div class="relative">
        <input
          :id="id"
          v-model="state"
          type="checkbox"
          class="sr-only"
          aria-hidden="true"
          :disabled="disabled"
          @click="onTrigger()" />
        <div
          :class="[
            'block w-12 h-7 rounded-full border dark:border-gray-800',
            backgroundColor,
          ]"></div>
        <div
          :class="[
            'dot absolute left-1 top-1 w-5 h-5 rounded-full transition',
            dotColor,
          ]"
          :style="state ? 'transform: translateX(100%)' : ''"></div>
      </div>
      <span
        v-if="label"
        :class="[
          'ml-3 select-none',
          disabled
            ? 'text-secondary'
            : 'text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-white',
        ]">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'RSwitch',
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
      default: 'switch-id',
    },
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const state = ref(props.modelValue)
    const switchAttributes = computed(() => {
      return {
        'aria-disabled': props.disabled,
        tabindex: props.disabled ? undefined : '0',
      }
    })

    const backgroundColor = computed(() => {
      if (props.disabled) return 'bg-secondary-light dark:bg-secondary-dark'
      if (state.value === true) return 'bg-primary dark:bg-primary-light'
      return 'bg-white dark:bg-gray-600'
    })

    const dotColor = computed(() => {
      if (props.disabled) {
        return 'bg-secondary'
      }
      if (state.value === true) return 'bg-white'
      return 'bg-primary dark:bg-primary-light'
    })

    function onTrigger() {
      state.value = !state.value
      emit('update:modelValue', state.value)
    }

    watch(state, (newValue) => {
      state.value = newValue
    })

    return { backgroundColor, dotColor, state, switchAttributes, onTrigger }
  },
})
</script>
