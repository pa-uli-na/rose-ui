<template>
  <div v-if="flags" class="flex flex-wrap w-full">
    <div v-if="isLabel" class="w-1/6 sm:w-1/12 text-secondary text-sm">
      Flagi
    </div>
    <div class="w-5/6 sm:w-11/12 flex flex-wrap">
      <div v-for="(flag, index) in flags" :key="index" class="pl-0.5">
        <r-badge outlined :rounded="false" size="small">
          <span class="font-normal tracking-tight">{{ flag.name }}</span>
          <span v-if="flag.priority" class="pl-0.5 font-thin"
            >({{ flag.priority }})</span
          >
        </r-badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Flag } from './types'
import { RBadge } from '../../components/RBadge'

export default defineComponent({
  name: 'MArticleFlags',
  components: { RBadge },
  props: {
    isLabel: { type: Boolean, default: false },
    flags: { type: Array as PropType<Flag[]> },
  },
})
</script>
