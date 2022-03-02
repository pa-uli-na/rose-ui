<template>
  <div class="">
    <div class="flex items-center">
      <button
        type="button"
        class="pt-1 text-center px-2 h-10 outline-none focus:outline-none"
        :class="tabBtnClasses"
        :disabled="isDisabled"
        @click="handleTabClick">
        <slot name="title">{{ title }}</slot>
      </button>
    </div>
    <div v-if="description" class="w-full mt-1 text-secondary text-xs">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue'
import { RTabsProvider, RTabPropType, RTabPropTypes } from '../RTabs/types'

export default defineComponent({
  name: 'RTab',
  componentName: 'RTab',
  props: {
    name: {
      type: String,
      required: true,
    },
    /**
     * Tytuł zakładki
     */
    title: {
      type: String,
      required: false,
    },
    /**
     * Opis pod zakładką
     */
    description: {
      type: String,
      default: null,
    },
    /**
     * Czy zakładka ma być zablokowana?
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const rtabs = inject<RTabsProvider>('rTabs')
    const isDisabled = computed<boolean>(
      () => props.disabled || Boolean(rtabs?.disabled.value)
    )

    const tabBtnClasses = computed(() => {
      if (isDisabled.value === true)
        return 'cursor-not-allowed text-secondary border-secondary'

      if (rtabs?.currentName.value === props.name) {
        switch (rtabs.type.value) {
          case RTabPropTypes.black:
            return `cursor-pointer border-black border-b-4 font-semibold text-black hover:text-black hover:border-black dark:text-black dark:hover:text-black dark:hover:border-black`
          case RTabPropTypes.danger:
            return `cursor-pointer border-danger border-b-4 font-semibold text-black hover:text-danger hover:border-danger dark:text-danger dark:hover:text-danger dark:hover:border-danger`
          case RTabPropTypes.secondary:
            return `cursor-pointer border-secondary border-b-4 font-semibold text-black hover:text-secondary hover:border-secondary dark:text-secondary dark:hover:text-secondary dark:hover:border-secondary`
          case RTabPropTypes.success:
            return `cursor-pointer border-success border-b-4 font-semibold text-black hover:text-success hover:border-success dark:text-success dark:hover:text-success dark:hover:border-success`
          case RTabPropTypes.warning:
            return `cursor-pointer border-warning border-b-4 font-semibold text-black hover:text-warning hover:border-warning dark:text-warning dark:hover:text-warning dark:hover:border-warning`
          default:
            return `cursor-pointer border-primary border-b-4 font-semibold text-black hover:text-primary hover:border-primary dark:text-primary-light dark:hover:text-primary-light dark:hover:border-primary-light dark:border-primary-light`
        }
      }

      switch (rtabs?.type.value) {
        case RTabPropTypes.black:
          return `cursor-pointer border-black text-black hover:text-black hover:border-white dark:text-secondary-light dark:hover:text-black dark:hover:border-black`
        case RTabPropTypes.danger:
          return `cursor-pointer border-danger text-black hover:text-danger hover:border-white dark:text-secondary-light dark:hover:text-danger dark:hover:border-danger`
        case RTabPropTypes.secondary:
          return `cursor-pointer border-secondary text-black hover:text-secondary hover:border-secondary dark:text-secondary-light dark:hover:text-secondary dark:hover:border-secondary`
        case RTabPropTypes.success:
          return `cursor-pointer border-success text-black hover:text-success hover:border-success dark:text-secondary-light dark:hover:text-success dark:hover:border-success`
        case RTabPropTypes.warning:
          return `cursor-pointer border-warning text-black hover:text-warning hover:border-warning dark:text-secondary-light dark:hover:text-warning dark:hover:border-warning`
        default:
          return `cursor-pointer border-secondary pb-1 text-black dark:text-secondary-light hover:text-black hover:dark:text-primary-light hover:border-primary dark:hover:border-primary`
      }
    })

    const handleTabClick = (): void => {
      rtabs?.updateValue(props.name)
    }

    return {
      type: rtabs?.type.value,
      isDisabled,
      tabBtnClasses,
      handleTabClick,
    }
  },
})
</script>
