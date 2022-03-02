<template>
  <div :class="['r-checkbox', colorType]">
    <div :class="['r-checkbox__container', sizeType, outlinedRef]">
      <input
        class="r-checkbox__input"
        type="checkbox"
        :id="id"
        :disabled="disabled"
        :value="checkedRef"
        @input="handleInput"
        hidden />
      <label class="r-checkbox__label" :for="id" @click="handleClick">
        <i
          :class="{
            'fas fa-check-square': checkedRef,
            'far fa-square': !checkedRef,
          }"></i>
        {{ label }}</label
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import {
  RCheckboxPropSize,
  RCheckboxPropSizes,
  RCheckboxInstance,
  RCheckboxProps,
  RCheckboxPropType,
  RCheckboxPropTypes,
} from './types'

export default defineComponent({
  name: 'RCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: RCheckboxPropSize) =>
        Object.values(RCheckboxPropSizes).includes(value),
    },
    type: {
      type: String,
      default: RCheckboxPropTypes.primary,
      validator: (value: RCheckboxPropType) =>
        Object.values(RCheckboxPropTypes).includes(value),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const checkedRef = ref(props.modelValue)
    watch(checkedRef, (newValue, prevValue) => {
      checkedRef.value = newValue
    })

    const outlinedRef = computed(() =>
      props.outlined ? 'r-checkbox--outlined' : ''
    )

    const sizeType = computed(() => {
      switch (props.size) {
        case 'small':
          return 'r-checkbox--small'
        case 'large':
          return 'r-checkbox--large'
        default:
          return 'r-checkbox--medium'
      }
    })

    const colorType = computed(() => {
      if (props.disabled) return 'r-checkbox--disabled'

      switch (props.type) {
        case RCheckboxPropTypes.secondary:
          return 'r-checkbox--type-secondary'
        case RCheckboxPropTypes.success:
          return 'r-checkbox--type-success'
        case RCheckboxPropTypes.warning:
          return 'r-checkbox--type-warning'
        case RCheckboxPropTypes.danger:
          return 'r-checkbox--type-danger'
        case RCheckboxPropTypes.black:
          return 'r-checkbox--type-black'
        default:
          return 'r-checkbox--type-primary'
      }
    })

    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.checked)
    }

    function handleClick() {
      if (props.disabled) return
      checkedRef.value = !checkedRef.value
    }

    return {
      checkedRef,
      colorType,
      outlinedRef,
      sizeType,
      handleClick,
      handleInput,
    }
  },
})
</script>

<style>
.r-checkbox {
  @apply flex flex-wrap justify-center;
}

.r-checkbox__container {
  @apply inline-block p-1 m-1;
}

.r-checkbox__input {
  @apply appearance-none border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer;
}

.r-checkbox__label {
  @apply inline-block text-gray-800 dark:text-white cursor-pointer;
}

.r-checkbox__input:checked[type='checkbox']:disabled {
  @apply pointer-events-none filter-none;
}

/* OUTLINED */
.r-checkbox--type-primary .r-checkbox--outlined .r-checkbox__label {
  @apply py-1 px-2 border border-primary-light rounded-lg bg-primary-lighter;
}
.r-checkbox--type-success .r-checkbox--outlined .r-checkbox__label {
  @apply py-1 px-2 border border-success-light rounded-lg bg-success-lighter;
}
.r-checkbox--type-danger .r-checkbox--outlined .r-checkbox__label {
  @apply py-1 px-2 border border-danger-light rounded-lg bg-danger-lighter;
}
.r-checkbox--type-warning .r-checkbox--outlined .r-checkbox__label {
  @apply py-1 px-2 border border-warning-light rounded-lg bg-warning-lighter;
}
.r-checkbox--type-secondary .r-checkbox--outlined .r-checkbox__label {
  @apply py-1 px-2 border border-secondary-light rounded-lg bg-white;
}
.r-checkbox--type-black .r-checkbox--outlined .r-checkbox__label {
  @apply py-1 px-2 border border-black rounded-lg bg-secondary-light;
}

/* TYPES */
.r-checkbox--disabled .r-checkbox__label {
  @apply cursor-not-allowed text-secondary;
}

.r-checkbox--type-primary .r-checkbox__label {
  @apply hover:text-primary dark:hover:text-primary-light;
}
.r-checkbox--type-primary .r-checkbox__label i {
  @apply text-primary dark:text-primary;
}

.r-checkbox--type-success .r-checkbox__label {
  @apply hover:text-success;
}
.r-checkbox--type-success .r-checkbox__label i {
  @apply text-success;
}

.r-checkbox--type-danger .r-checkbox__label {
  @apply hover:text-danger;
}
.r-checkbox--type-danger .r-checkbox__label i {
  @apply text-danger;
}

.r-checkbox--type-warning .r-checkbox__label {
  @apply hover:text-warning;
}
.r-checkbox--type-warning .r-checkbox__label i {
  @apply text-warning;
}

.r-checkbox--type-secondary .r-checkbox__label {
  @apply hover:text-secondary;
}
.r-checkbox--type-secondary .r-checkbox__label i {
  @apply text-secondary;
}

.r-checkbox--type-black .r-checkbox__label {
  @apply hover:text-gray-600;
}
.r-checkbox--type-black .r-checkbox__label i {
  @apply text-black;
}

/* SIZES */

/* small */
.r-checkbox--small .r-checkbox__label {
  @apply text-sm;
}
.r-checkbox--small .r-checkbox--outlined {
  @apply p-0.5;
}

/* large */
.r-checkbox--large .r-checkbox__label {
  @apply text-xl;
}
.r-checkbox--large .r-checkbox--outlined {
  @apply p-1;
}

/* medium */
.r-checkbox--medium .r-checkbox__label {
  @apply text-base;
}
.r-checkbox--medium .r-checkbox--outlined {
  @apply p-1;
}
</style>
