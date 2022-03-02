import type { ComputedRef, Ref } from 'vue'

export interface RCheckboxItem {
  label: string
  value: string
}

export type RCheckboxPropSize = 'small' | 'medium' | 'large'
export const RCheckboxPropSizes: Record<RCheckboxPropSize, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export type RCheckboxPropType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'

export const RCheckboxPropTypes: Record<RCheckboxPropType, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  black: 'black',
}

export interface RCheckboxProps {
  modelValue?: string | number
  disabled: boolean
  items: RCheckboxItem[]
  name: string
  outlined: boolean
  size: string
  type: string
}

export interface RCheckboxInstance {
  selectedValue: Ref<string | number | undefined>
  outlinedRef: ComputedRef<string>
  sizeType: ComputedRef<string>
  colorType: ComputedRef<string>
  handleChange: (value: string) => void
}
