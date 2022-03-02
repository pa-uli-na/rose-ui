<template>
  <div class="r-table__container r-table--horizontal-border-b w-full">
    <div v-if="$slots.top" class="r-table__top w-full">
      <slot name="top"></slot>
    </div>
    <div v-if="data.length" class="r-table__middle">
      <table class="r-table">
        <template v-if="!hideHeader">
          <r-table-head
            :computedCols="computedCols"
            :hasSelectionMode="hasSelectionMode"
            :someRowsSelected="someRowsSelected"
            :allRowsSelected="allRowsSelected"
            :updateSelection="updateSelection"
            :selectAllOnPage="selectAllOnPage"
            :clearSelectionOnPage="clearSelectionOnPage"
            :selected="selected"
            :sort="sort"
            :grid="grid">
            <template v-slot:default="{ props }">
              <slot name="head" :props="props"></slot>
            </template>
            <template v-slot:header-cell="{ props }">
              <slot name="header-cell" :props="props"></slot>
            </template>
          </r-table-head>
        </template>

        <r-table-body
          :computedRows="computedRows"
          :computedCols="computedCols"
          :getCellValue="getCellValue"
          :getRowKey="getRowKey"
          :hasSelectionMode="hasSelectionMode"
          :updateSelection="updateSelection"
          :isRowSelected="isRowSelected"
          :isRowDisabled="isRowDisabled"
          :selected="selected"
          :grid="grid">
          <template v-slot:default="{ props }">
            <slot name="body" :props="props"></slot>
          </template>
          <template v-slot:body-cell="{ props }">
            <slot name="body-cell" :props="props"></slot>
          </template>
          <template
            v-for="slot in bodyCellSlots"
            :key="slot"
            v-slot:[slot]="{ props }">
            <slot :name="slot" :props="props"> </slot>
          </template>
          <template v-slot:body-grid-cell="{ props }">
            <slot name="body-grid" :props="props"></slot>
          </template>
          <template
            v-for="slot in bodyGridCellSlots"
            :key="slot"
            v-slot:[slot]="{ props }">
            <slot :name="slot" :props="props"> </slot>
          </template>
        </r-table-body>
      </table>
    </div>
    <div v-else class="r-table__nodata">Brak danych</div>
    <div
      class="r-table__bottom justify-between items-center flex-col sm:flex-row">
      <slot name="bottom">
        <r-table-bottom
          :rowsSelectedNumber="rowsSelectedNumber"
          :computedPagination="computedPagination"
          :setPagination="setPagination"
          :filteredSortedRowsNumber="filteredSortedRowsNumber"
          :pagesNumber="pagesNumber"
          :nextPage="nextPage"
          :prevPage="prevPage"
          :isFirstPage="isFirstPage"
          :isLastPage="isLastPage"
          :computedRowsPerPageOptions="
            computedRowsPerPageOptions
          "></r-table-bottom>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { GetCellValue, GetRowKey, TablePropsData } from './types'
import RTableHead from './RTableHead.vue'
import RTableBody from './RTableBody.vue'
import RTableBottom from './RTableFooter.vue'
import { useTableColumnsProps, useTableColumns } from './table-columns'
import { useTableFilter, useTableFilterProps } from './table-filter'
import {
  useTablePagination,
  useTablePaginationEmits,
  useTablePaginationProps,
  useTablePaginationState,
} from './table-pagination'
import { useTableSortProps, useTableSort } from './table-sort'
import {
  useTableRowSelectionProps,
  useTableRowSelectionEmits,
  useTableRowSelection,
} from './table-selection'

