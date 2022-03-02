import type { ComputedRef } from 'vue'

export type RButtonPropType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'

export const RButtonPropTypes: Record<RButtonPropType, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  black: 'black',
}

export type RButtonPropSize = 'small' | 'medium' | 'large'
export const RButtonPropSizes: Record<RButtonPropSize, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export interface RButtonProps {
  type: String
  size: String
  block?: boolean
  disabled?: Boolean
  outlined?: Boolean
  flat?: Boolean
  rounded?: Boolean
}

export interface RButtonInstance {
  classType: ComputedRef<string>
  outlineRef: ComputedRef<string>
  flatRef: ComputedRef<string>
  roundRef: ComputedRef<string>
  sizeType: ComputedRef<string>
  blockRef: ComputedRef<string>
  handleClick: (event: MouseEvent) => void
}
