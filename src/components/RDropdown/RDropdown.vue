<template>
  <!-- float-left overflow-hidden -->
  <div class="group float-left overflow-hidden">
    <slot name="openButton"></slot>

    <div :class="[mobileRef, 'r-dropdown']">
      <ul class="py-1">
        <slot name="dropdown-item">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="r-dropdown-item">
            <a :href="item.href">
              {{ item.text }}
            </a>
          </li>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue'
import { DropdownItem, RDropdownInstance, RDropdownProps } from './types'

export default defineComponent({
  name: 'RDropdown',
  props: {
    mobile: { type: Boolean, default: false },
    items: { type: Array as PropType<DropdownItem[]>, default: () => [] },
  },
  setup(props: RDropdownProps): RDropdownInstance {
    const mobileRef = computed(() =>
      props.mobile ? '' : 'absolute float-left shadow'
    )
    return { mobileRef }
  },
})
</script>

<style>
.r-dropdown {
  @apply hidden group-hover:flex z-50 px-2 min-w-fit bg-white dark:bg-gray-800 dark:text-secondary-dark;
}

.r-dropdown-item {
  @apply block py-2 text-sm text-black dark:text-white hover:text-primary hover:dark:text-primary-light;
}
</style>
