import type { ComputedRef, Ref } from "vue";

export interface RCheckboxItem {
  label: string;
  value: string;
}

export interface RCheckboxProps {
  modelValue?: string | number;
  disabled: boolean;
  items: RCheckboxItem[];
  name: string;
  outlined: boolean;
  size: string;
  type: string;
}

export interface RCheckboxInstance {
  selectedValue: Ref<string | number | undefined>;
  outlinedRef: ComputedRef<string>;
  sizeType: ComputedRef<string>;
  colorType: ComputedRef<string>;
  handleChange: (value: string) => void;
}
