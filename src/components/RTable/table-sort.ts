import { computed, ComputedRef, ExtractPropTypes, PropType } from "vue"
import {
  SetPagination,
  SortMethod,
  TableProps,
  TablePropsColumns,
  TablePropsData,
  TablePropsDataElement,
  TablePropsPagination,
  TableSort
} from "./types"

function isDate(v: unknown): v is Date {
  return Object.prototype.toString.call(v) === "[object Date]"
}

function isNumber(v: unknown): v is number {
  return typeof v === "number" && isFinite(v)
}

function sortDate(a: string | number | Date, b: string | number | Date) {
  return new Date(a).valueOf() - new Date(b).valueOf()
}

const getSortMethod = (
  colList: ComputedRef<TablePropsColumns[]>
): SortMethod => (data, sortBy, descending) => {
  const col = colList.value.find((def) => def.name === sortBy)
  if (col === void 0 || col.field === void 0) {
    return data
  }

  if (typeof col.field === "function") {
    col.field
  } else {
    col.field
  }

  const dir = descending === true ? -1 : 1

  let valFnc
  if (typeof col.field === "function") {
    const colField = col.field
    valFnc = (v: TablePropsDataElement) => colField(v)
  } else {
    const colField = col.field
    valFnc = (v: TablePropsDataElement) => v[colField]
  }

  const val = valFnc

  return data.sort((a, b) => {
    const A = val(a),
      B = val(b)

    if (A === null || A === void 0) {
      return -1 * dir
    }
    if (B === null || B === void 0) {
      return 1 * dir
    }
    if (col.sort !== void 0) {
      return col.sort(A, B, a, b) * dir
    }
    if (isNumber(A) && isNumber(B)) {
      return (A - B) * dir
    }
    if (isDate(A) && isDate(B)) {
      return sortDate(A, B) * dir
    }
    if (typeof A === "boolean" && typeof B === "boolean") {
      return (Number(A) - Number(B)) * dir
    }

    const [AS, BS]: string[] = [A, B].map((s) =>
      (s + "").toLocaleString().toLowerCase()
    )

    return AS < BS ? -1 * dir : AS === BS ? 0 : dir
  })
}

export const useTableSortProps = {
  sortMethod: {
    type: Function as PropType<SortMethod>
  }
}

export function useTableSort(
  props: ExtractPropTypes<typeof useTableSortProps> & TableProps,
  computedPagination: ComputedRef<TablePropsPagination>,
  colList: ComputedRef<TablePropsColumns[]>,
  setPagination: SetPagination
): {
  columnToSort: ComputedRef<TablePropsColumns | null>
  computedSortMethod: ComputedRef<SortMethod<TablePropsData>>
  sort: TableSort
} {
  const sortMethod = getSortMethod(colList)

  const columnToSort = computed(() => {
    const { sortBy } = computedPagination.value

    return sortBy
      ? colList.value.find((def) => def.name === sortBy) || null
      : null
  })

  const computedSortMethod = computed(() =>
    props.sortMethod !== void 0 ? props.sortMethod : sortMethod
  )

  const sort: TableSort = (colVal) => {
    const col =
      colVal === Object(colVal)
        ? (colVal as TablePropsColumns).name
        : (colVal as string)

    let { sortBy, descending } = computedPagination.value

    if (sortBy !== col) {
      sortBy = col
      descending = false
    } else if (descending === true) {
      sortBy = null
    } else {
      descending = true
    }

    setPagination({ sortBy, descending, page: 1 })
  }

  return {
    columnToSort,
    computedSortMethod,
    sort
  }
}
