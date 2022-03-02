import type { Ref } from 'vue'

import type { Nullable } from '../helpers'

export type RTabPropModelValue = Nullable<string>
export type RTabPropTabWidth = Nullable<string | number>
export type RTabPropDisabled = Nullable<boolean>

export type RTabPropType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'

export const RTabPropTypes: Record<RTabPropType, string> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  black: 'black',
}

export interface RTabsProps {
  modelValue: RTabPropModelValue
  disabled: RTabPropDisabled
  type: String
}

export interface RTabsProvider {
  currentName: Ref<RTabPropModelValue>
  disabled: Ref<RTabPropDisabled>
  type: Ref<String>
  updateValue: (name: string) => void
}

export type RTabsInstance = void