export default defineComponent({
  name: 'RTable',

  components: { RTableHead, RTableBody, RTableBottom },

  emits: [...useTablePaginationEmits, ...useTableRowSelectionEmits],

  props: {
    data: {
      type: Array as PropType<TablePropsData>,
      default: (): [] => {
        return []
      },
    },
    rowKey: {
      type: [String, Function] as PropType<string | GetRowKey>,
      default: 'id',
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    grid: {
      type: Boolean,
      default: false,
    },
    ...useTableColumnsProps,
    ...useTableFilterProps,
    ...useTablePaginationProps,
    ...useTableSortProps,
    ...useTableRowSelectionProps,
  },

  setup(props, ctx) {
    const getRowKey = computed<GetRowKey>(() => {
      if (typeof props.rowKey === 'function') {
        return props.rowKey
      } else {
        const rowkey = props.rowKey
        return (row) => String(row[rowkey])
      }
    })

    const getCellValue: GetCellValue = (col, row) => {
      const val =
        col.field === void 0
          ? ''
          : typeof col.field === 'function'
          ? col.field(row)
          : row[col.field]
      return col.format !== void 0 ? col.format(val, row) : val
    }

    const { innerPagination, computedPagination, setPagination } =
      useTablePaginationState(props, ctx)

    const { colList, computedCols } = useTableColumns(props, computedPagination)

    const { columnToSort, computedSortMethod, sort } = useTableSort(
      props,
      computedPagination,
      colList,
      setPagination
    )

    const { computedFilterMethod } = useTableFilter(props, setPagination)

    const filteredSortedRows = computed<TablePropsData>(() => {
      let rows = props.data

      if (rows.length === 0) {
        return rows
      }

      const { sortBy, descending } = computedPagination.value

      if (props.filter) {
        rows = computedFilterMethod.value(
          rows,
          props.filter,
          computedCols.value,
          getCellValue
        )
      }

      if (columnToSort.value !== null) {
        rows = computedSortMethod.value(
          props.data === rows ? rows.slice() : rows,
          sortBy,
          descending
        )
      }

      return rows
    })

    const filteredSortedRowsNumber = computed<number>(
      () => filteredSortedRows.value.length
    )

    const {
      firstRowIndex,
      lastRowIndex,
      isFirstPage,
      isLastPage,
      computedRowsPerPageOptions,
      nextPage,
      prevPage,
      pagesNumber,
    } = useTablePagination(
      props,
      ctx,
      innerPagination,
      computedPagination,
      setPagination,
      filteredSortedRowsNumber
    )

    const computedRows = computed<TablePropsData>(() => {
      let rows = filteredSortedRows.value

      const { rowsPerPage } = computedPagination.value

      if (rowsPerPage !== 0) {
        if (firstRowIndex.value === 0 && props.data !== rows) {
          if (rows.length > lastRowIndex.value) {
            rows = rows.slice(0, lastRowIndex.value)
          }
        } else {
          rows = rows.slice(firstRowIndex.value, lastRowIndex.value)
        }
      }

      return rows
    })

    const {
      hasSelectionMode,
      someRowsSelected,
      allRowsSelected,
      updateSelection,
      rowsSelectedNumber,
      isRowSelected,
      isRowDisabled,
      clearSelection,
      selectAllOnPage,
      clearSelectionOnPage,
    } = useTableRowSelection(props, ctx, computedRows, getRowKey)

    const bodyCellSlots = ctx.slots
      ? Object.keys(ctx.slots).filter(
          (slot) => slot.indexOf('body-cell-') !== -1
        )
      : []

    const bodyGridCellSlots = ctx.slots
      ? Object.keys(ctx.slots).filter(
          (slot) => slot.indexOf('body-grid-cell') !== -1
        )
      : []

    return {
      bodyCellSlots,
      bodyGridCellSlots,
      getRowKey,
      computedCols,
      computedRows,
      getCellValue,

      sort,

      hasSelectionMode,
      someRowsSelected,
      updateSelection,
      isRowSelected,
      isRowDisabled,
      clearSelection,
      selectAllOnPage,
      clearSelectionOnPage,
      allRowsSelected,
      setPagination,

      computedPagination,
      filteredSortedRowsNumber,
      rowsSelectedNumber,

      isFirstPage,
      isLastPage,
      computedRowsPerPageOptions,
      nextPage,
      prevPage,
      pagesNumber,
    }
  },
})
</script>

<style>
.r-table__container {
  @apply flex flex-col flex-wrap text-black;
}

.r-table {
  @apply w-full max-w-full;
  border-spacing: 0;
}

.r-table td,
.r-table th {
  @apply p-1;
}

.r-table th.sortable {
  cursor: pointer;
}

.r-table th.sortable > .r-table__sort-icon {
  visibility: hidden;
}

.r-table th.sortable:hover > .r-table__sort-icon,
.r-table th.sortable.sorted > .r-table__sort-icon {
  visibility: visible;
}

.r-table tbody tr:hover {
  @apply bg-primary-lighter;
  @apply text-black;
}

.r-table__top,
.r-table__bottom,
.r-table__nodata {
  @apply px-2 flex flex-wrap;
}

.r-table--horizontal-border-b thead th {
  @apply border-b;
}

.r-table--horizontal-border-b tbody tr td {
  @apply border-b;
}

.r-table__middle {
  @apply max-w-full overflow-auto;
}

.r-table__control {
  @apply flex;
}
</style>
