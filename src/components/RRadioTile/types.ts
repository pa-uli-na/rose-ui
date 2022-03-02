import type { ComputedRef, Ref } from 'vue'

export interface RRadioTileItem {
  label: string
  value: unknown
  icon: string
}

export type RRadioTilePropSize = 'small' | 'medium' | 'large'
export const RRadioTilePropSizes: Record<RRadioTilePropSize, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export type RRadioTilePropType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'

export const RRadioTilePropTypes: Record<RRadioTilePropType, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  black: 'black',
}

export interface RRadioTileProps {
  modelValue?: string | number
  disabled: boolean
  items: RRadioTileItem[]
  name: string
  outlined: boolean
  size: string
  type: string
}

export interface RRadioTileInstance {
  selectedValue: Ref<string | number | undefined>
  radioAttributes: ComputedRef<object>
  outlinedRef: ComputedRef<string>
  sizeType: ComputedRef<string>
  colorType: ComputedRef<string>
  handleChange: (value: string) => void
}
