<template>
  <span
    :class="[
      $attrs.class,
      colorType,
      upRef,
      roundRef,
      sizeType,
      'items-center text-center whitespace-nowrap',
    ]">
    <slot>
      {{ label }}
    </slot>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  RBadgeInstance,
  RBadgePropSize,
  RBadgePropSizes,
  RBadgePropType,
  RBadgePropTypes,
  RBadgeProps,
} from './types'

export default defineComponent({
  name: 'RBadge',
  inheritAttrs: false,
  props: {
    /** Tekst do wyświetlenia. Opcjonalnie można wykorzystać "slot". */
    label: { type: String, default: '' },
    /** Badge z obramowaniem, bez wypełnienia. */
    outlined: { type: Boolean, default: false },
    /** Badge z ciemnym wypełnieniem. */
    filled: { type: Boolean, default: false },
    /** Czy badge ma być zaokrąglony? */
    rounded: {
      type: Boolean,
      default: true,
    },
    /** Rozmiar badga: small, medium, large. Domyślny rozmiar: medium */
    size: {
      type: String,
      default: 'medium',
      validator: (value: RBadgePropSize) =>
        Object.values(RBadgePropSizes).includes(value),
    },
    /** Typ przycisku: Primary, Secondary, Success, Warning, Danger */
    type: {
      type: String,
      default: RBadgePropTypes.primary,
      validator: (value: RBadgePropType) =>
        Object.values(RBadgePropTypes).includes(value),
    },
    /** Czy badge ma być mały i powyżej tesktu? */
    up: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: RBadgeProps): RBadgeInstance {
    const roundRef = computed(() => (props.rounded ? `rounded-2xl` : ''))
    const upRef = computed(() => (props.up ? `relative right-2 -top-3` : ''))
    const sizeType = computed(() => {
      switch (props.size) {
        case 'small':
          return 'px-0.5 py-0.5 text-xs'
        case 'large':
          return 'px-3 py-1 text-lg'
        default:
          return 'px-1 text-sm'
      }
    })

    const colorType = computed(() => {
      switch (props.type) {
        case RBadgePropTypes.secondary:
          if (props.outlined)
            return 'bg-transparent border border-secondary-light text-secondary dark:text-secondary-light dark:border-secondary-light'
          else if (props.filled) return 'bg-secondary text-white'
          return 'bg-gray-200 text-gray-600'
        case RBadgePropTypes.success:
          if (props.outlined)
            return 'bg-transparent border border-success text-success dark:text-success-light'
          else if (props.filled) return 'bg-success text-white'
          return 'bg-success-lighter text-success'
        case RBadgePropTypes.warning:
          if (props.outlined)
            return 'bg-transparent border border-warning text-warning dark:text-warning-light'
          else if (props.filled) return 'bg-warning text-white'
          return 'bg-warning-lighter text-warning'
        case RBadgePropTypes.danger:
          if (props.outlined)
            return 'bg-transparent border border-danger-light text-danger dark:text-danger-light'
          else if (props.filled) return 'bg-danger text-white'
          return 'bg-danger-lighter text-danger'
        case RBadgePropTypes.black:
          return props.outlined
            ? 'bg-transparent border border-black text-black'
            : 'bg-black text-white'
        default:
          if (props.outlined)
            return 'bg-transparent border border-primary-light text-primary dark:text-primary-light'
          else if (props.filled) return 'bg-primary text-white'
          return 'bg-primary-lighter text-primary'
      }
    })

    return { colorType, roundRef, sizeType, upRef }
  },
})
</script>
