<template>
  <div class="radio-tile-group">
    <div
      :class="['input-container', sizeType]"
      v-for="(item, index) in items"
      :key="`radio-tile-${index}`">
      <input
        :id="`radio-${item.value}`"
        class="radio-button"
        type="radio"
        :name="name"
        @change="handleChange(item.value)" />
      <div class="radio-tile">
        <div class="icon" v-if="item.icon">
          <r-icon :name="item.icon" :class-name="'fa-lg'"></r-icon>
        </div>
        <label :for="`radio-${item.value}`" class="radio-tile-label">{{
          item.label
        }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { RIcon } from '../RIcon'
import {
  RRadioTileInstance,
  RRadioTileItem,
  RRadioTilePropSize,
  RRadioTilePropSizes,
  RRadioTilePropType,
  RRadioTilePropTypes,
  RRadioTileProps,
} from './types'

export default defineComponent({
  name: 'RRadioTile',
  components: { RIcon },
  props: {
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    items: {
      type: Array as PropType<RRadioTileItem[]>,
      required: true,
      validator: (items: RRadioTileItem[]) => {
        let isValid = true
        items.forEach((item: RRadioTileItem) => {
          isValid = isValid && 'label' in item && 'value' in item
        })
        return isValid
      },
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: RRadioTilePropSize) =>
        Object.values(RRadioTilePropSizes).includes(value),
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const sizeType = computed(() => {
      switch (props.size) {
        case 'small':
          return 'r-radio-tile--size-small'
        case 'large':
          return 'r-radio-tile--size-large'
        default:
          return 'r-radio-tile--size-medium'
      }
    })

    function handleChange(value: unknown) {
      emit(`update:modelValue`, value)
    }

    return { sizeType, handleChange }
  },
})
</script>

<style>
.radio-tile-group {
  @apply flex flex-wrap justify-center p-1;
}

.radio-tile-group .input-container {
  @apply relative rounded hover:bg-primary-lighter text-primary border border-primary dark:border-primary-light dark:hover:border-white dark:text-primary-light dark:hover:bg-transparent dark:hover:text-white;
}

/* SIZES */
.r-radio-tile--size-small {
  @apply h-20 w-24 m-1 text-xs;
}

.r-radio-tile--size-medium {
  @apply h-24 w-28 m-1;
}

.r-radio-tile--size-large {
  @apply h-28 w-32 m-2;
}

.radio-tile-group .input-container .radio-button {
  @apply opacity-0 absolute top-0 left-0 h-full w-full m-0 cursor-pointer;
}

.radio-tile {
  transition: transform 300ms ease;
  @apply flex flex-col justify-center text-center w-full h-full rounded;
}

.radio-tile-label {
  @apply text-center font-medium uppercase tracking-wide;
}

.radio-tile-group .input-container .radio-button:checked + .radio-tile {
  transform: scale(1.1, 1.1);
  @apply bg-primary border border-primary text-white;
}

.radio-tile-group
  .input-container
  .radio-button:checked
  + .radio-tile
  .radio-tile-label {
  @apply text-white;
}
</style>
