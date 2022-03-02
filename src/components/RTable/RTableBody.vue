<template>
  <tbody>
    <slot
      v-for="row in computedRows"
      :key="getRowKey(row)"
      :props="{
        row,
        cols: computedCols,
        getCellValue,
        isDisabledSelection: isRowDisabled(getRowKey(row)),
      }">
      <tr v-if="!grid" :class="{ selected: isRowSelected(getRowKey(row)) }">
        <slot
          name="body-cell"
          :props="{
            row,
            cols: computedCols,
            getCellValue,
            isDisabledSelection: isRowDisabled(getRowKey(row)),
          }">
          <template v-if="hasSelectionMode">
            <td class="text-left">
              <r-checkbox
                class="text-primary"
                :id="`id_${row.index}`"
                :modelValue="isRowSelected(getRowKey(row))"
                :disabled="isRowDisabled(getRowKey(row))"
                @update:modelValue="
                  (val, $event) =>
                    updateSelection([getRowKey(row)], [row], val, $event)
                "></r-checkbox>
            </td>
          </template>

          <slot
            v-for="col in computedCols"
            :key="col.name"
            :name="`body-grid-cell-${col.name}`"
            :props="{
              row,
              col,
              getCellValue,
              isDisabledSelection: isRowDisabled(getRowKey(row)),
            }">
            <td
              :class="
                col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                  ? 'text-center'
                  : 'text-left'
              ">
              {{ getCellValue(col, row) }}
            </td>
          </slot>
        </slot>
      </tr>
      <div v-if="grid" class="flex flex-wrap">
        <slot
          name="body-grid-cell"
          :props="{
            row,
            cols: computedCols,
            getCellValue,
            isDisabledSelection: isRowDisabled(getRowKey(row)),
          }">
          <r-card class="w-full sm:w-1/2">
            <template #description>
              <div class="w-full flex flex-wrap">
                <slot
                  v-for="col in computedCols"
                  :key="col.name"
                  :name="`body-grid-cell-${col.name}`"
                  :props="{
                    row,
                    cols: computedCols,
                    getCellValue,
                    isDisabledSelection: isRowDisabled(getRowKey(row)),
                  }">
                  <r-label-value
                    class="w-full sm:w-1/2"
                    :label="col.label"
                    :value="(getCellValue(col, row) as string)"></r-label-value>
                </slot>
              </div>
            </template>
          </r-card>
        </slot>
      </div>
    </slot>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RCard } from '../RCard'
import { RLabelValue } from '../RLabelValue'
import {
  GetCellValue,
  GetRowKey,
  IsRowDisabled,
  IsRowSelected,
  TablePropsColumns,
  TablePropsData,
  UpdateSelection,
} from './types'
import RCheckbox from '../RCheckbox/RCheckbox.vue'

export default defineComponent({
  name: 'RTableBody',
  inheritAttrs: false,
  components: { RCheckbox, RCard, RLabelValue },
  props: {
    computedRows: {
      type: Array as PropType<TablePropsData>,
      required: true,
    },
    computedCols: {
      type: Array as PropType<TablePropsColumns[]>,
      required: true,
    },
    getCellValue: {
      type: Function as PropType<GetCellValue>,
      required: true,
    },
    getRowKey: {
      type: Function as PropType<GetRowKey>,
      required: true,
    },
    hasSelectionMode: {
      type: Boolean,
      required: true,
    },
    isRowSelected: {
      type: Function as PropType<IsRowSelected>,
      required: true,
    },
    isRowDisabled: {
      type: Function as PropType<IsRowDisabled>,
      required: true,
    },
    updateSelection: {
      type: Function as PropType<UpdateSelection>,
      required: true,
    },
    selected: Array,
    grid: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
