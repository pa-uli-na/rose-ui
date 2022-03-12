import type { ComputedRef, Ref } from "vue";

export interface RRadioItem {
  label: string;
  value: string;
}

export interface RRadioProps {
  modelValue?: string | number;
  disabled: boolean;
  items: RRadioItem[];
  name: string;
  outlined: boolean;
  size: string;
  type: string;
}

export interface RRadioInstance {
  selectedValue: Ref<string | number | undefined>;
  outlinedRef: ComputedRef<string>;
  sizeType: ComputedRef<string>;
  colorType: ComputedRef<string>;
  handleChange: (value: string) => void;
}
