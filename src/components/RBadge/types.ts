import type { ComputedRef } from 'vue'

export type RBadgePropSize = 'small' | 'medium' | 'large'
export const RBadgePropSizes: Record<RBadgePropSize, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export type RBadgePropType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'

export const RBadgePropTypes: Record<RBadgePropType, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  black: 'black',
}

export interface RBadgeProps {
  filled?: boolean
  label?: String
  outlined?: boolean
  rounded?: Boolean
  size?: String
  type?: String
  up?: boolean
}

export interface RBadgeInstance {
  colorType: ComputedRef<String>
  roundRef: ComputedRef<String>
  sizeType: ComputedRef<String>
  upRef: ComputedRef<String>
}
