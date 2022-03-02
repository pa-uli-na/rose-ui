import type { ComputedRef } from 'vue'

export type RAvatarPropSize = 'small' | 'medium' | 'large'
export const RAvatarPropSizes: Record<RAvatarPropSize, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export interface RAvatarProps {
  description?: string
  imgLink: string
  isSquare?: boolean
  size?: string
  title?: string
  withShadow?: boolean
}

export interface RAvatarInstance {
  shadowClasses: ComputedRef<String>
  shapeClasses: ComputedRef<String>
  sizeTypeClass: ComputedRef<String>
}
