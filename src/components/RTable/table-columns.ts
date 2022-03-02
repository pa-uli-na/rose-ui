import { computed, ComputedRef, ExtractPropTypes, PropType } from 'vue'
import {
  TablePropsColumns,
  TableProps,
  TablePropsPagination,
  TableColumns,
} from './types'

export const useTableColumnsProps = {
  columns: {
    type: Array as PropType<TablePropsColumns[]>,
    default: (): [] => {
      return []
    },
  },

  visibleColumns: {
    type: Array as PropType<string[]>,
  },
}

export function useTableColumns(
  props: ExtractPropTypes<typeof useTableColumnsProps> & TableProps,
  computedPagination: ComputedRef<TablePropsPagination>
): {
  colList: ComputedRef<TablePropsColumns[]>
  computedCols: ComputedRef<TableColumns[]>
  computedColsMap: ComputedRef<Record<string, TableColumns>>
} {
  const colList = computed<TablePropsColumns[]>(() => {
    if (props.columns.length) {
      return props.columns
    }

    const row = props.data[0]
    return row !== void 0
      ? Object.keys(row).map((name) => ({
          name,
          label: name.toLowerCase(),
          field: name,
          align: 'left',
          sortable: true,
        }))
      : []
  })

  const computedCols = computed<TableColumns[]>(() => {
    const { sortBy, descending } = computedPagination.value
    const cols =
      props.visibleColumns !== void 0
        ? colList.value.filter(
            (col) =>
              col.required === true ||
              props.visibleColumns?.includes(col.name) === true
          )
        : colList.value

    return cols.map((col) => {
      const align = col.align || 'left'

      return {
        ...col,
        align,
        __iconName: sortBy !== null && descending === true ? 'south' : 'north',
        __thClasses:
          (col.sortable === true ? 'sortable' : '') +
          (col.name === sortBy
            ? ` sorted ${descending === true ? 'sort-desc' : ''}`
            : ''),
      }
    })
  })

  const computedColsMap = computed<Record<string, TableColumns>>(() => {
    const names: Record<string, TableColumns> = {}
    computedCols.value.forEach((col) => {
      names[col.name] = col
    })
    return names
  })

  return { colList, computedCols, computedColsMap }
}
