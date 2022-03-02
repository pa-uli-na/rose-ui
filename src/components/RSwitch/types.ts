import type { ComputedRef, Ref } from 'vue'

export interface RSwitchItem {
  label: string
  value: string
}

export interface RSwitchProps {
  modelValue?: string | number
  label: string
  disabled: boolean
}

export interface RSwitchInstance {
  selectedValue: Ref<string | number | undefined>
  radioAttributes: ComputedRef<object>
  handleChange: (value: string) => void
}
