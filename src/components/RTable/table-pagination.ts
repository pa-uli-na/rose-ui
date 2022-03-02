import {
  ref,
  computed,
  watch,
  ExtractPropTypes,
  PropType,
  SetupContext,
  Ref,
  ComputedRef
} from "vue"
import { SetPagination, TableProps, TablePropsPagination } from "./types"

type TablePropsPaginationKeys = keyof TablePropsPagination

function samePagination(
  oldPag: TablePropsPagination,
  newPag: TablePropsPagination
) {
  for (const prop in newPag) {
    if (
      newPag[prop as TablePropsPaginationKeys] !==
      oldPag[prop as TablePropsPaginationKeys]
    ) {
      return false
    }
  }
  return true
}

function fixPagination(p: TablePropsPagination) {
  if (p.page < 1) {
    p.page = 1
  }
  if (p.rowsPerPage !== void 0 && p.rowsPerPage < 1) {
    p.rowsPerPage = 0
  }
  return p
}

export const useTablePaginationProps = {
  pagination: Object as PropType<TablePropsPagination>,
  rowsPerPageOptions: {
    type: Array as PropType<number[]>,
    default: (): number[] => [10, 15, 20, 0]
  }
}

export const useTablePaginationEmits = ["update:pagination"]

export function useTablePaginationState(
  props: ExtractPropTypes<typeof useTablePaginationProps> & TableProps,
  { attrs, emit }: SetupContext<string[]>
): {
  innerPagination: Ref<TablePropsPagination>
  computedPagination: ComputedRef<TablePropsPagination>
  setPagination: SetPagination
} {
  const innerPagination = ref<TablePropsPagination>(
    Object.assign(
      {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage:
          props.rowsPerPageOptions.length > 0 ? props.rowsPerPageOptions[0] : 5
      },
      props.pagination
    )
  )

  const computedPagination = computed<TablePropsPagination>(() => {
    const pag =
      attrs["onUpdate:pagination"] !== void 0
        ? { ...innerPagination.value, ...props.pagination }
        : innerPagination.value

    return fixPagination(pag)
  })

  const setPagination: SetPagination = (val) => {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val
    })

    if (samePagination(computedPagination.value, newPagination)) {
      return
    }

    if (
      props.pagination !== void 0 &&
      attrs["onUpdate:pagination"] !== void 0
    ) {
      emit("update:pagination", newPagination)
    } else {
      innerPagination.value = newPagination
    }
  }

  return {
    innerPagination,
    computedPagination,

    setPagination
  }
}

export function useTablePagination(
  props: ExtractPropTypes<typeof useTablePaginationProps> & TableProps,
  { attrs, emit }: SetupContext<string[]>,
  innerPagination: Ref<TablePropsPagination>,
  computedPagination: ComputedRef<TablePropsPagination>,
  setPagination: SetPagination,
  filteredSortedRowsNumber: ComputedRef<number>
): {
  firstRowIndex: ComputedRef<number>
  lastRowIndex: ComputedRef<number>
  isFirstPage: ComputedRef<boolean>
  isLastPage: ComputedRef<boolean>
  pagesNumber: ComputedRef<number>
  computedRowsPerPageOptions: ComputedRef<{ label: string; value: number }[]>
  computedRowsNumber: ComputedRef<number>
  firstPage: () => void
  prevPage: () => void
  nextPage: () => void
  lastPage: () => void
} {
  const computedRowsNumber = computed(() => {
    return filteredSortedRowsNumber.value
  })

  const firstRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value
    return (page - 1) * rowsPerPage
  })

  const lastRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value
    return page * rowsPerPage
  })

  const isFirstPage = computed(() => computedPagination.value.page === 1)

  const pagesNumber = computed(() =>
    computedPagination.value.rowsPerPage === 0
      ? 1
      : Math.max(
          1,
          Math.ceil(
            computedRowsNumber.value / computedPagination.value.rowsPerPage
          )
        )
  )

  const isLastPage = computed(() =>
    lastRowIndex.value === 0
      ? true
      : computedPagination.value.page >= pagesNumber.value
  )

  const computedRowsPerPageOptions = computed(() => {
    const opts = props.rowsPerPageOptions.includes(
      innerPagination.value.rowsPerPage
    )
      ? props.rowsPerPageOptions
      : [innerPagination.value.rowsPerPage].concat(props.rowsPerPageOptions)

    return opts.map((count) => ({
      label: count === 0 ? "Wszystko" : "" + count,
      value: count
    }))
  })

  watch(pagesNumber, (lastPage, oldLastPage) => {
    if (lastPage === oldLastPage) {
      return
    }

    const currentPage = computedPagination.value.page
    if (lastPage && !currentPage) {
      setPagination({ page: 1 })
    } else if (lastPage < currentPage) {
      setPagination({ page: lastPage })
    }
  })

  function firstPage() {
    setPagination({ page: 1 })
  }

  function prevPage() {
    const { page } = computedPagination.value
    if (page > 1) {
      setPagination({ page: page - 1 })
    }
  }

  function nextPage() {
    const { page, rowsPerPage } = computedPagination.value
    if (
      lastRowIndex.value > 0 &&
      page * rowsPerPage < computedRowsNumber.value
    ) {
      setPagination({ page: page + 1 })
    }
  }

  function lastPage() {
    setPagination({ page: pagesNumber.value })
  }

  if (attrs["onUpdate:pagination"] !== void 0) {
    emit("update:pagination", { ...computedPagination.value })
  }

  return {
    firstRowIndex,
    lastRowIndex,
    isFirstPage,
    isLastPage,
    pagesNumber,
    computedRowsPerPageOptions,
    computedRowsNumber,

    firstPage,
    prevPage,
    nextPage,
    lastPage
  }
}
