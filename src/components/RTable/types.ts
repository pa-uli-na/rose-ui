// r-table
export type TablePropsDataElement<E = unknown> = Record<string, E>
export type TablePropsData<E = unknown> = TablePropsDataElement<E>[]
export interface TableProps {
  [key: string]: unknown
  data: TablePropsData
  hideHeader: boolean
}
export type GetRowKey<E = unknown> = (row: TablePropsDataElement<E>) => string
export type GetCellValue<R = unknown> = (
  col: TablePropsColumns,
  row: TablePropsDataElement<R>
) => unknown

// useTableColumns
export interface TablePropsColumns<R = TablePropsDataElement> {
  name: string
  label: string
  field?: string | ((row: R) => unknown)
  align?: 'right' | 'left' | 'center'
  sort?: (a: unknown, b: unknown, rowA: R, rowB: R) => number
  format?: (val: unknown, row: R) => unknown
  sortable?: boolean
  required?: boolean
}

export interface TableColumns extends TablePropsColumns {
  __thClasses: string
  __iconName: string
}

// useTablePagination
export interface TablePropsPagination {
  sortBy: string | null
  descending: boolean
  page: number
  rowsPerPage: number
}

export type SetPagination = (val: Partial<TablePropsPagination>) => void

export type FilterSinglRowMethod<R, T> = (
  row: R,
  terms: T,
  col: TableColumns,
  cellValue: GetCellValue<R>
) => boolean

// useTableFilter
export type FilterMethod<R = unknown, T = unknown> = (
  rows: TablePropsData<R>,
  terms: T,
  cols: TableColumns[],
  cellValue: GetCellValue<R>
) => TablePropsData<R>

// useTableSort
export type SortMethod<T = TablePropsData> = (
  data: T,
  sortBy: string | null,
  descending: boolean
) => T

export type TableSort = (colVal: string | TablePropsColumns) => void

// useTableSelection
export type UpdateSelection = (
  keys: string[],
  rows: TablePropsData,
  added: boolean,
  evt?: Event
) => void

export type IsRowSelected = (key: string) => boolean
export type IsRowDisabled = (key: string) => boolean
