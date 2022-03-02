import {} from 'vue'
export interface RBarValue {
  color: string
  value: number
}

export interface RBarWidth {
  color: string
  width: number
}

export interface RBarProps {
  values: RBarValue[]
  totalValue: number
}

export interface RBarInstance {
  widths: RBarWidth[]
}
