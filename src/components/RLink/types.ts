import type { ComputedRef } from 'vue'

export type RLinkPropSize = 'small' | 'medium' | 'large'
export const RLinkPropSizes: Record<RLinkPropSize, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export interface RLinkProps {
  color?: String
  disabled?: Boolean
  text?: String
  size?: String
}

export interface RLinkInstance {
  colorRef?: ComputedRef<Object>
  disabledRef?: ComputedRef<string>
  sizeType: ComputedRef<string>
  handleClick: () => void
}
