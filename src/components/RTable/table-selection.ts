import {
  computed,
  ComputedRef,
  ExtractPropTypes,
  PropType,
  SetupContext
} from "vue"
import {
  GetRowKey,
  TableProps,
  UpdateSelection,
  TablePropsData,
  IsRowSelected,
  IsRowDisabled
} from "./types"

export const useTableRowSelectionProps = {
  selection: {
    type: String,
    default: "none",
    validator: (v: string): boolean =>
      ["single", "multiple", "none"].includes(v)
  },
  selected: {
    type: Array as PropType<TablePropsData>,
    default: (): unknown[] => []
  },
  disabledSelection: {
    type: Array as PropType<TablePropsData>,
    default: (): unknown[] => []
  }
}

export const useTableRowSelectionEmits = ["update:selected", "selection"]

export function useTableRowSelection(
  props: ExtractPropTypes<typeof useTableRowSelectionProps> & TableProps,
  { emit }: SetupContext<string[]>,
  computedRows: ComputedRef<TablePropsData>,
  getRowKey: ComputedRef<GetRowKey>
): {
  hasSelectionMode: ComputedRef<boolean>
  singleSelection: ComputedRef<boolean>
  multipleSelection: ComputedRef<boolean>
  allRowsSelected: ComputedRef<boolean>
  someRowsSelected: ComputedRef<boolean>
  rowsSelectedNumber: ComputedRef<number>
  isRowSelected: IsRowSelected
  isRowDisabled: IsRowDisabled
  clearSelection: () => void
  selectAllOnPage: () => void
  clearSelectionOnPage: () => void
  updateSelection: UpdateSelection
} {
  const disabledSelectionKeys = computed<Record<string, boolean>>(() => {
    const keys: Record<string, boolean> = {}
    props.disabledSelection.map(getRowKey.value).forEach((key) => {
      keys[key] = true
    })
    return keys
  })

  const selectedKeys = computed<Record<string, boolean>>(() => {
    const keys: Record<string, boolean> = {}
    props.selected.map(getRowKey.value).forEach((key) => {
      keys[key] = true
    })
    return keys
  })

  const hasSelectionMode = computed(() => {
    return props.selection !== "none"
  })

  const singleSelection = computed(() => {
    return props.selection === "single"
  })

  const multipleSelection = computed(() => {
    return props.selection === "multiple"
  })

  const allRowsSelected = computed(
    () =>
      computedRows.value.length > 0 &&
      computedRows.value.every(
        (row) => selectedKeys.value[getRowKey.value(row)] === true
      )
  )

  const someRowsSelected = computed(
    () =>
      allRowsSelected.value !== true &&
      computedRows.value.some(
        (row) => selectedKeys.value[getRowKey.value(row)] === true
      )
  )

  const rowsSelectedNumber = computed(() => props.selected.length)

  const isRowSelected: IsRowSelected = (key: string) => {
    return selectedKeys.value[key] === true
  }

  const isRowDisabled: IsRowDisabled = (key: string) => {
    return disabledSelectionKeys.value[key] === true
  }

  function clearSelection() {
    emit("update:selected", [])
  }

  const updateSelection: UpdateSelection = (keys, rows, added, evt) => {
    emit("selection", { rows, added, keys, evt })

    const payload =
      singleSelection.value === true
        ? added === true
          ? rows
          : []
        : added === true
        ? props.selected.concat(
            rows.filter(
              (row) =>
                disabledSelectionKeys.value[getRowKey.value(row)] !== true
            )
          )
        : props.selected.filter((row) => {
            const rowKey = getRowKey.value(row)
            return (
              keys.includes(rowKey) === false &&
              disabledSelectionKeys.value[rowKey] !== true
            )
          })

    emit("update:selected", payload)
  }

  function selectAllOnPage() {
    const keys = computedRows.value.map(getRowKey.value)
    updateSelection(keys, computedRows.value, true)
  }

  function clearSelectionOnPage() {
    const keys = computedRows.value.map(getRowKey.value)
    updateSelection(keys, computedRows.value, false)
  }

  return {
    hasSelectionMode,
    singleSelection,
    multipleSelection,
    allRowsSelected,
    someRowsSelected,
    rowsSelectedNumber,

    isRowSelected,
    isRowDisabled,
    clearSelection,
    updateSelection,
    selectAllOnPage,
    clearSelectionOnPage
  }
}
