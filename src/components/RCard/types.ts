import type { ComputedRef } from 'vue'

export interface RCardIndicator {
  text: string
  value: string | number
}

export interface RCardProps {
  title?: string
  iconName?: string
  indicators?: RCardIndicator[]
  rounded?: boolean
  flat?: boolean
}

export interface RCardInstance {
  roundRef: ComputedRef<string>
  shadowRef: ComputedRef<string>
}
