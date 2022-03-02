import type { ComputedRef, PropType, Ref } from 'vue'
export interface Group {
  id: number
  label: string
  color: string
  modules: Module[]
}

export interface Module {
  id: number
  groupID?: number | null
  label: string
  description: string
  functions: Func[]
}

export interface Func {
  id: number
  moduleID?: number | null
  label: string
  url: string
  description: string
}

export interface RNavbarProps {
  backgroundColor?: string
  color?: string
  imgLogo?: string
  logoText?: string
  logoHref?: string
  navbarData?: Group[]
  userName?: string
  userPicture?: string
}

export interface RNavbarInstance {
  backgroundColorRef?: ComputedRef<Object>
  colorRef?: ComputedRef<Object>
  isDropDownMenuOpen: Ref<boolean>
  darkMode: Ref<boolean>
  isMobileMenuOpen: Ref<boolean>
  pickedGroup: Ref<any>
  pickedGroupId: Ref<number>
  toggleTheme: () => void
  onClickMobileGroup: (id: number) => void
}
