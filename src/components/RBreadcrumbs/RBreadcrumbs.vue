<template>
  <div :class="[$attrs.class, 'r-breadcrumbs']">
    <ol v-if="breadcrumbs">
      <li v-for="(link, index) in breadcrumbs" :key="index">
        <a v-show="!(index === breadcrumbs?.length - 1)" :href="link.link">
          <r-icon
            v-if="link.icon"
            :name="link.icon"
            class-name="text-black dark:text-secondary-light fa-xs hover:text-primary dark:hover:text-primary-light"></r-icon>
          <span>{{ link?.text }}</span>
        </a>
        <span
          v-show="index === breadcrumbs?.length - 1"
          class="text-primary dark:text-primary-light mx-2">
          {{ link?.text }}</span
        >
        <r-icon
          v-show="!(index === breadcrumbs?.length - 1)"
          :name="dividerIcon"
          :class-name="'fa-2xs text-black dark:text-white'"></r-icon>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import '../../theme/index.css'
import RIcon from '../RIcon/RIcon.vue'
import { defineComponent, PropType } from 'vue'
import { RBreadcrumbLink } from './types'

export default defineComponent({
  name: 'RBreadcrumbs',
  components: {
    RIcon,
  },
  inheritAttrs: false,
  props: {
    dividerIcon: { type: String, default: 'fa-solid fa-angle-right' },
    breadcrumbs: { type: Array as PropType<RBreadcrumbLink[] | any> },
  },
})
</script>

<style>
.r-breadcrumbs {
  @apply overflow-y-hidden w-max;
}

.r-breadcrumbs ol {
  @apply w-full overflow-x-auto overflow-y-hidden scroll-smooth flex;
}

.r-breadcrumbs ol li {
  @apply relative font-semibold;
}

.r-breadcrumbs ol li a {
  @apply text-black hover:text-primary dark:text-white dark:hover:text-primary-light;
}

.r-breadcrumbs ol li a span {
  @apply hidden sm:inline mx-2;
}
</style>
