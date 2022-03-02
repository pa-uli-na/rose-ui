<template>
  <thead>
    <slot v-if="!grid" :props="computedCols">
      <tr>
        <template v-if="hasSelectionMode">
          <th class="text-left">
            <r-checkbox
              :id="`id_all_rows`"
              type="checkbox"
              class="checked:bg-dash text-primary text-"
              :modelValue="someRowsSelected || allRowsSelected"
              @update:modelValue="onToggleCheck"></r-checkbox>
          </th>
        </template>

        <slot name="header-cell" :props="computedCols">
          <slot
            v-for="col in computedCols"
            :key="col.name"
            :name="`header-cell-${col.name}`"
            :props="col">
            <th
              :class="[
                col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                  ? 'text-center'
                  : 'text-left',
                'whitespace-nowrap',
                col.__thClasses,
              ]"
              @click="() => col.sortable && sort(col)">
              {{ col.label }}

              <r-icon
                v-if="col.sortable"
                :name="col.__iconName"
                class="r-table__sort-icon"></r-icon>
            </th>
          </slot>
        </slot>
      </tr>
    </slot>
  </thead>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TableColumns, TableSort, UpdateSelection } from './types'
import RCheckbox from '../RCheckbox/RCheckbox.vue'
import RIcon from '../RIcon/RIcon.vue'

export default defineComponent({
  name: 'RTableHead',

  inheritAttrs: false,

  components: { RCheckbox, RIcon },

  props: {
    computedCols: {
      type: Array as PropType<TableColumns[]>,
      required: true,
    },

    hasSelectionMode: {
      type: Boolean,
      required: true,
    },

    someRowsSelected: {
      type: Boolean,
      required: true,
    },

    allRowsSelected: {
      type: Boolean,
      required: true,
    },

    updateSelection: {
      type: Function as PropType<UpdateSelection>,
      required: true,
    },

    selectAllOnPage: {
      type: Function,
      required: true,
    },

    clearSelectionOnPage: {
      type: Function,
      required: true,
    },

    sort: {
      type: Function as PropType<TableSort>,
      required: true,
    },

    grid: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    function onToggleCheck(checked: boolean) {
      if (checked) {
        props.selectAllOnPage()
      } else {
        props.clearSelectionOnPage()
      }
    }
    return { onToggleCheck }
  },
})
</script>
