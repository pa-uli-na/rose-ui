import {
  computed,
  watch,
  nextTick,
  ExtractPropTypes,
  PropType,
  ComputedRef
} from "vue"
import { FilterMethod, SetPagination, TableProps } from "./types"

export const useTableFilterProps = {
  filter: [String, Object],
  filterMethod: Function as PropType<FilterMethod>
}

const filterMethod: FilterMethod = (rows, terms, cols, cellValue) => {
  const lowerTerms = terms ? (terms as string).toLowerCase() : ""
  return rows.filter((row) =>
    cols.some((col) => {
      const val = cellValue(col, row) + ""
      const haystack =
        val === "undefined" || val === "null" ? "" : val.toLowerCase()
      return haystack.indexOf(lowerTerms) !== -1
    })
  )
}

export function useTableFilter(
  props: ExtractPropTypes<typeof useTableFilterProps> & TableProps,
  setPagination: SetPagination
): { computedFilterMethod: ComputedRef<FilterMethod> } {
  const computedFilterMethod = computed(() =>
    props.filterMethod !== void 0 ? props.filterMethod : filterMethod
  )

  watch(
    () => props.filter,
    () => {
      nextTick(() => {
        setPagination({ page: 1 })
      })
    },
    { deep: true }
  )

  return { computedFilterMethod }
}
