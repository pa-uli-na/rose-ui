import type { ComputedRef, Ref } from 'vue'

export interface RRadioItem {
  label: string
  value: string
}

export type RRadioPropSize = 'small' | 'medium' | 'large'
export const RRadioPropSizes: Record<RRadioPropSize, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export type RRadioPropType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'

export const RRadioPropTypes: Record<RRadioPropType, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  black: 'black',
}

export interface RRadioProps {
  modelValue?: string | number
  disabled: boolean
  items: RRadioItem[]
  name: string
  outlined: boolean
  size: string
  type: string
}

export interface RRadioInstance {
  selectedValue: Ref<string | number | undefined>
  outlinedRef: ComputedRef<string>
  sizeType: ComputedRef<string>
  colorType: ComputedRef<string>
  handleChange: (value: string) => void
}
