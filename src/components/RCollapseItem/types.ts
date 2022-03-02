import type { ComputedRef, Ref } from 'vue'

export interface RCollapseItemProps {
  title?: string
}

export interface RCollapseItemInstance {
  activeRef: ComputedRef<string>
  activeTextRef: ComputedRef<string>
  isOpen: Ref<boolean | undefined>
  toggleOpen: () => void
}
