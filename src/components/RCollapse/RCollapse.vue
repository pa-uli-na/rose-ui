<template>
  <div>
    <div v-for="(item, i) in items" :key="item.title">
      <r-collapse-item :key="i" :title="item.title">
        <template #text>
          <span> {{ item.text }}</span>
        </template>
      </r-collapse-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import RCollapseItem from '../../components/RCollapseItem/RCollapseItem.vue'

interface RCollapseModel {
  title?: string
  text?: string
}

export default defineComponent({
  name: 'RCollapse',
  components: { RCollapseItem },
  props: {
    items: { type: Array as PropType<RCollapseModel[]> },
  },
})
</script>
