import type { ComputedRef } from 'vue'
import type { Nullable } from '../helpers'

export interface RTabProps {
  name: string
  title: string
  description: Nullable<string>
  width: Nullable<string | number>
  disabled: Nullable<boolean>
}

export interface RTabInstance {
  isDisabled: ComputedRef<boolean>
  tabBtnClasses: ComputedRef<Record<string, boolean>>
  handleTabClick: () => void
}
