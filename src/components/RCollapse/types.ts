import type { Ref } from 'vue'

import type { Nullable } from '../helpers'

export type RCollapsePropModelValue = Nullable<
  string | number | (string | number)[]
>

export interface RCollapseProps {
  modelValue: RCollapsePropModelValue
  accordion: Nullable<boolean>
}

export type RCollapseInstance = void
