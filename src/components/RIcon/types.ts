import type { ComputedRef } from 'vue'

export interface RIconProps {
  name?: string
  className?: string
  color?: string
  backgroundColor?: string
}

export interface RIconInstance {
  colorRef: ComputedRef<{ color: string | undefined }>
  backgroundRef: ComputedRef<{
    backgroundColor?: string | undefined
    padding?: string | undefined
    borderRadius?: string | undefined
  }>
}
