import type { ComputedRef, Ref } from 'vue'

export interface DropdownItem {
  text: string
  href: string
}

export interface RDropdownProps {
  items?: DropdownItem[]
  mobile?: boolean
}

export interface RDropdownInstance {
  mobileRef: ComputedRef<String>
}
