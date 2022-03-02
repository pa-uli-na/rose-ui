import type { ComputedRef } from 'vue'

export interface RBreadcrumbLink {
  icon?: string
  link?: string
  text?: string
}

export interface RBreadcrumbsProps {
  breadcrumbs?: RBreadcrumbLink[]
}

export interface RBreadcrumbsInstance {}
