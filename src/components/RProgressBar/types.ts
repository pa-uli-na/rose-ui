import { ComputedRef } from 'vue'

export interface RProgressBarValue {
  color?: string
  name: string
  value: number
  valueText?: string
}

export interface RProgressBarProps {
  legend?: boolean
  legendTitle?: string
  maxValue?: number
  progressValues?: RProgressBarValue[]
  sumText?: string
  title?: string
  totalValue: number
}

export interface RProgressBarInstance {
  sumValues: ComputedRef<number>
  barValues: ComputedRef<any>
}
